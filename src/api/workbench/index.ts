import { defHttp } from '/@/utils/http/axios';

enum Api {
  NOTI_LIST = '/system/notify/list', //   消息通知列表
  NOTI_DETAIL = '/system/notify/detail/', //详情
  NOTI_STATE = '/system/notify/updateState', //修改状态
  NOTI_REMOVE = '/system/notify/remove', // 删除
  NOTI_UNREAD = '/system/notify/unread', // 未读消息数量
  DATAOVERVIEW = '/workbench/dataOverview', //数据概览
  DATAOVERVIEW_ORDER = '/workbench/workOrderTrend', //工单趋势
}

export const notificationRemoveApi = (params) =>
  defHttp.post({
    url: Api.NOTI_REMOVE,
    params,
  });

export const notificationUpdateStateApi = (params) =>
  defHttp.post({
    url: Api.NOTI_STATE,
    params,
  });

export const notificationDetailApi = (id: string) =>
  defHttp.get({
    url: Api.NOTI_DETAIL + id,
  });

export const notificationApi = (params?: any) =>
  defHttp.post({
    url: Api.NOTI_LIST,
    params,
  });

export const noteUnreadApi = () =>
  defHttp.post({
    url: Api.NOTI_UNREAD,
  });

export const dataViewApi = (params) =>
  defHttp.post({
    url: Api.DATAOVERVIEW,
    params,
  });
export const dataOrderApi = (params) =>
  defHttp.post({
    url: Api.DATAOVERVIEW_ORDER,
    params,
  });
