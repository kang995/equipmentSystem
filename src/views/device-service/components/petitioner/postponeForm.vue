<template>
  <div>
    <div class="mt-[24px]">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">延期申请</div>
      <Description @register="registerApply" />
    </div>
    <div class="mt-[24px]">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">延期审核</div>
      <div class="w-screen-sm">
        <BasicForm @register="registerFrom" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Description, useDescription } from '/@/components/Description';
  import { getPostponeFormSchema, ApplySchemaDetail } from '../field';
  const [registerFrom, {}] = useForm({
    schemas: getPostponeFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  // 延期申请
  let postpone = ref<any>({});
  const [registerApply] = useDescription({
    data: postpone,
    schema: ApplySchemaDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
