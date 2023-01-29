<template>
  <div :class="`${prefixCls}`">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card>
          <template #title>
            <ChartTitle :titleList="workCount" />
            <div class="flex justify-between items-center">
              <span>区域：</span>
              <a-select
                v-model:value="optionValue"
                :options="optionList"
                style="width: 120px"
                @change="handleChange"
              />
              <SwitchChartTable
                :class="`${prefixCls}-charts-div`"
                v-model:value="state"
                @change="
                  (val) => {
                    handleChartTable(val);
                  }
                "
              />
            </div>
          </template>
          <div v-if="specialWorkCount.length > 0">
            <Barx v-if="state === 'chart'" :data="specialWorkCount" />
            <Pie v-else :data="specialWorkCount" />
          </div>
          <Empty v-else />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  // import EmptyState from '/@/views/statistic-analysis/components/EmptyState.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ChartTitle from '/@/views/statistic-analysis/components/Title.vue';
  import Barx from '/@/views/statistic-analysis/Device/components/Barx.vue';
  import Pie from '/@/views/statistic-analysis/Device/components/Pie.vue';
  import { Row, Col, Card, Empty, Select } from 'ant-design-vue';
  import { SwitchChartTable } from '/@/components/Form';
  import { getDistrictApi } from '/@/api/statisticalAnalysis/Device';
  import { postDistrictSelectApi } from '/@/api/device-management/installation';

  const ASelect = Select;
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workCount = ref<any>([{ title: '装置设施数量统计' }]);
  const specialWorkCount = ref<any>([]);
  const state = ref<string>('chart');
  const optionValue = ref('');
  const optionList = ref<any>([]);

  const props = defineProps({
    year: {
      default: () => '',
      type: String,
    },
  });
  watch(
    () => props.year,
    (newVal) => {
      getWorkCount(newVal);
    },
  );

  // 获取工作许可数量统计
  function getWorkCount(val?) {
    getDistrictApi({
      timeType: val,
      districtId: optionValue.value ? optionValue.value : null,
    }).then((res) => {
      specialWorkCount.value = res;
    });
  }
  //区域搜索
  function handleChange() {
    getWorkCount();
  }
  //区域下拉
  function getDistrictList() {
    postDistrictSelectApi({}).then((res) => {
      optionList.value = res.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      optionList.value.unshift({
        value: '',
        label: '全部',
      });
      console.log('optionList1111', optionList.value);
    });
  }

  //切换图标
  function handleChartTable(val) {
    state.value = val;
  }

  onMounted(() => {
    getWorkCount(props.year);
    getDistrictList();
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
