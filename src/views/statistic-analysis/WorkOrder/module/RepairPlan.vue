<template>
  <div :class="`${prefixCls}`">
    <a-card>
      <template #title>
        <div class="w-full flex justify-between">
          <!-- <a-select
            v-model:value="optionValue"
            :options="optionList"
            style="width: 120px"
            @change="handleChange"
          /> -->
          <RadioButtonGroup
            :options="options"
            v-model:value="Btnvalue"
            buttonStyle="button"
            @change="getChange"
          />
        </div>
      </template>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="workStatusTitle" />
            </template>
            <div v-if="workStatusData.length > 0">
              <Circle :data="workStatusData" :flag="1" :isDistance="false" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="acceptanceTitle" />
            </template>
            <div v-if="acceptanceData.length > 0">
              <Circle :data="acceptanceData" :flag="2" :isDistance="false" />
            </div>
            <Empty v-else />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="faultTitle" />
            </template>
            <div v-if="applyData.length > 0">
              <Pie :data="applyData" />
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
  import { onMounted, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ChartTitle from '/@/views/statistic-analysis/components/Title.vue';
  import Circle from '/@/views/statistic-analysis/WorkOrder/components/Circle.vue';
  import Pie from '/@/views/statistic-analysis/WorkOrder/components/Pie.vue';
  import { Card, Row, Col, Empty } from 'ant-design-vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import { gettroubleStatsFunctionApi } from '/@/api/statisticalAnalysis/WorkOrder';

  const ACard = Card;
  const ARow = Row;
  const ACol = Col;
  // const ASelect = Select;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workStatusTitle = ref<any>([{ title: '工单返工率' }]);
  const acceptanceTitle = ref<any>([{ title: '工单延期率' }]);
  const faultTitle = ref<any>([{ title: '故障等级占比' }]);
  const workStatusData = ref<any>([]); // 工单返工率
  const acceptanceData = ref<any>([]); // 工单延期率
  const applyData = ref<any>([]); //故障等级占比

  // const optionValue = ref('0');
  // const optionList = ref<any>([
  //   {
  //     value: '0',
  //     label: '计划1',
  //   },
  //   {
  //     value: '1',
  //     label: '计划2',
  //   },
  // ]);
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
  //选择计划
  // function handleChange() {
  //   initData();
  // }
  //btn
  const Btnvalue = ref<string>('2');
  function getChange(val) {
    Btnvalue.value = val;
    initData(val);
  }
  function initData(val?) {
    gettroubleStatsFunctionApi({ timeType: val }).then((res) => {
      workStatusData.value = res.workOrderAcceptList; //工单返工率
      acceptanceData.value = res.workOrderPostponeList; //工单延期率
      //故障等级占比
      res.failureLeveList.map((item) => {
        item['typeName'] = item.upkeepPlanName;
        item['typeCount'] = item.upkeepPlanCount;
      });
      applyData.value = res.failureLeveList;
    });
    // workStatusData.value = [
    //   { showName: '返工', showValue: 10, percent: 20 },
    //   { showName: '一次通过', showValue: 40, percent: 60 },
    // ];
    // acceptanceData.value = [
    //   { showName: '延期', showValue: 40, percent: 40 },
    //   { showName: '正常', showValue: 60, percent: 60 },
    // ];
    // applyData.value = [
    //   { showName: '四级', showValue: 10, percent: 20 },
    //   { showName: '三级', showValue: 20, percent: 50 },
    //   { showName: '二级', showValue: 10, percent: 10 },
    //   { showName: '一级', showValue: 20, percent: 60 },
    // ];
  }
  onMounted(() => {
    initData(Btnvalue.value);
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
