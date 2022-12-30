import { defHttp } from '/@/utils/http/axios';

enum Api {
  DEVICE_TREE_SELECT = '/special/device/tree/select', //查询区域-装置设施-设备树
  FAULT_LIST_ADD = '/trouble/save', //故障管理新增
}

/* 1、故障管理 */
//设备树
export const deviceTreeSelectApi = () =>
  defHttp.post({
    url: Api.DEVICE_TREE_SELECT,
    // params,
  });
//新增故障管理
export const putFaultListApi = (params) =>
  defHttp.post({
    url: Api.FAULT_LIST_ADD,
    params,
  });

/* 2、故障确认 */
