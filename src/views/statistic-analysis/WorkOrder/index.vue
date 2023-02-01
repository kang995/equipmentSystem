<template>
  <PageWrapper>
    <div class="flex justify-between">
      <a-tabs
        v-model:activeKey="activeKey"
        class="basic-data-tab"
        :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
        @change="handleChange"
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
    <ModalExport
      @register="registerModal"
      :dataSourceList="dataSource"
      :activeKey="activeKey"
      :key="count"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, computed, onBeforeMount } from 'vue';
  import { Tabs, Button } from 'ant-design-vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import upkeepPage from './upkeepPage.vue';
  import repairPage from './repairPage.vue';
  import overhaulingPage from './overhaulingPage.vue';
  import ModalExport from './components/ModalExport.vue';

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

  const count = ref(0); //更新组件
  const dataSource = ref<any>([]);
  // 保养统计
  const dataSource1 = ref<any>([
    { disLocationName: '保养工单数量', id: 1 }, //num[] 1
    { disLocationName: '保养计划完成率', id: 2 }, // num[] 2
    { disLocationName: '工单返工率', id: 3 }, // num[] 3
    { disLocationName: '工单延期率', id: 4 }, // num[] 4
    { disLocationName: '保养类型完成情况', id: 5 }, // num[] 5
    { disLocationName: '保养类型占比', id: 6 }, //
  ]);
  // 维修统计
  const dataSource2 = ref<any>([
    { disLocationName: '维修工单数量', id: 1 }, //num[] 1
    { disLocationName: '维修方式占比', id: 2 }, // num[] 2
    { disLocationName: '工单返工率', id: 3 }, // num[] 3
    { disLocationName: '工单延期率', id: 4 }, // num[] 4
    { disLocationName: '故障等级占比', id: 5 }, // num[] 5
  ]);
  // 检修统计
  const dataSource3 = ref<any>([
    { disLocationName: '检修工单数量', id: 1 }, //num[] 1
    { disLocationName: '检修计划完成率', id: 2 }, // num[] 2
    { disLocationName: '工单返工率', id: 3 }, // num[] 3
    { disLocationName: '工单延期率', id: 4 }, // num[] 4
  ]);

  function handleChange(key) {
    switch (key) {
      case '1':
        dataSource.value = dataSource1.value;
        break;
      case '2':
        dataSource.value = dataSource2.value;
        break;
      case '3':
        dataSource.value = dataSource3.value;
        break;
    }
    count.value++;
    // console.log('key',key,dataSource.value,count.value)
  }

  onBeforeMount(() => {
    dataSource.value = dataSource1.value;
  });
  //导出弹窗
  const [registerModal, { openModal: openModal }] = useModal();

  //导出
  function exportTable() {
    openModal(true);
  }
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
