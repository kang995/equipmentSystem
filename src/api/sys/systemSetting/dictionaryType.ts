import { defHttp } from '/@/utils/http/axios';
import { DictionarySelectParams, DictionaryAddParams, DictionarySelectTypeParams } from './model';
// 接口
enum Api {
  MANAGEMENT_DICTIONARY_LIST = '/system/dictionary/selectOneDict', //查询字典列表
  MANAGEMENT_DICTIONARY_DELETE = '/system/dictionary/deleteByIds', //批量删除字典
  MANAGEMENT_DICTIONARY_ADD = '/system/dictionary/addLevel', //添加下级
  MANAGEMENT_DICTIONARY_UPDATE = '/system/dictionary/update', //修改字典
  MANAGEMENT_DICTIONARY_SELECT = '/system/dictionary/selectDictByType', //根据类型查询字典
  MECHANICAL_DEVICENAME = '/mechanical/deviceName/select', //设备管理-机械设备-设备名称-下拉查询
  SPECIAL_DEVICENAME = '/special/deviceName/select', //设备管理-特种设备-设备名称-下拉查询
}

//查询字典列表
export const getManagementDictionaryList = (params: DictionarySelectParams) =>
  defHttp.post({
    url: Api.MANAGEMENT_DICTIONARY_LIST,
    params,
  });

//批量删除字典
export const deleteManagementDictionary = (params: string[]) =>
  defHttp.post({
    url: Api.MANAGEMENT_DICTIONARY_DELETE,
    params,
  });

//添加下级
export const addManagementDictionary = (params: DictionaryAddParams) =>
  defHttp.post({
    url: Api.MANAGEMENT_DICTIONARY_ADD,
    params,
  });

//编辑下级
export const updateManagementDictionary = (params: DictionaryAddParams) =>
  defHttp.post({
    url: Api.MANAGEMENT_DICTIONARY_UPDATE,
    params,
  });

// 根据类型查询字典
export const getDictionarySelectType = (params: DictionarySelectTypeParams) =>
  defHttp.post({
    url: Api.MANAGEMENT_DICTIONARY_SELECT,
    params,
  });
//设备管理-机械设备-设备名称-下拉查询
export const getMechanicalDeviceApi = () =>
  defHttp.post({
    url: Api.MECHANICAL_DEVICENAME,
  });

//设备管理-特种设备-设备名称-下拉查询
export const getSpecialDeviceApi = () =>
  defHttp.post({
    url: Api.SPECIAL_DEVICENAME,
  });
