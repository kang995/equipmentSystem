<template>
  <PageWrapper contentFullHeight>
    <Tabs
      v-model:activeKey="activeKey"
      class="basic-data-tab"
      :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
    >
      <template v-for="item in achieveList" :key="item.key">
        <TabPane :tab="item.name" />
      </template>
    </Tabs>
    <component :is="activeComponent" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { computed, ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import Blacklist from './Blacklist.vue';
  import WhiteList from './WhiteList.vue';

  const TabPane = Tabs.TabPane;
  interface TabItem {
    key: string;
    name: string;
    component: any;
  }
  const achieveList: TabItem[] = [
    {
      key: '1',
      name: '黑名单',
      component: Blacklist,
    },
    {
      key: '2',
      name: '白名单',
      component: WhiteList,
    },
  ];

  let activeKey = ref<string>('1');
  const activeComponent = computed(() => {
    return achieveList.filter((item) => item.key == activeKey.value)[0].component;
  });
</script>

<style lang="less" scoped>
  .basic-data-tab {
    border: 1px solid @border-color-base;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: @component-background;
  }
</style>
