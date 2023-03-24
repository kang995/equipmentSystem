import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image, Row } from 'ant-design-vue';
import chargeOrder from './chargeOrder/index.vue';
import executeOrder from './executeOrder/index.vue';
// import { getAgainFormSchema } from '/@/views/device-service/components/field';
import { deviceTreeSelectApi, UnitFacilityApi } from '/@/api/corrective-maintenance/fault';
import {
  getDictionarySelectTypeApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
  getStationSelectApi,
  getStationPeopleSelectApi,
  getPersonSelectApi,
} from '/@/api/device-maintenance/index';
import { maintainIsshowApi } from '/@/api/corrective-maintenance/repair';
import { Tag, Badge } from 'ant-design-vue';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '负责工单',
    component: chargeOrder,
  },
  {
    key: '2',
    name: '执行工单',
    component: executeOrder,
  },
];
//根据状态判断当前用户身份
(() => {
  maintainIsshowApi().then((res) => {
    //type 1显示负责工单 2显示执行工单 3都显示
    const { type } = res;
    // console.log('身份',type)
    if (type === '1') {
      achieveList.splice(1, 1);
    } else if (type === '2') {
      achieveList.splice(0, 1);
      achieveList[0].key = '1';
    }
  });
})();

// (() => {
//   const identity = '3'; //1负责人 2执行人 3具有两者身份
//   if (identity === '1') {
//     achieveList.splice(1, 1);
//   } else if (identity === '2') {
//     achieveList.splice(0, 1);
//     achieveList[0].key = '1';
//   }
// })();

//列表--负责工单、执行工单
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'code',
    },
    {
      title: '工单名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '起止时间',
      dataIndex: 'jobStartTimeAndEndTime',
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
      title: '工单状态',
      dataIndex: 'maintainStatus',
      customRender: ({ record }) => {
        if (record.maintainStatus === '0') {
          //待处理
          return <Badge color="gold" text={record.maintainStatusText} />;
        } else if (record.maintainStatus === '1') {
          //待处理(延期申请)
          return <Badge color="yellow" text={record.maintainStatusText} />;
        } else if (record.maintainStatus === '2') {
          //待验收
          return <Badge status="processing" text={record.maintainStatusText} />;
        } else if (record.maintainStatus === '3') {
          //验收未通过
          return <Badge status="error" text={record.maintainStatusText} />;
        } else if (record.maintainStatus === '4') {
          //完成
          return <Badge status="success" text={record.maintainStatusText} />;
        }
      },
    },
    {
      title: '处理人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '完成时间',
      dataIndex: 'overTime',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '工单单号',
      componentProps: {
        placeholder: '请输入工单单号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '工单名称',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入工单名称',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '负责人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入负责人',
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
      label: '起止时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'deviceId',
      component: 'ApiTreeSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
        api: deviceTreeSelectApi,
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
        showSearch: true,
        optionFilterProp: 'label',
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
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'maintainStatus',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'MAINTAIN_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'dealPeopleId',
      component: 'ApiSelect',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入处理人姓名',
        api: getPersonSelectApi,
        showSearch: true,
        optionFilterProp: 'label',
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'Time1',
      component: 'RangePicker',
      label: '完成时间',
      labelWidth: 64,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
  ];
}

//工单信息
export function WorkDetail(): DescItem[] {
  return [
    {
      field: 'code',
      label: '工单单号',
    },
    {
      field: 'name',
      label: '工单名称',
    },
    {
      field: 'chargePeopleName',
      label: '负责人',
    },
    {
      field: 'maintainStatusText',
      label: '工单状态',
    },
    {
      field: 'createTime',
      label: '下发时间',
    },
    {
      field: 'overTime',
      label: '完成时间',
      show: (values) => {
        return values.overTime ? true : false;
      },
    },
    {
      field: 'jobStartTimeAndEndTime',
      label: '执行时间',
    },
  ];
}

//维修明细
export function WorkDetails(): DescItem[] {
  return [
    {
      field: 'dealStationName',
      label: '处理岗位',
      show: (values) => {
        return values.designateType === '2' ? true : false;
      },
    },
    {
      field: 'dealDeptName',
      label: '处理部门',
      show: (values) => {
        return values.designateType === '1' ? true : false;
      },
    },
    {
      field: 'dealUserNames',
      label: '处理人',
    },
    {
      field: 'plantName',
      label: '所属装置设施',
      show: (values) => {
        return values.plantName ? true : false;
      },
    },
    {
      field: 'deviceName',
      label: '关联设备',
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
      field: 'createByPhone',
      label: '联系电话',
    },
    {
      field: 'createByName',
      label: '故障上报人',
    },
    {
      field: 'expression',
      label: '表新症状',
    },
    {
      field: 'description',
      label: '故障描述',
    },
    {
      field: 'measure',
      label: '采取措施',
    },
    {
      field: 'reason',
      label: '故障原因',
    },
    {
      field: 'maintainPlan',
      label: '维修方案',
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
    },
  ];
}

//负责人
//工单信息-重新下发
export function getAgainFormSchemas(): FormSchema[] {
  return [
    // ...getAgainFormSchema(),
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
    // 人员
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
          getPopupContainer: () => document.body,
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
    },
    // 岗位
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
          showSearch: true,
          optionFilterProp: 'label',
          getPopupContainer: () => document.body,
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
        getPopupContainer: () => document.body,
      },
    },
  ];
}

//工单信息-延期申请
export function PostponeDetail(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>延期申请</span>;
      },
    },
    {
      field: 'oldEndTime',
      label: '原截至时间',
    },
    {
      field: 'delayTime',
      label: '延期时间',
    },
    {
      field: 'delayReason',
      label: '延期原因',
    },
  ];
}

