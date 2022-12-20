import { defHttp } from '/@/utils/http/axios';

enum Api {
  DETAIL_LIST = '/deviceWarehouse/list', //仓库列表
  DETAIL_ADD = '/deviceWarehouse/save', //新增
  DETAIL_EDIT = '/deviceWarehouse/update', //修改
  DETAIL_REMOVE = '/deviceWarehouse/remove', //删除
  DETAIL_LIST_SPARE = '/deviceWarehouse/spare/list', //查询库存详情列表
}
//查询库存详情列表
export const posWarehouseSpareApi = (params) =>
  defHttp.post({
    url: Api.DETAIL_LIST_SPARE,
    params,
  });
//分页动态查询 仓库列表
export const postWarehouseListApi = (params?) =>
  defHttp.post({
    url: Api.DETAIL_LIST,
    params,
  });

// 新增
export const posWarehouseAddApi = (params) =>
  defHttp.post({
    url: Api.DETAIL_ADD,
    params,
  });
// 修改
export const posWarehouseEditApi = (params) =>
  defHttp.post({
    url: Api.DETAIL_EDIT,
    params,
  });
//删除
export const posWarehouseRemoveApi = (params) =>
  defHttp.post({
    url: Api.DETAIL_REMOVE,
    params,
  });
