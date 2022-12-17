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
      children: [
        {
          path: 'planManagement-add',
          name: 'planManagementAdd',
          component: () =>
            import('../../../views/device-service/service-plan-management/module/Add.vue'),
          meta: {
            title: '新增检修计划',
          },
        },
        {
          path: 'planManagement-edit',
          name: 'planManagementEdit',
          component: () =>
            import('../../../views/device-service/service-plan-management/module/Edit.vue'),
          meta: {
            title: '编辑检修计划',
          },
        },
        {
          path: 'planManagement-details',
          name: 'planManagementDetails',
          component: () =>
            import(
              '../../../views/device-service/service-plan-management/module/managementDetails.vue'
            ),
          meta: {
            title: '检修计划详情',
          },
        },
      ],
    },
    {
      path: 'service-plan-audit',
      name: 'servicePlanAudit',
      component: () => import('../../../views/device-service/service-plan-audit/index.vue'),
      meta: {
        title: '检修计划审核',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'planAudit-details',
          name: 'planAuditDetails',
          component: () =>
            import('../../../views/device-service/service-plan-audit/planAuditDetails.vue'),
          meta: {
            title: '检修计划详情',
          },
        },
      ],
    },
    {
      path: 'service-workOrder',
      name: 'serviceWorkOrder',
      component: () => import('../../../views/device-service/service-workOrder/index.vue'),
      meta: {
        title: '检修工单',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'overhaul-details',
          name: 'overhaulDetail',
          component: () =>
            import('../../../views/device-service/service-workOrder/module/overhaulDetail.vue'),
          meta: {
            title: '检修工单详情',
          },
        },
      ],
    },
    {
      path: 'workOrder-check',
      name: 'workOrderCheck',
      component: () => import('../../../views/device-service/workOrder-check/index.vue'),
      meta: {
        title: '检修工单验收',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'check-details',
          name: 'checkDetail',
          component: () =>
            import('../../../views/device-service/workOrder-check/module/checkDetail.vue'),
          meta: {
            title: '检修工单验收详情',
          },
        },
      ],
    },
  ],
};

export default setup;
