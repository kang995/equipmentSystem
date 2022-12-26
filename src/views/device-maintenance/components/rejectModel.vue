<template>
  <BasicModal
    v-bind="$attrs"
    title="审核拒绝"
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
  import { rejectFormSchema } from './fileld';

  // const emit = defineEmits(['Event', 'register']);
  const recallData = ref<any>({});
  const [registerModalc, { closeModal }] = useModalInner(async (data) => {
    recallData.value = data;
  });
  const [registerForm, { validate, getFieldsValue }] = useForm({
    schemas: rejectFormSchema(),
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
    console.log('原因', data);
    // data.id = recallData.value?.id;
    // emit('Event', data);
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
