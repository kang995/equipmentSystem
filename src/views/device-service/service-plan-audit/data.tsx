import { BasicColumn, FormSchema } from '/@/components/Table';
import handling from './handling/index.vue';
import handled from './handled/index.vue';
import { getDictionarySelectTypeApi } from '/@/api/device-maintenance/index';
import { Badge } from 'ant-design-vue';
export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待处理',
    component: handling,
  },
  {
    key: '2',
    name: '已处理',
    component: handled,
  },
];

//检修计划审核-待处理、已处理
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '检修计划编号',
      dataIndex: 'code',
    },
    {
      title: '检修计划名称',
      dataIndex: 'name',
    },
    {
      title: '计划时间',
      dataIndex: 'planDateStr',
    },
    {
      title: '检修方案',
      dataIndex: 'overhaulContent',
    },
    {
      title: '检修类型',
      dataIndex: 'overhaulTypeText',
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '审核状态',
      dataIndex: 'approvalStatus',
      customRender: ({ record }) => {
        if (record.approvalStatus === '1') {
          //待提交
          return <Badge status="warning" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '2') {
          //审核中
          return <Badge status="processing" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '3') {
          //审核通过
          return <Badge status="success" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '4') {
          //审核拒绝
          return <Badge status="error" text={record.approvalStatusText} />;
        }
      },
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '检修计划编号',
      componentProps: {
        placeholder: '请输入检修计划编号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '检修计划名称',
      componentProps: {
        placeholder: '请输入检修计划名称',
      },
    },
    {
      field: 'overhaulType',
      component: 'ApiSelect',
      label: '检修类型',
      componentProps: {
        placeholder: '请选择检修类型',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'OVERHAUL_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'approvalStatus',
      component: 'ApiSelect',
      label: '审核状态',
      componentProps: {
        placeholder: '请选择审核状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
  ];
}
