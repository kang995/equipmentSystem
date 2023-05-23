import { BasicColumn, FormSchema } from '/@/components/Table';
import processing from './Pending/index.vue';
import processed from './processed/index.vue';
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
    component: processing,
  },
  {
    key: '2',
    name: '已处理',
    component: processed,
  },
];

//计划审核-待处理、已处理
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '保养计划编号',
      dataIndex: 'code',
    },
    {
      title: '保养计划名称',
      dataIndex: 'name',
    },
    {
      title: '计划时间',
      dataIndex: 'planDateStr',
    },
    {
      title: '保养类型',
      dataIndex: 'upkeepTypeText',
    },
    {
      title: '保养内容',
      dataIndex: 'upkeepContent',
    },
    {
      title: '保养计划周期',
      dataIndex: 'taskCycleUnit',
      customRender: ({ record }) => {
        return `${record.taskCycleUnit}/${record.taskCycleUnitText}`;
      },
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
      label: '保养计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入保养计划编号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '保养计划名称',
      componentProps: {
        placeholder: '请选择保养计划名称',
      },
    },
    {
      field: 'upkeepType',
      component: 'ApiSelect',
      label: '保养类型',
      componentProps: {
        placeholder: '请选择保养类型',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'UPKEEP_TYPE',
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
