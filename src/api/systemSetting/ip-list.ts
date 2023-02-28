import { defHttp } from '/@/utils/http/axios';
// 接口
enum Api {
  IP_LIST = '/system/ipInfo/list', //分页查询
  IP_ADD = '/system/ipInfo/add',
  IP_UPDATE = '/system/ipInfo/update', // 修改
  IP_DETAIL = '/system/ipInfo/detail', //详细信息
  IP_IDENTITY = '/system/ipInfo/editIdentity', //移入黑白名单
  IP_DELETE = '/system/ipInfo/delete', //ip黑白名单表删除
  IP_CONTROL = '/system/ipInfo/power', //获取当前访问模式
  IP_CONTROL_EDIT = '/system/ipInfo/power/update', //更新控制访问模式
}
//获取当前访问模式
export const getIpControlApi = () => {
  return defHttp.post({
    url: Api.IP_CONTROL,
  });
};

//修改访问模式
export const postEditIpControlApi = (params) => {
  return defHttp.post({
    url: Api.IP_CONTROL_EDIT,
    params,
  });
};

//分页查询
export const postIpInfoList = (params) =>
  defHttp.post({
    url: Api.IP_LIST,
    params,
  });
export const postIpInfoAdd = (params) =>
  defHttp.post({
    url: Api.IP_ADD,
    params,
  });
export const postIpInfoDetail = (params) =>
  defHttp.post({
    url: Api.IP_DETAIL,
    params,
  });
export const postIpInfoUpdate = (params) =>
  defHttp.post({
    url: Api.IP_UPDATE,
    params,
  });
export const postEditIdentity = (params) =>
  defHttp.post({
    url: Api.IP_IDENTITY,
    params,
  });
export const postIpDelete = (params) =>
  defHttp.post({
    url: Api.IP_DELETE,
    params,
  });
