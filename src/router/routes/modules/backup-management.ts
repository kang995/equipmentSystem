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
    title: '备份管理',
  },
  children: [
    {
      path: 'backup',
      name: 'Backup',
      component: () => import('../../../views/backup-management/backup/index.vue'),
      meta: {
        title: '备份管理',
      },
    },
    {
      path: 'backup/details',
      name: 'BackupDetails',
      component: () => import('../../../views/backup-management/backup/Details.vue'),
      meta: {
        title: '设备设施详情',
        hideMenu: true,
      },
    },
    {
      path: 'inbound-and-outbound',
      name: 'inboundAndOutbound',
      component: () => import('../../../views/backup-management/inbound-and-outbound/index.vue'),
      meta: {
        title: '备份出入库',
      },
    },
    {
      path: 'inbound-and-outbound/details',
      name: 'inboundAndOutboundDetails',
      component: () => import('../../../views/backup-management/inbound-and-outbound/Details.vue'),
      meta: {
        title: '机械设备台账详情',
        hideMenu: true,
      },
    },
    {
      path: 'backup-details',
      name: 'backupDetailsList',
      component: () => import('../../../views/backup-management/backup-details/index.vue'),
      meta: {
        title: '特种设备台账',
      },
    },
    {
      path: 'backup-details/details',
      name: 'backupDetails',
      component: () => import('../../../views/backup-management/backup-details/Details.vue'),
      meta: {
        title: '特种设备台账详情',
        hideMenu: true,
      },
    },
  ],
};

export default setup;
