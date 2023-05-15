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
    flag: {
      default: 1,
      type: Number,
    },
    isDistance: {
      default: true,
      type: Boolean,
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
        orient: 'horizontal', //vertical
        left: 'center',
        bottom: '0',
        // right: props.isDistance ? '10' : '-6',
        formatter: (name) => {
          let percent = '';
          let value = '';
          toRaw(data).forEach((item) => {
            if (item.upkeepPlanName === name) {
              percent = item.percent;
              value = item.upkeepPlanCount;
            }
          });
          // console.log(name, percent);
          return `${name}\xa0\xa0\xa0\xa0\xa0${value}(${percent}%)`;
        },
      },
      graphic: [
        {
          type: 'text',
          // left: props.isDistance ? '28%' : '25%',
          left: 'center',
          top: 'center',
          style: {
            text: `${data[1].percent}%${props.flag === 1 ? '返工率' : '延期率'}`,
            fontSize: 20,
            lineHeight: 16,
          },
        },
      ],
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: ['50%', '70%'],
          // center: ['35%', '50%'],
          color: ['#ffaa00', '#5B8FF9'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '20',
          //     fontWeight: 'bold',
          //   },
          // },
          labelLine: {
            show: false,
          },
          data: data.map((x) => {
            return {
              name: x.upkeepPlanName,
              value: x.upkeepPlanCount,
            };
          }),
        },
      ],
    });
  }
</script>

<style lang="less" scoped></style>
