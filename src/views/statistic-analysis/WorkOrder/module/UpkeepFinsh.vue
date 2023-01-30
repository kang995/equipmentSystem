<template>
  <div :class="`${prefixCls}`">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template #title>
            <ChartTitle :titleList="workCount" />
            <div class="flex justify-between">
              <a-select v-model:value="optionValue" :options="optionList" style="width: 120px" />
            </div>
          </template>
          <div v-if="specialWorkCount.length > 0">
            <Barx :data="specialWorkCount" />
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
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ChartTitle from '/@/views/statistic-analysis/components/Title.vue';
  import Barx from '/@/views/statistic-analysis/WorkOrder/components/Barx.vue';
  import Pie from '/@/views/statistic-analysis/WorkOrder/components/Pie.vue';
  import { Row, Col, Card, Empty, Select } from 'ant-design-vue';
  // import { getTroubleApi } from '/@/api/statisticalAnalysis/Device';
  // import { getDictionarySelectTypeApi } from '/@/api/device-maintenance/index';

  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const ASelect = Select;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workCount = ref<any>([{ title: '保养类型完成情况' }]);
  const applyTitle = ref<any>([{ title: '保养类型占比' }]);

  const specialWorkCount = ref<any>([]);
  const applyData = ref<any>([]);
  // const optionValue = ref('');
  // const optionList = ref<any>([]);

  const optionValue = ref('');
  const optionList = ref<any>([
    {
      value: '',
      label: '全部',
    },
    {
      value: '0',
      label: '已完成',
    },
    {
      value: '1',
      label: '未完成',
    },
  ]);

  // 获取工作许可数量统计
  function getWorkCount() {
    // getTroubleApi({
    //   timeType: val,
    //   deviceType: optionValue.value,
    // }).then((res) => {
    //   specialWorkCount.value = res;
    // });
    specialWorkCount.value = [
      { showName: '清洁', showValue: 1 },
      { showName: '润滑', showValue: 5 },
      { showName: '调教', showValue: 10 },
      { showName: '紧固', showValue: 12 },
      { showName: '防腐', showValue: 20 },
    ];
    applyData.value = [
      { showName: '清洁', showValue: 10, percent: 20 },
      { showName: '润滑', showValue: 20, percent: 40 },
      { showName: '调教', showValue: 30, percent: 50 },
      { showName: '紧固', showValue: 40, percent: 70 },
      { showName: '防腐', showValue: 60, percent: 80 },
    ];
  }

  onMounted(() => {
    getWorkCount();
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
