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
          let percent = '';
          let value = '';
          toRaw(data).forEach((item) => {
            if (item.showName === name) {
              percent = item.percent;
              value = item.showValue;
            }
          });
          console.log(name, percent);
          return `${name}\xa0\xa0\xa0\xa0\xa0${value}(${percent}%)`;
        },
      },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data.map((x) => {
            return {
              name: x.showName,
              value: x.showValue,
            };
          }),
        },
      ],
    });
  }
</script>

<style lang="less" scoped></style>
