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
  import { Tabs } from 'ant-design-vue';
  import { computed, onMounted, ref } from 'vue';
  import EssentialInformation from '../record/EssentialInformation.vue';
  import PatrolInspectionRecords from '../record/PatrolInspectionRecords.vue';
  import FailureRecord from '../record/FailureRecord.vue';
  import OverhaulRecord from '../record/OverhaulRecord.vue';
  import MaintenanceRecord from '../record/MaintenanceRecord.vue';
  import TimingDetection from '../record/TimingDetection.vue';
  import EmergencyDrillRecord from '../record/EmergencyDrillRecord.vue';
  import EmergencyPlan from '../record/EmergencyPlan.vue';
  import AssociatedSpareParts from '../record/AssociatedSpareParts.vue';
  import SparePart from '../record/SparePart.vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  let state = route.query.state as string;
  const TabPane = Tabs.TabPane;

  //三方跳转时判断state
  if (!state) {
    let url = window.location.href;
    if (url.includes('special-equipment')) {
      state = '3';
    }
  }
  interface TabItem {
    key: string;
    name: string;
    component?: any;
    ifShow: boolean;
  }
  //机械动：1 MechanicsDetailsMove
  //机械静：2  MechanicsDetails
  //特种静：3 specialEquipmentDetails
  //特种动：4 specialEquipmentDetailsMove
  const activeList: TabItem[] = [
    {
      key: '1',
      name: '基本信息', //1 2 3 4
      component: EssentialInformation,
      ifShow: true,
    },
    {
      key: '2',
      name: '巡检记录', //1 2 3 4
      component: PatrolInspectionRecords,
      ifShow: true,
    },
    {
      key: '3',
      name: '故障记录', //1 2 3 4
      component: FailureRecord,
      ifShow: true,
    },
    {
      key: '4',
      name: '检修记录', //1 2 3 4
      component: OverhaulRecord,
      ifShow: true,
    },
    {
      key: '5',
      name: '保养记录', //1 2 3 4
      component: MaintenanceRecord,
      ifShow: true,
    },
    {
      key: '6',
      name: '定期检测记录', // 3 4
      component: TimingDetection,
      ifShow: state === '3' || state === '4' ? true : false,
    },
    {
      key: '7',
      name: '应急演练记录', //1 3 4
      component: EmergencyDrillRecord,
      ifShow: true,
    },
    {
      key: '8',
      name: '应急预案', //1 3 4
      component: EmergencyPlan,
      ifShow: true,
    },
    {
      key: '9',
      name: '关联备件', //1 2 3 4
      component: AssociatedSpareParts,
      ifShow: true,
    },
    {
      key: '10',
      name: '备件更换记录', //1 2 3 4
      component: SparePart,
      ifShow: true,
    },
  ];
  const achieveList = ref<TabItem[]>([]);
  onMounted(() => {
    activeList.filter((item, index) => {
      if (item.ifShow == false) {
        activeList.splice(index, 1);
      }
    });
    achieveList.value = activeList;
  });
  const activeKey = ref('1');
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
