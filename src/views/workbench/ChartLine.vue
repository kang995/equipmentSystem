<template>
  <div>
    <div ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { toRefs } from '@vueuse/core';
  import { ref, Ref, watch, onMounted } from 'vue';
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
    lineList: {
      default: () => [],
      type: Array,
    },
  });

  const { width, height } = toRefs(props);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.lineList,
    (newVal) => {
      setData(newVal);
    },
  );
  onMounted(() => {
    setData(props.lineList);
  });

  function setData(data) {
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
        data: data.map((x) => x.itemDate),
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '保养',
          type: 'line',
          data: data.map((x) => x.maintainCount),
        },
        {
          name: '维修',
          type: 'line',
          data: data.map((x) => x.serviceCount),
        },
        {
          name: '检修',
          type: 'line',
          data: data.map((x) => x.overhaulCount),
        },
      ],
    });
  }
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
