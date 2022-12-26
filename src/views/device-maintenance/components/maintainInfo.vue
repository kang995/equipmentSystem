<template>
  <div class="px-15">
    <Description @register="register" />
    <div class="absolute bottom-0 left-0">
      <!-- 保养计划管理 -->
      <template v-if="mode === '1'">
        <a-button v-if="status !== '3'" class="m-4">取消</a-button>
        <a-button v-if="status === '1'" type="primary">提交</a-button>
        <a-button v-if="status === '2'" type="primary">撤回</a-button>
        <a-button v-if="status === '4'" type="primary">停止计划</a-button>
      </template>
      <!-- 保养计划审核 -->
      <template v-if="mode === '2'">
        <a-button class="m-4" @click="handleOpenModel('1')">拒绝</a-button>
        <a-button type="primary" @click="handleOpenModel('2')">同意</a-button>
        <agreeModel @register="registerAgreeModel" />
        <rejectModel @register="registerRejectModel" />
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
  import { ref, onMounted } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { MaintainDetail } from './fileld';
  import { useRoute } from 'vue-router';
  import { getPlanDetailApi } from '/@/api/device-maintenance/index';
  import { useModal } from '/@/components/Modal';
  import agreeModel from '/@/views/device-maintenance/components/agreeModel.vue';
  import rejectModel from '/@/views/device-maintenance/components/rejectModel.vue';
  const route = useRoute();
  const status = route.query?.status as string;
  const mode = route.query?.mode as string;
  const id = route.query?.id as string;

  const [registerAgreeModel, { openModal: agreeOpenModal }] = useModal();
  const [registerRejectModel, { openModal: rejectOpenModal }] = useModal();
  let data = ref<any>([]);
  const [register] = useDescription({
    data,
    schema: MaintainDetail(status, mode),
    bordered: false,
    column: 2,
    size: 'default',
  });
  //拒绝、同意
  function handleOpenModel(val) {
    val === '1' ? rejectOpenModal(true) : agreeOpenModal(true);
  }
  onMounted(() => {
    id && getDetail();
  });
  function getDetail() {
    getPlanDetailApi({ id }).then((res) => {
      data.value = res;
      // console.log('详情', data.value);
    });
    // switch (mode) {
    //   case '1':
    //     getPlanDetailApi({ id }).then((res) => {
    //       data.value = res;
    //       console.log('详情', data.value);
    //     });
    //     break;
    //   case '2':

    //     break;
    //   case '3':
    //     break;
    //   case '4':
    //     break;
    // }
  }
</script>

<style lang="less" scoped></style>
