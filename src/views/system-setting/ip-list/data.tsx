import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

//表格字段
export function ipListColumns(): BasicColumn[] {
  return [
    {
      title: 'IP(IP段)',
      dataIndex: 'ip',
      // customRender: ({ text, record }) => {
      //   return text === null ? record.startIp : `${record.startIp}~${text}`;
      // },
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
    },
  ];
}

//表格查询字段
export function ipListSchemas(): FormSchema[] {
  return [
    {
      field: 'ipType',
      component: 'Select',
      label: '搜索类型',
      componentProps: {
        placeholder: '请选择搜索类型',
        options: [
          {
            label: 'IP',
            value: 0,
          },
          {
            label: 'IP段',
            value: 1,
          },
        ],
      },
    },
    {
      field: 'ip',
      component: 'Input',
      label: 'IP(IP段)',
      defaultValue: '',
      componentProps: {
        placeholder: '请输入IP(IP段)',
      },
    },
    {
      field: 'createTime',
      component: 'DatePicker',
      label: '添加时间',
      defaultValue: '',
      componentProps: {
        placeholder: '请选择添加时间',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ];
}

//form配置
export function ipListForm(): Partial<FormProps> {
  return {
    schemas: ipListSchemas(), //form搜索表单内容
    labelWidth: 64, //label 宽度
    autoSubmitOnEnter: true,
    showAdvancedButton: true, //是否开启收起按钮
    alwaysShowLines: 1, //超过指定行进行折叠
    submitOnReset: true, //是否开启重置时提交表单
    compact: false, //是否是紧凑类型表单
    baseColProps: {
      span: 6,
      //设置子项的样式
      style: {
        paddingRight: '16px',
      },
    },
  };
}

//新建
export const schemas: FormSchema[] = [
  {
    label: 'IP类型',
    field: 'ipType',
    component: 'RadioGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '单个IP',
          value: 0,
        },
        {
          label: 'IP范围段',
          value: 1,
        },
      ],
    },
  },
  {
    label: 'IP',
    field: 'ip',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入IP',
    },
    ifShow: ({ values }) => {
      return values.ipType === 0;
    },
  },
  {
    label: 'IP段',
    field: 'endIp',
    component: 'Input',
    required: true,
    slot: 'endIp',

    ifShow: ({ values }) => {
      return values.ipType === 1;
    },
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
