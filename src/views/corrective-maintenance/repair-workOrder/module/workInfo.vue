<template>
  <div class="px-4">
    <Description @register="register" />
    <!-- 负责人 -->
    <template v-if="props.identity === '1'">
      <div class="mt-[12px]" v-if="again">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">重新下发</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerFrom" />
        </div>
      </div>
      <div class="mt-[12px]" v-if="props.status === '2' && !again">
        <Description @register="registerPostpone" />
        <div class="font-black text-[#414960] text-[15px] my-[16px]">延期审核</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerPostponeFrom" />
        </div>
      </div>
      <div
        class="mt-[12px]"
        v-if="props.status === '3' || props.status === '4' || props.status === '5'"
      >
        <Description @register="registerRepair" />
      </div>
      <div class="mt-[12px]" v-if="props.status === '4' || props.status === '5'">
        <Description @register="registerResult" />
      </div>
      <div class="mt-[12px] flex">
        <template v-if="props.status === '1' || props.status === '2'">
          <a-button class="mr-4" type="primary" v-if="!again" @click="handleAgain"
            >重新下发</a-button
          >
          <a-button class="mr-4" v-if="again" @click="again = false">取消</a-button>
          <a-button type="primary" v-if="again" @click="handleOk">确定</a-button>
        </template>
        <template v-if="props.status === '2'">
          <a-button type="primary" v-if="!again" @click="handleAudit">完成审核</a-button>
        </template>
      </div>
    </template>
    <!-- 执行人 -->
    <template v-if="props.identity === '2'">
      <div class="mt-[12px]" v-if="apply">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">申请延期</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerApply" />
        </div>
      </div>
      <div class="mt-[12px]" v-if="accept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">维修结果</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerAccept" />
        </div>
      </div>
      <div v-if="props.status === '3'">
        <Description @register="registerShowResult" />
      </div>
      <div class="mt-[12px]" v-if="props.status === '4' || props.status === '5'">
        <Description @register="registerRepair" v-if="!SubmitAccept" />
        <Description @register="registerResult" />
      </div>
      <div v-if="SubmitAccept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">维修结果</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerSubmitAccept" />
        </div>
      </div>
      <div class="mt-[12px] flex">
        <template v-if="props.status === '1'">
          <a-button class="mt-30 mr-4" type="primary" v-if="!apply && !accept" @click="handleApply"
            >申请延期</a-button
          >
          <a-button class="mt-30" type="primary" v-if="!apply && !accept" @click="handleAccept"
            >提交验收</a-button
          >
          <a-button class="mr-4" v-if="apply" @click="handleClose">取消</a-button>
          <a-button type="primary" v-if="apply" @click="handleSubmitApply">提交</a-button>
          <a-button type="primary" v-if="accept" @click="handleSubmitAccept">提交</a-button>
        </template>
        <template v-if="props.status === '4'">
          <a-button class="mt-[12px]" type="primary" v-if="!SubmitAccept" @click="handleAgainSubmit"
            >重新提交</a-button
          >
          <a-button type="primary" v-if="SubmitAccept" @click="handleSubmitResult">提交</a-button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Description, useDescription } from '/@/components/Description';
  import {
    WorkDetail,
    getAgainFormSchema,
    PostponeDetail,
    getPostponeFormSchema,
    RepairDetail,
    ResultDetail,
    getApplyFormSchema,
    getAcceptFormSchema,
    ShowResultDetail,
    getSubmitAcceptFormSchema,
  } from '../data';
  const router = useRouter();
  const route = useRoute();
  const isShow = route.query?.isShow as string;
  const isSbumit = route.query?.isSbumit as string;
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
  onMounted(() => {
    isShow && (apply.value = true);
    isSbumit && (SubmitAccept.value = true);
  });
  //执行人
  //申请延期
  const apply = ref<boolean>(false);
  function handleApply() {
    apply.value = true;
  }
  const [registerApply, {}] = useForm({
    schemas: getApplyFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  //提交验收
  const accept = ref<boolean>(false);
  function handleAccept() {
    accept.value = true;
  }
  const [registerAccept, {}] = useForm({
    schemas: getAcceptFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  //待验收-维修结果
  let showResult = ref<any>({});
  const [registerShowResult] = useDescription({
    data: showResult,
    schema: ShowResultDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  //重新提交
  const SubmitAccept = ref<boolean>(false);
  function handleAgainSubmit() {
    SubmitAccept.value = true;
  }
  const [registerSubmitAccept, {}] = useForm({
    schemas: getSubmitAcceptFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
    labelWidth: 120,
  });
  //取消
  function handleClose() {
    if (isShow) {
      CloseFun();
    } else {
      apply.value = false;
    }
  }
  //维修结果提交
  function handleSubmitResult() {
    CloseFun();
  }
  //提交--申请延期
  function handleSubmitApply() {
    CloseFun();
  }
  //提交--维修结果
  function handleSubmitAccept() {
    CloseFun();
  }

  //申请人
  //完成审核
  function handleAudit() {
    CloseFun();
  }
  // 工单信息
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  // 维修结果
  let repair = ref<any>({});
  const [registerRepair] = useDescription({
    data: repair,
    schema: RepairDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  // 验收结果
  let result = ref<any>({});
  const [registerResult] = useDescription({
    data: result,
    schema: ResultDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  // 延期申请
  let postpone = ref<any>({});
  const [registerPostpone] = useDescription({
    data: postpone,
    schema: PostponeDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  //延期审核
  const [registerPostponeFrom, {}] = useForm({
    schemas: getPostponeFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  //重新下发-提交
  function handleOk() {
    CloseFun();
  }
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
  function CloseFun() {
    router.push({
      name: 'repairWorkOrder',
    });
  }
  defineExpose({});
</script>

<style lang="less" scoped></style>
