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
  import DetailsDescription from './DetailsDescription.vue';
  import AssociatedDevices from '../teardown-record/indexCooment.vue';
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
      name: '基本信息',
      component: DetailsDescription,
    },
    {
      key: '2',
      name: '拆除情况',
      component: AssociatedDevices,
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
