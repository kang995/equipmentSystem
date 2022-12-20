<template>
  <PageWrapper contentFullHeight>
    <Tabs
      v-model:activeKey="activeKey"
      class="basic-data-tab"
      :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
    >
      <template v-for="item in activeList" :key="item.key">
        <TabPane :tab="item.name" />
      </template>
    </Tabs>
    <component :is="activeComponent" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { computed, ref } from 'vue';
  import Information from './Information.vue';
  import AssociatedDevices from './AssociatedDevices.vue';
  import Stock from './Stock.vue';
  import Detailed from './Detailed.vue';
  const TabPane = Tabs.TabPane;
  const activeKey = ref('1');

  interface TabItem {
    key: string;
    name: string;
    component?: any;
  }
  const activeList: TabItem[] = [
    {
      key: '1',
      name: '基本信息', //1 2 3 4
      component: Information,
    },
    {
      key: '2',
      name: '关联设备', //1 2 3 4
      component: AssociatedDevices,
    },
    {
      key: '3',
      name: '库存', //1 2 3 4
      component: Stock,
    },
    {
      key: '4',
      name: '出入库明细', //1 2 3 4
      component: Detailed,
    },
  ];
  const activeComponent = computed(() => {
    return activeList.filter((item) => item.key == activeKey.value)[0].component;
  });
</script>

<style scoped lang="less">
  .basic-data-tab {
    border: 1px solid @border-color-base;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: @component-background;
  }
</style>
