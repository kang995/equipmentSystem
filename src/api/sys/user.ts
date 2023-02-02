import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/system/login',
  Logout = '/system/logout',
  GetUserInfo = '/system/login/getUserInfo',
  GetPermCode = '/system/login/getMenuPerms',
  TestRetry = '/testRetry',
  GET_USER_CENTER_URL = '/iot/getUserCenterUrl', // 获取用户中心链接
  GET_LOGOUT_URL = '/iot/getLogoutUrl',
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
