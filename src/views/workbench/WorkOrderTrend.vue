<template>
  <div>
    <Card>
      <Title :titleList="titleList">
        <template #QueryBtn>
          <RadioButtonGroup
            :options="options"
            v-model:value="Btnvalue"
            buttonStyle="button"
            @change="getChange"
          /> </template
      ></Title>
      <ChartLine :lineList="lineList" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import Title from './components/Title.vue';
  import ChartLine from './ChartLine.vue';
  import { ref, onMounted } from 'vue';
  import { dataOrderApi } from '/@/api/workbench/index';

  const titleList = [
    {
      title: '工单趋势',
      icon: 'yewu_xiangmu',
    },
  ];
  const options = [
    {
      label: '本周',
      value: '2',
    },
    {
      label: '本月',
      value: '3',
    },
    {
      label: '本季',
      value: '4',
    },
    {
      label: '本年',
      value: '5',
    },
  ];
  const Btnvalue = ref<string>('2');
  function getChange(val) {
    Btnvalue.value = val;
    handleCount();
  }
  onMounted(() => {
    handleCount();
  });
  //工作趋势
  const lineList = ref<any>([]);
  function handleCount() {
    dataOrderApi({ timeFlag: Btnvalue.value }).then((res) => {
      lineList.value = res;
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
