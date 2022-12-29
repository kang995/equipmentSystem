import { defHttp } from '/@/utils/http/axios';

enum Api {
  FAULT_LIST_ADD = '/trouble/save', //故障管理新增
}

/* 1、故障管理 */
//新增故障管理
export const putFaultListApi = (params) =>
  defHttp.post({
    url: Api.FAULT_LIST_ADD,
    params,
  });

/* 2、故障确认 */
