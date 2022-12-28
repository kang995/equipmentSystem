import { defHttp } from '/@/utils/http/axios';

enum Api {
  //机械设备台账
  MECHANICAL_List = '/mechanical/list', //分页查询机械设备列表
  MECHANICAL_EXPORT = '/mechanical/export', //机械设备列表批量导出
  Q = '/mechanical/detail', //获取机械设备详细信息

  //选择下拉
  SELECT_STATE = '/mechanical/deviceName/select', //设备名称-下拉查询
  P = '/mechanical/driveType/select', //开停车类型-下拉查询
  G = '/mechanical/grade/select', //预案响应等级-下拉查询
  Z = '/mechanical/planIdName/select', //演练对象-下拉查询
  X = '/mechanical/planType/select', //应急预案类型-下拉查询
  N = '/mechanical/select/report', //巡检报告-巡检详情点位下拉框查询

  //基本信息
  L = '/mechanical/patrolRecord/list', //分页查询巡检记录列表
  B = '/mechanical/alarm/list', //巡检报告-巡检报警分页查询
  F = '/mechanical/fault/list', //巡检报告-隐患上报分页查询
  A = '/mechanical/abnormal/list', //巡检报告-发现异常分页查询
  K = '/mechanical/patrolRecord/count', //巡检记录-巡检次数、异常次数、隐患次数
  J = '/mechanical/patrolBase', //巡检报告-基本信息

  M = '/mechanical/upkeepWorkOrder/list', //分页查询保养工单列表
  U = '/mechanical/drillRecord/list', //分页查询应急演练记录列表
  C = '/mechanical/contingencyByDeviceId/list', //查询应急预案列表
  E = '/mechanical/contingencyPlan/list', //关联应急预案-查询应急预案列表
  V = '/mechanical/saveDeviceContingency', //保存关联应急预案
  D = '/mechanical/contingencyPlan/detail', //查询应急预案详情
  Y = '/mechanical/drillRecord/export', //应急演练记录列表批量导出

  T = '/mechanical/drillAffix', //查看演练报告

  I = '/mechanical/drive/list', //分页查询开停车记录列表
  O = '/mechanical/driveList/export', //开停车记录列表批量导出
}
//分页查询机械设备列表
export const postMechanicalListApi = (params) =>
  defHttp.post({
    url: Api.MECHANICAL_List,
    params,
  });

//批量导出
export const postMechanicalExportApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.MECHANICAL_EXPORT,
    },
    { isTransformResponse: false },
  );
//新增
export const postSpecialAddApi = (params) =>
  defHttp.post({
    url: Api.A,
    params,
  });
//设备名称-下拉查询
export const postSpecialSelectApi = (params) =>
  defHttp.post({
    url: Api.SELECT_STATE,
    params,
  });
