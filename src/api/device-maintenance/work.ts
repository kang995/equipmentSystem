import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 保养工单
  UPKEEP_LIST = '/upkeepWorkOrder/list', //工单列表
  UPKEEP_EXPORT = '/upkeepWorkOrder/export', //工单列表批量导出
  UPKEEP_DETAILS = '/upkeepWorkOrder/detail', //保养工单详情
  UPKEEP_ANEWISSUE = '/upkeepWorkOrder/anewIssue', //重新下发
  UPKEEP_DELAYAUDIT = '/upkeepWorkOrder/delayAudit', //延期审核
  UPKEEP_APPLY_DELAY = '/upkeepWorkOrder/applyDelay', //申请延期
  UPKEEP_DEAL_RESULT = '/upkeepWorkOrder/referDealResult', //提交处理结果
  UPKEEP_SHOW = '/upkeepWorkOrder/whetherShow', //判断展示负责或执行工单
  // 保养验收
  ACCOPT_STAYACCEPT_LIST = '/upkeepWorkOrder/accept/stayAccept/list', //待验收工单列表
  ACCOPT_ACCEPT_LIST = '/upkeepWorkOrder/accept/accept/list', //已验收工单列表
  ACCOPT_STAYACCEPT_EXPORT = '/upkeepWorkOrder/accept/stayAccept/export', //待验收工单列表批量导出
  ACCOPT_ACCEPT_EXPORT = '/upkeepWorkOrder/accept/accept/export', //已验收工单列表批量导出
  ACCOPT_COUNT = '/upkeepWorkOrder/accept/accept/count', //查询待验收和已验收工单数量
  ACCOPT_WORKORDER = '/upkeepWorkOrder/accept/saveAcceptResult', //验收
  // 使用备件
  ORDER_SPARE_LIST = '/orderSpare/list', //工单备件使用列表查询
  SPARE_PART_LIST = '/sparePart/list', //备件列表
  //流转记录
  TRANSFER_LIST = '/transfer/list', //根据工单id查询流转记录
}

/* 保养工单 */
//工单列表
export const getPlanListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_LIST,
    params,
  });
//工单列表批量导出
export const upkeepExportApi = (params) =>
  defHttp.post(
    {
      url: Api.UPKEEP_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//保养工单详情
export const upkeepDetailsApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_DETAILS,
    params,
  });

//重新下发
export const upkeepAnewIssueApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_ANEWISSUE,
    params,
  });
//延期审核
export const upkeepDelayAuditApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_DELAYAUDIT,
    params,
  });

//申请延期
export const upkeepApplyDelayApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_APPLY_DELAY,
    params,
  });
//提交处理结果
export const upkeepDealResultApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_DEAL_RESULT,
    params,
  });
//判断展示负责或执行工单
export const upkeepShowApi = () =>
  defHttp.post({
    url: Api.UPKEEP_SHOW,
    // params,
  });

/* 保养验收 */
//待验收工单列表
export const getStayAcceptApi = (params) =>
  defHttp.post({
    url: Api.ACCOPT_STAYACCEPT_LIST,
    params,
  });
//已验收工单列表
export const getAcceptApi = (params) =>
  defHttp.post({
    url: Api.ACCOPT_ACCEPT_LIST,
    params,
  });
//待验收工单列表批量导出
export const stayAcceptExportApi = (params) =>
  defHttp.post(
    {
      url: Api.ACCOPT_STAYACCEPT_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );

//已验收工单列表批量导出
export const acceptExportApi = (params) =>
  defHttp.post(
    {
      url: Api.ACCOPT_ACCEPT_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );

//查询待验收和已验收工单数量
export const getAcceptCountApi = () =>
  defHttp.post({
    url: Api.ACCOPT_COUNT,
    // params,
  });

//验收
export const getSaveAcceptResultApi = (params) =>
  defHttp.post({
    url: Api.ACCOPT_WORKORDER,
    params,
  });

//工单备件使用列表查询
export const getOrderSpareListApi = (params) =>
  defHttp.post({
    url: Api.ORDER_SPARE_LIST,
    params,
  });

//备件列表
export const getSpartPartListApi = (params) =>
  defHttp.post({
    url: Api.SPARE_PART_LIST,
    params,
  });

//根据工单id查询流转记录
export const getTransferListApi = (params) =>
  defHttp.post({
    url: Api.TRANSFER_LIST,
    params,
  });
