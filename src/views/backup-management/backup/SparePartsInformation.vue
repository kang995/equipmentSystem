<template>
  <div class="bg-white p-4">
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { inboundAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();

  const [register, {}] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: inboundAdd,
    actionColOptions: {
      offset: 5,
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
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }

  async function sumitForm() {
    await closeCurrent();
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }
</script>
