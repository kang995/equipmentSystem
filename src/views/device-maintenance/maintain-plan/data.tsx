import { BasicColumn, FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import {
  getDictionarySelectTypeApi,
  getPersonSelectApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
} from '/@/api/device-maintenance/index';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '保养计划编号',
      dataIndex: 'code',
    },
    {
      title: '保养计划名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '计划时间',
      dataIndex: 'planDateStr',
    },
    {
      title: '计划状态',
      dataIndex: 'planStatus',
      customRender: ({ record }) => {
        return <span>{record.planStatusText}</span>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'approvalStatus',
      customRender: ({ record }) => {
        if (record.approvalStatus === '1') {
          //待提交
          return <Tag color={'default'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '2') {
          //审核中
          return <Tag color={'orange'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '3') {
          //审核通过
          return <Tag color={'green'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '4') {
          //审核拒绝
          return <Tag color={'red'}>{record.approvalStatusText}</Tag>;
        }
      },
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '设备保养编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入设备保养编号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '保养计划名称',
      componentProps: {
        placeholder: '请选择保养计划名称',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请选择负责人',
        api: getPersonSelectApi,
        params: {
          // type: 'PLAN_STATUS'
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'planStatus',
      component: 'ApiSelect',
      label: '计划状态',
      componentProps: {
        placeholder: '请选择计划状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'PLAN_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'approvalStatus',
      component: 'ApiSelect',
      label: '审核状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择审核状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
      label: '保养计划名称',
      required: true,
      componentProps: {
        placeholder: '请输入保养计划名称',
      },
    },
    {
      field: 'Time',
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
      field: 'taskStartTime',
      component: 'DatePicker',
      label: '任务起始时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'taskCycle',
      component: 'Input',
      label: '任务周期',
      required: true,
      // slot:'taskSlot',
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
      field: 'taskCycleUnit',
      component: 'ApiSelect',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        getPopupContainer: () => document.body,
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TASK_CYCLE_UNIT',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
      field: 'taskExecute',
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
      field: 'taskExecuteUnit',
      component: 'ApiSelect',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        getPopupContainer: () => document.body,
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TASK_EXECUTE_UNIT',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
      field: 'workOrder',
      component: 'ApiRadioGroup',
      label: '工单生成及下发',
      required: true,
      colProps: {
        span: 17,
      },
      componentProps: {
        api: getDictionarySelectTypeApi, //后台路径
        params: {
          type: 'WORK_ORDER',
        },
        resultField: 'data',
        labelField: 'itemName',
        valueField: 'itemValue',
        onChange: (e) => {},
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
      field: 'workOrderNum',
      component: 'InputNumber',
      label: '',
      colProps: {
        span: 6,
      },
      componentProps: {
        addonAfter: '条',
      },
    },
    {
      field: 'adventRemind',
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
      field: 'adventRemindUnit',
      component: 'ApiSelect',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        getPopupContainer: () => document.body,
        api: getDictionarySelectTypeApi,
        params: {
          type: 'ADVENT_REMIND_UNIT',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
      field: 'timeoutRemind',
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
      field: 'timeoutRemindUnit',
      component: 'ApiSelect',
      label: ' ',
      componentProps: {
        placeholder: '请选择单位',
        getPopupContainer: () => document.body,
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TIMEOUT_REMIND_UNIT',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
      field: 'upkeepType',
      component: 'ApiSelect',
      label: '保养类型',
      required: true,
      componentProps: {
        placeholder: '请选择保养类型',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'UPKEEP_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'upkeepContent',
      component: 'InputTextArea',
      label: '保养内容',
      required: true,
      componentProps: {
        placeholder: '请输入保养内容',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'upkeepStandard',
      component: 'InputTextArea',
      label: '保养标椎',
      componentProps: {
        placeholder: '请输入保养标椎',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'safeRule',
      component: 'InputTextArea',
      label: '安全规则',
      componentProps: {
        placeholder: '请输入安全规则',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '计划负责人',
      required: true,
      componentProps: {
        placeholder: '请选择计划负责人',
        api: getPersonSelectApi,
        params: {
          // type: 'PLAN_STATUS'
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'designateType',
      component: 'ApiRadioGroup',
      label: '任务指派',
      required: true,
      componentProps: {
        api: getDictionarySelectTypeApi, //后台路径
        params: {
          type: 'DESIGNATE_TYPE',
        },
        resultField: 'data',
        labelField: 'itemName',
        valueField: 'itemValue',
        onChange: (e) => {},
      },
    },
    {
      field: 'deptId',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      componentProps: ({ formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          placeholder: '请选择处理部门',
          api: getDepartmentSelectApi,
          params: {
            // type: 'PLAN_STATUS'
          },
          resultField: 'data', //后台返回数据字段
          labelField: 'label',
          valueField: 'id',
          onChange: (e: any) => {
            // console.log(e);
            getPeopleSelectApi([e]).then((res) => {
              updateSchema({
                field: 'userId',
                componentProps: {
                  options: res,
                },
              });
            });
          },
        };
      },
    },
    {
      field: 'userId',
      component: 'Select',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
        options: [],
        fieldNames: { label: 'name', value: 'id' },
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'deviceIdList',
      component: 'Input',
      label: '保养设备',
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
