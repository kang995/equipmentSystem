import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const statisticAnalysis: AppRouteModule = {
  path: '/analysis',
  name: 'Analysis',
  component: LAYOUT,
  redirect: '/statistic-analysis/workOrder',
  meta: {
    icon: 'yewu_tongjifenxi|svg',
    title: '统计分析',
    hideChildrenInMenu: true,
    orderNo: 5,
  },
  children: [
    {
      path: 'statistic-analysis/workOrder',
      name: 'StatisticAnalysisWorkOrder',
      component: () => import('/@/views/statistic-analysis/WorkOrder.vue'),
      meta: {
        title: '工单统计',
      },
    },
    {
      path: 'statistic-analysis/device',
      name: 'StatisticAnalysisDevice',
      component: () => import('/@/views/statistic-analysis/Device.vue'),
      meta: {
        title: '设备统计',
      },
    },
  ],
};

export default statisticAnalysis;
