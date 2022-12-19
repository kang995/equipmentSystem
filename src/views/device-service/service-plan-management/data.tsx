import { BasicColumn, FormSchema } from '/@/components/Table';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '检修计划编号',
      dataIndex: 'name',
    },
    {
      title: '检修计划名称',
      dataIndex: 'productName',
    },
    {
      title: '计划时间',
      dataIndex: 'person',
    },
    {
      title: '检修方案',
      dataIndex: 'time',
    },
    {
      title: '检修类型',
      dataIndex: 'status',
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
      label: '检修计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入检修计划编号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '检修计划名称',
      componentProps: {
        placeholder: '请输入检修计划名称',
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
      componentProps: {
        placeholder: '请选择计划状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '审核状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择审核状态',
      },
    },
  ];
}

//新增、编辑保养计划表单
export function getCommonFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '计划名称',
      required: true,
      componentProps: {
        placeholder: '请输入计划名称',
      },
    },
    {
      field: 'result',
      component: 'RadioGroup',
      label: '检修类型',
      required: true,
      componentProps: {
        options: [
          {
            label: '周期',
            value: '1',
          },
          {
            label: '单次',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '计划生效时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '任务起始时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'task',
      component: 'Input',
      label: '任务周期',
      required: true,
      componentProps: {
        placeholder: '请输入天数',
      },
      colProps: {
        span: 17,
      },
      itemProps: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 18,
        },
      },
    },
    {
      field: 'unit',
      component: 'Select',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        options: [
          { label: '小时', value: 'h' },
          { label: '天', value: 'day' },
          { label: '月', value: 'month' },
          { label: '季', value: 'quarter' },
        ],
        getPopupContainer: () => document.body,
      },
      colProps: {
        span: 4,
      },
      itemProps: {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
        },
      },
    },
    {
      field: 'task1',
      component: 'Input',
      label: '任务执行时长',
      required: true,
      componentProps: {
        placeholder: '请输入任务执行时长',
      },
      colProps: {
        span: 17,
      },
      itemProps: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 18,
        },
      },
    },
    {
      field: 'unit1',
      component: 'Select',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        options: [
          { label: '小时', value: 'h' },
          { label: '天', value: 'day' },
          { label: '月', value: 'month' },
          { label: '季', value: 'quarter' },
        ],
        getPopupContainer: () => document.body,
      },
      colProps: {
        span: 4,
      },
      itemProps: {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
        },
      },
    },
    {
      field: 'issue',
      component: 'RadioGroup',
      label: '工单生成及下发',
      required: true,
      colProps: {
        span: 17,
      },
      componentProps: {
        options: [
          {
            label: '一次性全部生成并下发',
            value: '0',
          },
          {
            label: '定时生成并下发',
            value: '1',
          },
          {
            label: '按条数生成并下发',
            value: '2',
          },
        ],
      },
      itemProps: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 20,
        },
      },
    },
    {
      field: 'num',
      component: 'InputNumber',
      label: '',
      colProps: {
        span: 6,
      },
      componentProps: {
        addonAfter: '条',
      },
      // componentProps: ({ formActionType }) => {
      //   return {
      //     onChange: () => {
      //       const { setFieldsValue } = formActionType;
      //       setFieldsValue({
      //         evaluationLevelHigh: null,
      //       });
      //     },
      //   };
      // },
    },
    {
      field: 'task2',
      component: 'Input',
      label: '临期提醒',
      required: true,
      componentProps: {
        placeholder: '请输入临期提醒',
      },
      colProps: {
        span: 17,
      },
      itemProps: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 18,
        },
      },
    },
    {
      field: 'unit2',
      component: 'Select',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        options: [
          { label: '小时', value: 'h' },
          { label: '分钟', value: 'min' },
          { label: '天', value: 'day' },
        ],
        getPopupContainer: () => document.body,
      },
      colProps: {
        span: 4,
      },
      itemProps: {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
        },
      },
    },
    {
      field: 'task3',
      component: 'Input',
      label: '超时提醒间隔',
      required: true,
      componentProps: {
        placeholder: '请输入超时提醒间隔',
      },
      colProps: {
        span: 17,
      },
      itemProps: {
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 18,
        },
      },
    },
    {
      field: 'unit3',
      component: 'Select',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        options: [
          { label: '小时', value: 'h' },
          { label: '分钟', value: 'min' },
          { label: '天', value: 'day' },
        ],
        getPopupContainer: () => document.body,
      },
      colProps: {
        span: 4,
      },
      itemProps: {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
        },
      },
    },
    {
      field: 'type',
      component: 'ApiSelect',
      label: '保养类型',
      required: true,
      componentProps: {
        placeholder: '请选择保养类型',
      },
    },
    {
      field: 'maintain',
      component: 'InputTextArea',
      label: '检修方案',
      required: true,
      componentProps: {
        placeholder: '请输入检修方案',
        rows: 4,
        maxLength: 200,
      },
    },
    {
      field: 'upkeep',
      component: 'InputTextArea',
      label: '安全措施',
      required: true,
      componentProps: {
        placeholder: '请输入安全措施',
        rows: 4,
        maxLength: 200,
      },
    },
    {
      field: 'rule',
      component: 'InputTextArea',
      label: '检修质量标准',
      required: true,
      componentProps: {
        placeholder: '请输入检修质量标准',
        rows: 4,
        maxLength: 200,
      },
    },
    {
      field: 'plan',
      component: 'ApiSelect',
      label: '计划负责人',
      required: true,
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'task4',
      component: 'RadioGroup',
      label: '任务指派',
      required: true,
      componentProps: {
        options: [
          {
            label: '人员',
            value: '0',
          },
          {
            label: '岗位',
            value: '1',
          },
        ],
      },
    },
    {
      field: 'section',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      componentProps: {
        placeholder: '请选择处理部门',
      },
    },
    {
      field: 'processor',
      component: 'ApiSelect',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
        maxLength: 200,
      },
    },
    {
      field: 'checkDate',
      component: 'Input',
      label: ' ',
      // required: true,
      slot: 'tableSlot',
    },
  ];
}
//新增、编辑保养计划表格
export function planTableColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '所在区域',
      dataIndex: 'name',
    },
    {
      title: '所在装置',
      dataIndex: 'name',
    },
    {
      title: '是否特种设备',
      dataIndex: 'name',
    },
  ];
}
