import { defHttp } from '/@/utils/http/axios';
import { UserGroupParams, UserGroupAddParams } from './model';

enum Api {
  USER_GROUP_LIST = '/system/group/list', //查询用户组列表
  USER_GROUP_ADD = '/system/group/add', //新增用户组
  USER_GROUP_MODIFY = '/system/group/edit', //修改
  USER_GROUP_DETAIL = '/system/group/', //获取详情
  USER_GROUP_DELETE = '/system/group/delete', //删除
  GROUP_ADD_PERM = '/system/group/addPerm', // 用户组添加权限
  GROUP_PERM_DETAIL = '/system/group/', // 获取用户组详细信息
  GROUP_SAVE_USER = '/system/group/saveUserAndGroups/', // 保存用户与用户组关联表
  GROUP_USER_DETAIL = '/system/group/getUserGroupTree/', // 添加用户成员时获取用户列表和已选中用户
  GROUP_GET_USER = '/system/group/getUserByGroupId/', // 通过用户组ID查询用户
}
// 添加用户成员时获取用户列表和已选中用户
export const getUserByGroupId = (id: string) =>
  defHttp.post({
    url: Api.GROUP_GET_USER + id,
  });
// 添加用户成员时获取用户列表和已选中用户
export const getUserGroupTree = (id: string) =>
  defHttp.post({
    url: Api.GROUP_USER_DETAIL + id,
  });
// 保存用户与用户组关联表
export const saveUserAndGroups = (id: string, params) =>
  defHttp.post({
    url: Api.GROUP_SAVE_USER + id,
    params,
  });
// 用户组添加权限详情
export const detailPermGroupApi = (id: string) =>
  defHttp.post({
    url: Api.GROUP_PERM_DETAIL + id,
  });
// 用户组添加权限
export const addPermGroupApi = (params) =>
  defHttp.post({
    url: Api.GROUP_ADD_PERM,
    params,
  });
//查询用户组列表
export const getUserGroupListApi = (params: UserGroupParams) =>
  defHttp.post({
    url: Api.USER_GROUP_LIST,
    params,
  });
//新增用户组
export const getUserGroupAddApi = (params: UserGroupAddParams) =>
  defHttp.post({
    url: Api.USER_GROUP_ADD,
    params,
  });
//修改
export const putUserGroupModifyApi = (params: UserGroupAddParams) =>
  defHttp.post({
    url: Api.USER_GROUP_MODIFY,
    params,
  });
//获取详情
export const getUserGroupDetailApi = (id: string) =>
  defHttp.post({
    url: Api.USER_GROUP_DETAIL + id,
  });
//删除用户组
export const deleteUserGroupApi = (params) =>
  defHttp.post({
    url: Api.USER_GROUP_DELETE,
    params,
  });
