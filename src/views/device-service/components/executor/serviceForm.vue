<template>
  <div class="mt-[12px]">
    <div class="font-black text-[#414960] text-[15px] my-[16px]">申请延期</div>
    <div class="w-screen-sm">
      <BasicForm @register="registerSubmitAccept" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getAcceptFormSchema } from '../field';

  const [registerSubmitAccept, {}] = useForm({
    schemas: getAcceptFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
</script>

<style lang="less" scoped></style>
