import { defHttp } from '/@/utils/http/axios';
enum Api {
  DEVICE_SCRAP_LIST = '/demolishRecord/list',
  EXPORT_DATA = '/demolishRecord/export',
  DELETE_LIST = '/demolishRecord/remove',
  REVOKE = '/scrap/undo',
  ADD_LIST = '/demolishRecord/save',
  DETAILS = '/demolishRecord/detail',
  EDIT_LIST = '/demolishRecord/update',
  SELECT = '/demolish/demolishCode/select',
}
export const getRecordListApi = (params) =>
  defHttp.post({
    url: Api.DEVICE_SCRAP_LIST,
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
export const deleteListApi = (params) =>
  defHttp.post({
    url: Api.DELETE_LIST,
    params,
  });
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
export const getSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT,
    params,
  });
