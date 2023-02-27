<template>
  <PageWrapper>
    <div class="mt-2 mb-6">
      <span class="mr-2">年度</span>
      <a-year-picker
        class="bg-white w-[120px]"
        v-model:value="selectYear"
        @change="getRankData"
        value-format="YYYY"
        :allowClear="false"
      />
    </div>
    <div>
      <WorkCount :year="selectYear" />
    </div>
    <div class="block">
      <TypeCount :year="selectYear" />
    </div>
    <div class="block">
      <WorkCirculation :year="selectYear" />
    </div>
    <div class="block">
      <DepartmentCount :year="selectYear" />
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkCount from './module/WorkCount.vue';
  import TypeCount from './module/TypeCount.vue';
  import WorkCirculation from './module/WorkCirculation.vue';
  import DepartmentCount from './module/DepartmentCount.vue';
  import dayjs from 'dayjs';

  const AYearPicker = DatePicker.YearPicker;
  const selectYear = ref<string>(dayjs().format('YYYY'));
  function getRankData(val) {
    selectYear.value = val;
    console.log('年份', selectYear.value);
  }
</script>
<style lang="less" scoped>
  .block {
    margin-top: 16px;
  }
</style>
