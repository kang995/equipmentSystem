import { defHttp } from '/@/utils/http/axios';

enum Api {
  LIBRARY_LIST = '/deviceInOutReceipt/list', //出-入库列表 receiptType	列表类型：0入库，1出库
  LIBRARY_DETAIL = '/deviceInOutReceipt/detail', //详情信息
  LIBRARY_ADD = '/deviceInOutReceipt/save', //新增
  // LIBRARY_EDIT = '', //修改
  LIBRARY_REMOVE = '/deviceInOutReceipt/remove', //删除
  LIBRARY_REMOVE_BATCH = '/deviceInOutReceipt/batch/remove', //批量删除
  // LIBRARY_EXPORT = '', //批量导出
}
//分页动态查询 列表
export const postLibraryApi = (params) =>
  defHttp.post({
    url: Api.LIBRARY_LIST,
    params,
  });
// 详情信息
export const posLibraryDetailApi = (params) =>
  defHttp.post({
    url: Api.LIBRARY_DETAIL,
    params,
  });
// 新增
export const posLibraryAddApi = (params) =>
  defHttp.post({
    url: Api.LIBRARY_ADD,
    params,
  });
// 修改
// export const posLibraryEditApi = (params) =>
//   defHttp.post({
//     url: Api.OUT_RECEIPT_EDIT,
//     params,
//   });
//删除
export const posLibraryRemoveApi = (params) =>
  defHttp.post({
    url: Api.LIBRARY_REMOVE,
    params,
  });
//批量删除
export const posLibraryBatchRemoveApi = (params) =>
  defHttp.post({
    url: Api.LIBRARY_REMOVE_BATCH,
    params,
  });
//批量导出
// export const exporLibraryApi = (params) =>
//   defHttp.post(
//     {
//       responseType: 'arraybuffer',
//       params,
//       url: Api.OUT_RECEIPT_EXPORT,
//     },
//     { isTransformResponse: false },
//   );
