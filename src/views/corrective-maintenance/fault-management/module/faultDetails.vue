<template>
  <PageWrapper contentBackground>
    <div class="px-10">
      <!-- 故障信息 -->
      <Description @register="register" />
      <!-- 故障确认 -->
      <template v-if="status !== '0'">
        <Description
          :bordered="false"
          :column="2"
          :data="faultData"
          :schema="faultschema(troubleDetermine)"
        />
      </template>
      <!-- 维修结果、验收结果 -->
      <template v-if="status === '2' || status === '3'">
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
  const status = route.query.status as string;
  const id = route.query.id as string;
  const troubleDetermine = route.query.troubleDetermine as string;
  const faultData = ref<any>(); //故障确认
  const resultData = ref<any>(); //维修结果、验收结果

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: faultDetailSchema(status),
    bordered: false,
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
    });
  //维修结果、验收结果
  id &&
    status === '3' &&
    MaintainDetailApi({ id }).then((res) => {
      resultData.value = res.acceptList;
    });
</script>

<style lang="less" scoped></style>
