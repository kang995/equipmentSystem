import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const setup: AppRouteModule = {
  path: '/backup-management',
  name: 'backup-management',
  component: LAYOUT,
  redirect: '/backup-management/backup',
  meta: {
    orderNo: 6,
    icon: 'yewu_gongzuotai|svg',
    title: '备件管理',
  },
  children: [
    {
      path: 'backup',
      name: 'Backup',
      component: () => import('../../../views/backup-management/backup/index.vue'),
      meta: {
        title: '备件管理',
      },
    },
    {
      path: 'add/backup',
      name: 'AddBackup',
      component: () => import('../../../views/backup-management/backup/Add.vue'),
      meta: {
        title: '备件新增',
        hideMenu: true,
        currentActiveMenu: '/backup-management/backup',
      },
    },
    {
      path: 'edit/backup',
      name: 'EditBackup',
      component: () => import('../../../views/backup-management/backup/Edit.vue'),
      meta: {
        title: '备件编辑',
        hideMenu: true,
        currentActiveMenu: '/backup-management/backup',
      },
    },
    {
      path: 'backup/details',
      name: 'BackupDetails',
      component: () => import('../../../views/backup-management/backup/Details.vue'),
      meta: {
        title: '备件详情',
        hideMenu: true,
        currentActiveMenu: '/backup-management/backup',
      },
    },
    {
      path: 'inbound-and-outbound',
      name: 'InboundAndOutbound',
      component: () => import('../../../views/backup-management/inbound-and-outbound/index.vue'),
      meta: {
        title: '备件出入库',
      },
    },
    {
      path: 'inbound/add',
      name: 'InboundAdd',
      component: () =>
        import('../../../views/backup-management/inbound-and-outbound/InboundAdd.vue'),
      meta: {
        title: '新增出库单',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inbound-and-outbound',
      },
    },
    {
      path: 'outbound/add',
      name: 'OutboundAdd',
      component: () =>
        import('../../../views/backup-management/inbound-and-outbound/OutboundAdd.vue'),
      meta: {
        title: '新增入库单',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inbound-and-outbound',
      },
    },
    {
      path: 'inbound/details',
      name: 'InboundDetails',
      component: () =>
        import('../../../views/backup-management/inbound-and-outbound/InboundDetails.vue'),
      meta: {
        title: '出库详情',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inbound-and-outbound',
      },
    },
    {
      path: 'outbound/details',
      name: 'OutboundDetails',
      component: () =>
        import('../../../views/backup-management/inbound-and-outbound/OutboundDetails.vue'),
      meta: {
        title: '入库详情',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inbound-and-outbound',
      },
    },

    {
      path: 'backup-details',
      name: 'BackupDetailsList',
      component: () => import('../../../views/backup-management/backup-details/index.vue'),
      meta: {
        title: '库存详情',
      },
    },
    {
      path: 'backup-details/add',
      name: 'BackupAdd',
      component: () => import('../../../views/backup-management/backup-details/Add.vue'),
      meta: {
        title: '新增仓库',
        hideMenu: true,
        currentActiveMenu: '/backup-management/backup-details',
      },
    },
    {
      path: 'backup-details/edit',
      name: 'BackupEdit',
      component: () => import('../../../views/backup-management/backup-details/Edit.vue'),
      meta: {
        title: '编辑仓库',
        hideMenu: true,
        currentActiveMenu: '/backup-management/backup-details',
      },
    },
    //Inventory
    {
      path: 'inventory',
      name: 'Inventory',
      component: () => import('../../../views/backup-management/inventory/index.vue'),
      meta: {
        title: '盘点',
      },
    },
    {
      path: 'inventory/add',
      name: 'InventoryAdd',
      component: () => import('../../../views/backup-management/inventory/Add.vue'),
      meta: {
        title: '新增盘点',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inventory',
      },
    },
    {
      path: 'inventory/details',
      name: 'InventoryDetails',
      component: () => import('../../../views/backup-management/inventory/InventoryDetails.vue'),
      meta: {
        title: '盘点详情',
        hideMenu: true,
        currentActiveMenu: '/backup-management/inventory',
      },
    },
  ],
};

export default setup;
