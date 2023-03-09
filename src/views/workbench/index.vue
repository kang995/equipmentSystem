<template>
  <PageWrapper>
    <div :class="`${prefixCls}`">
      <div :class="`${prefixCls}-left`">
        <div :class="`${prefixCls}-left-data`"><DataOverview /> </div>
        <div :class="`${prefixCls}-left-data`" v-if="isShow"
          ><QuickEntry :routerList="routerList" />
        </div>
        <div :class="`${prefixCls}-left-data`">
          <WorkOrderTrend />
        </div>
      </div>
      <div :class="`${prefixCls}-right`">
        <User />
        <div :class="`${prefixCls}-right-information`"><LatestDevelopments /> </div>
        <GettingStarted />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DataOverview from './DataOverview.vue';
  import QuickEntry from './QuickEntry.vue';
  import WorkOrderTrend from './WorkOrderTrend.vue';
  import User from './User.vue';
  import LatestDevelopments from './LatestDevelopments.vue';
  import GettingStarted from './GettingStarted.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getMenuList } from '/@/api/sys/menu';
  import { ref, onMounted } from 'vue';
  const { prefixCls } = useDesign('workbench-wrapper');

  //判断快捷入口
  const isShow = ref<any>(false);
  const routerList = ref<Array<any>>([]);
  function handleEntry() {
    getMenuList().then((res) => {
      res.map((item) => {
        if (
          item.name?.includes('correctiveMaintenance') ||
          item.name?.includes('deviceMaintenance') ||
          item.name?.includes('deviceService')
        ) {
          isShow.value = true;
          routerList.value = res;
        }
      });
    });
  }
  onMounted(() => {
    handleEntry();
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-workbench-wrapper';
  .@{prefix-cls} {
    display: flex;

    &-left {
      margin: 0 auto;
      flex: 1;
    }

    &-left-data {
      margin-bottom: 16px;
    }

    &-right {
      margin-left: 16px;
      width: 380px;
    }

    &-right-information {
      margin: 16px 0;
    }
  }
</style>
