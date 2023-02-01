<template>
  <div :class="`${prefixCls}`">
    <a-card>
      <template #title>
        <div class="w-full flex justify-between">
          <a-select
            v-model:value="optionValue"
            :options="optionList"
            style="width: 120px"
            @change="handleChange"
          />
          <RadioButtonGroup
            :options="options"
            v-model:value="Btnvalue"
            buttonStyle="button"
            @change="getChange"
          />
        </div>
      </template>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card class="h-full">
            <template #title>
              <ChartTitle :titleList="workStatusTitle" />
            </template>
            <div v-if="workStatusData.length > 0">
              <Circle :data="workStatusData" :flag="1" :isDistance="true" />
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
              <Circle :data="acceptanceData" :flag="2" :isDistance="true" />
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
  import { Card, Row, Col, Empty, Select } from 'ant-design-vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import { getOverhaulWorkOrderAndPeopleApi } from '/@/api/statisticalAnalysis/WorkOrder';
  import { TroublePlanListApi } from '/@/api/corrective-maintenance/fault';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const ACard = Card;
  const ARow = Row;
  const ACol = Col;
  const ASelect = Select;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workStatusTitle = ref<any>([{ title: '工单返工率' }]);
  const acceptanceTitle = ref<any>([{ title: '工单延期率' }]);
  const workStatusData = ref<any>([]); // 工单返工率
  const acceptanceData = ref<any>([]); // 工单延期率

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
  //btn
  const Btnvalue = ref<string>('2');
  function getChange(val) {
    Btnvalue.value = val;
    initData();
    const params = userStore.getOverhauling;
    params['threeTimeType'] = Btnvalue.value;
    userStore.setOverhauling(params);
  }
  //选择计划
  function handleChange(ID) {
    optionValue.value = ID;
    initData();
    const params = userStore.getOverhauling;
    params['overhaulPlanId'] = optionValue.value;
    userStore.setOverhauling(params);
  }
  function initData() {
    getOverhaulWorkOrderAndPeopleApi({
      upkeepPlanId: optionValue.value,
      timeType: Btnvalue.value,
    }).then((res) => {
      workStatusData.value = res.workOrderAcceptList; //工单返工率
      acceptanceData.value = res.workOrderPostponeList; //工单延期率
    });
  }
  //检修计划下拉列表
  const optionValue = ref();
  const optionList = ref<any>([]);
  function getOverhaulingList() {
    TroublePlanListApi().then((res) => {
      optionList.value = res.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      optionValue.value = optionList.value[0].value;
      const params = userStore.getOverhauling;
      params['overhaulPlanId'] = optionValue.value;
      userStore.setOverhauling(params);
      // console.log('optionList.value', optionValue.value);
      initData();
    });
  }

  onMounted(() => {
    getOverhaulingList();
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
