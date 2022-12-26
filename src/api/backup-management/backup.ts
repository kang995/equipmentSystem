import { defHttp } from '/@/utils/http/axios';

enum Api {
  BACKUP_LIST = '/sparePart/list', //分页动态查询备件列表
  BACKUP_DETAIL = '/sparePart/detail', //备件详情信息
  BACKUP_ADD = '/sparePart/save', //备件新增
  BACKUP_EDIT = '/sparePart/update', //备件修改
  BACKUP_REMOVE = '/sparePart/remove', //删除
  BACKUP_EXPORT = '/sparePart/export', //批量导出
  TREE_LIST = '/special/device/tree/select',
}
export const postTreeSelectApi = () =>
  defHttp.post({
    url: Api.TREE_LIST,
  });
//分页动态查询备件列表
export const postBackupListApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_LIST,
    params,
  });
//备件详情信息
export const postBackupDetailApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_DETAIL,
    params,
  });
//备件新增
export const postBackupAddApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_ADD,
    params,
  });
//备件修改
export const postBackupEditApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_EDIT,
    params,
  });
//删除
export const postBackupRemoveApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_REMOVE,
    params,
  });
//批量导出
export const exportBackupApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.BACKUP_EXPORT,
    },
    { isTransformResponse: false },
  );
