import { defHttp } from '/@/utils/http/axios';
import { DictionarySelectTypeParams } from './model';
enum Api {
  DICTIONARY_SELECT_TYPE = '/system/dictionary/selectDictByType', // 根据类型查询字典
  PERSON_SELECT = '/system/people/select', // 人员下拉框查询
  PLAN_LIST = '/upkeepPlan/list', // 保养计划列表
  EXPORT_DATA = '/upkeepPlan/export', //保养计划列表批量导出
  PLAN_LIST_ADD = '/upkeepPlan/save', //新增保养计划
  PLAN_LIST_UPDATE = '/upkeepPlan/update', //编辑保养计划
  PLAN_DETAIL = '/upkeepPlan/detail', //保养计划详情
}

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

//编辑保养计划
export const getPlanDetailApi = (params) =>
  defHttp.post({
    url: Api.PLAN_DETAIL,
    params,
  });

/* 2、保养计划审核 */

/* 3、保养工单 */

/* 4、保养验收 */
