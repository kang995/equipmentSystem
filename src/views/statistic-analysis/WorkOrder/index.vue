<template>
  <PageWrapper>
    <div class="flex justify-between">
      <a-tabs
        v-model:activeKey="activeKey"
        class="basic-data-tab"
        :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
      >
        <template v-for="item in TabList" :key="item.key">
          <a-tab-pane :tab="item.name" />
        </template>
      </a-tabs>
      <div>
        <a-button class="btn" @click="exportTable">
          <template #icon><SvgIcon name="gonggong_daochu" class="!mr-5px" /></template>
          导出
        </a-button>
      </div>
    </div>
    <component :is="activeComponent" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Tabs, Button } from 'ant-design-vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { PageWrapper } from '/@/components/Page';
  import upkeepPage from './upkeepPage.vue';
  import repairPage from './repairPage.vue';
  import overhaulingPage from './overhaulingPage.vue';

  const activeKey = ref('1');
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const AButton = Button;

  interface TabItem {
    key: string;
    name: string;
    component?: any;
  }
  const TabList: TabItem[] = [
    { key: '1', name: '保养统计', component: upkeepPage },
    { key: '2', name: '维修统计', component: repairPage },
    { key: '3', name: '检修统计', component: overhaulingPage },
  ];
  const activeComponent = computed(() => {
    return TabList.filter((item) => item.key == activeKey.value)[0].component;
  });

  //导出
  function exportTable() {}
</script>

<style scoped lang="less">
  .basic-data-tab {
    width: 100%;
    border: 1px solid @border-color-base;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: @component-background;
  }

  .btn {
    height: 46px;
  }
</style>
