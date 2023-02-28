import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, logListParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/system/login',
  Logout = '/system/logout',
  GetUserInfo = '/system/login/getUserInfo',
  GetPermCode = '/system/login/getMenuPerms',
  TestRetry = '/testRetry',
  GET_USER_CENTER_URL = '/iot/getUserCenterUrl', // 获取用户中心链接
  GET_LOGOUT_URL = '/iot/getLogoutUrl', //注销账号
  LOG_LIST = '/monitor/operlog/logList', //操作日志列表
  LOG_LIST_EXPORT = '/monitor/operlog/export',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
export const getUserCenterUrlApi = () =>
  defHttp.get({
    url: Api.GET_USER_CENTER_URL,
  });
export const getLogoutUrlApi = () =>
  defHttp.get({
    url: Api.GET_LOGOUT_URL,
  });

//操作日志列表
export const LogListApi = (params: logListParams) =>
  defHttp.post({
    url: Api.LOG_LIST,
    params,
    headers: {
      ignoreCancelToken: 'true',
    },
  });

export const logListExport = (params: any) => {
  return defHttp.post(
    {
      url: Api.LOG_LIST_EXPORT,
      params,
      responseType: 'arraybuffer',
    },
    { isTransformResponse: false },
  );
};
