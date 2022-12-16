import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form';

export function getColumns(): BasicColumn[] {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      slots: { customRender: 'titleSlots' },
    },
    {
      title: '接收时间',
      dataIndex: 'createTime',
    },
    {
      title: '消息类型',
      dataIndex: 'messageTypeText',
    },
  ];
}

export const schemasSearch: FormSchema[] = [
  {
    field: `messageType`,
    label: `消息类型`,
    component: 'ApiSelect',
    //字典接口
    // componentProps: {
    //   api: getDictionarySelectType, //后台路径
    //   params: {
    //     type: 'MESSAGE_TYPE',
    //   },
    //   resultField: 'data', //后台返回数据字段
    //   labelField: 'itemName', //设置label字段
    //   valueField: 'itemValue', //设置value字段
    //   placeholder: '请选择消息类型',
    // },
  },
  {
    field: 'Time',
    component: 'RangePicker',
    label: '接收时间',
    componentProps: {
      showTime: true,
      // placeholder: '请输入接收时间',
    },
  },
  {
    field: `title`,
    label: `标题/内容`,
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题/内容',
    },
  },
];
