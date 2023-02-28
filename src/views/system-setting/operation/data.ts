import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

//列表页
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '操作时间',
      dataIndex: 'operTime',
    },
    {
      title: '操作账户',
      dataIndex: 'operName',
    },
    {
      title: 'IP地址',
      dataIndex: 'operIp',
    },
    {
      title: '操作功能模块',
      dataIndex: 'title',
    },
    {
      title: '操作内容',
      dataIndex: 'businessTypeStr',
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
      span: 7,
    },
    resetButtonOptions: {
      preIcon: 'gonggong_zhongzhi|svg',
    },
    submitButtonOptions: {
      preIcon: 'gonggong_sousuo|svg',
    },
    schemas: [
      {
        field: `title`,
        label: `操作功能模块`,
        component: 'Input',
        componentProps: {
          placeholder: '请输入操作功能模块',
        },
      },
      {
        field: `operTime`,
        label: `操作时间`,
        component: 'RangePicker',
        componentProps: {
          showTime: true,
        },
        colProps: {
          span: 10,
        },
      },

      {
        field: `operName`,
        label: `操作账号`,
        component: 'Input',
        defaultValue: '',
        componentProps: {
          placeholder: '请输入操作账号',
        },
      },
    ],
  };
}
