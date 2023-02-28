import { defHttp } from '/@/utils/http/axios';

enum Api {
  SET_AREA_CONFIG = '/system/config/saveMapConfig',
  GET_AREA_CONFIG = '/system/config/getMapConfig',
}

export function getMapAreaConfig() {
  return defHttp.get({
    url: Api.GET_AREA_CONFIG,
  });
}

export function setMapAreaConfig(params) {
  return defHttp.post({
    url: Api.SET_AREA_CONFIG,
    params,
  });
}
