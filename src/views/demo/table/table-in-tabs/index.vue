<template>
  <PageWrapper contentFullHeight>
    <Tabs
      v-model:activeKey="activeKey"
      class="basic-data-tab"
      :tabBarStyle="{ margin: 0, paddingLeft: '16px', background: 'white' }"
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
  import { Tabs } from 'ant-design-vue';
  import { achieveList } from './data';
  import { computed, ref } from 'vue';

  const TabPane = Tabs.TabPane;

  const activeKey = ref('1');
  const activeComponent = computed(() => {
    return achieveList.filter((item) => item.key == activeKey.value)[0].component;
  });
</script>

<style scoped lang="less">
  .basic-data-tab {
    border: 1px solid @border-color-base;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
</style>
