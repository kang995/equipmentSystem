<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="工单信息">
        <work-info />
      </a-tab-pane>
      <a-tab-pane key="2" tab="使用备件">
        <work-part />
      </a-tab-pane>
      <a-tab-pane key="3" tab="流转记录">
        <flow-doc :type="'2'" />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  // import { useRoute } from 'vue-router';
  import workInfo from './workInfo.vue';
  // import workPart from './workPart.vue';
  // import flowDoc from './flowDoc.vue';
  import workPart from '/@/views/device-maintenance/maintain-workOrder/module/workPart.vue';
  import flowDoc from '/@/views/device-maintenance/maintain-workOrder/module/flowDoc.vue';
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
