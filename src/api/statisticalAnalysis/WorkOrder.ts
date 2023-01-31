import { defHttp } from '/@/utils/http/axios';

enum Api {
  //1、保养统计
  UPKEEP_STATUS = '/upkeepStats/count',
  UPKEEP_STATUS_PERCENTAGE = '/upkeepStats/percentageComplete',
  UPKEEP_STATUS_WORKORDER = '/upkeepStats/workOrderAndPeople',
  UPKEEP_STATUS_COMPLETE = '/upkeepStats/upkeepTypePercentageComplete',
  UPKEEP_STATUS_PROPORTION = '/upkeepStats/upkeepTypeProportion',
  //维修统计
  TROUBLE_STATUS = '/troubleStats/count', //维修工单数量
  TROUBLE_MODE = '/troubleStats/troubleModeProportion', //维修方式占比
  TROUBLE_STATUS_MALFUNCTION = '/troubleStats/workOrderAndMalfunction', //工单返工率 工单延期率 故障等级占比
  //检修统计
  OVERHAUL_STATUS = '/overhaulStats/count', //检修工单数量
  OVERHAUL_STATUS_PERCENTAGE = '/overhaulStats/percentageComplete', //检修计划完成率
  OVERHAUL_STATUS_PROPORTION = '/overhaulStats/workOrderAndPeople', //工单返工率 工单延期率 人员变更情况分析
  //导出
  UPKEEPSTATUS_EXPORT = '/upkeepStats/upkeepStatsExport', //统计分析(保养统计全部导出)
  TROUBLESTATUS_EXPORT = '/troubleStats/troubleStatsExport', //统计分析(维修统计全部导出)
  OVERHAULSTATUS_EXPORT = '/overhaulStats/overhaulStatsExport', //统计分析(检修统计全部导出)
}

//导出
//统计分析(保养统计全部导出)
export const upkeepExportApi = (params) => {
  return defHttp.post({
    url: Api.UPKEEPSTATUS_EXPORT,
    params,
  });
};
//统计分析(维修统计全部导出)
export const troubleExportApi = (params) => {
  return defHttp.post({
    url: Api.TROUBLESTATUS_EXPORT,
    params,
  });
};
//统计分析(检修统计全部导出)
export const overhaulExportApi = (params) => {
  return defHttp.post({
    url: Api.OVERHAULSTATUS_EXPORT,
    params,
  });
};

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
export const getUpkeepProportionApi = () => {
  return defHttp.post({
    url: Api.UPKEEP_STATUS_PROPORTION,
    // params,
  });
};

/* 2、维修统计 */
//维修工单数量
export const gettroubleStatsApi = (params) => {
  return defHttp.post({
    url: Api.TROUBLE_STATUS,
    params,
  });
};
//维修方式占比
export const gettroubleStatsModeApi = (params) => {
  return defHttp.post({
    url: Api.TROUBLE_MODE,
    params,
  });
};
//工单返工率 工单延期率 故障等级占比
export const gettroubleStatsFunctionApi = (params) => {
  return defHttp.post({
    url: Api.TROUBLE_STATUS_MALFUNCTION,
    params,
  });
};

/* 3、检修统计 */
//检修工单数量
export const getOverhaulStatsApi = (params) => {
  return defHttp.post({
    url: Api.OVERHAUL_STATUS,
    params,
  });
};
//检修计划完成率
export const getOverhaulPercentageApi = (params) => {
  return defHttp.post({
    url: Api.OVERHAUL_STATUS_PERCENTAGE,
    params,
  });
};
//工单返工率 工单延期率 人员变更情况分析
export const getOverhaulWorkOrderAndPeopleApi = (params) => {
  return defHttp.post({
    url: Api.OVERHAUL_STATUS_PROPORTION,
    params,
  });
};
