<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <div>
      <!-- 故障信息 -->
      <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">故障信息</div>
      <Description @register="register" />
      <!-- 故障确认 -->
      <template v-if="troubleStatus !== '0'">
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">故障确认</div>
        <Description
          :bordered="true"
          :column="2"
          :data="faultData"
          :schema="faultschema(troubleDetermine, troubleStatus)"
        />
      </template>
      <!-- 维修结果、验收结果 -->
      <template v-if="troubleStatus === '2' || troubleStatus === '3'">
        <template v-for="(item, index) in resultData" :key="item.id">
          <Description :bordered="false" :column="2" :data="item" :schema="resultschema(index)" />
        </template>
      </template>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { faultDetailSchema, faultschema, resultschema } from '../data';
  import { useRoute } from 'vue-router';
  import { TroubleDetailApi, MaintainDetailApi } from '/@/api/corrective-maintenance/fault';
  const route = useRoute();
  const troubleStatus = route.query.troubleStatus as string;
  const id = route.query.id as string; //故障id
  const workOrderId = route.query.workOrderId as string; //维修工单id
  const troubleDetermine = route.query.troubleDetermine as string;
  const faultData = ref<any>(); //故障确认
  const resultData = ref<any>(); //维修结果、验收结果

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: faultDetailSchema(troubleStatus),
    bordered: true,
    column: 2,
    size: 'default',
    // labelStyle: { width: '180px' },
  });
  //详情
  id &&
    TroubleDetailApi({ id }).then((res) => {
      //故障信息
      data.value = res;
      //故障确认 0:自修、1：委外维修 2：列入检修计划
      faultData.value =
        troubleDetermine === '0'
          ? res.deviceTroubleOneselfVO
          : troubleDetermine === '1'
          ? res.deviceTroubleOutsourceVO
          : res.deviceTroubleOverhaulVO;
      faultData.value['troubleDetermineText'] = res['troubleDetermineText']; //确认结果
    });
  //维修结果、验收结果
  id &&
    MaintainDetailApi({ id: workOrderId }).then((res) => {
      resultData.value = res.acceptList;
    });
</script>

<style lang="less" scoped></style>