//工单信息-延期审核
export function getPostponeFormSchema(): FormSchema[] {
  return [
    {
      field: 'approvalResult',
      component: 'ApiRadioGroup',
      label: '审核结果',
      required: true,
      defaultValue: '0',
      componentProps: {
        api: getDictionarySelectTypeApi, //后台路径
        params: {
          type: 'AUDIT_RESULT',
        },
        resultField: 'data',
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '拒绝原因',
      required: true,
      componentProps: {
        placeholder: '请输入拒绝原因',
        rows: 4,
      },
    },
  ];
}

//工单信息-维修结果
export function RepairDetail(index: number): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>维修结果({index + 1})</span>;
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
      // render: (curVal) => {
      //   return curVal === '0' ? '是' : '否';
      // },
    },
    {
      field: 'acceptPeopleName',
      label: '验收人',
    },
  ];
}

//工单信息-验收结果
export function ResultDetail(index: number): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>验收结果({index + 1})</span>;
      },
    },
    {
      field: 'acceptResultText',
      label: '验收结果',
      // render: (curVal) => {
      //   return curVal === '0' ? '通过' : '不通过';
      // },
    },
    {
      field: 'acceptContent',
      label: '验收描述',
    },
    {
      field: 'acceptImgList',
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
    },
  ];
}
//执行人
//工单信息-申请延期
export function getApplyFormSchema(): FormSchema[] {
  return [
    {
      field: 'oldEndTime',
      component: 'DatePicker',
      label: '原截止时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        disabled: true,
      },
    },
    {
      field: 'delayTime',
      component: 'DatePicker',
      label: '延期时间',
      required: true,
      componentProps: {
        placeholder: '请选择时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
      },
    },
    {
      field: 'delayReason',
      component: 'InputTextArea',
      label: ' 延期原因',
      required: true,
      componentProps: {
        placeholder: '请输入原因',
        rows: 4,
        maxlength: 200,
      },
    },
  ];
}
//工单信息-维修结果
export function getAcceptFormSchema(status: string): FormSchema[] {
  return [
    {
      field: 'dealCase',
      component: 'InputTextArea',
      label: '处理结果',
      required: true,
      componentProps: {
        placeholder: '请输入处理情况',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'beforeDealImgList',
      component: 'Upload',
      label: '维修前图片',
      required: true,
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'dealImgList',
      component: 'Upload',
      label: '维修后图片',
      required: true,
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'stopFlag',
      component: 'ApiRadioGroup',
      label: '是否停机',
      required: true,
      defaultValue: '0',
      componentProps: {
        api: getDictionarySelectTypeApi, //（0是，1否）
        params: {
          type: 'STOP_FLAG',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'acceptPeopleId',
      component: 'ApiSelect',
      label: '验收人',
      required: true,
      componentProps: {
        placeholder: '请选择验收人',
        showSearch: true,
        optionFilterProp: 'label',
        api: getPersonSelectApi,
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
      // ifShow: ({}) => status === '1',
    },
  ];
}
//工单信息-待验收-维修结果
// export function ShowResultDetail(): DescItem[] {
//   return [
//     {
//       field: '',
//       label: '',
//       labelMinWidth: 0,
//       span: 2,
//       render: () => {
//         return <span style={titleStyle}>维修结果</span>;
//       },
//     },
//     {
//       field: 'applyUserName',
//       label: '处理结果',
//     },
//     {
//       field: 'applyUserName',
//       label: '维修前图片',
//       render: () => {
//         return (
//           <Image
//             style={ImageBox}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//         );
//       },
//     },
//     {
//       field: 'applyUserName',
//       label: '维修后图片',
//       render: () => {
//         return (
//           <Image
//             style={ImageBox}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//           />
//         );
//       },
//     },
//     {
//       field: 'applyUserName',
//       label: '是否停机',
//     },
//     {
//       field: 'applyUserName',
//       label: '验收人',
//     },
//   ];
// }
//工单信息-拒绝-维修结果
// export function getSubmitAcceptFormSchema(): FormSchema[] {
//   return [
//     {
//       field: 'dealCase',
//       component: 'InputTextArea',
//       label: '处理结果',
//       required: true,
//       componentProps: {
//         placeholder: '请输入处理结果',
//         rows: 4,
//       },
//     },
//     {
//       field: 'beforeDealImgList',
//       component: 'Upload',
//       label: '维修前图片',
//       required: true,
//       componentProps: {
//         maxNumber: 5,
//         accept: '.jpg,.jpeg,.png',
//         maxSize: 5,
//         helpText: '请上传图片',
//       },
//     },
//     {
//       field: 'dealImgList',
//       component: 'Upload',
//       label: '维修后图片',
//       required: true,
//       componentProps: {
//         maxNumber: 5,
//         accept: '.jpg,.jpeg,.png',
//         maxSize: 5,
//         helpText: '请上传图片',
//       },
//     },
//     {
//       field: 'stopFlag',
//       component: 'ApiRadioGroup',
//       label: '是否停机',
//       required: true,
//       componentProps: {
//         api: getDictionarySelectTypeApi,//（0是，1否）
//         params: {
//           type: 'STOP_FLAG',
//         },
//         resultField: 'data', //后台返回数据字段
//         labelField: 'itemName',
//         valueField: 'itemValue',
//       },
//     },
//   ];
// }

//使用备件
export function tablePartColumns(): BasicColumn[] {
  return [
    // {
    //   title: '备件编码',
    //   dataIndex: 'name',
    // },
    {
      title: '备件名称',
      dataIndex: 'name',
    },
    {
      title: '备件分类',
      dataIndex: 'name',
    },
    {
      title: '使用数量',
      dataIndex: 'name',
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
