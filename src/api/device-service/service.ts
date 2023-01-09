import { defHttp } from '/@/utils/http/axios';

enum Api {
  //检修工单
  UPKEEP_WORKORDER_LIST = '/overhaulWorkOrder/list', //分页查询工单列表
  UPKEEP_WORKORDER_EXPORT = '/overhaulWorkOrder/export', //检修工单列表批量导出
  UPKEEP_WORKORDER_DETASILS = '/upkeepWorkOrder/detail', //保养工单详情

  //检修工单验收
}

/* 1、检修工单 */
//分页查询工单列表
export const UpkeepWorkOrderListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_LIST,
    params,
  });
//检修工单列表批量导出
export const UpkeepWorkOrderExportApi = (params) =>
  defHttp.post(
    {
      url: Api.UPKEEP_WORKORDER_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );

//保养工单详情
export const UpkeepWorkOrderDetailsApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_DETASILS,
    params,
  });

/* 2、检修工单验收 */
