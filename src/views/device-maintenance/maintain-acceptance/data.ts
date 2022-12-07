import { BasicColumn, FormSchema } from '/@/components/Table';
import checking from './checking/index.vue';
import checked from './checked/index.vue';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待验收',
    component: checking,
  },
  {
    key: '2',
    name: '已验收',
    component: checked,
  },
];

//保养验收-待验收、已验收
export function tableColumns(type: string): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
    },
    {
      title: '计划负责人',
      dataIndex: 'productName',
    },
    {
      title: '工单处理人',
      dataIndex: 'status',
    },
    {
      title: '工单执行时间',
      dataIndex: 'status',
    },
    {
      title: '关联计划',
      dataIndex: 'status',
    },
    {
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '验收时间',
      dataIndex: 'status',
      ifShow: type === 'checked' ? true : false,
    },
  ];
}

export function getFormSchema(type: string): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '工单编号',
      labelWidth: type === 'checked' ? 96 : 64,
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'status',
      component: 'ApiSelect',
      label: '计划负责人',
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单处理人',
      componentProps: {
        placeholder: '请选择工单处理人',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单执行时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单验收时间',
      labelWidth: 96,
      componentProps: {
        format: 'YYYY-MM-DD',
      },
      ifShow: type === 'checked' ? true : false,
    },
  ];
}
