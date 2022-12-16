<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="计划详情">
        <maintain-info :info="info" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="检修设备">
        <maintain-device />
      </a-tab-pane>
      <a-tab-pane key="3" tab="审核流程">
        <review-process />
      </a-tab-pane>
      <a-tab-pane key="4" tab="关联工单">
        <work-order />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import maintainInfo from '../../device-maintenance/components/maintainInfo.vue';
  import maintainDevice from '../../device-maintenance/components/maintainDevice.vue';
  import reviewProcess from '../../device-maintenance/components/reviewProcess.vue';
  import workOrder from '../../device-maintenance/components/workOrder.vue';
  const route = useRoute();
  const flag = route.query?.flag as string;
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const activeKey = ref('1');

  //计划审核状态 未提交：1、审核中：2、审核拒绝：3、审核通过：4
  const info = ref<any>({ state: '1' });
</script>

<style lang="less" scoped></style>
