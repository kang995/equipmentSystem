import { defHttp } from '/@/utils/http/axios';

enum Api {
  DEVICE_TREE_SELECT = '/special/device/tree/select', //查询区域-装置设施-设备树
  TROUBLE_LIST = '/trouble/list', //故障列表
  TROUBLE_EXPORT = '/trouble/export', //故障列表批量导出
  TROUBLE_REMOVE = '/trouble/remove', //故障删除
  FAULT_LIST_ADD = '/trouble/save', //故障管理新增
  FAULT_LIST_UPDATE = '/trouble/update', //故障管理修改
  TROUBLE_DETAIL = '/trouble/detail', //故障详情
}

/* 1、故障管理 */
//设备树
export const deviceTreeSelectApi = () =>
  defHttp.post({
    url: Api.DEVICE_TREE_SELECT,
    // params,
  });
//故障列表
export const TroubleListApi = (params) =>
  defHttp.post({
    url: Api.TROUBLE_LIST,
    params,
  });
//故障列表批量导出
export const TroubleExportApi = (params) =>
  defHttp.post(
    {
      url: Api.TROUBLE_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//故障删除
export const TroubleRemoveApi = (params) =>
  defHttp.post({
    url: Api.TROUBLE_REMOVE,
    params,
  });
//新增故障管理
export const putFaultAddListApi = (params) =>
  defHttp.post({
    url: Api.FAULT_LIST_ADD,
    params,
  });
//故障管理修改
export const putFaultUpdateListApi = (params) =>
  defHttp.post({
    url: Api.FAULT_LIST_UPDATE,
    params,
  });
//故障详情
export const TroubleDetailApi = (params) =>
  defHttp.post({
    url: Api.TROUBLE_DETAIL,
    params,
  });

/* 2、故障确认 */
