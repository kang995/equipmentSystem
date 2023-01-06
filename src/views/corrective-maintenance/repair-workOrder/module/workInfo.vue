<template>
  <div class="px-4">
    <Description @register="register" />
    <!-- 负责人 -->
    <template v-if="identity === '1'">
      <!-- 重新下发 -->
      <div class="mt-[12px]" v-if="again">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">重新下发</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerFrom" />
        </div>
      </div>
      <!-- 延期审核 -->
      <div class="mt-[12px]" v-if="status === '1' && !again">
        <Description @register="registerPostpone" />
        <div class="font-black text-[#414960] text-[15px] my-[16px]">延期审核</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerPostponeFrom" />
        </div>
      </div>
      <!-- 维修结果 -->
      <div class="mt-[12px]" v-if="status === '2' || status === '3' || status === '4'">
        <template v-for="(item, index) in repair" :key="item.id">
          <Description :bordered="false" :column="2" :data="item" :schema="RepairDetail(index)" />
        </template>
        <!-- <Description @register="registerRepair" /> -->
      </div>
      <!-- 验收结果 -->
      <div class="mt-[12px]" v-if="status === '3' || status === '4'">
        <template v-for="(item, index) in result" :key="item.id">
          <Description :bordered="false" :column="2" :data="item" :schema="ResultDetail(index)" />
        </template>
        <!-- <Description @register="registerResult" /> -->
      </div>
      <div class="mt-[12px] flex">
        <template v-if="status === '0' || status === '1'">
          <a-button class="mt-25 mr-4" type="primary" v-if="!again" @click="handleAgain"
            >重新下发</a-button
          >
          <a-button class="mt-15 mr-4" v-if="again" @click="again = false">取消</a-button>
          <a-button class="mt-15" type="primary" v-if="again" @click="handleOk">确定</a-button>
        </template>
        <template v-if="status === '1'">
          <a-button class="mt-25" type="primary" v-if="!again" @click="handleAudit"
            >完成审核</a-button
          >
        </template>
      </div>
    </template>
    <!-- 执行人 -->
    <template v-if="identity === '2'">
      <!-- 申请延期 -->
      <div class="mt-[12px]" v-if="apply">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">申请延期</div>
        <BasicForm @register="registerApply" />
      </div>
      <!-- 提交维修结果 -->
      <div class="mt-[12px]" v-if="accept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">维修结果</div>
        <BasicForm @register="registerAccept" />
      </div>
      <!-- 维修结果 -->
      <div v-if="status === '2' || status === '3' || status === '4'">
        <template v-for="(item, index) in repair" :key="item.id">
          <Description
            v-if="!SubmitAccept"
            :bordered="false"
            :column="2"
            :data="item"
            :schema="RepairDetail(index)"
          />
        </template>
        <!-- <Description @register="registerShowResult" /> -->
      </div>
      <!-- 验收结果 -->
      <div class="mt-[12px]" v-if="status === '3' || status === '4'">
        <template v-for="(item, index) in result" :key="item.id">
          <Description :bordered="false" :column="2" :data="item" :schema="ResultDetail(index)" />
        </template>
        <!-- <Description @register="registerRepair" v-if="!SubmitAccept" /> -->
        <!-- <Description @register="registerResult" /> -->
      </div>
      <!-- 提交维修结果 -->
      <div v-if="SubmitAccept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">维修结果</div>
        <BasicForm @register="registerAccept" />
        <!-- <BasicForm @register="registerSubmitAccept" /> -->
      </div>
      <div class="mt-[12px] flex">
        <template v-if="status === '0'">
          <a-button class="mt-45 mr-4" type="primary" v-if="!apply && !accept" @click="handleApply"
            >申请延期</a-button
          >
          <a-button class="mt-45" type="primary" v-if="!apply && !accept" @click="handleAccept"
            >提交验收</a-button
          >
          <a-button class="mr-4" v-if="apply" @click="handleClose">取消</a-button>
          <a-button type="primary" v-if="apply" @click="handleSubmitApply">提交</a-button>
          <!-- <a-button type="primary" v-if="accept" @click="handleSubmitAccept">提交</a-button> -->
        </template>
        <template v-if="status === '3'">
          <a-button class="mt-[12px]" type="primary" v-if="!SubmitAccept" @click="handleAgainSubmit"
            >重新提交</a-button
          >
          <!-- <a-button type="primary" v-if="SubmitAccept" @click="handleSubmitResult">提交</a-button> -->
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
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    WorkDetail,
    getAgainFormSchemas,
    PostponeDetail,
    getPostponeFormSchema,
    RepairDetail,
    ResultDetail,
    getApplyFormSchema,
    getAcceptFormSchema,
    // ShowResultDetail,
    // getSubmitAcceptFormSchema,
  } from '../data';
  import {
    maintainDetailApi,
    maintainAgainApi,
    maintainAuditApi,
    maintainDelayApi,
  } from '/@/api/corrective-maintenance/repair';

  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const isShow = route.query?.isShow as string;
  // const isSbumit = route.query?.isSbumit as string;
  const status = route.query?.status as string;
  const identity = route.query?.identity as string;
  const id = route.query?.id as string;
  const determineId = route.query?.determineId as string;

  const emit = defineEmits(['eventChange']);
  onMounted(() => {
    isShow && (apply.value = true);
    // isSbumit && (SubmitAccept.value = true);
  });

  //工单详情
  const oldEndTime = ref<any>();
  id &&
    maintainDetailApi({ id }).then((res) => {
      infoData.value = res; //工单信息
      postpone.value = res.delay; //延期审核
      repair.value = res.acceptList; //维修结果
      result.value = res.acceptList; //验收结果
      //原截止时间
      oldEndTime.value = res.delay.oldEndTime;
      isShow &&
        setTimeout(() => {
          setFieldsValueApply({
            oldEndTime: oldEndTime.value,
          });
        });
    });

  //执行人
  //申请延期
  const apply = ref<boolean>(false);
  function handleApply() {
    apply.value = true;
    setTimeout(() => {
      setFieldsValueApply({
        oldEndTime: oldEndTime.value,
      });
    });
  }
  //申请延期--提交
  async function handleSubmitApply() {
    await validateApply();
    const obj = getFieldsValueApply();
    obj['determineId'] = determineId;
    maintainDelayApi(obj).then(() => {
      createMessage.success('已提交');
      CloseFun();
    });
  }
  //维修结果
  const accept = ref<boolean>(false);
  function handleAccept() {
    accept.value = true;
    emit('eventChange', false);
  }
  //维修结果--提交
  async function handleSubmitAccept() {
    return new Promise(async (resolve) => {
      await validateResult();
      const obj = getFieldsValueResult();
      obj['determineId'] = determineId;
      resolve(obj);
    });
  }
  //重新提交
  const SubmitAccept = ref<boolean>(false);
  function handleAgainSubmit() {
    SubmitAccept.value = true;
    emit('eventChange', false);
  }

  // //维修结果提交
  // function handleSubmitResult() {
  //   CloseFun();
  // }
  const [
    registerApply,
    {
      validate: validateApply,
      getFieldsValue: getFieldsValueApply,
      setFieldsValue: setFieldsValueApply,
    },
  ] = useForm({
    schemas: getApplyFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 12,
    },
  });

  const [registerAccept, { validate: validateResult, getFieldsValue: getFieldsValueResult }] =
    useForm({
      schemas: getAcceptFormSchema(status), //表单配置
      showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
      // baseColProps: {
      //   span: 24,
      // },
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 12,
      },
    });
  //待验收-维修结果
  // let showResult = ref<any>({});
  // const [registerShowResult] = useDescription({
  //   data: showResult,
  //   schema: ShowResultDetail(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });

  // const [registerSubmitAccept, {}] = useForm({
  //   schemas: getSubmitAcceptFormSchema(), //表单配置
  //   showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
  //   // baseColProps: {
  //   //   span: 24,
  //   // },
  //   // labelWidth: 120,
  //   labelCol: {
  //     span: 2,
  //   },
  //   wrapperCol: {
  //     span: 12,
  //   },
  // });
  //取消
  function handleClose() {
    if (isShow) {
      CloseFun();
    } else {
      apply.value = false;
    }
  }

  //负责人
  //重新下发-提交
  async function handleOk() {
    await validateAgain();
    const obj = getFieldsValueAgain();
    obj['determineId'] = id; //故障id
    //处理部门、处理岗位一个字段
    if (obj['dealStationId'] && obj.hasOwnProperty('dealStationId')) {
      obj['disposeUnitId'] = obj['dealStationId'];
      delete obj['dealStationId'];
    }
    maintainAgainApi(obj).then(() => {
      createMessage.success('已重新下发');
      CloseFun();
    });
  }
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  //延期审核
  async function handleAudit() {
    await validateDelay();
    const obj = getFieldsValueDelay();
    obj['delayId'] = determineId;
    maintainAuditApi(obj).then(() => {
      createMessage.success('已提交审核');
      CloseFun();
    });
  }

  // 工单信息
  let infoData = ref<any>({});
  const [register] = useDescription({
    data: infoData,
    schema: WorkDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });

  // 维修结果
  let repair = ref<any>([]);
  // const [registerRepair] = useDescription({
  //   data: repair,
  //   schema: RepairDetail(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });
  // 验收结果
  let result = ref<any>([]);
  // const [registerResult] = useDescription({
  //   data: result,
  //   schema: ResultDetail(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });
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
  const [registerPostponeFrom, { validate: validateDelay, getFieldsValue: getFieldsValueDelay }] =
    useForm({
      schemas: getPostponeFormSchema(), //表单配置
      showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
      baseColProps: {
        span: 24,
      },
    });

  const [registerFrom, { validate: validateAgain, getFieldsValue: getFieldsValueAgain }] = useForm({
    schemas: getAgainFormSchemas(), //表单配置
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
  defineExpose({
    handleSubmitAccept,
  });
</script>

<style lang="less" scoped></style>
