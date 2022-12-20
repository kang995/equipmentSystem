import { defHttp } from '/@/utils/http/axios';

enum Api {
  INSTALLATION_LIST = '/unitFacility/list', // 分页查询装置设施列表
  INSTALLATION_DETAIL = '/unitFacility/detail', //获取装置设施详细信息
  INSTALLATION_EXPORT = '/unitFacility/export', //批量导出
  //选择下拉
  INSTALLATION_TREE = '/unitFacility/areaUnitFacility/tree/select', // 查询区域-装置设施树
  DISTRICT_SELECT = '/unitFacility/district/select', //所属区域-下拉查询
  FIRE_SELECT = '/unitFacility/fireResisRat/select', //耐火等级-下拉查询
  FIRE_CLASSES_SELECT = '/unitFacility/fireRiskClasses/select', //火灾危险性类别-下拉查询
  DESIGN_SELECT = '/unitFacility/itemDesign/select', //所属项目组成部分-下拉查询
  RISK_LEVEL_SELECT = '/unitFacility/risk/level/select', //重大危险源级别-下拉查询
  TYPE_SELECT = '/unitFacility/type/select', //类型-下拉查询
}
// 分页查询装置设施列表
export const postUnitFacilityListApi = (params) =>
  defHttp.post({
    url: Api.INSTALLATION_LIST,
    params,
  });
//获取装置设施详细信息
export const postUnitFacilityDetailApi = (params) =>
  defHttp.post({
    url: Api.INSTALLATION_DETAIL,
    params,
  });
// 查询区域-装置设施树
export const postUnitFacilityTreeApi = (params) =>
  defHttp.post({
    url: Api.INSTALLATION_TREE,
    params,
  });
//所属区域-下拉查询
export const postDistrictSelectApi = (params) =>
  defHttp.post({
    url: Api.DISTRICT_SELECT,
    params,
  });
//耐火等级-下拉查询
export const postFireResisRatSelectApi = (params) =>
  defHttp.post({
    url: Api.FIRE_SELECT,
    params,
  });
//火灾危险性类别-下拉查询
export const postFireRiskClassesSelectApi = (params) =>
  defHttp.post({
    url: Api.FIRE_CLASSES_SELECT,
    params,
  });
//所属项目组成部分-下拉查询
export const postDesignSelectApi = (params) =>
  defHttp.post({
    url: Api.DESIGN_SELECT,
    params,
  });
//重大危险源级别-下拉查询
export const postRiskLevelSelectApi = (params) =>
  defHttp.post({
    url: Api.RISK_LEVEL_SELECT,
    params,
  });
//类型-下拉查询
export const postTypeSelectApi = (params) =>
  defHttp.post({
    url: Api.TYPE_SELECT,
    params,
  });
