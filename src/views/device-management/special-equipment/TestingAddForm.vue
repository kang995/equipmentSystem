<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { testingAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { postSpecialRecordAddApi } from '/@/api/device-management/special-equipment';
  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const name = route.query.name;
  const id = route.query.id;
  const position = route.query.position;

  onMounted(() => {
    setFieldsValue({ deviceName: name, position: position });
  });
  const [register, { setFieldsValue, getFieldsValue }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: testingAdd,
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
  async function resetSubmitFunc() {
    getRouter();
  }

  async function sumitForm() {
    const data = getFieldsValue();
    data['deviceId'] = id;
    funAdd(postSpecialRecordAddApi, data, '新增成功');
  }
  function funAdd(api, data, test) {
    api(data).then(() => {
      createMessage.success(test);
      getRouter();
    });
  }
  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }
</script>
