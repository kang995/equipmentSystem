<template>
  <div class="px-4">
    <div class="absolute right-12 top-20 w-17">
      <img :src="handleStatus(AuditStatus)" alt="" />
    </div>
    <!-- 审核信息 -->
    <template v-if="status === '3' || status === '4'">
      <div
        :class="[
          'w-full',
          'px-4',
          'rounded-md',
          status === '3' ? 'bg-[rgba(0,186,124,0.1)]' : 'bg-[rgba(255,91,86,0.1)]',
        ]"
      >
        <div class="font-black text-[#414960] text-[15px] py-[16px]">审核信息</div>
        <Description
          :bordered="false"
          :column="1"
          :data="dataSource"
          :schema="mode === '1' ? MaintainDetails() : ServiceDetails()"
        />
      </div>
    </template>
    <!-- 详情 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">基本信息</div>
    <Description
      :bordered="false"
      :column="3"
      :data="dataSource"
      :schema="infoDetails(status, mode)"
    />
    <div class="font-black text-[#414960] text-[15px] py-[16px]">计划明细</div>
    <Description @register="register" />
    <!-- class="absolute bottom-0 left-0" -->
    <div>
      <!-- 保养计划管理 -->
      <template v-if="mode === '1'">
        <a-button v-if="status !== '4'" class="m-4" @click="handleBack">取消</a-button>
        <a-button v-if="status === '1'" type="primary" @click="handleSubmit(mode)">提交</a-button>
        <a-button v-if="status === '2'" type="primary" @click="handleRecall(mode)">撤回</a-button>
        <a-button
          v-if="status === '3' && planStatus !== '3'"
          type="primary"
          @click="handleStopPlan(mode)"
          >停止计划</a-button
        >
      </template>
      <!-- 保养计划审核 -->
      <template v-if="mode === '2' && approvalButtonShow">
        <a-button class="m-4" @click="handleOpenModel('1')">拒绝</a-button>
        <a-button type="primary" @click="handleOpenModel('2')">同意</a-button>
      </template>
      <!-- 检修计划管理 -->
      <template v-if="mode === '3'">
        <a-button v-if="status !== '4'" class="m-4" @click="handleBack">取消</a-button>
        <a-button v-if="status === '1'" type="primary" @click="handleSubmit(mode)">提交</a-button>
        <a-button v-if="status === '2'" type="primary" @click="handleRecall(mode)">撤回</a-button>
        <a-button
          v-if="status === '3' && planStatus !== '3'"
          type="primary"
          @click="handleStopPlan(mode)"
          >停止计划</a-button
        >
      </template>
      <!-- 检修计划审核 -->
      <template v-if="mode === '4' && approvalButtonShow">
        <a-button class="m-4" @click="handleOpenModel('1')">拒绝</a-button>
        <a-button type="primary" @click="handleOpenModel('2')">同意</a-button>
      </template>
    </div>
    <!-- 撤回 -->
    <recallModel @register="RecallModal" @recall-event="handleRecallEvent" />
    <!-- 停止计划 -->
    <planModel @register="planModal" @plan-event="handlePlanEvent" />
    <!-- 审核（同意） -->
    <agreeModel @register="registerAgreeModel" @event="handleApproval" />
    <!-- 审核（拒绝） -->
    <rejectModel @register="registerRejectModel" @event="handleApproval" />
  </div>
</template>

