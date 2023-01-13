import { defHttp } from '/@/utils/http/axios';

enum Api {
  BACKUP_LIST = '/sparePart/list', //分页动态查询备件列表
  BACKUP_OUTLIST = '/sparePart/out/list', //出库查询备件列表
  BACKUP_DETAIL = '/sparePart/detail', //备件详情信息

  SPARE_PART_INFO = '/sparePart/detail', //备件基础详情信息
  SPARE_PART_LIST = '/sparePart/device/list', //根据备件id查询关联设备列表
  SPARE_PART_INVENTORY = '/sparePart/inventory/list', //根据备件id查询库存信息
  SPARE_PART_INOUT = '/sparePart/inout/list', //根据备件id分页查询出入库列表

  BACKUP_ADD = '/sparePart/save', //备件新增
  BACKUP_EDIT = '/sparePart/update', //备件修改
  BACKUP_REMOVE = '/sparePart/remove', //删除
  BACKUP_EXPORT = '/sparePart/export', //批量导出
  TREE_LIST = '/special/device/tree/select', //查询区域-装置设施-设备树
  TREE_LIST_IDS = '/special/selectDeviceListByIds', //根据设备ids查询设备
  IMPORT = '/sparePart/import', // 导入
  IMPORTTEMPLATE = '/sparePart/template',
}
//根据设备ids查询设备
export const postTreeSelectIdsApi = (params) =>
  defHttp.post({
    url: Api.TREE_LIST_IDS,
    params,
  });
//查询区域-装置设施-设备树
export const postTreeSelectApi = () =>
  defHttp.post({
    url: Api.TREE_LIST,
  });
//分页动态查询备件列表(入库)
export const postBackupListApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_LIST,
    params,
  });
//出库查询备件列表
export const postBackupOutListApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_OUTLIST,
    params,
  });

//备件详情信息
export const postBackupDetailApi = (params) =>
  defHttp.post({
    url: Api.BACKUP_DETAIL,
    params,
  });

//备件详情--基本信息
export const postBackupInfolApi = (params) =>
  defHttp.post({
    url: Api.SPARE_PART_INFO,
    params,
  });
//备件详情--关联设备
export const postBackupListlApi = (params) =>
  defHttp.post({
    url: Api.SPARE_PART_LIST,
    params,
  });
//备件详情--库存
export const postBackupInventorylApi = (params) =>
  defHttp.post({
    url: Api.SPARE_PART_INVENTORY,
    params,
  });
//备件详情--出入库明细
export const postBackupInoutApi = (params) =>
  defHttp.post({
    url: Api.SPARE_PART_INOUT,
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
