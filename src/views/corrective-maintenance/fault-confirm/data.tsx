import { BasicColumn, FormSchema } from '/@/components/Table';
import confirming from './confirming/index.vue';
import confirmed from './confirmed/index.vue';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待确认',
    component: confirming,
  },
  {
    key: '2',
    name: '已确认',
    component: confirmed,
  },
];

//故障确认-待确认、已确认
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '故障单号',
      dataIndex: 'name',
    },
    {
      title: '上报人',
      dataIndex: 'productName',
    },
    {
      title: '上报时间',
      dataIndex: 'person',
    },
    {
      title: '关联设备',
      dataIndex: 'time',
    },
    {
      title: '所属装置设施',
      dataIndex: 'status',
    },
    {
      title: '故障类别',
      dataIndex: 'status',
    },
    {
      title: '故障等级',
      dataIndex: 'status',
    },
    {
      title: '故障描述',
      dataIndex: 'status',
    },
    {
      title: '故障状态',
      dataIndex: 'status',
    },
    {
      title: '确认结果',
      dataIndex: 'status',
      ifShow: activeKey === '2' ? true : false,
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '故障单号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入故障单号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '上报人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入上报人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '所属装置设施',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择所属装置设施',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障类别',
      labelWidth: 64,
      componentProps: {
        placeholder: '请选择故障类别',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障等级',
      componentProps: {
        placeholder: '请选择故障等级',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障状态',
      componentProps: {
        placeholder: '请选择故障状态',
      },
    },
  ];
}
