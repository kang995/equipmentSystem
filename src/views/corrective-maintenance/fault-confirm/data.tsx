import { BasicColumn, FormSchema } from '/@/components/Table';
import confirming from './confirming/index.vue';
import confirmed from './confirmed/index.vue';
import { DescItem } from '/@/components/Description';
import { Image, Row } from 'ant-design-vue';
import {
  getDictionarySelectTypeApi,
  getPersonSelectApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
  getStationSelectApi,
  getStationPeopleSelectApi,
} from '/@/api/device-maintenance/index';
import {
  deviceNameSelectApi,
  UnitFacilityApi,
  TroublePlanListApi,
  TroubleWorkOrderListApi,
} from '/@/api/corrective-maintenance/fault';
import { Tag, Badge } from 'ant-design-vue';
export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待确认',
    component: confirming,
  },
  {
    key: '2',
    name: '已确认',
    component: confirmed,
  },
];

//故障确认-待确认、已确认
export function tableColumns(ifIssue: any): BasicColumn[] {
  return [
    {
      title: '故障单号',
      dataIndex: 'troubleCode',
    },
    {
      title: '上报人',
      dataIndex: 'createBy',
    },
    {
      title: '上报时间',
      dataIndex: 'createTime',
    },
    {
      title: '关联设备',
      dataIndex: 'deviceName',
    },
    {
      title: '所属装置设施',
      dataIndex: 'plantName',
    },
    {
      title: '故障类别',
      dataIndex: 'troubleTypeText',
    },
    {
      title: '紧急程度',
      dataIndex: 'urgentLevelText',
      customRender: ({ record }) => {
        if (record.urgentLevel === '0') {
          //紧急
          return <Tag color={'red'}>{record.urgentLevelText}</Tag>;
        } else if (record.urgentLevel === '1') {
          //高
          return <Tag color={'orange'}>{record.urgentLevelText}</Tag>;
        } else if (record.urgentLevel === '2') {
          //中
          return <Tag color={'warning'}>{record.urgentLevelText}</Tag>;
        } else if (record.urgentLevel === '3') {
          //低
          return <Tag color={'blue'}>{record.urgentLevelText}</Tag>;
        }
      },
    },
    {
      title: '故障描述',
      dataIndex: 'description',
    },
    {
      title: '故障状态',
      dataIndex: 'troubleStatusText',
      customRender: ({ record }) => {
        if (record.troubleStatus === '0') {
          //待确认
          return <Badge color="yellow" text={record.troubleStatusText} />;
        } else if (record.troubleStatus === '1') {
          //待处理
          return <Badge color="gold" text={record.troubleStatusText} />;
        } else if (record.troubleStatus === '2') {
          //处理中
          return <Badge status="processing" text={record.troubleStatusText} />;
        } else if (record.troubleStatus === '3') {
          //已解决
          return <Badge status="success" text={record.troubleStatusText} />;
        } else if (record.troubleStatus === '4') {
          //已转计划
          return <Badge status="default" text={record.troubleStatusText} />;
        }
      },
    },
    {
      title: '确认结果',
      dataIndex: 'troubleDetermineText',
      ifShow: !ifIssue,
    },
  ];
}

