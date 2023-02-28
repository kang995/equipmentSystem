import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams } from './model';

enum Api {
  ROLE_LIST = '/system/role/roleList', // 查询角色列表
  ADD_ROLE_LIST = '/system/role/add', // 新增角色
  UPDATE_ROLE = '/system/role/update', // 修改角色
  DELETE_ROLE_LIST = '/system/role/remove', //删除角色
  DETAIL_ROLE = '/system/role/roleInfo/', // 角色详情
  GET_USER_ROLE = '/system/user/selectUserList', //获取穿梭框用户列表
  ROLE_ADD_USER = '/system/role/addUser/', // 角色添加用户成员
  USER_ROLE_DETAIL = '/system/role/checkedUser/', // 选中的用户
  ROLE_DETAIL_TREE = '/system/role/roleInfo/', // 根据id查询角色
  ROLE_ADD_MENU = '/system/role/addMenu', // 角色添加权限
  ROLE_MENU_DETAIL = '/system/role/checkedMenus/', // 角色选中的权限
  //部门
  SELECT_DEPT = '/system/dept/treeselect', // 部门下拉树列表
}

// 角色选中的权限
export const getRoleMenuDetail = (id: string) =>
  defHttp.get({
    url: Api.DETAIL_ROLE + id,
  });
// 角色添加权限
export const addRoleMenuDetail = (params) =>
  defHttp.post({
    url: Api.ROLE_ADD_MENU,
    params,
  });
// 根据id查询角色
export const getRoleTreeDetail = (id: string) =>
  defHttp.get({
    url: Api.ROLE_DETAIL_TREE + id,
  });
// 选中的用户
export const getRoleUserApi = (id: string) =>
  defHttp.get({
    url: Api.USER_ROLE_DETAIL + id,
  });
// 角色添加用户成员
export const addRoleUserApi = (id: string, params) =>
  defHttp.post({
    url: Api.ROLE_ADD_USER + id,
    params,
  });
// 查询角色列表
export const getSelectUserListApi = () =>
  defHttp.get({
    url: Api.GET_USER_ROLE,
  });
// 查询角色列表
export const getRoleManagementListApi = (params: BasicPageParams) =>
  defHttp.post({
    url: Api.ROLE_LIST,
    params,
  });
// 新增角色
export const addRoleApi = (params) =>
  defHttp.post({
    url: Api.ADD_ROLE_LIST,
    params,
  });
// 编辑角色
export const editRoleApi = (params) =>
  defHttp.put({
    url: Api.UPDATE_ROLE,
    params,
  });
// 角色详情
export const detailRoleApi = (id: string) =>
  defHttp.get({
    url: Api.DETAIL_ROLE + id,
  });
// 删除角色
export const deleteRoleApi = (params) =>
  defHttp.post({
    url: Api.DELETE_ROLE_LIST,
    params,
  });

//  获取部门下拉树列表
export const getDeptTreeApi = () =>
  defHttp.get({
    url: Api.SELECT_DEPT,
  });
