import { defHttp } from '/@/utils/http/axios';

enum Api {
  WORKFLOW_LIST = '/workflow/getWorkflowUrl/', //工作流
}

export const getWorkFlowApi = (params) =>
  defHttp.post({
    url: Api.WORKFLOW_LIST + params,
  });
