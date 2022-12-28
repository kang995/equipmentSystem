import { defHttp } from '/@/utils/http/axios';

enum Api {
  //特种设备台账
  SPECIAL_LIST = '/special/list', // 分页查询特种设备列表
  DETAIL = '/special/detail', //特种设备详情
  SPECIAL_EDIT = '/special/update', //修改
  SPECIAL_EXPORT = '/special/export', //批量导出
  ADD = '/special/save', //新增
  SELECT_STATE = '/special/deviceName/select', //设备名称-下拉查询
}
//分页查询特种设备列表
export const postSpecialListApi = (params) =>
  defHttp.post({
    url: Api.SPECIAL_LIST,
    params,
  });
///特种设备详情
export const postSpecialDetailApi = (params) =>
  defHttp.post({
    url: Api.DETAIL,
    params,
  });
//修改
export const postSpecialEditApi = (params) =>
  defHttp.post({
    url: Api.SPECIAL_EDIT,
    params,
  });
//批量导出
export const postSpecialExportApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.SPECIAL_EXPORT,
    },
    { isTransformResponse: false },
  );
//新增
export const postSpecialAddApi = (params) =>
  defHttp.post({
    url: Api.ADD,
    params,
  });
//设备名称-下拉查询
export const postSpecialSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT_STATE,
    params,
  });
