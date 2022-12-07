import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/device-maintenance',
  name: 'device-maintenance',
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
          component: () => import('../../../views/device-maintenance/maintain-plan/module/add.vue'),
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
          path: 'maintain-details',
          name: 'maintainDetails',
          component: () =>
            import('../../../views/device-maintenance/maintain-plan/module/Details.vue'),
          meta: {
            title: '保养计划详情',
          },
        },
      ],
    },
    {
      path: 'maintain-audit',
      name: 'maintainAudit',
      component: () => import('../../../views/device-maintenance/maintain-audit/index.vue'),
      meta: {
        title: '保养计划审核',
      },
    },
    {
      path: 'maintain-workOrder',
      name: 'maintainWorkOrder',
      component: () => import('../../../views/device-maintenance/maintain-workOrder/index.vue'),
      meta: {
        title: '保养工单',
      },
    },
    {
      path: 'maintain-acceptance',
      name: 'maintainAcceptance',
      component: () => import('../../../views/device-maintenance/maintain-acceptance/index.vue'),
      meta: {
        title: '保养验收',
      },
    },
  ],
};

export default setup;
