<template>
  <div class="mt-[12px]">
    <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果</div>
    <BasicForm @register="registerResult" />
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getResultFormSchema } from '../data';

  const [registerResult, { validate, getFieldsValue }] = useForm({
    schemas: getResultFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 12,
    },
  });
  function submitFun() {
    return new Promise(async (resolve) => {
      await validate();
      const obj = getFieldsValue();
      resolve(obj);
    });
  }
  defineExpose({
    submitFun,
  });
</script>

<style lang="less" scoped></style>
