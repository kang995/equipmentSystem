<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { schemasAdd } from './data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { addListApi, editListApi, getDetailsApi } from '/@/api/device-scrap/data';
  import { message } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getPeopleSelectApi } from '/@/api/device-maintenance';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const routeId = route.query.id as string;
  const location = route.query.location as string;
  const [register, { getFieldsValue, setFieldsValue, updateSchema }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd(location),
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
  });
  onMounted(() => {
    routeId && getDetails();
  });
  const version = ref('');
  function getDetails() {
    getDetailsApi({
      id: routeId,
    }).then((res) => {
      setFieldsValue(res);
      version.value = res.version;
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
    const data = getFieldsValue();
    if (routeId) {
      delete data.deviceId;
      editListApi({
        ...data,
        version: version.value,
        id: routeId,
      })
        .then(() => {
          message.success('修改成功');
          closeCurrent();
          router.go(-1);
        })
        .catch(() => {
          message.success('修改失败');
        });
    } else {
      addListApi(data)
        .then(() => {
          message.success('新增成功');
          closeCurrent();
          router.go(-1);
        })
        .catch(() => {
          message.success('新增失败');
        });
    }
  }
</script>
