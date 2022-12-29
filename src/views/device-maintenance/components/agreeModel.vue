<template>
  <BasicModal
    v-bind="$attrs"
    title="审核通过"
    :destroy-on-close="true"
    :mask-closable="false"
    @ok="submitForm"
    @cancel="goBack"
    width="650px"
    @register="registerModalc"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { agreeFormSchema } from './fileld';

  const emit = defineEmits(['event', 'register']);
  const recallData = ref<any>({});
  const [registerModalc, { closeModal }] = useModalInner(async (data) => {
    recallData.value = data;
    // console.log(111, recallData.value);
  });
  const [registerForm, { validate, getFieldsValue }] = useForm({
    schemas: agreeFormSchema(),
    baseColProps: {
      span: 22,
      style: {
        margin: '0 auto',
      },
    }, //配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    labelWidth: 80,
    actionColOptions: {
      offset: 18,
      span: 10,
      style: {
        textAlign: 'left',
      },
    }, //操作按钮外层 Col 组件配置
    showActionButtonGroup: false,
  });

  //提交
  async function submitForm() {
    await validate();
    const data = getFieldsValue();
    data.id = recallData.value?.id;
    data.approvalResult = recallData.value?.approvalResult;
    emit('event', data);
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
