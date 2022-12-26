import { defHttp } from '/@/utils/http/axios';

enum Api {
  UPKEEP_LIST = '/upkeepWorkOrder/list', //工单列表
}

export const getPlanListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_LIST,
    params,
  });
