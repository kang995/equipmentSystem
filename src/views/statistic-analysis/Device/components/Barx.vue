<template>
  <div ref="chartRef" :style="{ height: '300px', width }"></div>
</template>

<script lang="ts" setup>
  import { defineEmits, onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';

  const props = defineProps({
    ...basicProps,
    data: {
      default: () => [],
      type: Array,
    },
  });
  const emits = defineEmits(['clickChart']);

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.data,
    (newVal) => {
      setData(newVal);
    },
  );
  onMounted(() => {
    setData(props.data);
    bindingEvent();
  });
  function setData(data) {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#5B8FF9',
          },
        },
      },
      grid: { left: '4%', right: '4%', top: '12%', bottom: '0', containLabel: true },
      seriesLayoutBy: 'column',
      xAxis: {
        type: 'category',
        data: data.map((item: any) => item.showName), //[...new Array(12)].map((_item, index) => `${index + 1}月`),
      },
      yAxis: {
        type: 'value',
        // max: 100,
        // splitNumber: 10,
        // interval: 20,
      },
      series: [
        {
          name: '装置数量',
          data: data.map((item: any) => item.showValue),
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: '#5B8FF9',
          },
        },
      ],
    });
  }

  function bindingEvent() {
    const myChart = getInstance();
    myChart?.on('click', (params) => {
      emits('clickChart', params);
    });
  }
</script>