export function getFormSchema(ifIssue: any): FormSchema[] {
  return [
    {
      field: 'troubleCode',
      component: 'Input',
      label: '故障单号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入故障单号',
      },
    },
    {
      field: 'createBy',
      component: 'ApiSelect',
      label: '上报人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入上报人',
        api: getPersonSelectApi,
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'deviceId',
      component: 'ApiSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
        api: deviceNameSelectApi,
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'plantId',
      component: 'ApiSelect',
      label: '所属装置设施',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择所属装置设施',
        api: UnitFacilityApi,
        showSearch: true,
        optionFilterProp: 'label',
        fieldNames: {
          value: 'id',
          key: 'id',
          label: 'label',
          children: 'children',
        },
      },
    },
    {
      field: 'troubleType',
      component: 'ApiSelect',
      label: '故障类别',
      labelWidth: 64,
      componentProps: {
        placeholder: '请选择故障类别',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TROUBLE_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'urgentLevel',
      component: 'ApiSelect',
      label: '故障等级',
      componentProps: {
        placeholder: '请选择故障等级',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'URGENT_LEVEL',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'troubleStatus',
      component: 'ApiSelect',
      label: '故障状态',
      componentProps: {
        placeholder: '请选择故障状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TROUBLE_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'troubleDetermine',
      component: 'ApiSelect',
      label: '确认结果',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择确认结果',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'TROUBLE_DETERMINE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
      ifShow: !ifIssue,
    },
  ];
}

//故障详情--基本信息
export function confirmdedDetail(): DescItem[] {
  return [
    {
      field: 'troubleCode',
      label: '故障单号',
    },
    {
      field: 'createTime',
      label: '上报时间',
    },
    {
      field: 'findTime',
      label: '发现故障时间',
    },
  ];
}
//故障详情--故障明细
export function confirmdedDetails(): DescItem[] {
  return [
    {
      field: 'troubleStatusText',
      label: '故障状态',
    },
    {
      field: 'createByName',
      label: '上报人',
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'deviceName',
      label: '关联设备',
    },
    {
      field: 'plantName',
      label: '所属装置设施',
    },
    {
      field: 'position',
      label: '地理位置',
    },
    {
      field: 'troubleTypeText',
      label: '故障类别',
    },
    {
      field: 'urgentLevelText',
      label: '紧急程度',
    },
    {
      field: 'description',
      label: '故障描述',
      contentMinWidth: 600,
    },
    {
      field: 'expression',
      label: '表新症状',
      contentMinWidth: 600,
    },
    {
      field: 'reason',
      label: '故障原因',
    },
    {
      field: 'measure',
      label: '采取措施',
      span: 2,
    },
    {
      field: 'imgList',
      label: '图片',
      span: 2,
      render: (data) => {
        const ARow = Row;
        if (data) {
          return (
            <ARow gutter={24}>
              <div class="flex flex-1">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="pl-2">
                        <Image width={80} src={item.url} />
                      </div>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </ARow>
          );
        }
      },
    },
  ];
}

export function confirmFormSchema(): FormSchema[] {
  return [
    {
      field: 'troubleDetermine',
      component: 'ApiRadioGroup',
      label: '故障确认',
      required: true,
      defaultValue: '0',
      componentProps: () => {
        return {
          api: getDictionarySelectTypeApi, //后台路径
          params: {
            type: 'TROUBLE_DETERMINE',
          },
          resultField: 'data',
          labelField: 'itemName',
          valueField: 'itemValue',
        };
      },
    },
    // 自修
    {
      field: 'name',
      component: 'Input',
      label: '工单名称',
      required: true,
      componentProps: {
        placeholder: '请输入工单名称',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '负责人',
      required: true,
      componentProps: {
        placeholder: '请选择负责人',
        api: getPersonSelectApi,
        params: {
          // type: 'PLAN_STATUS'
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '任务起止时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
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
            updateSchema({
              field: 'dealUserIdList',
              componentProps: {
                options: [],
              },
            });
            if (e === '2') {
              formModel.dealDeptId = undefined;
            } else {
              formModel.dealStationId = undefined;
            }
          },
        };
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    //人员
    {
      field: 'dealDeptId',
      component: 'ApiTreeSelect',
      label: '处理部门',
      required: true,
      componentProps: ({ formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          placeholder: '请选择处理部门',
          api: getDepartmentSelectApi,
          // params: {
          //   // type: 'PLAN_STATUS'
          // },
          // resultField: 'data', //后台返回数据字段
          // labelField: 'label',
          // valueField: 'id',
          fieldNames: {
            numberToString: true,
            value: 'id',
            key: 'id',
            label: 'label',
            children: 'children',
          },
          onChange: (e: any) => {
            // console.log(e);
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
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0' && values?.designateType === '1';
      },
    },
    // 岗位
    {
      field: 'dealStationId',
      component: 'ApiSelect',
      label: '处理岗位',
      required: true,
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          api: getStationSelectApi,
          resultField: 'data', //后台返回数据字段
          labelField: 'name',
          valueField: 'id',
          showSearch: true,
          optionFilterProp: 'label',
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
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0' && values?.designateType === '2';
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
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'maintainPlan',
      component: 'InputTextArea',
      label: '维修方案',
      required: true,
      componentProps: {
        placeholder: '请输入维修方案',
        rows: 4,
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    // 委外维修
    {
      field: 'outsourceName',
      component: 'Input',
      label: '第三方名称',
      required: true,
      componentProps: {
        placeholder: '请输入第三方名称',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '1';
      },
    },
    {
      field: 'maintainTime',
      component: 'DatePicker',
      label: '维修时间',
      required: true,
      componentProps: {},
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '1';
      },
    },
    {
      field: 'maintainContent',
      component: 'InputTextArea',
      label: '维修内容',
      required: true,
      componentProps: {
        placeholder: '请输入维修内容',
        rows: 4,
        maxlength: 200,
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '1';
      },
    },
    {
      field: 'imgList',
      component: 'Upload',
      label: '图片',
      required: true,
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '1';
      },
    },
    // 列入检修计划
    {
      field: 'overhaulPlanId',
      component: 'ApiSelect',
      label: '关联检修计划',
      required: true,
      componentProps: ({ formActionType }) => {
        const { updateSchema } = formActionType;
        return {
          placeholder: '请选择关联检修计划',
          api: TroublePlanListApi,
          // params: {
          //   type: 'TROUBLE_STATUS',
          // },
          resultField: 'data', //后台返回数据字段
          labelField: 'name',
          valueField: 'id',
          showSearch: true,
          optionFilterProp: 'label',
          onChange: (e: any) => {
            TroubleWorkOrderListApi({ id: e }).then((res) => {
              console.log('e', e);
              const data = res.map((item) => {
                return {
                  label: item.code,
                  value: item.id,
                  key: item.id,
                };
              });
              updateSchema({
                field: 'overhaulWorkOrderId',
                component: 'Select',
                componentProps: {
                  options: data,
                },
              });
            });
          },
        };
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '2';
      },
    },
    {
      field: 'overhaulWorkOrderId',
      component: 'Select',
      label: '关联检修工单',
      required: true,
      componentProps: {
        placeholder: '请选择关联检修工单',
        options: [],
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '2';
      },
    },
  ];
}

//故障详情--已确认
export function confirmdingDetail(troubleDetermine: string, troubleStatus: string): DescItem[] {
  return [
    {
      field: 'troubleDetermineText',
      label: '确认结果',
      contentMinWidth: 200,
    },
    //委外维修
    {
      field: 'outsourceName',
      label: '三方名称',
      show: () => troubleDetermine === '1',
    },
    {
      field: 'maintainTime',
      label: '维修时间',
      show: () => troubleDetermine === '1',
    },
    {
      field: 'maintainContent',
      label: '维修内容',
      show: () => troubleDetermine === '1',
    },
    {
      field: 'imgList',
      label: '图片',
      render: (data) => {
        const ARow = Row;
        if (data) {
          return (
            <ARow gutter={24}>
              <div class="flex flex-1">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="pl-2">
                        <Image width={80} src={item.url} />
                      </div>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </ARow>
          );
        }
      },
      show: () => troubleDetermine === '1',
    },
    //自修
    {
      field: 'name',
      label: '工单名称',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'chargePeopleName',
      label: '负责人',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'jobStartTime',
      label: '任务起止时间',
      show: () => troubleDetermine === '0',
      render: (_curVal, data) => {
        return `${data.jobStartTime}-${data.jobEndTime}`;
      },
    },
    {
      field: 'designateTypeText',
      label: '任务指派',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'dealDeptName',
      label: '处理部门',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'dealPeopleNames',
      label: '处理人',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'maintainPlan',
      label: '维修方案',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'code',
      label: '关联工单',
      show: () => troubleDetermine === '0' && troubleStatus !== '0',
    },
    //列入检修计划
    {
      field: 'overhaulPlanName',
      label: '关联检修计划',
      show: () => troubleDetermine === '2',
      render: (_curVal, data) => {
        return (
          <span class="text-blue-500">{`${data.overhaulPlanName} ${data.overhaulPlanCode}`}</span>
        );
      },
    },
    {
      field: 'overhaulWorkOrderCode',
      label: '关联检修工单',
      show: () => troubleDetermine === '2',
      render: (_curVal, data) => {
        return <span class="text-blue-500">{`${data.overhaulWorkOrderCode}`}</span>;
      },
    },
  ];
}
// const titleStyle: any = {
//     paddingTop: '16px',
//     fontSize: '15px',
//     fontWeight: '600',
//     position: 'relative',
//     left: '0px',
//   },
const ImageBox: any = {
  width: '80px',
};

const fileBox = {
  padding: '0px',
  height: '100px',
  width: 'auto',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
const noFileBox: any = {
  textAlign: 'center',
  lineHeight: '100px',
  fontWeight: '600',
  fontSize: '16px',
  color: '#999',
  userSelect: 'none',
  height: '100px',
  width: '200px',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
