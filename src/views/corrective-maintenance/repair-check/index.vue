<template>
  <PageWrapper contentFullHeight>
    <Tabs
      v-model:activeKey="activeKey"
      class="basic-data-tab"
      :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
      @change="handleChange"
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
  import { DetermineCountApi } from '/@/api/corrective-maintenance/repair';
  const TabPane = Tabs.TabPane;

  const activeKey = ref('1');
  const activeComponent = computed(() => {
    return achieveList.filter((item) => item.key == activeKey.value)[0].component;
  });
  const handleChange = (val) => {
    activeKey.value = val;
  };
  //待验收和已验收工单数量
  DetermineCountApi().then((res) => {
    achieveList[0].name = '待验收';
    achieveList[1].name = '已验收';
    achieveList[0].name = achieveList[0].name + `(${res['stayAcceptCount']})`;
    achieveList[1].name = achieveList[1].name + `(${res['acceptCount']})`;
    // console.log('数量',res,achieveList)
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
