import { defHttp } from '/@/utils/http/axios';

enum Api {
  MAINTAIN_LIST = '/maintain/list', //维修工单列表
  MAINTAIN_EXPORT = '/maintain/export', //维修工单批量导出
  MAINTAIN_ISSHOW = '/maintain/isShow', //判断是否展示负责工单

  MAINTAIN_DETAIL = '/maintain/detail', //维修工单详情
  MAINTAIN_AGAIN = '/maintain/again', //重新下发
  MAINTAIN_DELAY = '/maintain/delay', //延期申请
  MAINTAIN_AUDIT = '/maintain/delay/audit', //延期审核
}

/* 1、维修工单 */
///维修工单列表
export const maintainListApi = (params) =>
  defHttp.post({
    url: Api.MAINTAIN_LIST,
    params,
  });

//维修工单批量导出
export const MaintainExportApi = (params) =>
  defHttp.post(
    {
      url: Api.MAINTAIN_EXPORT,
      params,
      responseType: 'arraybuffer',
      headers: {
        ignoreCancelToken: 'true',
      },
    },
    { isTransformResponse: false, isReturnNativeResponse: true },
  );
//判断是否展示负责工单
export const maintainIsshowApi = () =>
  defHttp.post({
    url: Api.MAINTAIN_ISSHOW,
  });

//维修工单详情
export const maintainDetailApi = (params) =>
  defHttp.post({
    url: Api.MAINTAIN_DETAIL,
    params,
  });
//重新下发
export const maintainAgainApi = (params) =>
  defHttp.post({
    url: Api.MAINTAIN_AGAIN,
    params,
  });
//延期申请
export const maintainDelayApi = (params) =>
  defHttp.post({
    url: Api.MAINTAIN_DELAY,
    params,
  });
//延期审核
export const maintainAuditApi = (params) =>
  defHttp.post({
    url: Api.MAINTAIN_AUDIT,
    params,
  });

/* 2、维修验收 */
