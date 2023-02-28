import { delJurParams, BasicPageParams, getMenuListResultModel, saveMenuRootParams } from './model';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  MENU_LIST = '/system/menu/list', // 菜单列表
  // MENU_LIST_TREE = '/ucpm/menu/tree',
  MENU_DELETE = '/system/menu/delete', // 删除菜单
  GET_MENU_LIST = '/system/auth/menu-auth',
  GET_PERM_CODE = '/system/auth/btu-auth',
  MENU_ADD = '/system/menu', // 新建菜单
  MENU_DEAIL = '/system/menu/', // 菜单详情
  MENU_EDIT = '/system/menu/edit', // 菜单修改
}

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GET_MENU_LIST });
};

export const getPermCode = () => {
  return defHttp.get<string[]>({ url: Api.GET_PERM_CODE });
};

export const menuListApi = (params: BasicPageParams) =>
  defHttp.get({
    url: Api.MENU_LIST,
    params,
  });

// export const menuListTreeApi = (params: BasicPageParams) =>
//   defHttp.get({
//     url: Api.MENU_LIST_TREE,
//     params,
//   });

export const menuDelApi = (params: delJurParams) =>
  defHttp.post({
    url: Api.MENU_DELETE,
    params,
  });

export const menuAddApi = (params: saveMenuRootParams) =>
  defHttp.post({
    url: Api.MENU_ADD,
    params,
  });

export const menuDetailApi = (id) =>
  defHttp.get({
    url: Api.MENU_DEAIL + id,
  });
export const menuEditApi = (params: saveMenuRootParams) =>
  defHttp.post({
    url: Api.MENU_EDIT,
    params,
  });
