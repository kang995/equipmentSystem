import { defHttp } from '/@/utils/http/axios';

enum Api {
  UPKEEP_LIST = '/upkeepWorkOrder/list', //工单列表
  UPKEEP_EXPORT = '/upkeepWorkOrder/export', //工单列表批量导出
}

/* 保养工单 */
export const getPlanListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_LIST,
    params,
  });
export const upkeepExportApi = (params) =>
  defHttp.post(
    {
      url: Api.UPKEEP_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
/* 保养验收 */
