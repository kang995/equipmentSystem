<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <!-- 拆除设备 -->
      <template #deviceSlot="{ model, field }">
        <a-tree-select
          v-model:value="model[field]"
          :tree-data="gasList"
          @change="handleChangeTree"
          :dropdownMatchSelectWidth="false"
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
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { schemasAdd } from './data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { message, TreeSelect } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getPeopleSelectApi } from '/@/api/device-maintenance';
  import { addListApi, getDetailsApi, editListApi } from '/@/api/device-demolishi/data';
  import { treeListApi } from '/@/api/device-scrap/data';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const routeId = route.query.id as string;
  const location = route.query.location as string;
  const ATreeSelect = TreeSelect;
  const [register, { getFieldsValue, setFieldsValue, updateSchema, validateFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd(location, routeId),
    actionColOptions: {
      offset: 8,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
    fieldMapToTime: [['timeDate', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
  });
  onMounted(() => {
    routeId && getDetails();
  });

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
  treeListApi().then((res) => {
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
    treeListApi().then((res) => {
      const data = treeTolist(res).filter((item) => item.id === e);
      setFieldsValue({
        name1: data[0].position,
      });
    });
  }
  const version = ref('');
  function getDetails() {
    getDetailsApi({
      id: routeId,
    }).then((res) => {
      setFieldsValue(res);
      version.value = res.version;
      //拆除时间设置
      setFieldsValue({
        timeDate: [res.startDate, res.endDate],
      });
      //负责人设置
      getPeopleSelectApi([res.chargeDeptId]).then((res) => {
        updateSchema({
          field: 'chargePeopleId',
          componentProps: {
            options: res,
          },
        });
      });
    });
  }
  async function resetSubmitFunc() {
    closeCurrent();
    router.go(-1);
  }
  async function sumitForm() {
    await validateFields();
    const data = getFieldsValue();
    if (routeId) {
      editListApi({
        ...data,
        version: version.value,
        id: routeId,
      }).then(() => {
        message.success('修改成功');
        closeCurrent();
        router.go(-1);
      });
    } else {
      addListApi(data).then(() => {
        message.success('新增成功');
        closeCurrent();
        router.go(-1);
      });
    }
  }
</script>
