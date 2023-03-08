import { defHttp } from '/@/utils/http/axios';

enum Api {
  //检修计划管理
  OVERHAUPLAN_LIST = '/overhaulPlan/list', //分页查询检修计划列表
  OVERHAUEXPORT = '/overhaulPlan/export', //检修计划列表批量导出
  BATCH_REMOVE = '/overhaulPlan/batch/remove', //批量删除
  OVERHAUPLAN_SUBMIT = '/overhaulPlan/submit', //提交
  OVERHAUPLAN_WITHDRAW = '/overhaulPlan/withdraw', //撤回
  OVERHAUPLAN_STOPPLAN = '/overhaulPlan/stop', //停止计划
  //新增、编辑
  OVERHAULPLAN = '/overhaulPlan/save', //新增检修计划
  OVERHAULPLAN_UPDATE = '/overhaulPlan/update', //修改检修计划
  OVERHAULPLAN_REUPDATE = '/overhaulPlan/anew/update', //重新编辑检修计划
  OVERHAULPLAN_DETAILS = '/overhaulPlan/detail', //检修计划详情
  OVERHAULPLAN_DEVICE = '/overhaulPlan/device/list', //查询检修设备
  //检修计划审核
  APPROVAL_LIST_PEND = '/overhaulPlan/pend/list', //分页查询待处理列表
  APPROVAL_LIST_DEAL = '/overhaulPlan/deal/list', //分页查询已处理列表
  APPROVAL_AUDIT = '/overhaulPlan/approval', //审核
}

/* 1、检修计划管理 */
//分页查询检修计划列表
export const OverhaulPlanListApi = (params) =>
  defHttp.post({
    url: Api.OVERHAUPLAN_LIST,
    params,
  });

//检修计划列表批量导出
export const OverhaulExportApi = (params) =>
  defHttp.post(
    {
      url: Api.OVERHAUEXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//批量删除
export const BatchDeleteApi = (params) =>
  defHttp.post({
    url: Api.BATCH_REMOVE,
    params,
  });

//提交
export const OverhaulSubmitApi = (params) =>
  defHttp.post({
    url: Api.OVERHAUPLAN_SUBMIT,
    params,
  });
//撤回
export const OverhaulWithDrawApi = (params) =>
  defHttp.post({
    url: Api.OVERHAUPLAN_WITHDRAW,
    params,
  });
//停止计划
export const OverhaulStopPlanApi = (params) =>
  defHttp.post({
    url: Api.OVERHAUPLAN_STOPPLAN,
    params,
  });

//新增检修计划
export const AddOverhaulPlanApi = (params) =>
  defHttp.post({
    url: Api.OVERHAULPLAN,
    params,
  });
//修改检修计划
export const OverhaulPlanUpdateApi = (params) =>
  defHttp.post({
    url: Api.OVERHAULPLAN_UPDATE,
    params,
  });
//重新编辑检修计划
export const OverhaulPlanReUpdateApi = (params) =>
  defHttp.post({
    url: Api.OVERHAULPLAN_REUPDATE,
    params,
  });
//检修计划详情
export const OverhaulPlanDetailsApi = (params) =>
  defHttp.post({
    url: Api.OVERHAULPLAN_DETAILS,
    params,
  });

//查询检修设备
export const OverhaulPlanDevicelsApi = (params) =>
  defHttp.post({
    url: Api.OVERHAULPLAN_DEVICE,
    params,
  });

/* 2、检修计划审核 */
//分页查询待处理列表
export const ApprovalPendListApi = (params) =>
  defHttp.post({
    url: Api.APPROVAL_LIST_PEND,
    params,
  });
//分页查询已处理列表
export const ApprovalDealListApi = (params) =>
  defHttp.post({
    url: Api.APPROVAL_LIST_DEAL,
    params,
  });
//审核
export const ApprovalAuditApi = (params) =>
  defHttp.post({
    url: Api.APPROVAL_AUDIT,
    params,
  });
