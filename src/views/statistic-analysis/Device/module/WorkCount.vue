<template>
  <div :class="`${prefixCls}`">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card>
          <template #title>
            <ChartTitle :titleList="workCount" />
            <!-- <div class="flex justify-between">
              <a-select
                v-model:value="optionValue"
                :options="optionList"
                style="width: 120px"
              />
            </div> -->
          </template>
          <div v-if="specialWorkCount.length > 0">
            <LineBar :data="specialWorkCount" />
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
  import LineBar from '/@/views/statistic-analysis/Device/components/LineBar.vue';
  import { Row, Col, Card, Empty } from 'ant-design-vue';
  import { getStatusInfoApi } from '/@/api/statisticalAnalysis/Device';

  // const ASelect = Select;
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const { prefixCls } = useDesign('enterprise-personnel');
  const workCount = ref<any>([{ title: '设备故障分析' }]);
  const specialWorkCount = ref<any>([]);
  // const optionValue = ref('0');
  // const optionList = ref<any>([
  //   {
  //     value: '0',
  //     label: '全部',
  //   },
  //   {
  //     value: '1',
  //     label: 'Lucy',
  //   },
  // ]);
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
  function getWorkCount(val) {
    getStatusInfoApi({ timeType: val }).then((res) => {
      specialWorkCount.value = res.deviceTrouble;
      console.log('specialWorkCount', specialWorkCount.value);
    });
  }

  onMounted(() => {
    getWorkCount(props.year);
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
