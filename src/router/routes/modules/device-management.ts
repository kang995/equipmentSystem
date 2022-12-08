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
        title: '设备设施',
      },
    },
    {
      path: 'installation/details',
      name: 'InstallationDetails',
      component: () => import('../../../views/device-management/installation/Details.vue'),
      meta: {
        title: '设备设施详情',
        hideMenu: true,
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
        title: '机械设备台账详情',
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
        title: '特种设备详情',
        hideMenu: true,
      },
    },
    {
      path: 'special-equipment/add',
      name: 'specialEquipmentAdd',
      component: () => import('../../../views/device-management/special-equipment/Add.vue'),
      meta: {
        title: '新建特种设备',
        hideMenu: true,
      },
    },
    {
      path: 'testing/add',
      name: 'TestingAdd',
      component: () => import('../../../views/device-management/special-equipment/TestingAdd.vue'),
      meta: {
        title: '新建检测记录',
        hideMenu: true,
      },
    },
    {
      path: 'special-equipment/edit',
      name: 'specialEquipmentEdit',
      component: () => import('../../../views/device-management/special-equipment/Edit.vue'),
      meta: {
        title: '编辑特种设备',
        hideMenu: true,
      },
    },
  ],
};

export default setup;
