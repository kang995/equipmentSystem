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
      children: [
        {
          path: 'fault-add',
          name: 'faultAdd',
          component: () =>
            import('../../../views/corrective-maintenance/fault-management/module/Add.vue'),
          meta: {
            title: '新增故障',
            currentActiveMenu: '/corrective-maintenance/fault-management',
          },
        },
        {
          path: 'fault-edit',
          name: 'faultEdit',
          component: () =>
            import('../../../views/corrective-maintenance/fault-management/module/Edit.vue'),
          meta: {
            title: '编辑故障',
            currentActiveMenu: '/corrective-maintenance/fault-management',
          },
        },
        {
          path: 'fault-details',
          name: 'faultDetails',
          component: () =>
            import(
              '../../../views/corrective-maintenance/fault-management/module/faultDetails.vue'
            ),
          meta: {
            title: '故障详情',
            currentActiveMenu: '/corrective-maintenance/fault-management',
          },
        },
      ],
    },
    {
      path: 'fault-confirm',
      name: 'faultConfirm',
      component: () => import('../../../views/corrective-maintenance/fault-confirm/index.vue'),
      meta: {
        title: '故障确认',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'confirm-details',
          name: 'confirmDetail',
          component: () =>
            import('../../../views/corrective-maintenance/fault-confirm/module/confirmDetail.vue'),
          meta: {
            title: '故障确认详情',
          },
        },
      ],
    },
    {
      path: 'repair-workOrder',
      name: 'repairWorkOrder',
      component: () => import('../../../views/corrective-maintenance/repair-workOrder/index.vue'),
      meta: {
        title: '维修工单',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'repair-details',
          name: 'repairDetail',
          component: () =>
            import(
              '../../../views/corrective-maintenance/repair-workOrder/module/repairDetail.vue'
            ),
          meta: {
            title: '维修工单详情',
          },
        },
      ],
    },
    {
      path: 'repair-check',
      name: 'repairCheck',
      component: () => import('../../../views/corrective-maintenance/repair-check/index.vue'),
      meta: {
        title: '维修验收',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'check-details',
          name: 'checkDetail',
          component: () =>
            import('../../../views/corrective-maintenance/repair-check/module/checkDetail.vue'),
          meta: {
            title: '维修验收详情',
          },
        },
      ],
    },
    {
      path: 'repair-plan',
      name: 'repairPlan',
      component: () => import('../../../views/corrective-maintenance/repair-plan/index.vue'),
      meta: {
        title: '维修计划',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'repair-add',
          name: 'repairAdd',
          component: () =>
            import('../../../views/corrective-maintenance/repair-plan/module/add.vue'),
          meta: {
            title: '新增维修计划',
          },
        },
        {
          path: 'repair-edit',
          name: 'repairEdit',
          component: () =>
            import('../../../views/corrective-maintenance/repair-plan/module/Edit.vue'),
          meta: {
            title: '编辑维修计划',
          },
        },
        {
          path: 'repair-details',
          name: 'repairDetails',
          component: () =>
            import('../../../views/corrective-maintenance/repair-plan/module/repairDetails.vue'),
          meta: {
            title: '维修计划详情',
          },
        },
      ],
    },
  ],
};

export default setup;
