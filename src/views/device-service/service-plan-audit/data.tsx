import { BasicColumn, FormSchema } from '/@/components/Table';
import handling from './handling/index.vue';
import handled from './handled/index.vue';

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
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '检修计划编号',
      dataIndex: 'name',
    },
    {
      title: '检修计划名称',
      dataIndex: 'productName',
    },
    {
      title: '计划时间',
      dataIndex: 'person',
    },
    {
      title: '检修方案',
      dataIndex: 'time',
    },
    {
      title: '检修类型',
      dataIndex: 'status',
    },
    {
      title: '负责人',
      dataIndex: 'status',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '检修计划编号',
      componentProps: {
        placeholder: '请输入检修计划编号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '检修计划名称',
      componentProps: {
        placeholder: '请输入检修计划名称',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '检修类型',
      componentProps: {
        placeholder: '请选择检修类型',
      },
    },
  ];
}
