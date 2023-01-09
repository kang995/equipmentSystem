import { defHttp } from '/@/utils/http/axios';
enum Api {
  DEVICE_SCRAP_LIST = '/scrap/list',
  EXPORT_DATA = '/scrap/export',
  DELETE_LIST = '/scrap/remove',
  REVOKE = '/scrap/undo',
  TREE = '/special/device/tree/select',
  ADD_LIST = '/scrap/save',
  DETAILS = '/scrap/detail',
  EDIT_LIST = '/scrap/update',
}
export const getScrapListApi = (params) =>
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
export const treeListApi = (params?) =>
  defHttp.post({
    url: Api.TREE,
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
