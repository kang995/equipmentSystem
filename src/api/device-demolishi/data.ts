import { defHttp } from '/@/utils/http/axios';
enum Api {
  DEVICE_SCRAP_LIST = '/demolish/list',
  EXPORT_DATA = '/demolish/export',
  DELETE_LIST = '/demolish/remove',
  REVOKE = '/demolish/undo',
  ADD_LIST = '/demolish/save',
  DETAILS = '/demolish/detail',
  EDIT_LIST = '/demolish/update',
}
export const getDemolishiListApi = (params) =>
  defHttp.post({
    url: Api.DEVICE_SCRAP_LIST,
    params,
  });
export const deleteListApi = (params) =>
  defHttp.post({
    url: Api.DELETE_LIST,
    params,
  });
export const exportPlanDataApi = (params) =>
  defHttp.post(
    {
      url: Api.EXPORT_DATA,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );

export const revokeListApi = (params) =>
  defHttp.post({
    url: Api.REVOKE,
    params,
  });
export const addListApi = (params) =>
  defHttp.post({
    url: Api.ADD_LIST,
    params,
  });
export const getDetailsApi = (params) =>
  defHttp.post({
    url: Api.DETAILS,
    params,
  });
export const editListApi = (params) =>
  defHttp.post({
    url: Api.EDIT_LIST,
    params,
  });
