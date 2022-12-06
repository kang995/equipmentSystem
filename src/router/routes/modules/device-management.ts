import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/device-management',
  name: 'device-management',
  component: LAYOUT,
  redirect: '/device-management/installation',
  meta: {
    orderNo: 0,
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
      path: 'mechanics',
      name: 'Mechanics',
      component: () => import('../../../views/device-management/mechanics/index.vue'),
      meta: {
        title: '机械设备台账',
      },
    },
    {
      path: 'special-equipment/index',
      name: 'specialEquipment',
      component: () => import('../../../views/device-management/special-equipment/index.vue'),
      meta: {
        title: '特种设备台账',
      },
    },
  ],
};

export default setup;
