<template>
  <div class="px-15">
    <Description @register="register" />
    <!-- <div class="sub-title text-body1 text-14px font-bold mt-6 mb-6">审核信息</div> -->
    <template v-if="mode === '1' && (status === '3' || status === '4')">
      <Description title="审核信息" :column="2" :data="data" :schema="MaintainDetails()" />
    </template>
    <!-- class="absolute bottom-0 left-0" -->
    <div>
      <!-- 保养计划管理 -->
      <template v-if="mode === '1'">
        <a-button v-if="status !== '4'" class="m-4" @click="handleBack">取消</a-button>
        <a-button v-if="status === '1'" type="primary" @click="handleSubmit">提交</a-button>
        <a-button v-if="status === '2'" type="primary" @click="handleRecall">撤回</a-button>
        <a-button v-if="status === '3'" type="primary" @click="handleStopPlan">停止计划</a-button>
        <!-- 撤回 -->
        <recallModel @register="RecallModal" @recall-event="handleRecallEvent" />
        <!-- 停止计划 -->
        <planModel @register="planModal" @plan-event="handlePlanEvent" />
      </template>
      <!-- 保养计划审核 -->
      <template v-if="mode === '2' && status === '2'">
        <a-button class="m-4" @click="handleOpenModel('1')">拒绝</a-button>
        <a-button type="primary" @click="handleOpenModel('2')">同意</a-button>
        <agreeModel @register="registerAgreeModel" @event="handleApproval" />
        <rejectModel @register="registerRejectModel" @event="handleApproval" />
      </template>
      <!-- 检修计划管理 -->
      <template v-if="mode === '3'">
        <a-button v-if="status !== '3'" class="m-4">取消</a-button>
        <a-button v-if="status === '1'" type="primary">提交</a-button>
        <a-button v-if="status === '2'" type="primary">撤回</a-button>
        <a-button v-if="status === '4'" type="primary">停止计划</a-button>
      </template>
      <!-- 检修计划审核 -->
      <template v-if="mode === '4'">
        <a-button class="m-4">拒绝</a-button>
        <a-button type="primary">同意</a-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Modal, message } from 'ant-design-vue';
  import { ref, createVNode, onMounted } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { MaintainDetail, MaintainDetails } from './fileld';
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
  const route = useRoute();
  const router = useRouter();
  const status = route.query?.status as string;
  const mode = route.query?.mode as string;
  const id = route.query?.id as string;

  const [planModal, { openModal: openPlanModal }] = useModal();
  const [RecallModal, { openModal: openRecallModal }] = useModal();
  const [registerAgreeModel, { openModal: agreeOpenModal }] = useModal();
  const [registerRejectModel, { openModal: rejectOpenModal }] = useModal();
  let data = ref<any>([]);
  const [register] = useDescription({
    data,
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
  function handleSubmit() {
    Modal.confirm({
      title: '保养计划提交',
      content: createVNode('span', { style: 'color:black;' }, '确认要提交保养计划？'),
      centered: true,
      onOk() {
        submitListApi({ id }).then(() => {
          message.success('提交成功');
          backFun();
        });
      },
    });
  }
  //保养计划管理-撤回
  function handleRecall() {
    openRecallModal(true, {
      id,
      title: '保养计划撤回',
      // isFlag: '1',
    });
  }
  //撤回-提交
  function handleRecallEvent(data) {
    rebackListApi(data)
      .then(() => {
        message.success('撤回成功');
        backFun();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //停止计划
  function handleStopPlan() {
    openPlanModal(true, {
      id,
      title: '保养计划停止',
      // isShow: '1',
    });
  }
  //停止计划-确定
  function handlePlanEvent(data) {
    stopPlanListApi(data)
      .then(() => {
        message.success('停止计划成功');
        backFun();
      })
      .catch((err) => {
        console.log(err);
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
    getApprovalListApi(data).then(() => {
      message.success('提交成功');
      backFun();
    });
  }
  onMounted(() => {
    id && getDetail();
  });
  function getDetail() {
    getPlanDetailApi({ id }).then((res) => {
      data.value = res;
    });
  }
</script>

<style lang="less" scoped></style>
