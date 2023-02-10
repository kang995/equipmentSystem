<template>
  <div class="mt-[24px]">
    <div class="font-black text-[#414960] text-[15px] my-[16px]">重新下发</div>
    <BasicForm @register="registerFrom" />
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getAgainFormSchema } from '../field';
  const [registerFrom, { validate, getFieldsValue }] = useForm({
    schemas: getAgainFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    labelCol: {
      span: 6,
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
