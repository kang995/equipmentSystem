import { defHttp } from '/@/utils/http/axios';

enum Api {
  INVENTORY_LIST = '/deviceTakeStock/list', //盘点单列表
  INVENTORY_DETAIL = '/deviceTakeStock/detail', //备件详情信息
  INVENTORY_ADD = '/deviceTakeStock/save', //备件新增
  INVENTORY_REMOVE = '/deviceTakeStock/remove', //删除
  INVENTORY_DISCARD = '/deviceTakeStock/cancellation', //作废
  INVENTORY_ISSUE = '/deviceTakeStock/issue', //下发
  INVENTORY_EXPORT = '/deviceTakeStock/export', //批量导出
}
//分页动态查询备件列表
export const postTakeStockListApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_LIST,
    params,
  });
//备件详情信息
export const postTakeStockDetailApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_DETAIL,
    params,
  });
//备件新增
export const postTakeStockAddApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_ADD,
    params,
  });
//删除
export const postTakeStockIssueApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_ISSUE,
    params,
  });
//下发
export const postTakeStockRemoveApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_REMOVE,
    params,
  });
//作废
export const postTakeStockCancellationApi = (params) =>
  defHttp.post({
    url: Api.INVENTORY_DISCARD,
    params,
  });
//批量导出
export const exportTakeStockApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.INVENTORY_EXPORT,
    },
    { isTransformResponse: false },
  );
