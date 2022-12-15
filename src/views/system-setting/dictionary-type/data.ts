import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
//表格字段
export function getDictionaryTypeTableColumns(): BasicColumn[] {
  return [
    {
      title: '类型名称',
      dataIndex: 'itemName',
      align: 'left',
    },
    {
      title: '字典编码',
      dataIndex: 'itemValue',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];
}
//表格查询字段
export function DictionaryTypeFormSchemas(): FormSchema[] {
  return [
    {
      field: 'itemName',
      component: 'Input',
      label: '类型名称',
      defaultValue: '',
      componentProps: {
        placeholder: '请输入类型名称',
      },
    },
    {
      field: 'type',
      component: 'Input',
      label: '字典编码',
      defaultValue: '',
      componentProps: {
        placeholder: '请输入字典编码',
      },
    },
  ];
}

//form配置
export function dictionaryTypeFormConfig(submitFunc: () => Promise<void>): Partial<FormProps> {
  return {
    schemas: DictionaryTypeFormSchemas(), //form搜索表单内容
    showAdvancedButton: true, //是否开启收起按钮
    submitOnReset: true, //是否开启重置时提交表单
    compact: false, //是否是紧凑类型表单
    autoSubmitOnEnter: true,
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
    fieldMapToTime: [
      //更改RangePicker的返回字段
      ['deviceTime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
    ],
    submitFunc: submitFunc,
  };
}

//新增DictionaryTypeForm字段
export const dictionaryTypeFormSchemas: FormSchema[] = [
  {
    field: 'parentName',
    component: 'Input',
    label: '父级节点',
    componentProps: {
      disabled: true,
      placeholder: '当前没有父级',
    },
  },
  {
    field: 'itemValue',
    component: 'Input',
    label: '分类编码',
    componentProps: {
      placeholder: '选填，不填自动生成',
    },
    // rules: [
    //   {
    //     validator: async (_rule, val) => {
    //       if (val != null) {
    //         if (/[^\w]/g.test(val)) {
    //           return Promise.reject('只能输入英文，数字');
    //         }
    //       }
    //       return Promise.resolve();
    //     },
    //     trigger: 'blur',
    //   },
    // ],
  },
  {
    field: 'type',
    component: 'Input',
    label: '字典类型',
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请输入字典类型',
        onChange: (e: ChangeEvent) => {
          formModel.itemValue = e.target.value;
        },
      };
    },
    // rules: [
    //   {
    //     required: true,
    //     validator: async (_rule, val) => {
    //       if (val != null) {
    //         if (/[^\w]/g.test(val)) {
    //           return Promise.reject('只能输入英文，数字');
    //         }
    //       }
    //       return Promise.resolve();
    //     },
    //     trigger: 'blur',
    //   },
    // ],
  },
  {
    field: 'itemName',
    component: 'Input',
    label: '分类名称',
    required: true,
    componentProps: {
      placeholder: '请输入分类名称',
    },
  },
];
