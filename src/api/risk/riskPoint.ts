import { defHttp } from '/@/utils/http/axios';

enum Api {
  GET_INITIAL_MAP = '/enterprise/selectModel', // 获取模型地图
  GET_MODEL_URL = '/enterprise/getU3dUrl', //获取绑定模型url

  GET_MAP_RISK_POINT = '/dual/point/selectModel/', //查询风险点绑定模型{id}
  GET_MAP_SOURCE = '/dual/source/selectModel/', //查询危险源绑定模型{id}
}

// 获取地图模型
export const getInitialMap = () =>
  defHttp.get({
    url: Api.GET_INITIAL_MAP,
  });
// 获取绑定模型url
export const getBindModelUrl = () =>
  defHttp.get({
    url: Api.GET_MODEL_URL,
  });

//查询风险点绑定模型详细信息{id}
export const getRiskPointMap = (id: string) =>
  defHttp.post({
    url: Api.GET_MAP_RISK_POINT + id,
  });

//查询危险源绑定模型{id}
export const getSourceMap = (id: string) =>
  defHttp.post({
    url: Api.GET_MAP_SOURCE + id,
  });
