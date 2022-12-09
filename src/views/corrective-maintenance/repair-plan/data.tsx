import { BasicColumn, FormSchema } from '/@/components/Table';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '维修计划编号',
      dataIndex: 'name',
    },
    {
      title: '维修计划名称',
      dataIndex: 'productName',
    },
    {
      title: '任务下发时间',
      dataIndex: 'person',
    },
    {
      title: '故障数量',
      dataIndex: 'time',
    },
    {
      title: '负责人',
      dataIndex: 'status',
    },
    {
      title: '计划状态',
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
      label: '维修计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入维修计划编号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '维修计划名称',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入维修计划名称',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请选择负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '计划状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择计划状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '审核状态',
      labelWidth: 64,
      componentProps: {
        placeholder: '请选择审核状态',
      },
    },
  ];
}
