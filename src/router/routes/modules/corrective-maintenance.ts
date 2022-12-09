import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/corrective-maintenance',
  name: 'correctiveMaintenance',
  component: LAYOUT,
  redirect: '/corrective-maintenance/fault-management',
  meta: {
    orderNo: 0,
    icon: 'yewu_gongzuotai|svg',
    title: '故障维修',
  },
  children: [
    {
      path: 'fault-management',
      name: 'faultManagement',
      component: () => import('../../../views/corrective-maintenance/fault-management/index.vue'),
      meta: {
        title: '故障管理',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'fault-confirm',
      name: 'faultConfirm',
      component: () => import('../../../views/corrective-maintenance/fault-confirm/index.vue'),
      meta: {
        title: '故障确认',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'repair-workOrder',
      name: 'repairWorkOrder',
      component: () => import('../../../views/corrective-maintenance/repair-workOrder/index.vue'),
      meta: {
        title: '维修工单',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'repair-check',
      name: 'repairCheck',
      component: () => import('../../../views/corrective-maintenance/repair-check/index.vue'),
      meta: {
        title: '维修验收',
        hideChildrenInMenu: true,
      },
      children: [],
    },
    {
      path: 'repair-plan',
      name: 'repairPlan',
      component: () => import('../../../views/corrective-maintenance/repair-plan/index.vue'),
      meta: {
        title: '维修计划',
        hideChildrenInMenu: true,
      },
      children: [],
    },
  ],
};

export default setup;
