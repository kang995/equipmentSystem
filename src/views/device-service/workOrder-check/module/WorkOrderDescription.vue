<template>
  <div>
    <!-- 工单信息 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">工单信息</div>
    <Description
      :column="3"
      :bordered="false"
      :data="infoData"
      :schema="WorkDetail(handleRouteDetails)"
    />
    <!-- 检修明细 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">检修明细</div>
    <Description :column="2" :bordered="true" :data="infoData" :schema="WorkDetails()" />
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Description } from '/@/components/Description';
  import { WorkDetails, WorkDetail } from '/@/views/device-service/service-workOrder/data';
  // import { workOrderlSchema } from '../data';

  const router = useRouter();
  const props = defineProps<{
    infoData?: any;
  }>();

  const handleRouteDetails = () => {
    router.push({
      name: 'planManagementDetails',
      query: {
        status: props.infoData.approvalStatus, //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        // status: '4', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
        mode: '3', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
        id: props.infoData.overhaulPlanId,
      },
    });
  };
</script>

<style lang="less" scoped></style>
