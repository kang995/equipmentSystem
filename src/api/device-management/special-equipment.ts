import { defHttp } from '/@/utils/http/axios';

enum Api {
  //特种设备台账
  SPECIAL_LIST = '/special/list', // 分页查询特种设备列表
  DETAIL = '/special/detail', //特种设备详情
  SPECIAL_EDIT = '/special/update', //修改
  SPECIAL_EXPORT = '/special/export', //批量导出
  ADD = '/special/save', //新增
  SELECT_STATE = '/special/deviceName/select', //设备名称-下拉查询
  SELECT_UNIT_FACILITY = '/unitFacility/unitFacility/select', //装置设施-下拉查询
  TROUBLE_LIST = '/trouble/list', //故障记录列表
  SERVICE_LIST = '/mechanical/overhaulWorkOrder/list', //检修记录列表
  SERVICE_LIST_SELECT = '/mechanical/overhaulPlan/select', //检修记录关联计划-下拉查询
  SERVICE_LIST_EXPORT = '/mechanical/overhaulWorkOrder/export', //检修工单列表批量导出

  UPKEEP_LIST = '/mechanical/upkeepWorkOrder/list', //保养记录列表
  UPKEEP_PLANLIST = '/mechanical/upkeepPlan/select', //保养记录关联计划-下拉查询
  UPKEEP_EXPORT = '/mechanical/upkeepWorkOrder/export', //保养工单列表批量导出

  MECHANICAL_LIST = '/mechanical/drillRecord/list', //应急演练记录列表
  DRILLAFFIX = '/mechanical/drillAffix', //查看演练报告
  DRILLAFFIX_EXPORT = '/mechanical/drillRecord/export', //应急演练记录列表批量导出
  //下拉查询
  PLANID_NAME_SELECT = '/mechanical/planIdName/select', //演练对象-下拉查询
  SYSTEM_SELECT = '/system/department/tree/select', //部门下拉框查询

  //检测
  ADD_SPECIAL = '/specialRecord/save', //新增
  RECORD_LIST = '/specialRecord/list', //分页查询特种设备检测记录
  RECORD_DETAIL = '/specialRecord/detail',
  RECORD_EXPORT = '/specialRecord/export', //批量导出
  //更换备件记录
  SPARE_LIST = '/mechanical/orderSpare/list',
}
export const postSpareListApi = (params) =>
  defHttp.post({
    url: Api.SPARE_LIST,
    params,
  });
//演练对象-下拉查询
export const postPlanNameListApi = () =>
  defHttp.post({
    url: Api.PLANID_NAME_SELECT,
  });
//部门下拉框查询
export const postSectionListApi = () =>
  defHttp.post({
    url: Api.SYSTEM_SELECT,
  });
//分页查询特种设备检测记录
export const postSpecialRecordListApi = (params) =>
  defHttp.post({
    url: Api.RECORD_LIST,
    params,
  });
//详情
export const postSpecialRDetailApi = (params) =>
  defHttp.post({
    url: Api.RECORD_DETAIL,
    params,
  });
//新增
export const postSpecialRecordAddApi = (params) =>
  defHttp.post({
    url: Api.ADD_SPECIAL,
    params,
  });
//分页查询特种设备列表
export const postSpecialListApi = (params) =>
  defHttp.post({
    url: Api.SPECIAL_LIST,
    params,
  });
///特种设备详情
export const postSpecialDetailApi = (params) =>
  defHttp.post({
    url: Api.DETAIL,
    params,
  });
//修改
export const postSpecialEditApi = (params) =>
  defHttp.post({
    url: Api.SPECIAL_EDIT,
    params,
  });
//批量导出
export const postSpecialExportApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.SPECIAL_EXPORT,
    },
    { isTransformResponse: false },
  );
//新增
export const postSpecialAddApi = (params) =>
  defHttp.post({
    url: Api.ADD,
    params,
  });
//设备名称-下拉查询
export const postSelectDeviceNameApi = () =>
  defHttp.post({
    url: Api.SELECT_STATE,
  });
//装置设施-下拉查询
export const postSelectUnitFacilityApi = () =>
  defHttp.post({
    url: Api.SELECT_UNIT_FACILITY,
  });

//故障列表
export const DeviceTroubleListApi = (params) =>
  defHttp.post({
    url: Api.TROUBLE_LIST,
    params,
  });
//检修记录列表
export const DeviceServiceListApi = (params) =>
  defHttp.post({
    url: Api.SERVICE_LIST,
    params,
  });
//检修记录关联计划-下拉查询
export const DeviceSelectListApi = (params) =>
  defHttp.post({
    url: Api.SERVICE_LIST_SELECT,
    params,
  });
//检修工单列表批量导出
export const DeviceExportListApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      url: Api.SERVICE_LIST_EXPORT,
      params,
    },
    { isTransformResponse: false },
  );
//保养记录列表
export const DeviceUpkeepListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_LIST,
    params,
  });
//保养记录关联计划-下拉查询
export const UpkeepPlanListApi = () =>
  defHttp.post({
    url: Api.UPKEEP_PLANLIST,
  });
//保养工单列表批量导出
export const UpkeepExportListApi = () =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      url: Api.UPKEEP_EXPORT,
    },
    { isTransformResponse: false },
  );

//应急演练记录列表
export const DeviceMechanicalListApi = (params) =>
  defHttp.post({
    url: Api.MECHANICAL_LIST,
    params,
  });
//查看演练报告
export const DeviceDrillAffixApi = (params) =>
  defHttp.post({
    url: Api.DRILLAFFIX,
    params,
  });
//应急演练记录列表批量导出
export const postDrillExportApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.DRILLAFFIX_EXPORT,
    },
    { isTransformResponse: false },
  );

//批量导出
export const postSpecialRExportApi = (params) =>
  defHttp.post(
    {
      responseType: 'arraybuffer',
      params,
      url: Api.RECORD_EXPORT,
    },
    { isTransformResponse: false },
  );
