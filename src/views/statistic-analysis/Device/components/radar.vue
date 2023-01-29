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
      tooltip: {},
      // legend: {
      //   orient: 'vertical',
      //   top: 'center',
      //   right: '25',
      //   formatter: (name) => {
      //     let percent = '';
      //     let value = '';
      //     toRaw(data).forEach((item) => {
      //       if (item.showName === name) {
      //         percent = item.percent;
      //         value = item.showValue;
      //       }
      //     });
      //     console.log(name, percent);
      //     return `${name}\xa0\xa0\xa0\xa0\xa0${value}(${percent}%)`;
      //   },
      // },
      // legend: {
      //   bottom: 0,
      //   data:data.map((x) => {
      //     return {
      //       name: x.showName,
      //     };
      //   }),
      // },
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: data.map((x) => {
          return {
            name: x.showName,
            // value: x.showValue,
          };
        }),
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
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
