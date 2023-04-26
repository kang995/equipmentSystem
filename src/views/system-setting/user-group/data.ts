import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form';

//新建
export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '用户组名称',

    componentProps: {
      placeholder: '请输入用户组名称',
    },
    required: true,
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
    },
  },
];
//列表页
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '用户组名称',
      dataIndex: 'name',
    },
    {
      title: '用户数量',
      dataIndex: 'peopleNum',
      slots: { customRender: 'peopleNumSlots' },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];
}
//列表页表单项
export function getFormConfig(): Partial<FormProps> {
  return {
    rowProps: {
      gutter: 16,
    },
    autoSubmitOnEnter: true,
    baseColProps: {
      span: 6, //设置子项的样式
      style: { paddingRight: '8px' },
    },
    resetButtonOptions: {
      preIcon: 'gonggong_zhongzhi|svg',
    },
    submitButtonOptions: {
      preIcon: 'sousuo|svg',
    },
    // wrapperCol: { style: { maxWidth: '500px' } },
    schemas: [
      {
        field: `name`,
        label: `用户组名称`,
        component: 'Input',
        defaultValue: '',
      },
    ],
  };
}

export const BasicColumns: BasicColumn[] = [
  {
    title: '登录账号',
    dataIndex: 'userName',
  },
  {
    title: '姓名',
    dataIndex: 'nickName',
  },
  {
    title: '部门',
    dataIndex: 'department',
  },
  {
    title: '状态',
    dataIndex: 'statusName',
  },
];
