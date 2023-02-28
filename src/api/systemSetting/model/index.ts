import type { RouteMeta } from 'vue-router';

export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}
export interface DictionarySelectParams {
  parentId: number;
  page?: number;
  pageSize?: number;
  itemName?: string;
  type?: string;
}
export interface DictionaryAddParams {
  id?: number;
  parentId: number;
  itemName: string;
  itemValue: string;
  type: string;
}
export interface DictionarySelectTypeParams {
  type: string;
}
//用户
export interface UserParams {
  comId: string;
  userName: string;
  nickName: string;
  deptId: string;
  createTime: string;
  statusName: string;
  userGroup: string;
  userId: string;
  children: string;
  roleId: string;
}
//用户组
export interface UserGroupParams {
  id?: string;
  comId: string;
  name: string;
  userName: string;
  nickName: string;
  deptId: string;
  createTime: string;
  statusName: string;
  userGroup: string;
  userId: string;
}
export interface UserGroupAddParams {
  id?: string;
  comId: string;
  name: string;
  deptId: string;
  createTime: string;
  dataScope: string;
  remark: string;
  delFlag: string;
}
export interface getInvokeUserAdd {
  status?: string;
  ids?: string[];
}
export interface delJurParams {
  menuList: Array<string>;
}
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}
export type getMenuListResultModel = RouteItem[];

export interface saveMenuRootParams {
  id?: string;
  menuType: number;
  parentId?: number;
  name: string;
  clientCode: string;
  sortNo: number;
  icon: string;
  path: string;
  perms?: string;
  enabled: number;
  isOutUrl: number;
  hidden: number;
}
