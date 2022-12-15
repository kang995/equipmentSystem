import { defHttp } from '/@/utils/http/axios';
import { UserGroupParams, UserGroupAddParams } from './model';

enum Api {
  USER_GROUP_LIST = '/management/group/list', //查询用户组列表
  USER_GROUP_ADD = '/management/group/', //新增用户组
  USER_GROUP_MODIFY = '/management/group', //修改
  USER_GROUP_DETAIL = '/management/group/', //获取详情
  USER_GROUP_DELETE = '/management/group/delete', //删除
  GROUP_ADD_PERM = '/management/group/addPerm', // 用户组添加权限
  GROUP_PERM_DETAIL = '/management/group/', // 获取用户组详细信息
  GROUP_SAVE_USER = '/management/group/saveUserAndGroups/', // 保存用户与用户组关联表
  GROUP_USER_DETAIL = '/management/group/getUserGroupTree/', // 添加用户成员时获取用户列表和已选中用户
  GROUP_GET_USER = '/management/group/getUserByGroupId/', // 通过用户组ID查询用户
}
// 添加用户成员时获取用户列表和已选中用户
export const getUserByGroupId = (id: string) =>
  defHttp.get({
    url: Api.GROUP_GET_USER + id,
  });
// 添加用户成员时获取用户列表和已选中用户
export const getUserGroupTree = (id: string) =>
  defHttp.get({
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
  defHttp.get({
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
  defHttp.get({
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
  defHttp.put({
    url: Api.USER_GROUP_MODIFY,
    params,
  });
//获取详情
export const getUserGroupDetailApi = (id: string) =>
  defHttp.get({
    url: Api.USER_GROUP_DETAIL + id,
  });
//删除用户组
export const deleteUserGroupApi = (params) =>
  defHttp.post({
    url: Api.USER_GROUP_DELETE,
    params,
  });
