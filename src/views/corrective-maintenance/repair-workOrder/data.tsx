import { BasicColumn, FormSchema } from '/@/components/Table';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'name',
    },
    {
      title: '工单名称',
      dataIndex: 'productName',
    },
    {
      title: '负责人',
      dataIndex: 'person',
    },
    {
      title: '起止时间',
      dataIndex: 'time',
    },
    {
      title: '关联设备',
      dataIndex: 'status',
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
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '处理人',
      dataIndex: 'status',
    },
    {
      title: '完成时间',
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
      field: 'status',
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
      field: 'time',
      component: 'RangePicker',
      label: '起止时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
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
      field: 'productId',
      component: 'ApiSelect',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
    {
      field: 'time1',
      component: 'RangePicker',
      label: '完成时间',
      labelWidth: 64,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
  ];
}
