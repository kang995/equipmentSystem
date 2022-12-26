import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/device-maintenance',
  name: 'deviceMaintenance',
  component: LAYOUT,
  redirect: '/device-maintenance/maintain-plan',
  meta: {
    orderNo: 0,
    icon: 'yewu_gongzuotai|svg',
    title: '设备保养',
  },
  children: [
    {
      path: 'maintain-plan',
      name: 'maintainPlan',
      component: () => import('../../../views/device-maintenance/maintain-plan/index.vue'),
      meta: {
        title: '保养计划',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'maintain-add',
          name: 'maintainAdd',
          component: () => import('../../../views/device-maintenance/maintain-plan/module/Add.vue'),
          meta: {
            title: '新增保养计划',
          },
        },
        {
          path: 'maintain-edit',
          name: 'maintainEdit',
          component: () =>
            import('../../../views/device-maintenance/maintain-plan/module/Edit.vue'),
          meta: {
            title: '编辑保养计划',
          },
        },
        {
          path: 'plan-details',
          name: 'planDetails',
          component: () =>
            import('../../../views/device-maintenance/maintain-plan/module/planDetails.vue'),
          meta: {
            title: '保养计划详情',
          },
        },
      ],
    },
    {
      path: 'audit-detail',
      name: 'auditDetail',
      component: () => import('../../../views/device-maintenance/maintain-audit/index.vue'),
      meta: {
        title: '保养计划审核',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'maintain-details',
          name: 'maintainDetails',
          component: () =>
            import('../../../views/device-maintenance/maintain-audit/auditDetail.vue'),
          meta: {
            title: '保养计划审核详情',
          },
        },
      ],
    },
    {
      path: 'maintain-workOrder',
      name: 'maintainWorkOrder',
      component: () => import('../../../views/device-maintenance/maintain-workOrder/index.vue'),
      meta: {
        title: '保养工单',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'workOrder-details',
          name: 'workOrderDetail',
          component: () =>
            import('../../../views/device-maintenance/maintain-workOrder/workOrderDetail.vue'),
          meta: {
            title: '工单详情',
          },
        },
      ],
    },
    {
      path: 'maintain-acceptance',
      name: 'maintainAcceptance',
      component: () => import('../../../views/device-maintenance/maintain-acceptance/index.vue'),
      meta: {
        title: '保养验收',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'acceptance-details',
          name: 'acceptanceDetail',
          component: () =>
            import('../../../views/device-maintenance/maintain-acceptance/acceptanceDetail.vue'),
          meta: {
            title: '工单详情',
          },
        },
      ],
    },
  ],
};

export default setup;
