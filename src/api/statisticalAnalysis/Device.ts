import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATUS_INFO = '/stats/info',
  STATUS_DISTRICT = '/stats/district',
  STATUS_TROUBLE = '/stats/sort/trouble',
}

//设备故障分析、设备故障类型、设备维修情况统计、设备类型占比、设备性质占比
export const getStatusInfoApi = (params) => {
  return defHttp.post({
    url: Api.STATUS_INFO,
    params,
  });
};

//装置设施数量统计
export const getDistrictApi = (params) => {
  return defHttp.post({
    url: Api.STATUS_DISTRICT,
    params,
  });
};

//设备故障排名
export const getTroubleApi = (params) => {
  return defHttp.post({
    url: Api.STATUS_TROUBLE,
    params,
  });
};
