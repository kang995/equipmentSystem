<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <div>
      <div class="absolute right-20 top-10 w-17">
        <img :src="handleStatus(troubleStatus)" alt="" />
      </div>
      <!-- 基本信息 -->
      <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">基本信息</div>
      <!-- <Description @register="register" /> -->
      <Description :bordered="false" :column="3" :data="data" :schema="faultDetailSchema()" />
      <!-- 故障明细 -->
      <div class="font-black text-[#414960] text-[15px] py-[16px]">故障明细</div>
      <Description :bordered="true" :column="2" :data="data" :schema="faultDetailSchemas()" />
      <!-- 故障确认 -->
      <template v-if="troubleStatus !== '0'">
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">故障确认</div>
        <Description
          :bordered="true"
          :column="2"
          :data="faultData"
          :schema="faultschema(troubleDetermine, troubleStatus, handleJump, handleJumps)"
        />
      </template>
      <!-- 维修结果、验收结果 -->
      <template v-if="troubleStatus === '2' || troubleStatus === '3'">
        <template v-for="(item, index) in resultData" :key="item.id">
          <Description :bordered="false" :column="3" :data="item" :schema="resultschema(index)" />
        </template>
      </template>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { Description } from '/@/components/Description';
  import { faultDetailSchemas, faultDetailSchema, faultschema, resultschema } from '../data';
  import { useRoute, useRouter } from 'vue-router';
  import { TroubleDetailApi, MaintainDetailApi } from '/@/api/corrective-maintenance/fault';
  import daiqueren from '/@/assets/images/daiqueren@2x.png';
  import daichuli from '/@/assets/images/daichuli@2x.png';
  import chulizhong from '/@/assets/images/chulizhong@2x.png';
  import yijiejue from '/@/assets/images/yijiejue@2x.png';
  import jianxiu from '/@/assets/images/jianxiu@2x.png';

  const troubleDetermine1: any = ref<any>();
  const troubleStatus1: any = ref<any>();

  const route = useRoute();
  const router = useRouter();
  const troubleStatus = route.query.troubleStatus || (troubleStatus1 as string);
  const id = route.query.id as string; //故障id
  const workOrderId = route.query.workOrderId as string; //维修工单id
  const troubleDetermine = route.query.troubleDetermine || (troubleDetermine1 as string);
  const faultData = ref<any>(); //故障确认
  const resultData = ref<any>(); //维修结果、验收结果

  let data = ref<any>({});
  // const [register] = useDescription({
  //   data,
  //   schema: faultDetailSchema(troubleStatus),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  //   // labelStyle: { width: '180px' },
  // });

  //审核icon
  function handleStatus(status) {
    switch (status) {
      case '0':
        return daiqueren;
      case '1':
        return daichuli;
      case '2':
        return chulizhong;
      case '3':
        return yijiejue;
      case '4':
        return jianxiu;
    }
  }

  //关联检修计划
  function handleJump(record) {
    console.log('record', record);
    router.push({
      name: 'planManagementDetails',
      query: {
        id: record.overhaulPlanId, //检修计划id
        status: '3', //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        mode: '3', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
      },
    });
  }
  //关联检修工单
  function handleJumps(record) {
    console.log('record', record);
    router.push({
      name: 'overhaulDetail',
      query: {
        id: record.overhaulWorkOrderId, //检修工单id
        identity: '1', //负责人：1、执行人：2
        status: '3', //1：待提交；2：审核中；3：审核通过；4：审核拒绝
      },
    });
  }
  //详情
  id &&
    TroubleDetailApi({ id }).then((res) => {
      troubleStatus1.value = res.troubleStatus;
      troubleDetermine1.value = res.troubleDetermine;
      //故障信息
      data.value = res;
      //故障确认 0:自修、1：委外维修 2：列入检修计划
      faultData.value =
        res.troubleDetermine === '0'
          ? res.deviceTroubleOneselfVO
          : res.troubleDetermine === '1'
          ? res.deviceTroubleOutsourceVO
          : res.deviceTroubleOverhaulVO;
      console.log('faultData.value', faultData.value);
      res.troubleDetermineText &&
        (faultData.value['troubleDetermineText'] = res['troubleDetermineText']); //确认结果
    });
  //维修结果、验收结果
  id &&
    troubleDetermine === '0' &&
    MaintainDetailApi({ id: workOrderId }).then((res) => {
      resultData.value = res.acceptList;
    });
</script>

<style lang="less" scoped></style>
