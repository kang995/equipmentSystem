import { defHttp } from '/@/utils/http/axios';
import { DictionarySelectTypeParams } from './model';
enum Api {
  DICTIONARY_SELECT_TYPE = '/system/dictionary/selectDictByType', // 根据类型查询字典
  PERSON_SELECT = '/system/people/select', // 人员下拉框查询
  DEPARTMENT_SELECT = '/system/department/tree/select', //部门下拉框查询
  SELECT_PEOPLE = '/system/people/selectPeopleByDeptIds', //根据部门查询人员信息
  SELECT_DEVICE = '/special/selectDeviceListByIds', //根据设备ids查询设备
  STATION_PEOPLE = '/system/station/select', //岗位下拉框查询
  SELECT_PEOPLE_STATION = '/system/people/selectPeopleByStationIds', //根据岗位查询人员信息
  WORK_FLOW = '/workflow/flowEngine', //关联审批下拉

  PLAN_LIST = '/upkeepPlan/list', // 保养计划列表
  EXPORT_DATA = '/upkeepPlan/export', //保养计划列表批量导出
  DELETE_LIST = '/upkeepPlan/batch/remove', //批量删除
  STOP_PLAN = '/upkeepPlan/stop', //停止计划
  PLAN_SUBMIT = '/upkeepPlan/submit', //提交
  PLAN_REBACK = '/upkeepPlan/withdraw', //撤回
  PLAN_LIST_ADD = '/upkeepPlan/save', //新增保养计划
  PLAN_LIST_UPDATE = '/upkeepPlan/update', //编辑保养计划
  PLAN_LIST_REUPDATE = '/upkeepPlan/anew/update', //重新编辑保养计划
  PLAN_DETAIL = '/upkeepPlan/detail', //保养计划详情
  SELECT_LIST_DEVICE = '/upkeepPlan/device/list', //查询保养设备
  SELECT_LIST_RELEVANCE = '/mechanical/upkeepPlan/select', //保养工单-关联计划
  SELECT_LIST_RELEVANCES = '/mechanical/overhaulPlan/select', //检修工单-关联计划
  //保养计划审核
  PROCESSING_LIST = '/upkeepPlan/pend/list', //待处理列表
  PROCESSED_LIST = '/upkeepPlan/deal/list', //已处理列表
  APPROVAL_LIST = '/upkeepPlan/approval', //计划审核

  FULL_SUBMITID = '/workflow/myWorkflow/', //审批流程
}

//保养工单-关联计划
export const getRelevanceApi = () =>
  defHttp.post({
    url: Api.SELECT_LIST_RELEVANCE,
  });
//检修工单-关联计划
export const getRelevancesApi = () =>
  defHttp.post({
    url: Api.SELECT_LIST_RELEVANCES,
  });
//关联审批下拉
export const getWorkFlowApi = () =>
  defHttp.post({
    url: Api.WORK_FLOW,
  });

// 根据类型查询字典
export const getDictionarySelectTypeApi = (params: DictionarySelectTypeParams) =>
  defHttp.post({
    url: Api.DICTIONARY_SELECT_TYPE,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });
//人员下拉框查询
export const getPersonSelectApi = (params) =>
  defHttp.post({
    url: Api.PERSON_SELECT,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });
//部门下拉框查询
export const getDepartmentSelectApi = (params) =>
  defHttp.post({
    url: Api.DEPARTMENT_SELECT,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });
//根据部门查询人员信息
export const getPeopleSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT_PEOPLE,
    params,
  });
//根据设备ids查询设备
export const getDeviceSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT_DEVICE,
    params,
  });
//岗位下拉框查询
export const getStationSelectApi = () =>
  defHttp.post({
    url: Api.STATION_PEOPLE,
    // params,
  });
//根据岗位查询人员信息
export const getStationPeopleSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT_PEOPLE_STATION,
    params,
  });

/* 1、保养计划 */
// 保养计划列表
export const getPlanListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_LIST,
    params,
  });
//保养计划列表批量导出
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
//批量删除
export const deletePlanListApi = (params) =>
  defHttp.post({
    url: Api.DELETE_LIST,
    params,
  });
//停止计划
export const stopPlanListApi = (params) =>
  defHttp.post({
    url: Api.STOP_PLAN,
    params,
  });
//提交
export const submitListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_SUBMIT,
    params,
  });
//撤回
export const rebackListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_REBACK,
    params,
  });

//新增保养计划
export const putPlanListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_LIST_ADD,
    params,
  });

//编辑保养计划
export const updatePlanListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_LIST_UPDATE,
    params,
  });
//重新编辑保养计划
export const reUpdatePlanListApi = (params) =>
  defHttp.post({
    url: Api.PLAN_LIST_REUPDATE,
    params,
  });
//保养计划详情
export const getPlanDetailApi = (params) =>
  defHttp.post({
    url: Api.PLAN_DETAIL,
    params,
  });
//查询保养设备
export const selectListDeviceApi = (params) =>
  defHttp.post({
    url: Api.SELECT_LIST_DEVICE,
    params,
  });

/* 2、保养计划审核 */
//待处理列表
export const getProcessingListApi = (params) =>
  defHttp.post({
    url: Api.PROCESSING_LIST,
    params,
  });
//已处理列表
export const getProcessedListApi = (params) =>
  defHttp.post({
    url: Api.PROCESSED_LIST,
    params,
  });
//审核
export const getApprovalListApi = (params) =>
  defHttp.post({
    url: Api.APPROVAL_LIST,
    params,
  });

//审批流程
export const getFullSubmitApi = (params) =>
  defHttp.post({
    url: Api.FULL_SUBMITID + params,
  });
