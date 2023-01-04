import { BasicColumn, FormSchema } from '/@/components/Table';
import confirming from './confirming/index.vue';
import confirmed from './confirmed/index.vue';
import { DescItem } from '/@/components/Description';
import { Image } from 'ant-design-vue';
import {
  getDictionarySelectTypeApi,
  getPersonSelectApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
  getStationSelectApi,
  getStationPeopleSelectApi,
} from '/@/api/device-maintenance/index';
import { deviceNameSelectApi, UnitFacilityApi } from '/@/api/corrective-maintenance/fault';
import { Tag } from 'ant-design-vue';
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
      title: '故障等级',
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
          return <Tag color={'cyan'}>{record.urgentLevelText}</Tag>;
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
          return <Tag color={'default'}>{record.troubleStatusText}</Tag>;
        } else if (record.troubleStatus === '1') {
          //待处理
          return <Tag color={'orange'}>{record.troubleStatusText}</Tag>;
        } else if (record.troubleStatus === '2') {
          //处理中
          return <Tag color={'orange'}>{record.troubleStatusText}</Tag>;
        } else if (record.troubleStatus === '3') {
          //已解决
          return <Tag color={'green'}>{record.troubleStatusText}</Tag>;
        } else if (record.troubleStatus === '4') {
          //已转计划
          return <Tag color={'default'}>{record.troubleStatusText}</Tag>;
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

export function getFormSchema(): FormSchema[] {
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
      component: 'Input',
      label: '上报人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入上报人',
      },
    },
    {
      field: 'createTime',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'deviceName',
      component: 'ApiSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
        api: deviceNameSelectApi,
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'plantName',
      component: 'ApiSelect',
      label: '所属装置设施',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择所属装置设施',
        api: UnitFacilityApi,
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
      },
    },
  ];
}

const commonDetail: DescItem[] = [
  {
    field: '',
    label: '',
    labelMinWidth: 0,
    span: 2,
    render: () => {
      return <span style={titleStyle}>故障信息</span>;
    },
  },
  {
    field: 'troubleCode',
    label: '故障单号',
  },
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
    field: 'createTime',
    label: '上报时间',
  },
  {
    field: 'findTime',
    label: '发现故障时间',
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
  },
  {
    field: 'expression',
    label: '表新症状',
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
      if (data) {
        return (
          <>
            {data.map((item) => {
              return (
                <div class={fileBox}>
                  <Image style={ImageBox} src={item.url} alt="" />
                </div>
              );
            })}
          </>
        );
      } else {
        return <div style={noFileBox}>暂无图片</div>;
      }
    },
  },
];
//故障详情--待确认
export function confirmdedDetail(): DescItem[] {
  return [...commonDetail];
}
export function confirmFormSchema(): FormSchema[] {
  return [
    {
      field: 'troubleDetermine',
      component: 'ApiRadioGroup',
      label: '故障确认',
      required: true,
      colProps: {
        span: 13,
      },
      defaultValue: '0',
      componentProps: ({ formModel }) => {
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
      field: 'jobName',
      component: 'Input',
      label: '工单名称',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请输入工单名称',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'principalPeopleId',
      component: 'ApiSelect',
      label: '负责人',
      required: true,
      colProps: {
        span: 16,
      },
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
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '任务起止时间',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0';
      },
    },
    {
      field: 'assignType',
      component: 'ApiRadioGroup',
      label: '任务指派',
      required: true,
      defaultValue: '1',
      colProps: {
        span: 16,
      },
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
            formModel.disposePeopleIdList = undefined;
            if (e === '2') {
              formModel.disposeUnitId = undefined;
              // updateSchema({
              //   field: 'disposeUnitId',
              //   ifShow: false,
              // });
              // updateSchema({
              //   field: 'dealStationId',
              //   ifShow: true,
              // });
            } else {
              formModel.dealStationId = undefined;
              // updateSchema({
              //   field: 'dealStationId',
              //   ifShow: false,
              // });
              // updateSchema({
              //   field: 'disposeUnitId',
              //   ifShow: true,
              // });
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
      field: 'disposeUnitId',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      colProps: {
        span: 16,
      },
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
                field: 'disposePeopleIdList',
                componentProps: {
                  options: res,
                },
              });
            });
          },
        };
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0' && values?.assignType === '1';
      },
    },
    // 岗位
    {
      field: 'dealStationId',
      component: 'ApiSelect',
      label: '处理岗位',
      required: true,
      colProps: {
        span: 16,
      },
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
                field: 'disposePeopleIdList',
                componentProps: {
                  options: res,
                  mode: 'multiple',
                },
              });
              formModel.disposePeopleIdList = res.map((item) => item.id);
            });
          },
        };
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '0' && values?.assignType === '2';
      },
    },
    {
      field: 'disposePeopleIdList',
      component: 'Select',
      label: '处理人',
      required: true,
      colProps: {
        span: 16,
      },
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
      colProps: {
        span: 16,
      },
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
      colProps: {
        span: 16,
      },
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
      colProps: {
        span: 16,
      },
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
      colProps: {
        span: 16,
      },
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
      colProps: {
        span: 16,
      },
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
      field: 'overhaulId',
      component: 'ApiSelect',
      label: '关联检修计划',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请选择关联检修计划',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '2';
      },
    },
    {
      field: 'overhaulJobId',
      component: 'ApiSelect',
      label: '关联检修工单',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请选择关联检修工单',
      },
      ifShow: ({ values }) => {
        return values?.troubleDetermine === '2';
      },
    },
  ];
}

//故障详情--已确认
export function confirmdingDetail(troubleDetermine: string): DescItem[] {
  return [
    // ...commonDetail,
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>故障确认</span>;
      },
    },
    {
      field: 'id',
      label: '故障确认',
      show: () => troubleDetermine === '0' || troubleDetermine === '1',
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
        if (data) {
          return (
            <>
              {data.map((item) => {
                return (
                  <div class={fileBox}>
                    <Image style={ImageBox} src={item.url} alt="" />
                  </div>
                );
              })}
            </>
          );
        } else {
          return <div style={noFileBox}>暂无图片</div>;
        }
      },
      show: () => troubleDetermine === '1',
    },
    //自修
    {
      field: 'applyUserName',
      label: '确认结果',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'jobName',
      label: '工单名称',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'principalPeopleName',
      label: '负责人',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'jobStartTime',
      label: '任务起止时间',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'assignType',
      label: '任务指派',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'disposeUnitName',
      label: '处理部门',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'disposePeopleNames',
      label: '处理人',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'maintainPlan',
      label: '维修方案',
      show: () => troubleDetermine === '0',
    },
    {
      field: 'jobCode',
      label: '关联工单',
      show: () => troubleDetermine === '0',
    },
  ];
}
const titleStyle: any = {
    paddingTop: '16px',
    fontSize: '15px',
    fontWeight: '600',
    position: 'relative',
    left: '0px',
  },
  ImageBox: any = {
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
