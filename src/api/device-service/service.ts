import { defHttp } from '/@/utils/http/axios';

enum Api {
  //检修工单
  UPKEEP_WORKORDER_LIST = '/overhaulWorkOrder/list', //分页查询工单列表
  UPKEEP_WORKORDER_EXPORT = '/overhaulWorkOrder/export', //检修工单列表批量导出
  UPKEEP_WORKORDER_DETASILS = '/overhaulWorkOrder/detail', //检修工单详情
  WHETHER_SHOW = '/overhaulWorkOrder/whetherShow', //判断展示负责或执行工单
  UPKEEP_WORKORDER_ANEWISSUE = '/overhaulWorkOrder/anewIssue', //重新下发
  UPKEEP_WORKORDER_APPLYDELAY = '/overhaulWorkOrder/applyDelay', //申请延期
  UPKEEP_WORKORDER_DELAYAUDIT = '/overhaulWorkOrder/delayAudit', //延期审核
  UPKEEP_WORKORDER_REFERDEALRESULT = '/overhaulWorkOrder/referDealResult', //提交处理结果
  TROUBLE_DETAILS = '/trouble/detail/list', //检修工单-故障详情（关联故障）

  //检修工单验收
  ACCEPT_STAYACCEPT = '/overhaulWorkOrder/stayAccept/list', //分页查询待验收工单列表
  ACCEPT_ACCEPTLIST = '/overhaulWorkOrder/accept/list', //分页查询已验收工单列表
  ACCEPT_STAYACCEPT_EXPET = '/overhaulWorkOrder/stayAccept/export', //待验收工单列表批量导出
  ACCEPT_ACCEPTLIST_EXPET = '/overhaulWorkOrder/accept/export', //已验收工单列表批量导出
  ACCEPT_COUNT = '/overhaulWorkOrder/accept/count', //查询待验收和已验收工单数量
  SAVEACCEPT_RESULT = '/overhaulWorkOrder/saveAcceptResult', //验收
}

/* 1、检修工单 */
//分页查询工单列表
export const UpkeepWorkOrderListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_LIST,
    params,
  });
//检修工单列表批量导出
export const UpkeepWorkOrderExportApi = (params) =>
  defHttp.post(
    {
      url: Api.UPKEEP_WORKORDER_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//检修工单详情
export const UpkeepWorkOrderDetailsApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_DETASILS,
    params,
  });
//判断展示负责或执行工单
export const whetherShowApi = () =>
  defHttp.post({
    url: Api.WHETHER_SHOW,
  });

//重新下发
export const UpkeepWorkOrderAnewIssueApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_ANEWISSUE,
    params,
  });
//申请延期
export const UpkeepWorkOrderApplyDelayApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_APPLYDELAY,
    params,
  });
//延期审核
export const UpkeepWorkOrderDelayAuditApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_DELAYAUDIT,
    params,
  });
//提交处理结果
export const UpkeepWorkOrderDealResultApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_WORKORDER_REFERDEALRESULT,
    params,
  });
//检修工单-故障详情（关联故障）
export const TroubleDetailsApi = (params) =>
  defHttp.post({
    url: Api.TROUBLE_DETAILS,
    params,
  });
/* 2、检修工单验收 */
//分页查询待验收工单列表
export const AcceptStayListApi = (params) =>
  defHttp.post({
    url: Api.ACCEPT_STAYACCEPT,
    params,
  });
//分页查询已验收工单列表
export const AcceptArreadyListApi = (params) =>
  defHttp.post({
    url: Api.ACCEPT_ACCEPTLIST,
    params,
  });
//待验收工单列表批量导出
export const AcceptStayExportListApi = (params) =>
  defHttp.post(
    {
      url: Api.ACCEPT_STAYACCEPT_EXPET,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//已验收工单列表批量导出
export const AcceptArreadyExportListApi = (params) =>
  defHttp.post(
    {
      url: Api.ACCEPT_ACCEPTLIST_EXPET,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//查询待验收和已验收工单数量
export const AcceptCountListApi = () =>
  defHttp.post({
    url: Api.ACCEPT_COUNT,
  });
//验收
export const SaveAcceptResultApi = (params) =>
  defHttp.post({
    url: Api.SAVEACCEPT_RESULT,
    params,
  });
