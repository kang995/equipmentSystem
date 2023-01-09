<template>
  <div class="px-4">
    <Description @register="register" />
    <!-- <div class="sub-title text-body1 text-14px font-bold mt-6 mb-6">审核信息</div> -->
    <template v-if="(mode === '1' || mode === '3') && (status === '3' || status === '4')">
      <Description
        title="审核信息"
        :column="2"
        :data="dataSource"
        :schema="mode === '1' ? MaintainDetails() : ServiceDetails()"
      />
    </template>
    <!-- class="absolute bottom-0 left-0" -->
    <div>
      <!-- 保养计划管理 -->
      <template v-if="mode === '1'">
        <a-button v-if="status !== '4'" class="m-4" @click="handleBack">取消</a-button>
        <a-button v-if="status === '1'" type="primary" @click="handleSubmit(mode)">提交</a-button>
        <a-button v-if="status === '2'" type="primary" @click="handleRecall(mode)">撤回</a-button>
        <a-button v-if="status === '3'" type="primary" @click="handleStopPlan(mode)"
          >停止计划</a-button
        >
      </template>
      <!-- 保养计划审核 -->
      <template v-if="mode === '2' && status === '2'">
        <a-button class="m-4" @click="handleOpenModel('1')">拒绝</a-button>
        <a-button type="primary" @click="handleOpenModel('2')">同意</a-button>
      </template>
      <!-- 检修计划管理 -->
      <template v-if="mode === '3'">
        <a-button v-if="status !== '4'" class="m-4" @click="handleBack">取消</a-button>
        <a-button v-if="status === '1'" type="primary" @click="handleSubmit(mode)">提交</a-button>
        <a-button v-if="status === '2'" type="primary" @click="handleRecall(mode)">撤回</a-button>
        <a-button v-if="status === '3'" type="primary" @click="handleStopPlan(mode)"
          >停止计划</a-button
        >
      </template>
      <!-- 检修计划审核 -->
      <template v-if="mode === '4' && status === '2'">
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
  import { MaintainDetail, MaintainDetails, ServiceDetails } from './fileld';
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
  const route = useRoute();
  const router = useRouter();
  const status = route.query?.status as string;
  const mode = route.query?.mode as string;
  const id = route.query?.id as string;

  const [planModal, { openModal: openPlanModal }] = useModal();
  const [RecallModal, { openModal: openRecallModal }] = useModal();
  const [registerAgreeModel, { openModal: agreeOpenModal }] = useModal();
  const [registerRejectModel, { openModal: rejectOpenModal }] = useModal();
  let dataSource = ref<any>([]);
  const [register] = useDescription({
    data: dataSource,
    schema: MaintainDetail(status, mode),
    bordered: true,
    column: 2,
    size: 'default',
  });
  // const [registerCheck] = useDescription({
  //   data,
  //   schema: MaintainDetails(status, mode),
  //   bordered: true,
  //   column: 2,
  //   size: 'default',
  // });
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
    // console.log('数据',data);
    (mode === '2' ? getApprovalListApi(data) : ApprovalAuditApi(data)).then(() => {
      message.success('提交成功');
      backFun();
    });
  }
  onMounted(() => {
    id && (mode === '1' || mode === '2') && getMaintainDetail();
    id && (mode === '3' || mode === '4') && getServiceDetail();
  });
  //保养计划管理、保养计划审核详情
  function getMaintainDetail() {
    getPlanDetailApi({ id }).then((res) => {
      dataSource.value = res;
    });
  }
  //保养计划管理、保养计划审核详情
  function getServiceDetail() {
    OverhaulPlanDetailsApi({ id }).then((res) => {
      dataSource.value = res;
    });
  }
</script>

<style lang="less" scoped></style>
