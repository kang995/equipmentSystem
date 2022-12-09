import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/device-service',
  name: 'deviceService',
  component: LAYOUT,
  redirect: '/device-service/service-plan-management',
  meta: {
    orderNo: 0,
    icon: 'yewu_gongzuotai|svg',
    title: '设备检修',
  },
  children: [
    {
      path: 'service-plan-management',
      name: 'servicePlanManagement',
      component: () => import('../../../views/device-service/service-plan-management/index.vue'),
      meta: {
        title: '检修计划管理',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'service-plan-audit',
      name: 'servicePlanAudit',
      component: () => import('../../../views/device-service/service-plan-audit/index.vue'),
      meta: {
        title: '检修计划审核',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'service-workOrder',
      name: 'serviceWorkOrder',
      component: () => import('../../../views/device-service/service-workOrder/index.vue'),
      meta: {
        title: '检修工单',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'workOrder-check',
      name: 'workOrderCheck',
      component: () => import('../../../views/device-service/workOrder-check/index.vue'),
      meta: {
        title: '检修工单验收',
        hideChildrenInMenu: true,
      },
      children: [],
    },
  ],
};

export default setup;
