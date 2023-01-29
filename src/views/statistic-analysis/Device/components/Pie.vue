<template>
  <div ref="chartRef" :style="{ height: '300px', width }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, Ref, toRaw, watch } from 'vue';
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
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        right: '25',
        formatter: (name) => {
          let percent = null;
          let value = null;
          toRaw(data).forEach((item) => {
            if (item.showName === name) {
              percent = item.percent;
              value = item.showValue;
            }
          });
          if (percent || percent === 0) {
            return `${name}\xa0\xa0\xa0\xa0\xa0${value}(${percent}%)`;
          } else {
            return `${name}\xa0\xa0\xa0\xa0\xa0数量：${value}`;
          }
        },
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['30%', '50%'],
          data: data.map((x) => {
            return {
              name: x.showName,
              value: x.showValue,
            };
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  }
</script>

<style lang="less" scoped></style>
