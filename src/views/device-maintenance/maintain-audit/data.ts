import { BasicColumn, FormSchema } from '/@/components/Table';
import Pending from './Pending/index.vue';
import processed from './processed/index.vue';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待处理',
    component: Pending,
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
      dataIndex: 'name',
    },
    {
      title: '保养计划名称',
      dataIndex: 'productName',
    },
    {
      title: '计划时间',
      dataIndex: 'time',
    },
    {
      title: '保养类型',
      dataIndex: 'status',
    },
    {
      title: '保养内容',
      dataIndex: 'status',
    },
    {
      title: '保养计划周期',
      dataIndex: 'status',
    },
    {
      title: '负责人',
      dataIndex: 'person',
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
      field: 'name',
      component: 'Input',
      label: '保养计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入保养计划编号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '保养计划名称',
      componentProps: {
        placeholder: '请选择保养计划名称',
      },
    },
    {
      field: 'productId',
      component: 'Input',
      label: '保养类型',
      componentProps: {
        placeholder: '请选择保养类型',
      },
    },
  ];
}
