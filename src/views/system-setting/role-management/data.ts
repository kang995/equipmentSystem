import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description';
//新建
export const schemas: FormSchema[] = [
  {
    field: 'roleName',
    component: 'Input',
    label: '角色名称',
    componentProps: {
      placeholder: '请输入角色名称',
      maxlength: '15',
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
      maxlength: '5000',
    },
  },
];
//列表页
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '用户数量',
      dataIndex: 'userNum',
      slots: { customRender: 'userNumSlots' },
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
    showAdvancedButton: true, //是否开启收起按钮
    submitOnReset: true, //是否开启重置时提交表单
    autoSubmitOnEnter: true,
    compact: false, //是否是紧凑类型表单
    baseColProps: {
      span: 6,
    },
    rowProps: {
      gutter: 16,
    },
    resetButtonOptions: {
      preIcon: 'gonggong_zhongzhi|svg',
    },
    submitButtonOptions: {
      preIcon: 'gonggong_sousuo|svg',
    },
    schemas: [
      {
        field: 'roleName',
        label: '角色名称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入角色名称',
        },
      },
    ],
  };
}
export const schemaDetail: DescItem[] = [
  {
    field: 'name',
    label: '用户组名称',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
export const BasicColumns: BasicColumn[] = [
  {
    title: '登陆账号',
    dataIndex: 'userName',
  },
  {
    title: '姓名',
    dataIndex: 'nickName',
  },
  // {
  //   title: '部门',
  //   dataIndex: 'department',
  // },
  {
    title: '状态',
    dataIndex: 'statusName',
  },
];
