import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/device-management',
  name: 'device-management',
  component: LAYOUT,
  redirect: '/device-management/installation',
  meta: {
    orderNo: 1,
    icon: 'yewu_gongzuotai|svg',
    title: '设备管理',
  },
  children: [
    {
      path: 'installation',
      name: 'Installation',
      component: () => import('../../../views/device-management/installation/index.vue'),
      meta: {
        title: '装置设置',
      },
    },
    {
      path: 'installation/details',
      name: 'InstallationDetails',
      component: () => import('../../../views/device-management/installation/Details.vue'),
      meta: {
        title: '装置设置详情',
        hideMenu: true,
        currentActiveMenu: '/device-management/installation',
      },
    },
    {
      path: 'mechanics',
      name: 'Mechanics',
      component: () => import('../../../views/device-management/mechanics/index.vue'),
      meta: {
        title: '机械设备台账',
      },
    },
    {
      path: 'mechanics/details',
      name: 'MechanicsDetails',
      component: () => import('../../../views/device-management/mechanics/Details.vue'),
      meta: {
        title: '机械设备详情静',
        hideMenu: true,
        currentActiveMenu: '/device-management/mechanics',
      },
    },
    {
      path: 'mechanics/details/move',
      name: 'MechanicsDetailsMove',
      component: () => import('../../../views/device-management/mechanics/DetailsMove.vue'),
      meta: {
        title: '机械设备详情动',
        hideMenu: true,
        currentActiveMenu: '/device-management/mechanics',
      },
    },
    {
      path: 'patrol-inspection-report',
      name: 'PatrolInspectionReport',
      component: () =>
        import('../../../views/device-management/record/action-page/PatrolInspectionReport.vue'),
      meta: {
        title: '巡检报告',
        hideMenu: true,
      },
    },

    {
      path: 'timing-detection/detail',
      name: 'TimingDetectionDetail',
      component: () =>
        import('../../../views/device-management/record/action-page/TimingDetectionDetail.vue'),
      meta: {
        title: '检测记录详情',
        hideMenu: true,
      },
    },
    {
      path: 'emergency/detail',
      name: 'EmergencyDetail',
      component: () =>
        import('../../../views/device-management/record/action-page/EmergencyDetail.vue'),
      meta: {
        title: '应急演练报告',
        hideMenu: true,
      },
    },
    {
      path: 'associated/detail',
      name: 'AssociatedDetail',
      component: () =>
        import('../../../views/device-management/record/action-page/AssociatedDetail.vue'),
      meta: {
        title: '关联备件详情',
        hideMenu: true,
      },
    },
    {
      path: 'special-equipment',
      name: 'specialEquipment',
      component: () => import('../../../views/device-management/special-equipment/index.vue'),
      meta: {
        title: '特种设备台账',
      },
    },
    {
      path: 'special-equipment/details',
      name: 'specialEquipmentDetails',
      component: () => import('../../../views/device-management/special-equipment/Details.vue'),
      meta: {
        title: '特种设备详情静',
        hideMenu: true,
        currentActiveMenu: '/device-management/special-equipment',
      },
    },
    {
      path: 'special-equipment/details/move',
      name: 'specialEquipmentDetailsMove',
      component: () => import('../../../views/device-management/special-equipment/DetailsMove.vue'),
      meta: {
        title: '特种设备详情动',
        hideMenu: true,
        currentActiveMenu: '/device-management/special-equipment',
      },
    },
    {
      path: 'special-equipment/add',
      name: 'specialEquipmentAdd',
      component: () => import('../../../views/device-management/special-equipment/Add.vue'),
      meta: {
        title: '新建特种设备',
        hideMenu: true,
        currentActiveMenu: '/device-management/special-equipment',
      },
    },
    {
      path: 'testing/add',
      name: 'TestingAdd',
      component: () => import('../../../views/device-management/special-equipment/TestingAdd.vue'),
      meta: {
        title: '新建检测记录',
        hideMenu: true,
        currentActiveMenu: '/device-management/special-equipment',
      },
    },
    {
      path: 'special-equipment/edit',
      name: 'specialEquipmentEdit',
      component: () => import('../../../views/device-management/special-equipment/Edit.vue'),
      meta: {
        title: '编辑特种设备',
        hideMenu: true,
        currentActiveMenu: '/device-management/special-equipment',
      },
    },
  ],
};

export default setup;
