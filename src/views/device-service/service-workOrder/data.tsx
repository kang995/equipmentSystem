import { BasicColumn, FormSchema } from '/@/components/Table';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'person',
    },
    {
      title: '计划负责人',
      dataIndex: 'time',
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
      title: '是否延期',
      dataIndex: 'status',
    },
    {
      title: '是否关联故障',
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
      label: '工单编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入检修计划编号',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '计划负责人',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
      },
    },
    {
      field: 'checkDate',
      component: 'RangePicker',
      label: '工单执行时间',
      componentProps: {
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
      },
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '工单完成时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
  ];
}
