<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="计划详情">
        <maintain-info />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="tabLabel">
        <maintain-device />
      </a-tab-pane>
      <a-tab-pane key="3" tab="审批流程">
        <review-process />
      </a-tab-pane>
      <a-tab-pane key="4" tab="关联工单" v-if="status === '3'">
        <work-order />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import maintainInfo from './maintainInfo.vue';
  import maintainDevice from './maintainDevice.vue';
  import reviewProcess from './reviewProcess.vue';
  import workOrder from './workOrder.vue';
  const route = useRoute();
  const status = route.query?.status as string;
  const mode = route.query?.mode as string;
  const tabLabel = computed(() => {
    return mode === '1' || mode === '2' ? '保养设备' : '检修设备';
  });
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const activeKey = ref('1');
</script>

<style lang="less" scoped></style>
