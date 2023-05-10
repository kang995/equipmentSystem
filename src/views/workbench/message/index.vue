<template>
  <PageWrapper contentFullHeight>
    <a-tabs
      :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
      v-model:activeKey="tabActiveKey"
      :destroyInactiveTabPane="true"
      :animated="false"
      style="border-radius: 6px"
    >
      <a-tab-pane :key="item.value" :tab="item.name" v-for="item in data">
        <AllMessages :tabActiveKey="tabActiveKey" />
      </a-tab-pane>
    </a-tabs>
    <AllMessages
      v-if="tabActiveKey === '-1'"
      :tabActiveKey="tabActiveKey"
      :paramId="paramId"
      :paramState="paramState"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Tabs } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { ref, watch } from 'vue';
  import AllMessages from './AllMessages.vue';
  import { useRoute } from 'vue-router';
  const data = [
    {
      value: '',
      name: '全部消息',
    },
    {
      value: '2',
      name: '未读',
    },
    {
      value: '1',
      name: '已读',
    },
    // {
    //   value: '3',
    //   name: '标记',
    // },
  ];
  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const route = useRoute();
  const key = route.params.tabActiveKey as string; // tabActiveKey
  const tabActiveKey = ref<string>(key); // -1代表查看单条消息

  // 查看单条消息
  const paramId = route.params.id as string; // 路由参数id
  const paramState = route.params.state as string; // 路由参数state

  watch(
    () => route.params.tabActiveKey,
    (newVal) => {
      tabActiveKey.value = newVal as string;
    },
  );
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-top > .ant-tabs-nav) {
    background: #fff !important;
  }

  [data-theme='dark'] {
    .ant-tabs-top > .ant-tabs-nav {
      background: rgba(255, 255, 255, 0.05);
    }
  }
</style>
