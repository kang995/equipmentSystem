import { BasicColumn, FormSchema } from '/@/components/Table';
import processing from './module/process.vue';
import processed from './module/process.vue';

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

//维修计划审批-待处理、已处理
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '维修计划编号',
      dataIndex: 'name',
    },
    {
      title: '维修计划名称',
      dataIndex: 'name',
    },
    {
      title: '计划时间',
      dataIndex: 'productName',
    },
    {
      title: '故障数量',
      dataIndex: 'person',
    },
    {
      title: '负责人',
      dataIndex: 'time',
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
      componentProps: {
        placeholder: '请输入维修计划编号',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '创建人',
      componentProps: {
        placeholder: '请选择创建人',
        // api: '',
        params: {
          type: 'SPECIAL_WORK',
        },
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'data', //后台返回数据字段
        labelField: 'roleName',
        valueField: 'roleId',
      },
    },
  ];
}
