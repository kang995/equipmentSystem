import { BasicColumn, FormSchema } from '/@/components/Table';
import {
  getDictionarySelectTypeApi,
  getPersonSelectApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
  getStationSelectApi,
  getStationPeopleSelectApi,
  getWorkFlowApi,
} from '/@/api/device-maintenance/index';
import { Badge } from 'ant-design-vue';
//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '检修计划编号',
      dataIndex: 'code',
    },
    {
      title: '检修计划名称',
      dataIndex: 'name',
    },
    {
      title: '计划时间',
      dataIndex: 'planDateStr',
    },
    {
      title: '检修方案',
      dataIndex: 'overhaulContent',
    },
    {
      title: '检修类型',
      dataIndex: 'overhaulTypeText',
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '计划状态',
      dataIndex: 'planStatus',
      customRender: ({ record }) => {
        if (record.planStatus === '1') {
          //未开始
          return <Badge status="warning" text={record.planStatusText} />;
        } else if (record.planStatus === '2') {
          //进行中
          return <Badge status="processing" text={record.planStatusText} />;
        } else if (record.planStatus === '3') {
          //已停止
          return <Badge status="error" text={record.planStatusText} />;
        } else if (record.planStatus === '4') {
          //已完成
          return <Badge status="success" text={record.planStatusText} />;
        }
      },
    },
    {
      title: '审核状态',
      dataIndex: 'approvalStatus',
      customRender: ({ record }) => {
        if (record.approvalStatus === '1') {
          //待提交
          return <Badge status="warning" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '2') {
          //审核中
          return <Badge status="processing" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '3') {
          //审核通过
          return <Badge status="success" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '4') {
          //审核拒绝
          return <Badge status="error" text={record.approvalStatusText} />;
        } else if (record.approvalStatus === '5') {
          return '--';
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
      label: '检修计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入检修计划编号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '检修计划名称',
      componentProps: {
        placeholder: '请输入检修计划名称',
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
      label: '计划名称',
      required: true,
      componentProps: {
        placeholder: '请输入计划名称',
      },
    },
    {
      field: 'overhaulType',
      component: 'ApiRadioGroup',
      label: '检修类型',
      required: true,
      defaultValue: '0',
      componentProps: {
        api: getDictionarySelectTypeApi, //后台路径
        params: {
          type: 'OVERHAUL_TYPE',
        },
        resultField: 'data',
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '计划生效时间',
      required: true,
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
        // showTime: true,
        format: 'YYYY-MM-DD',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'taskStartTime',
      component: 'DatePicker',
      label: '任务开始时间',
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
      slot: 'taskSlot',
      ifShow: ({ values }) => {
        return values.overhaulType === '0';
      },
    },
    {
      field: 'taskCycleUnit',
      component: 'Select',
      label: '',
      defaultValue: '2',
      show: false,
    },
    {
      field: 'workOrder',
      component: 'ApiRadioGroup',
      label: '工单生成及下发',
      required: true,
      defaultValue: '1',
      componentProps: ({ formActionType }) => {
        const { updateSchema } = formActionType;
        return {
          api: getDictionarySelectTypeApi, //后台路径
          params: {
            type: 'WORK_ORDER',
          },
          resultField: 'data',
          labelField: 'itemName',
          valueField: 'itemValue',
          onChange: (e) => {
            if (e === '3') {
              updateSchema({
                field: 'workOrderNum',
                component: 'InputNumber',
                ifShow: true,
              });
            } else {
              updateSchema({
                field: 'workOrderNum',
                component: 'InputNumber',
                ifShow: false,
              });
            }
          },
        };
      },
      ifShow: ({ values }) => {
        return values.overhaulType === '0';
      },
      colProps: {
        span: 16,
      },
      itemProps: {
        labelCol: {
          span: 9,
        },
        wrapperCol: {
          span: 15,
        },
      },
    },
    {
      field: 'workOrderNum',
      component: 'InputNumber',
      label: '',
      ifShow: false,
      componentProps: {
        addonAfter: '条',
      },
      colProps: {
        span: 2,
        style: {
          marginLeft: '-30px',
        },
      },
    },
    {
      field: 'taskExecute',
      component: 'Input',
      label: '任务执行时长',
      required: true,
      slot: 'ExecuteSlot',
    },
    {
      field: 'taskExecuteUnit',
      component: 'Input',
      label: '',
      defaultValue: '2',
      show: false,
    },
    {
      field: 'adventRemind',
      component: 'Input',
      label: '临期提醒',
      required: true,
      slot: 'RemindSlot',
    },
    {
      field: 'adventRemindUnit',
      component: 'Select',
      label: '',
      defaultValue: '1',
      show: false,
    },
    {
      field: 'timeoutRemind',
      component: 'Input',
      label: '超时提醒间隔',
      required: true,
      slot: 'timeoutSlot',
    },
    {
      field: 'timeoutRemindUnit',
      component: 'Input',
      label: '',
      defaultValue: '1',
      show: false,
    },
    {
      field: 'fullId',
      component: 'ApiSelect',
      label: '关联审批流',
      componentProps: {
        placeholder: '请选择审批流程',
        api: getWorkFlowApi,
        params: {
          // type: 'PLAN_STATUS'
        },
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'data', //后台返回数据字段
        labelField: 'fullName',
        valueField: 'id',
      },
      suffix: '注：如未选择审批流程则直接生成无人员审核',
    },
    {
      field: 'overhaulContent',
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
      field: 'safeRule',
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
      field: 'overhaulStandard',
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
      defaultValue: '1',
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          api: getDictionarySelectTypeApi, //后台路径
          params: {
            type: 'DESIGNATE_TYPE',
          },
          resultField: 'data',
          labelField: 'itemName',
          valueField: 'itemValue',
          onChange: (e) => {
            formModel.dealUserIdList = undefined;
            if (e === '2') {
              formModel.dealDeptId = undefined;
              updateSchema({
                field: 'dealDeptId',
                ifShow: false,
              });
              updateSchema({
                field: 'dealStationId',
                ifShow: true,
              });
            } else {
              formModel.dealStationId = undefined;
              updateSchema({
                field: 'dealStationId',
                ifShow: false,
              });
              updateSchema({
                field: 'dealDeptId',
                ifShow: true,
              });
            }
          },
        };
      },
    },
    {
      field: 'dealDeptId',
      component: 'ApiTreeSelect',
      label: '处理部门',
      required: true,
      ifShow: true,
      componentProps: ({ formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          placeholder: '请选择处理部门',
          api: getDepartmentSelectApi,
          fieldNames: {
            numberToString: true,
            value: 'id',
            key: 'id',
            label: 'label',
            children: 'children',
          },
          onChange: (e: any) => {
            console.log(e);
            getPeopleSelectApi([e]).then((res) => {
              updateSchema({
                field: 'dealUserIdList',
                componentProps: {
                  options: res,
                },
              });
            });
          },
        };
      },
    },
    //处理岗位
    {
      field: 'dealStationId',
      component: 'ApiSelect',
      label: '处理岗位',
      required: true,
      ifShow: false,
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          api: getStationSelectApi,
          resultField: 'data', //后台返回数据字段
          labelField: 'name',
          valueField: 'id',
          onChange: (en) => {
            console.log(en);
            getStationPeopleSelectApi([en]).then((res) => {
              console.log(res);
              updateSchema({
                field: 'dealUserIdList',
                componentProps: {
                  options: res,
                  mode: 'multiple',
                },
              });
              formModel.dealUserIdList = res.map((item) => item.id);
            });
          },
        };
      },
    },
    {
      field: 'dealUserIdList',
      component: 'Select',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
        mode: 'multiple',
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
        maxLength: 200,
      },
    },
    {
      field: 'deviceIdList',
      component: 'Input',
      label: '检修设备',
      required: true,
      slot: 'tableSlot',
    },
  ];
}
//新增、编辑保养计划表格
export function planTableColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '所在区域',
      dataIndex: 'districtName',
    },
    {
      title: '所属装置',
      dataIndex: 'facilitiesName',
    },
    {
      title: '是否特种设备',
      dataIndex: 'specialEquipment',
    },
  ];
}
