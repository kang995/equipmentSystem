<template>
  <div ref="chartRef" :style="{ height: '300px', width }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';

  const props = defineProps({
    ...basicProps,
    data: {
      default: () => [],
      type: Array,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.data,
    (newVal) => {
      setData(newVal);
    },
  );
  onMounted(() => {
    setData(props.data);
  });

  function setData(data) {
    setOptions({
      tooltip: {
        trigger: 'axis',
      },
      // legend: {
      //   data: ['机械设备', '特种设备'],
      // },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((x) => x.showName),
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '保养工单',
          type: 'line',
          data: data.map((x) => x.showValue),
        },
      ],
    });
  }
</script>

<style lang="less" scoped></style>
