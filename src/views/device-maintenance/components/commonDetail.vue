<template>
  <PageWrapper contentBackground>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="计划详情">
        <maintain-info @plan-enent="handleEvent" />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="tabLabel">
        <maintain-device />
      </a-tab-pane>
      <a-tab-pane key="3" tab="审批流程" v-if="fullSubmitId">
        <review-process :fullSubmitId="fullSubmitId" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="关联工单" v-if="(mode === '1' || mode === '3') && status === '3'">
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
  let mode = route.query?.mode as string;
  const fullSubmitIds: any = ref<string>('');
  const fullSubmitId: any = route.query?.fullSubmitId || (fullSubmitIds as string);

  //三方跳转时判断mode
  if (!mode) {
    //mode--保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
    let url = window.location.href;
    if (url.includes('plan-details')) {
      //保养计划管理详情
      mode = '1';
    } else if (url.includes('maintain-details')) {
      //保养计划审核详情
      mode = '2';
    } else if (url.includes('planManagement-details')) {
      //检修计划管理详情
      mode = '3';
    } else if (url.includes('planAudit-details')) {
      //检修计划审核详情
      mode = '4';
    }
  }
  const tabLabel = computed(() => {
    return mode === '1' || mode === '2' ? '保养设备' : '检修设备';
  });
  function handleEvent(val) {
    fullSubmitIds.value = val;
  }
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const activeKey = ref('1');
</script>

<style lang="less" scoped></style>
