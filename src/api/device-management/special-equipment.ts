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
  SERVICE_LIST = '', //检修记录列表
  UPKEEP_LIST = '/mechanical/upkeepWorkOrder/list', //保养记录列表
  MECHANICAL_LIST = '/mechanical/drillRecord/list', //应急演练记录列表
  DRILLAFFIX = '/mechanical/drillAffix', //查看演练报告
  //下拉查询
  PLANID_NAME_SELECT = '/mechanical/planIdName/select', //演练对象-下拉查询
  SYSTEM_SELECT = '/system/department/tree/select', //部门下拉框查询

  //检测
  ADD_SPECIAL = '/specialRecord/save', //新增
  RECORD_LIST = '/specialRecord/list', //分页查询特种设备检测记录
}
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
//保养记录列表
export const DeviceUpkeepListApi = (params) =>
  defHttp.post({
    url: Api.UPKEEP_LIST,
    params,
  });
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
