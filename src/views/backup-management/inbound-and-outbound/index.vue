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
  import Warehousing from './Warehousing.vue';
  import Issue from './Issue.vue';
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
      name: '出库', //1 2 3 4
      component: Issue,
    },
    {
      key: '2',
      name: '入库', //1 2 3 4
      component: Warehousing,
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
