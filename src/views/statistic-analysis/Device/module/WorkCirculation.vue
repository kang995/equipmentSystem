<template>
  <div :class="`${prefixCls}`">
    <a-card>
      <a-row :gutter="16" class="pt-8">
        <a-col :span="12">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="workLiveTitle" />
            </template>
            <div v-if="workLiveData.length > 0">
              <radar :data="workLiveData" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="applyTitle" />
            </template>
            <div v-if="applyData.length > 0">
              <Pie :data="applyData" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="workStatusTitle" />
            </template>
            <div v-if="workStatusData.length > 0">
              <Circle :data="workStatusData" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="acceptanceTitle" />
            </template>
            <div v-if="acceptanceData.length > 0">
              <Pie :data="acceptanceData" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  // import EmptyState from '/@/views/statistic-analysis/components/EmptyState.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ChartTitle from '/@/views/statistic-analysis/components/Title.vue';
  import Pie from '/@/views/statistic-analysis/Device/components/Pie.vue';
  import Circle from '/@/views/statistic-analysis/Device/components/Circle.vue';
  import radar from '/@/views/statistic-analysis/Device/components/radar.vue';
  import { Card, Row, Col, Empty } from 'ant-design-vue';
  import { getStatusInfoApi } from '/@/api/statisticalAnalysis/Device';

  const ACard = Card;
  const ARow = Row;
  const ACol = Col;

  const { prefixCls } = useDesign('enterprise-personnel');
  const workLiveTitle = ref<any>([{ title: '设备故障类型' }]);
  const applyTitle = ref<any>([{ title: '保养类型占比' }]);
  const workStatusTitle = ref<any>([{ title: '设备类型占比' }]);
  const acceptanceTitle = ref<any>([{ title: '设备性质占比' }]);

  const workLiveData = ref<any>([]); //设备故障类型
  const applyData = ref<any>([]); //保养类型占比
  const workStatusData = ref<any>([]); // 设备类型占比
  const acceptanceData = ref<any>([]); // 设备性质占比

  const props = defineProps({
    year: {
      default: () => '',
      type: String,
    },
  });
  watch(
    () => props.year,
    (newVal) => {
      initData(newVal);
    },
  );

  function initData(val) {
    getStatusInfoApi({ timeType: val }).then((res) => {
      workLiveData.value = res.deviceTroubleType; //设备故障类型统计
      applyData.value = res.deviceMaintain; //	设备维修情况统计
      workStatusData.value = res.deviceType; //设备类型占比
      acceptanceData.value = res.deviceNature; //	设备性质占比
      //重组结构
      let newArr = workLiveData.value.map((item) => {
        return {
          showName: item.showName,
          showValue: workLiveData.value.map((x) => x.showValue),
        };
      });
      workLiveData.value = newArr;
      // console.log('数组',workLiveData.value)
    });
  }
  onMounted(() => {
    initData(props.year);
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-enterprise-personnel';
  .@{prefix-cls} {
    @media (max-width: 1882px) {
      .special-work {
        ::v-deep(.ant-card-head-wrapper) {
          display: block;
          flex-wrap: wrap;
        }

        ::v-deep(.ant-card-extra) {
          float: none;
          padding-top: 0;
          padding-left: 10px;
        }
      }
    }

    ::v-deep(.ant-card-extra) {
      padding: 0;
    }

    ::v-deep(.ant-card-head) {
      font-size: 14px;
      border-bottom: 0;
      padding: 0;
    }

    ::v-deep(.ant-card-body) {
      padding: 0 16px 16px 16px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 88%;
    }

    ::v-deep(.ant-card-head-title) {
      display: flex;
      justify-content: space-between;
      padding: 16px;
    }

    ::v-deep(.ant-col-12) {
      margin-bottom: 16px;
    }
  }
</style>
