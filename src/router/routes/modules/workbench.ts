import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/workbench',
  name: 'Workbench',
  component: LAYOUT,
  redirect: '/workbench/index',
  meta: {
    orderNo: 0,
    hideChildrenInMenu: true,
    icon: 'yewu_gongzuotai|svg',
    title: '工作台',
  },
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('/@/views/workbench/index.vue'),
      meta: {
        title: '工作台',
      },
    },

    {
      path: 'workbench/message',
      name: 'Message',
      meta: {
        title: '消息列表',
        hideMenu: true,
        hideBreadcrumb: true,
        currentActiveMenu: '/workbench/index',
      },
      component: () => import('/@/views/workbench/message/index.vue'),
    },
  ],
};

export default setup;
