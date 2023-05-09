<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <!-- 关联设备 -->
        <template #deviceSlot="{ model, field }">
          <a-tree-select
            v-model:value="model[field]"
            :tree-data="gasList"
            @change="handleChangeTree"
            :dropdownMatchSelectWidth="false"
            show-search
            allow-clear
            treeNodeFilterProp="label"
            tree-default-expand-all
            placeholder="请选择设备"
            :fieldNames="{
              value: 'id',
              key: 'id',
              label: 'label',
              children: 'children',
            }"
          />
        </template>
      </BasicForm>
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, TreeSelect } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getCommonFormSchema } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter, useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    putFaultAddListApi,
    putFaultUpdateListApi,
    TroubleDetailApi,
    deviceTreeSelectApi,
  } from '/@/api/corrective-maintenance/fault';
  const ATreeSelect = TreeSelect;
  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const versionVal = ref<any>(); //版本号

  // 添加disabled
  const handleDisabled = (tree) => {
    tree &&
      tree.forEach((node) => {
        if (node.type && node.type !== 3) {
          //type为3才可选择
          node.disabled = true;
          node.children && handleDisabled(node.children);
        }
      });
    return tree;
  };
  const gasList = ref<any>([]);
  deviceTreeSelectApi().then((res) => {
    gasList.value = handleDisabled(res);
  });

  // 树结构转列表
  const treeTolist = (tree, result = [] as any, level = 0) => {
    tree.forEach((node) => {
      result.push(node);
      node.level = level + 1;
      node.children && treeTolist(node.children, result, level + 1);
    });
    return result;
  };
  //获取设备安装位置
  function handleChangeTree(e) {
    // console.log('e',e)
    deviceTreeSelectApi().then((res) => {
      const data = treeTolist(res).filter((item) => item.id === e);
      setFieldsValue({
        position: data[0].position,
      });
    });
  }

  const [registerFrom, { validate, getFieldsValue, setFieldsValue }] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    // baseColProps: {
    //   span: 24,
    // },
    // labelWidth: 120,
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    actionColOptions: {
      offset: 5,
      span: 24,
      style: {
        textAlign: 'center',
        marginTop: '24px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
  });
  //回显
  id &&
    TroubleDetailApi({ id }).then((res) => {
      setFieldsValue(res);
      versionVal.value = res.version;
    });
  //提交
  async function handleSubmit() {
    await validate();
    const params = getFieldsValue();
    if (id) {
      //修改
      params['id'] = id;
      params['version'] = versionVal.value;
      putFaultUpdateListApi(params)
        .then(() => {
          createMessage.success('修改成功');
          router.push({
            name: 'faultManagement',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //新增
      putFaultAddListApi(params)
        .then(() => {
          createMessage.success('新增成功');
          router.push({
            name: 'faultManagement',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  //取消
  async function handleReset() {
    closeCurrent();
  }
</script>

<style lang="less" scoped></style>
