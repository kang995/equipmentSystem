import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const systemSetting: AppRouteModule = {
  path: '/system-setting',
  name: 'systemSetting',
  component: LAYOUT,
  redirect: '/system-setting/user-management',
  meta: {
    icon: 'gonggong_xitongshezhi|svg',
    title: '系统设置',
    orderNo: 100000,
  },
  children: [
    {
      path: 'user-management',
      name: 'UserManagement',
      component: () => import('/@/views/system-setting/user-management/index.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'user/add',
      name: 'UserAdd',
      component: () => import('/@/views/system-setting/user-management/Add.vue'),
      meta: {
        title: '用户管理新建',
        hideMenu: true,
        currentActiveMenu: '/system-setting/user-management',
      },
    },
    {
      path: 'user/detail',
      name: 'UserDetail',
      component: () => import('/@/views/system-setting/user-management/Detail.vue'),
      meta: {
        title: '用户管理详情',
        hideMenu: true,
        currentActiveMenu: '/system-setting/user-management',
      },
    },
    {
      path: 'user/edit',
      name: 'UserEdit',
      component: () => import('/@/views/system-setting/user-management/Edit.vue'),
      meta: {
        title: '用户管理编辑',
        hideMenu: true,
        currentActiveMenu: '/system-setting/user-management',
      },
    },
    {
      path: 'userGroup',
      name: 'UserGroup',
      component: () => import('/@/views/system-setting/user-group/index.vue'),
      meta: {
        title: '用户组管理',
        orderNo: 2,
      },
    },
    {
      path: 'userGroup/add',
      name: 'UserGroupAdd',
      component: () => import('/@/views/system-setting/user-group/Add.vue'),
      meta: {
        title: '用户组管理新建',
        hideMenu: true,
        currentActiveMenu: '/system-setting/userGroup',
      },
    },
    {
      path: 'userGroup/detail/',
      name: 'UserGroupDetail',
      component: () => import('/@/views/system-setting/user-group/Detail.vue'),
      meta: {
        title: '用户组管理详情',
        hideMenu: true,
        currentActiveMenu: '/system-setting/userGroup',
      },
    },
    {
      path: 'userGroup/edit/',
      name: 'UserGroupEdit',
      component: () => import('/@/views/system-setting/user-group/Edit.vue'),
      meta: {
        title: '用户组管理编辑',
        hideMenu: true,
        currentActiveMenu: '/system-setting/userGroup',
      },
    },
    //AddPermission
    {
      path: 'userGroup/addPermission',
      name: 'AddUserPermission',
      component: () => import('/@/views/system-setting/user-group/AddPermission.vue'),
      meta: {
        title: '用户组管理添加权限',
        hideMenu: true,
        currentActiveMenu: '/system-setting/userGroup',
      },
    },

    {
      path: 'role-management',
      name: 'RoleManagement',
      component: () => import('/@/views/system-setting/role-management/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'role-management/add',
      name: 'roleManagementAdd',
      component: () => import('/@/views/system-setting/role-management/Add.vue'),
      meta: {
        title: '角色管理新建',
        hideMenu: true,
        currentActiveMenu: '/system-setting/role-management',
      },
    },
    {
      path: 'role-management/detail',
      name: 'roleManagementDetail',
      component: () => import('/@/views/system-setting/role-management/Detail.vue'),
      meta: {
        title: '角色管理详情',
        hideMenu: true,
        currentActiveMenu: '/system-setting/role-management',
      },
    },
    {
      path: 'role-management/edit',
      name: 'roleManagementEdit',
      component: () => import('/@/views/system-setting/role-management/Edit.vue'),
      meta: {
        title: '角色管理编辑',
        hideMenu: true,
        currentActiveMenu: '/system-setting/role-management',
      },
    },
    {
      path: 'role-management/addPermission',
      name: 'AddRolePermission',
      component: () => import('/@/views/system-setting/components/AddPermission.vue'),
      meta: {
        title: '角色管理添加权限',
        hideMenu: true,
        currentActiveMenu: '/system-setting/role-management',
      },
    },
    {
      path: 'menu-management',
      name: 'MenuManagement',
      component: () => import('/@/views/system-setting/menu-management/index.vue'),
      meta: {
        title: '菜单管理',
      },
    },
    {
      path: 'menu-management/add',
      name: 'menuManagementAdd',
      component: () => import('/@/views/system-setting/menu-management/Add.vue'),
      meta: {
        title: '新增菜单',
        hideMenu: true,
        hideBreadcrumb: true,
        currentActiveMenu: '/system-setting/menu-management',
      },
    },
    {
      path: 'menu-management/edit',
      name: 'menuManagementEdit',
      component: () => import('/@/views/system-setting/menu-management/Edit.vue'),
      meta: {
        title: '编辑菜单',
        hideMenu: true,
        hideBreadcrumb: true,
        currentActiveMenu: '/system-setting/menu-management',
      },
    },
    {
      path: 'ip-listManage',
      name: 'ip-listManage',
      component: LAYOUT,
      meta: {
        title: 'IP黑白名单管理',
        orderNo: 6,
      },
      children: [
        {
          path: 'ip-list-set',
          name: 'IpListSet',
          component: () => import('/@/views/system-setting/ip-list/index.vue'),
          meta: {
            title: '黑白名单设置',
            orderNo: 1,
          },
        },
        {
          path: 'accessControl',
          name: 'AccessControl',
          component: () => import('/@/views/system-setting/accessControl/index.vue'),
          meta: {
            title: '访问控制',
            orderNo: 2,
          },
        },
        {
          path: 'roster-create',
          name: 'RosterCreate',
          component: () => import('/@/views/system-setting/ip-list/RosterCreate.vue'),
          meta: {
            title: '新增黑名单',
            hideMenu: true,
            hideBreadcrumb: true,
            currentActiveMenu: '/system-setting/menu-management',
          },
        },
        {
          path: 'roster-create/edit',
          name: 'RosterEdit',
          component: () => import('/@/views/system-setting/ip-list/RosterEdit.vue'),
          meta: {
            title: '编辑黑名单',
            hideMenu: true,
            hideBreadcrumb: true,
            currentActiveMenu: '/system-setting/menu-management',
          },
        },
        {
          path: 'roster-create-white',
          name: 'RosterCreateWhite',
          component: () => import('/@/views/system-setting/ip-list/RosterCreateWhite.vue'),
          meta: {
            title: '新增白名单',
            hideMenu: true,
            hideBreadcrumb: true,
            currentActiveMenu: '/system-setting/menu-management',
          },
        },
        {
          path: 'roster-create-white/edit',
          name: 'RosterCreateWhiteEdit',
          component: () => import('/@/views/system-setting/ip-list/RosterCreateWhite.vue'),
          meta: {
            title: '编辑白名单',
            hideMenu: true,
            hideBreadcrumb: true,
            currentActiveMenu: '/system-setting/menu-management',
          },
        },
      ],
    },
    {
      path: 'dictionary-type',
      name: 'DictionaryType',
      component: () => import('/@/views/system-setting/dictionary-type/index.vue'),
      meta: {
        title: '字典管理',
      },
    },
    {
      path: 'operation',
      name: 'Operation',
      component: () => import('/@/views/system-setting/operation/index.vue'),
      meta: {
        title: '操作日志',
      },
    },
  ],
};

export default systemSetting;