<script setup lang="ts">
  import { Modal, message } from 'ant-design-vue';
  import { ref, createVNode, onMounted } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { infoDetails, MaintainDetail, MaintainDetails, ServiceDetails } from './fileld';
  import { useRoute, useRouter } from 'vue-router';
  import { getPlanDetailApi } from '/@/api/device-maintenance/index';
  import { useModal } from '/@/components/Modal';
  import agreeModel from '/@/views/device-maintenance/components/agreeModel.vue';
  import rejectModel from '/@/views/device-maintenance/components/rejectModel.vue';
  import recallModel from '/@/views/device-maintenance/components/recallModel.vue';
  import planModel from '/@/views/device-maintenance/components/stopPlanModel.vue';
  import {
    submitListApi,
    rebackListApi,
    stopPlanListApi,
    getApprovalListApi,
  } from '/@/api/device-maintenance/index';
  import {
    OverhaulPlanDetailsApi,
    OverhaulSubmitApi,
    OverhaulWithDrawApi,
    OverhaulStopPlanApi,
    ApprovalAuditApi,
  } from '/@/api/device-service/index';
  import shenhejujue from '/@/assets/images/shenhejujue@2x.png';
  import shenhetongguo from '/@/assets/images/shenhetongguo@2x.png';
  import shenhezhong from '/@/assets/images/shenhezhong@2x.png';
  import weitijiao from '/@/assets/images/weitijiao@2x.png';

  const AuditStatus: any = ref<any>();
  const planStatus1: any = ref<any>();
  const route = useRoute();
  const router = useRouter();
  const status = route.query?.status || (AuditStatus as string);
  let mode = route.query?.mode as string;
  const id = route.query?.id as string;
  const planStatus = route.query?.planStatus || (planStatus1 as string);

  const emit = defineEmits(['planEnent']);
  const [planModal, { openModal: openPlanModal }] = useModal();
  const [RecallModal, { openModal: openRecallModal }] = useModal();
  const [registerAgreeModel, { openModal: agreeOpenModal, setModalProps: setModalAgreeProps }] =
    useModal();
  const [registerRejectModel, { openModal: rejectOpenModal, setModalProps: setModalRejectProps }] =
    useModal();
  let dataSource = ref<any>([]);

  //三方跳转时判断mode
  if (!mode) {
    //mode--保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
    let url = window.location.href;
    if (url.includes('plan-details')) {
      //保养计划管理详情
      mode = '1';
    } else if (url.includes('maintain-details')) {
      //保养计划审核详情
      mode = '2';
    } else if (url.includes('planManagement-details')) {
      //检修计划管理详情
      mode = '3';
    } else if (url.includes('planAudit-details')) {
      //检修计划审核详情
      mode = '4';
    }
  }

  const [register] = useDescription({
    data: dataSource,
    schema: MaintainDetail(status, mode),
    bordered: true,
    column: 2,
    size: 'default',
  });
  //审核icon
  function handleStatus(status) {
    switch (status) {
      case '1':
        return weitijiao;
      case '2':
        return shenhezhong;
      case '3':
        return shenhetongguo;
      case '4':
        return shenhejujue;
    }
  }

  function backFun() {
    router.go(-1);
  }
  //保养计划管理-取消
  function handleBack() {
    backFun();
  }
  //保养计划管理-提交
  function handleSubmit(mode: string) {
    Modal.confirm({
      title: mode === '1' ? '保养计划提交' : '检修计划提交',
      content: createVNode(
        'span',
        { style: 'color:black;' },
        mode === '1' ? '确认要提交保养计划？' : '确认要提交检修计划？',
      ),
      centered: true,
      onOk() {
        (mode === '1' ? submitListApi({ id }) : OverhaulSubmitApi({ id })).then(() => {
          message.success('提交成功');
          backFun();
        });
      },
    });
  }
  //保养计划管理-撤回
  function handleRecall(mode: string) {
    openRecallModal(true, {
      id,
      title: mode === '1' ? '保养计划撤回' : '检修计划撤回',
      // isFlag: '1',
    });
  }
  //撤回-提交
  function handleRecallEvent(data) {
    (mode === '1' ? rebackListApi(data) : OverhaulWithDrawApi(data))
      .then(() => {
        message.success('撤回成功');
        backFun();
      })
      .finally(() => {
        openRecallModal(false);
      });
  }

  //停止计划
  function handleStopPlan(mode: string) {
    openPlanModal(true, {
      id,
      title: mode === '1' ? '保养计划停止' : '检修计划停止',
      // isShow: '1',
    });
  }
  //停止计划-确定
  function handlePlanEvent(data) {
    (mode === '1' ? stopPlanListApi(data) : OverhaulStopPlanApi(data))
      .then(() => {
        message.success('停止计划成功');
        backFun();
      })
      .finally(() => {
        openPlanModal(false);
      });
  }

  //拒绝、同意
  function handleOpenModel(val) {
    val === '1'
      ? rejectOpenModal(true, { id, approvalResult: '1' })
      : agreeOpenModal(true, { id, approvalResult: '0' });
  }
  //拒绝、同意-提交
  function handleApproval(data) {
    setModalAgreeProps({ confirmLoading: true });
    setModalRejectProps({ confirmLoading: true });
    (mode === '2' ? getApprovalListApi(data) : ApprovalAuditApi(data))
      .then(() => {
        message.success('提交成功');
        backFun();
      })
      .finally(() => {
        setModalAgreeProps({ confirmLoading: false });
        setModalRejectProps({ confirmLoading: false });
      });
  }
  onMounted(() => {
    id && (mode === '1' || mode === '2') && getMaintainDetail();
    id && (mode === '3' || mode === '4') && getServiceDetail();
  });

  const approvalButtonShow = ref<any>();
  //保养计划管理、保养计划审核详情
  function getMaintainDetail() {
    getPlanDetailApi({ id }).then((res) => {
      dataSource.value = res;
      // 审核状态（1：待提交；2：审核中；3：审核通过；4：审核拒绝）
      AuditStatus.value = res.approvalStatus;
      approvalButtonShow.value = res.approvalButtonShow;
      planStatus1.value = res.planStatus;
      emit('planEnent', res.fullSubmitId);
    });
  }
  //检修计划管理、检修计划审核详情
  function getServiceDetail() {
    OverhaulPlanDetailsApi({ id }).then((res) => {
      dataSource.value = res;
      // 审核状态（1：待提交；2：审核中；3：审核通过；4：审核拒绝）
      AuditStatus.value = res.approvalStatus;
      approvalButtonShow.value = res.approvalButtonShow;
      planStatus1.value = res.planStatus;
      emit('planEnent', res.fullSubmitId);
    });
  }
</script>

<style lang="less" scoped></style>
