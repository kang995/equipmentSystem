<template>
  <div :class="`${prefixCls}`">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template #title>
            <ChartTitle :titleList="workCount" />
            <div class="flex justify-between">
              <a-year-picker
                v-model:value="selectYear"
                @change="getRankData"
                value-format="YYYY"
                style="width: 120px; margin-right: 10px"
              />
              <RadioButtonGroup
                :options="options"
                v-model:value="Btnvalue"
                buttonStyle="button"
                @change="getChange"
              />
            </div>
          </template>
          <div v-if="specialWorkCount.length > 0">
            <LineBar :data="specialWorkCount" />
          </div>
          <Empty v-else />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card class="h-full">
          <template #title>
            <ChartTitle :titleList="applyTitle" />
            <div class="flex justify-between">
              <a-year-picker
                v-model:value="selectYears"
                @change="getRankDatas"
                value-format="YYYY"
                style="width: 120px; margin-right: 10px"
              />
              <RadioButtonGroup
                :options="options1"
                v-model:value="Btnvalue1"
                buttonStyle="button"
                @change="getChange1"
              />
            </div>
          </template>
          <div v-if="applyData.length > 0">
            <Pie :data="applyData" />
          </div>
          <Empty v-else />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  // import EmptyState from '/@/views/statistic-analysis/components/EmptyState.vue';
  import { onMounted, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ChartTitle from '/@/views/statistic-analysis/components/Title.vue';
  import LineBar from '/@/views/statistic-analysis/WorkOrder/components/LineBar.vue';
  import Pie from '/@/views/statistic-analysis/WorkOrder/components/Pie.vue';
  import { Row, Col, Card, Empty, DatePicker } from 'ant-design-vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import dayjs from 'dayjs';
  import { gettroubleStatsApi, gettroubleStatsModeApi } from '/@/api/statisticalAnalysis/WorkOrder';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const AYearPicker = DatePicker.YearPicker;
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workCount = ref<any>([{ title: '维修工单数量' }]);
  const applyTitle = ref<any>([{ title: '维修方式占比' }]);

  const specialWorkCount = ref<any>([]);
  const applyData = ref<any>([]);

  const options = [
    {
      label: '本周',
      value: '2',
    },
    {
      label: '本月',
      value: '3',
    },
    {
      label: '本季',
      value: '4',
    },
    {
      label: '年度',
      value: '5',
    },
  ];
  const options1 = [
    {
      label: '本周',
      value: '2',
    },
    {
      label: '本月',
      value: '3',
    },
    {
      label: '本季',
      value: '4',
    },
    {
      label: '年度',
      value: '5',
    },
  ];

  onMounted(() => {
    getWorkCount(selectYear.value);
    getWorkCounts(selectYears.value);
  });

  //维修工单数量--btn
  const Btnvalue = ref<string>('2');
  function getChange(val) {
    Btnvalue.value = val;
    getWorkCount(val);
    const params = userStore.getRepair;
    params['oneTimeType'] = Btnvalue.value;
    userStore.setRepair(params);
  }
  //维修工单数量--年度
  const selectYear = ref<string>(dayjs().format('YYYY'));
  function getRankData(val) {
    selectYear.value = val;
    getWorkCount(val);
    const params = userStore.getRepair;
    params['oneTimeType'] = selectYear.value;
    userStore.setRepair(params);
  }
  // 获取维修工单数量
  function getWorkCount(val?) {
    gettroubleStatsApi({ timeType: val }).then((res) => {
      specialWorkCount.value = res;
      // console.log('specialWorkCount', specialWorkCount.value);
    });
  }

  //维修方式数量--btn
  const Btnvalue1 = ref<string>('2');
  function getChange1(val) {
    Btnvalue1.value = val;
    getWorkCounts(val);
    const params = userStore.getRepair;
    params['twoTimeType'] = Btnvalue1.value;
    userStore.setRepair(params);
  }

  //维修方式占比--年度
  const selectYears = ref<string>(dayjs().format('YYYY'));
  function getRankDatas(val) {
    selectYears.value = val;
    getWorkCounts(val);
    const params = userStore.getRepair;
    params['twoTimeType'] = selectYears.value;
    userStore.setRepair(params);
  }

  // 获取维维修方式占比
  function getWorkCounts(val?) {
    gettroubleStatsModeApi({ timeType: val }).then((res) => {
      applyData.value = res;
    });
  }
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

    ::v-deep(.ant-card) {
      height: 100%;
    }

    ::v-deep(.ant-card-head-wrapper) {
      align-items: center;
      padding: 16px;
    }

    ::v-deep(.ant-card-extra) {
      padding: 0;
    }

    ::v-deep(.ant-card-head-title) {
      display: flex;
      justify-content: space-between;
      padding: 0;
    }

    ::v-deep(.ant-card-body) {
      padding: 0 16px 16px 16px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 88%;
    }

    ::v-deep(.ant-card-head) {
      font-size: 14px;
      border-bottom: 0;
      padding: 0;
    }

    ::v-deep(.tsit-enterprise-personnel-box[data-v-b3dd4266]) {
      margin: 0;
      padding: 0 0 16px 0;
    }
  }
</style>
