import { defHttp } from '/@/utils/http/axios';

enum Api {
  DEVICE_SELECT = '/system/device/select', // 设备下拉框查询
  DEPARTMENT_SELECT = '/system/department/tree/select', // 部门下拉框查询
  PEOPLE_SELECT = '/system/people/select', // 人员下拉框查询
  PEOPLE_SELECT_TEAM_IDS = '/system/people/selectPeopleByTeamIds', // 根据班组查询人员信息
  PEOPLE_SELECT_TEAM_ID = '/system/people/selectTeam/', // 根据班组查询人员信息
  TEAM_SELECT = '/system/team/select', // 班组下拉框查询
  WORK_SHOP_SELECT = '/system/workshop/select', // 车间下拉框查询
  DEVICE_DETAIL = '/device/detail/', // 查询设备信息
  DEVICE_STANDARD = '/device/standard/', // 设备操作规范
  DEVICE_WEBSOCKET = '/device/webSocket/', // 实时数据验签
  PEOPLE_AND_PHONE = '/system/people/getPeopleAndPhone', // 根据人员id查询人员姓名，手机号，部门
}

// 设备下拉框查询
export const getDeviceSelect = () =>
  defHttp.post({
    url: Api.DEVICE_SELECT,
  });

// 部门下拉框查询
export const getDepartmentSelect = () =>
  defHttp.post({
    url: Api.DEPARTMENT_SELECT,
  });

// 人员下拉框查询
export const getPeopleSelect = () =>
  defHttp.post({
    url: Api.PEOPLE_SELECT,
  });

// 根据班组查询人员信息
export const getPeopleSelectTeamIds = (params: string[]) =>
  defHttp.post({
    url: Api.PEOPLE_SELECT_TEAM_IDS,
    params,
  });

// 根据班组查询人员信息
export const getPeopleSelectTeamId = (id: string) =>
  defHttp.post({
    url: Api.PEOPLE_SELECT_TEAM_ID + id,
  });

// 班组下拉框查询
export const getTeamSelect = () =>
  defHttp.post({
    url: Api.TEAM_SELECT,
  });

// 车间下拉框查询
export const getWorkshopSelect = () =>
  defHttp.post({
    url: Api.WORK_SHOP_SELECT,
  });

// 查询设备信息
export const getDeviceDetail = (id: string) =>
  defHttp.get({
    url: Api.DEVICE_DETAIL + id,
  });

// 设备操作规范
export const getDeviceStandard = (id: string) =>
  defHttp.get({
    url: Api.DEVICE_STANDARD + id,
  });

// 实时数据验签
export const getDeviceWebSocket = (id: string) =>
  defHttp.get({
    url: Api.DEVICE_WEBSOCKET + id,
  });

// 根据人员id查询人员姓名，手机号，部门
export const getPeopleAndPhone = (params: { id: string }) =>
  defHttp.post({
    url: Api.PEOPLE_AND_PHONE,
    params,
  });
