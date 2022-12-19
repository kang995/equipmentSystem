<template>
  <div>
    <div ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { toRefs } from '@vueuse/core';
  import { ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  const { width, height } = toRefs(props);

  const chartRef = ref<HTMLDivElement | null>(null);

  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  setOptions({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['保养', '维修', '检修'],
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '3%',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '保养',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '维修',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '检修',
        type: 'line',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  });
</script>
<style lang="less" scoped>
  .flex-spane {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }

  ::v-deep(.ant-card-body) {
    padding: 16px;
  }
</style>
