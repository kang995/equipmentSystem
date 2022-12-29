<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="工单信息">
        <acceptance-info />
      </a-tab-pane>
      <a-tab-pane key="2" tab="使用备件">
        <work-part />
      </a-tab-pane>
      <a-tab-pane key="3" tab="流转记录">
        <flow-doc />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  // import { useRoute } from 'vue-router';
  import acceptanceInfo from './acceptanceInfo.vue';
  import workPart from '../../maintain-workOrder/module/workPart.vue';
  import flowDoc from '../../maintain-workOrder/module/flowDoc.vue';
  // const route = useRoute();
  // const status = route.query?.status as string;
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const activeKey = ref('1');
</script>

<style lang="less" scoped></style>
