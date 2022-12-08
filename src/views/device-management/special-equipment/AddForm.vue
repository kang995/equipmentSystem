<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { schemasAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';

  const { closeCurrent } = useTabs();
  const router = useRouter();

  const [register, {}] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd,
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
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }

  async function sumitForm() {
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }
</script>
