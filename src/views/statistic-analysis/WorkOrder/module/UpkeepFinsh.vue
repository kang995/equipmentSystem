<template>
  <div :class="`${prefixCls}`">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template #title>
            <ChartTitle :titleList="workCount" />
            <div class="flex justify-between">
              <a-select
                v-model:value="optionValue"
                :options="optionList"
                style="width: 120px"
                @change="handleChange"
                :allowClear="false"
                :show-search="true"
                option-filter-prop="label"
              />
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
  import {
    getUpkeepCompleteApi,
    getUpkeepProportionApi,
  } from '/@/api/statisticalAnalysis/WorkOrder';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
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

  const optionValue = ref(null);
  const optionList = ref<any>([
    {
      value: null,
      label: '全部',
    },
    {
      value: '2',
      label: '已完成',
    },
    {
      value: '1',
      label: '未完成',
    },
  ]);
  //保养类型完成情况搜索
  function handleChange(val) {
    getWorkCount(val);
    const params = userStore.getUpkeep;
    params['planStatus'] = optionValue.value;
    userStore.setUpkeep(params);
  }
  // 保养类型完成情况
  function getWorkCount(val?) {
    getUpkeepCompleteApi({ planStatus: val ? val : null }).then((res) => {
      specialWorkCount.value = res;
      console.log('specialWorkCount.value', specialWorkCount.value);
    });
  }
  //保养类型占比
  function getWorkCounts() {
    getUpkeepProportionApi().then((res) => {
      applyData.value = res;
      console.log('applyData.value', applyData.value);
    });
  }

  onMounted(() => {
    getWorkCount();
    getWorkCounts();
    const params = userStore.getUpkeep;
    params['planStatus'] = optionValue.value;
    userStore.setUpkeep(params);
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
