import { defHttp } from '/@/utils/http/axios';

enum Api {
  //出库
  OUT_LIST = '/deviceOutReceipt/list', //出库列表
  OUT_DETAIL = '/deviceOutReceipt/detail', //出库详情信息
  OUT_DISCARD = '/deviceOutReceipt/discard', //出库作废
  OUT_REMOVE = '/deviceOutReceipt/remove', //出库删除
  OUT_EXPORT = '/deviceOutReceipt/export', //出库批量导出
  OUT_REMOVE_BATCH = '/deviceOutReceipt/batch/remove', //出库批量删除
  OUT_ADD = '/deviceOutReceipt/save', //出库新增

  //入库
  IN_LIST = '/deviceInReceipt/list', //入库列表
  IN_EXPORT = '/deviceInReceipt/export', //出入库列表批量导出
  IN_DISCARD = '/deviceInReceipt/discard', //入库作废
  IN_DETAIL = '/deviceInReceipt/detail', // 入库详情
  IN_REMOVE_BATCH = '/deviceInReceipt/batch/remove', // 入库批量删除
  IN_REMOVE = '/deviceInReceipt/remove', // 入库删除
  IN_ADD = '/deviceInReceipt/save', // 入库新增
  //查询库存详情
  SPARE_LIST = '/deviceWarehouse/spare/list', //分页动态查询库存详情列表
  IMPORT = '/deviceOutReceipt/import', // 导入
  IMPORTTEMPLATE = '/deviceOutReceipt/template',
  WAREHOUSING_IMPORT = '/deviceInReceipt/import', // 导入
  WAREHOUSING_IMPORTTEMPLATE = '/deviceInReceipt/template',
}
//出库
//分页动态查询 列表
export const postOUTApi = (params) =>
  defHttp.post({
    url: Api.OUT_LIST,
    params,
  });
export const postInApi = (params) =>
  defHttp.post({
    url: Api.IN_LIST,
    params,
  });
// 详情信息
export const posOUTDetailApi = (params) =>
  defHttp.post({
    url: Api.OUT_DETAIL,
    params,
  });
export const posInDetailApi = (params) =>
  defHttp.post({
    url: Api.IN_DETAIL,
    params,
  });
// 新增
export const posOUTAddApi = (params) =>
  defHttp.post({
    url: Api.OUT_ADD,
    params,
  });
export const posInAddApi = (params) =>
  defHttp.post({
    url: Api.IN_ADD,
    params,
  });
//删除
export const posOUTRemoveApi = (params) =>
  defHttp.post({
    url: Api.OUT_REMOVE,
    params,
  });
export const posInRemoveApi = (params) =>
  defHttp.post({
    url: Api.IN_REMOVE,
    params,
  });
//作废
export const posOutDiscardApi = (params) =>
  defHttp.post({
    url: Api.OUT_DISCARD,
    params,
  });
export const posInDiscardApi = (params) =>
  defHttp.post({
    url: Api.IN_DISCARD,
    params,
  });
//批量删除
export const posOUTBatchRemoveApi = (params) =>
  defHttp.post({
    url: Api.OUT_REMOVE_BATCH,
    params,
  });
//批量导出
export const exporOUTApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.OUT_EXPORT,
    },
    { isTransformResponse: false },
  );
export const exporInApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.IN_EXPORT,
    },
    { isTransformResponse: false },
  );
//入库
//入库列表
export const posInReceiptListApi = (params) =>
  defHttp.post({
    url: Api.OUT_LIST,
    params,
  });

//查询库存详情
export const getSpareListApi = (params) =>
  defHttp.post({
    url: Api.SPARE_LIST,
    params,
  });
export const importData = (params) =>
  defHttp.post({
    url: Api.IMPORT,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });
// 下载导入模板
export const importTemplate = () =>
  defHttp.post(
    {
      url: Api.IMPORTTEMPLATE,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false },
  );
export const importWarehousingData = (params) =>
  defHttp.post({
    url: Api.WAREHOUSING_IMPORT,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });
// 下载导入模板
export const importWarehousingTemplate = () =>
  defHttp.post(
    {
      url: Api.WAREHOUSING_IMPORTTEMPLATE,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false },
  );
