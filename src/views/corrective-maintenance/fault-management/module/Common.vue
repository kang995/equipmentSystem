<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <!-- <template #treeSlot="{ model, field }">
          <ATreeSelect
            v-model:value="model[field]"
            style="width: 100%"
            placeholder="请输入关联设备"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            :fieldNames="{ children: 'children', label: 'label', value: 'id' }"
            @change="handleChange"
          />
        </template> -->
      </BasicForm>
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getCommonFormSchema } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter, useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    putFaultAddListApi,
    putFaultUpdateListApi,
    TroubleDetailApi,
  } from '/@/api/corrective-maintenance/fault';
  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const versionVal = ref<any>(); //版本号
  // import { TreeSelect } from 'ant-design-vue';
  // import { deviceTreeSelectApi } from "/@/api/corrective-maintenance/fault"
  // const ATreeSelect = TreeSelect;

  // const treeData = ref<any[]>([]);
  // async function treeQuery() {
  //   deviceTreeSelectApi().then((res) => {
  //     // console.log('res:', res);
  //     treeData.value = res;
  //   });
  // }
  // onMounted(() => {
  //   treeQuery();
  // });
  //

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
