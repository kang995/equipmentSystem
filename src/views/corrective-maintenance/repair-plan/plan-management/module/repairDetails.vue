<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="计划详情">
        <plan-info :status="status" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="审批流程">
        <process />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import planInfo from './planInfo.vue';
  import process from './process.vue';
  const route = useRoute();
  const status = route.query?.status as string;
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const activeKey = ref('1');
</script>

<style lang="less" scoped></style>
