import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image, Row } from 'ant-design-vue';
import {
  deviceTreeSelectApi,
  deviceNameSelectApi,
  UnitFacilityApi,
} from '/@/api/corrective-maintenance/fault';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
import { Tag } from 'ant-design-vue';

//列表
export function tableColumns(): BasicColumn[] {
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
      dataIndex: 'urgentLevel',
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
      dataIndex: 'troubleStatus',
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
      customRender: ({ record }) => {
        if (record.troubleStatus === '0') {
          return <span>--</span>;
        } else {
          return <span>{record.troubleDetermineText}</span>;
        }
      },
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
      },
    },
    {
      field: 'Time',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
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
      component: 'ApiTreeSelect',
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
      },
    },
  ];
}

//新增、编辑故障表单
export function getCommonFormSchema(): FormSchema[] {
  return [
    // {
    //   field: 'name',
    //   component: 'Input',
    //   label: '故障单号',
    //   required: true,
    //   componentProps: {
    //     placeholder: '请输入故障单号',
    //   },
    // },
    {
      field: 'deviceId',
      component: 'ApiTreeSelect',
      label: '关联设备',
      required: true,
      componentProps: ({ formModel }) => {
        // const { updateSchema, setFieldsValue } = formActionType;
        return {
          placeholder: '请输入关联设备',
          api: deviceTreeSelectApi,
          fieldNames: {
            label: 'label',
            key: 'id',
            value: 'id',
            children: 'children',
          },
          onChange: (id: string) => {
            deviceTreeSelectApi().then((res) => {
              const pos = res.find((item) => item.id === id);
              // console.log('pos',pos)
              formModel.position = pos.position;
            });
          },
        };
      },
      // slot: 'treeSlot',
    },
    {
      field: 'position',
      component: 'Input',
      label: '安装位置',
      // required: true,
      componentProps: {
        placeholder: '请输入安装位置',
      },
    },
    {
      field: 'findTime',
      component: 'DatePicker',
      label: '发现故障时间',
      required: true,
      componentProps: {
        placeholder: '请输入发现故障时间',
      },
    },
    {
      field: 'troubleType',
      component: 'ApiSelect',
      label: '故障类别',
      componentProps: {
        placeholder: '请输入故障类别',
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
      label: '紧急程度',
      componentProps: {
        placeholder: '请输入紧急程度',
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
      field: 'description',
      component: 'InputTextArea',
      label: '故障描述',
      componentProps: {
        placeholder: '请输入故障描述',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'expression',
      component: 'InputTextArea',
      label: '表现症状',
      componentProps: {
        placeholder: '请输入表现症状',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '故障原因',
      componentProps: {
        placeholder: '请输入故障原因',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'measure',
      component: 'InputTextArea',
      label: '采取措施',
      componentProps: {
        placeholder: '请输入采取措施',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'imgList',
      component: 'Upload',
      label: '图片上传',
      required: true,
      componentProps: {
        maxNumber: 5,
        maxSize: 5,
        accept: '.jpg,.png,.jpeg',
        helpText: '请上传图片',
      },
    },
  ];
}

//故障详情--故障信息
export function faultDetailSchema(status: string): DescItem[] {
  console.log('status', status);
  return [
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 2,
    //   render: () => {
    //     return <span style={titleStyle}>故障信息</span>;
    //   },
    // },
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
    //
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
    },
    {
      field: 'imgList',
      label: '图片',
      render: (data) => {
        const ARow = Row;
        if (data) {
          return (
            <ARow gutter={24}>
              <div class="flex-col pl-4">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="flex flex-1">
                        <Image width={100} src={item.url} />
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
//故障详情--故障确认
export function faultschema(
  troubleDetermine: string,
  troubleStatus: string,
  handleJump?: any,
  handleJumps?: any,
): DescItem[] {
  return [
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 2,
    //   render: () => {
    //     return <span style={titleStyle}>故障确认</span>;
    //   },
    //   // show: ({}) => troubleDetermine !== '0',
    // },
    {
      field: 'troubleDetermineText',
      label: '确认结果',
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
              <div class="flex-col pl-4">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="flex flex-1">
                        <Image width={100} src={item.url} />
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
      field: 'principalPeopleName',
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
      // render: (curVal) => {
      //   return curVal === '0' ? '人员' : '岗位';
      // },
    },
    {
      field: 'dealDeptName',
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
          <a
            onClick={handleJump.bind(null, data)}
            class="text-blue-500 pointer"
          >{`${data.overhaulPlanName} ${data.overhaulPlanCode}`}</a>
        );
      },
    },
    {
      field: 'overhaulWorkOrderCode',
      label: '关联检修工单',
      show: () => troubleDetermine === '2',
      render: (_curVal, data) => {
        return (
          <a
            onClick={handleJumps.bind(null, data)}
            class="text-blue-500 pointer"
          >{`${data.overhaulWorkOrderCode}`}</a>
        );
      },
    },
  ];
}
//维修结果、验收结果
export function resultschema(index: number): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>维修结果{index + 1}</span>;
      },
    },
    {
      field: 'dealCase',
      label: '处理结果',
    },
    {
      field: 'beforeDealImgList',
      label: '维修前图片',
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
    {
      field: 'dealImgList',
      label: '维修后图片',
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
    {
      field: 'stopFlagText',
      label: '是否停机',
      // render: (curVal, data) => {
      //   return curVal === '0' ? '是' : '否';
      // },
    },
    {
      field: 'acceptPeopleName',
      label: '验收人',
      span: 2,
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>验收结果{index + 1}</span>;
      },
    },
    {
      field: 'acceptResultText',
      label: '验收结果',
      // render: (curVal, data) => {
      //   return curVal === '0' ? '通过' : '不通过';
      // },
    },
    {
      field: 'acceptContent',
      label: '验收描述',
    },
  ];
}

const titleStyle: any = {
  paddingTop: '16px',
  fontSize: '15px',
  fontWeight: '600',
  position: 'relative',
  left: '0px',
};
const ImageBox: any = {
  width: '100px',
};
const fileBox = {
  padding: '0px',
  height: '50px',
  width: 'auto',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
const noFileBox: any = {
  textAlign: 'center',
  lineHeight: '70px',
  fontWeight: '600',
  fontSize: '16px',
  color: '#999',
  userSelect: 'none',
  height: '70px',
  width: '100px',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
