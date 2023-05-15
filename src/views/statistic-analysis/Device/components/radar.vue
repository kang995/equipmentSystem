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
      // legend: {
      //   orient: 'horizontal',//vertical
      //   left:'center',
      //   bottom: '0',
      //   data: data.map((x) => {
      //     return {
      //       name: x.showName,
      //     };
      //   })
      // },
      radar: {
        // radius: '60%',
        // splitNumber: 8,
        indicator: data.map((x) => {
          return {
            name: x.showName,
          };
        }),
      },
      series: [
        {
          type: 'radar',
          // symbolSize: 0,
          areaStyle: {
            // shadowBlur: 0,
            // shadowColor: 'rgba(0,0,0,.2)',
            // shadowOffsetX: 20,
            // shadowOffsetY: 10,
            // opacity: 1,
          },
          data: data.map((x) => {
            return {
              name: x.showName,
              value: x.showValue,
            };
          }),
          // data: [
          //   {
          //     value: [90, 50, 86, 40, 50, 20],
          //     name: 'Visits',
          //     itemStyle: {
          //       color: '#9f8ed7',
          //     },
          //   },
          //   {
          //     value: [70, 75, 70, 76, 20, 85],
          //     name: 'Sales',
          //     itemStyle: {
          //       color: '#1edec5',
          //     },
          //   },
          // ],
        },
      ],
    });
  }
</script>

<style lang="less" scoped></style>
