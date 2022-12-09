<template>
  <div class="px-4">
    <Description @register="register" />
    <div class="mt-[12px]">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">验收结果</div>
      <BasicForm @register="registerFrom" />
    </div>
    <div class="mt-[12px]">
      <a-button class="mr-4">取消</a-button>
      <a-button type="primary">提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { WorkDetail, MaintenanceFormSchema } from '../data';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
  });
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 3,
    size: 'default',
  });
  const [registerFrom, {}] = useForm({
    schemas: MaintenanceFormSchema(props.status), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 12,
    },
    labelWidth: 120,
  });
</script>

<style lang="less" scoped></style>
