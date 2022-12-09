<template>
  <div class="px-4">
    <Description @register="register" />
    <!-- 负责人 -->
    <div class="mt-[12px]" v-if="again">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">重新下发</div>
      <BasicForm @register="registerFrom" />
    </div>
    <div class="mt-[12px]" v-if="props.identity === '1'">
      <a-button class="mr-4" v-if="props.status === '1'">取消</a-button>
      <a-button class="mr-4" type="primary" v-if="props.status === '2'">延期审核</a-button>
      <a-button
        type="primary"
        v-if="props.status === '1' || props.status === '2'"
        @click="handleAgain"
        >重新下发</a-button
      >
    </div>
    <!-- 执行人 -->
    <div class="mt-[12px]" v-if="Postpone">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">申请延期</div>
      <BasicForm @register="registerPostponeFrom" />
    </div>
    <div class="mt-[12px]" v-if="Result">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">处理结果</div>
      <BasicForm @register="registerResultFrom" />
    </div>
    <div class="mt-[12px]" v-if="Refuse">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">验收结果</div>
      <BasicForm @register="registerRefuseFrom" />
    </div>
    <div class="mt-[12px]" v-if="props.identity === '2'">
      <a-button class="mr-4" type="primary" v-if="props.status === '1'" @click="handlePostpone"
        >申请延期</a-button
      >
      <a-button type="primary" v-if="props.status === '1'" @click="handleResult">提交验收</a-button>
      <a-button type="primary" v-if="props.status === '4'" @click="handleRefuse">重新提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    WorkDetail,
    getAgainFormSchema,
    postponeFormSchema,
    ResultFormSchema,
    RefuseFormSchema,
  } from '../data';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
    identity: {
      type: String,
      default: '',
    },
  });
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(props.status),
    bordered: false,
    column: 3,
    size: 'default',
  });
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  const [registerFrom, {}] = useForm({
    schemas: getAgainFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  // 申请延期
  const Postpone = ref<boolean>(false);
  function handlePostpone() {
    Postpone.value = true;
  }
  const [registerPostponeFrom, {}] = useForm({
    schemas: postponeFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  // 提交验收
  const Result = ref<boolean>(false);
  function handleResult() {
    Result.value = true;
  }
  const [registerResultFrom, {}] = useForm({
    schemas: ResultFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  //重新提交
  const Refuse = ref<boolean>(false);
  function handleRefuse() {
    Refuse.value = true;
  }
  const [registerRefuseFrom, {}] = useForm({
    schemas: RefuseFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
</script>

<style lang="less" scoped></style>
