import { defHttp } from '/@/utils/http/axios';

enum Api {
  UPKEEP_STATUS = '/upkeepStats/count',
  UPKEEP_STATUS_PERCENTAGE = '/upkeepStats/percentageComplete',
  UPKEEP_STATUS_WORKORDER = '/upkeepStats/workOrderAndPeople',
  UPKEEP_STATUS_COMPLETE = '/upkeepStats/upkeepTypePercentageComplete',
  UPKEEP_STATUS_PROPORTION = '/upkeepStats/upkeepTypeProportion',
}
/* 1、保养统计 */
//保养工单数量
export const getUpkeepStatusApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS,
    params,
  });
};
//保养计划完成率
export const getUpkeepPercentagePApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS_PERCENTAGE,
    params,
  });
};
//工单返工率 工单延期率 人员变更情况分析
export const getUpkeepWorkOrderPApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS_WORKORDER,
    params,
  });
};
//保养类型完成情况
export const getUpkeepCompleteApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS_COMPLETE,
    params,
  });
};
//保养类型占比
export const getUpkeepProportionApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS_PROPORTION,
    params,
  });
};

/* 2、维修统计 */

/* 3、检修统计 */
