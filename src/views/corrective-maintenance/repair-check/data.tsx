import { BasicColumn, FormSchema } from '/@/components/Table';
import accepting from './accepting/index.vue';
import accepted from './accepted/index.vue';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待验收',
    component: accepting,
  },
  {
    key: '2',
    name: '已验收',
    component: accepted,
  },
];

//维修验收-待验收、已验收
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'name',
    },
    {
      title: '工单名称',
      dataIndex: 'name',
      ifShow: activeKey === '1' ? true : false,
    },
    {
      title: '负责人',
      dataIndex: 'productName',
    },
    {
      title: '创建时间',
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
      title: '故障类型',
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
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '处理人',
      dataIndex: 'status',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '工单单号',
      componentProps: {
        placeholder: '请输入工单单号',
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: '工单名称',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入工单名称',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '负责人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入负责人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '创建时间',
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
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入处理人',
      },
    },
  ];
}
