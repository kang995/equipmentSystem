<template>
  <div class="px-4">
    <Description @register="register" />
    <div class="mt-[12px]" v-if="props.status === '1'">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果</div>
      <div class="w-screen-sm">
        <BasicForm @register="registerResult" />
      </div>
    </div>
    <div class="mt-[12px]" v-if="props.status === '2' || props.status === '3'">
      <Description @register="registerResults" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { WorkDetail, getResultFormSchema, ResultDetails } from '../data';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
  });
  // 工单信息
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });

  //验收结果
  const [registerResult, {}] = useForm({
    schemas: getResultFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: false,
    submitFunc: handleSubmitResult,
  });
  let results = ref<any>({});
  const [registerResults] = useDescription({
    data: results,
    schema: ResultDetails(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  async function handleSubmitResult() {
    console.log('提交');
  }
</script>

<style lang="less" scoped></style>
