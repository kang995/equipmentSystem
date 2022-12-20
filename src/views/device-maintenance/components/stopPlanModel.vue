<template>
  <BasicModal
    v-bind="$attrs"
    :title="recallData['title']"
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
  import { getPlanFormSchema } from './fileld';

  const emit = defineEmits(['planEvent', 'register']);
  const recallData = ref({});
  const [registerModalc, { closeModal }] = useModalInner(async (data) => {
    recallData.value = data;
    console.log(111, data);
  });
  const [registerForm, { validate, getFieldsValue }] = useForm({
    schemas: getPlanFormSchema(),
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
    emit('planEvent', data);
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
