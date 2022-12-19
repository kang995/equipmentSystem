<template>
  <div>
    <Card>
      <Title :titleList="titleList">
        <template #QueryBtn>
          <RadioButtonGroup
            :options="options"
            v-model:value="value"
            buttonStyle="button"
            @change="getChange"
          /> </template
      ></Title>

      <ChartLine />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { RadioButtonGroup } from '/@/components/Form';
  import Title from './components/Title.vue';
  import ChartLine from './ChartLine.vue';
  import { ref } from 'vue';

  const titleList = [
    {
      title: '工单趋势',
      icon: 'yewu_xiangmu',
    },
  ];
  const options = [
    {
      label: '全部',
      value: '1',
    },
    {
      label: '报警',
      value: '2',
    },
    {
      label: '销警',
      value: '3',
    },
  ];
  const value = ref<string>('1');
  function getChange(val) {
    value.value = val;
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
