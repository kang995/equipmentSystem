import { defHttp } from '/@/utils/http/axios';
import { UserParams, getInvokeUserAdd } from './model';

enum Api {
  USER_LIST = '/system/user/getUserList', //查询用户列表
  USER_ADD = '/system/user/addUser', //新增用户
  USER_GET_LIST = '/system/user/getUserGroupList', //获取用户组列表：下拉
  USER_EDIT = '/system/user/editUser', //修改
  USER_DELETE = '/system/user/delete', //删除
  USER_DEPARTMENT = '/system/user/getDeptPeopleTree', //获取部门人员树
  USER_ADD_GROUP = '/system/user/addGroup', //添加到用户组
  USER_MODAL = '/system/user/getUserGroupCheck', //获取添加用户组时用户组列表
  USER_DETAILS = '/system/user/getUserDetailById/', //用户详情
  USER_LIST_GROUP = '/system/management/group/getGroupByUserId/', //根据用户ID查询用户组信息
  INVOKE_DISABLE = '/system/user/updateState', //启用禁用用户
}
//AddUserAddApi
//查询用户列表
export const getUserListApi = (params: UserParams) =>
  defHttp.post({
    url: Api.USER_LIST,
    params,
  });
//获取用户组列表
export const getGroupListApi = () =>
  defHttp.get({
    url: Api.USER_GET_LIST,
  });
//新增用户
export const AddUserAddApi = (params: string[]) =>
  defHttp.post({
    url: Api.USER_ADD,
    params,
  });
//添加到用户组
export const getAddGroupApi = (params: UserParams) =>
  defHttp.post({
    url: Api.USER_ADD_GROUP,
    params,
  });
//修改用户基本信息
export const editUserAddApi = (params: string[]) =>
  defHttp.post({
    url: Api.USER_EDIT,
    params,
  });
//删除用户
export const deleteUserAddApi = (params: string[]) =>
  defHttp.post({
    url: Api.USER_DELETE,
    params,
  });
//获取部门人员树
export const getDepartmentListApi = () =>
  defHttp.get({
    url: Api.USER_DEPARTMENT,
  });
//获取添加用户组时用户组列表
export const getModalListApi = (params) =>
  defHttp.post({
    url: Api.USER_MODAL,
    params,
  });

//用户详情
export const getDetailsListApi = (userId: string) =>
  defHttp.get({
    url: Api.USER_DETAILS + userId,
  });
//根据用户ID查询用户组信息
export const getGroupByUserIdApi = (id: string) =>
  defHttp.get({
    url: Api.USER_LIST_GROUP + id,
  });
//启用禁用用户
export const getInvokeUserAddApi = (params: getInvokeUserAdd) =>
  defHttp.post({
    url: Api.INVOKE_DISABLE,
    params,
  });
