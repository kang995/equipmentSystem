import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import accepting from './accepting/index.vue';
import accepted from './accepted/index.vue';
import { Image, Row } from 'ant-design-vue';
import { deviceNameSelectApi, UnitFacilityApi } from '/@/api/corrective-maintenance/fault';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
import { Tag, Badge } from 'ant-design-vue';
import { RepairDetail, ResultDetail } from '/@/views/corrective-maintenance/repair-workOrder/data';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待验收',
    component: accepting,
  },
  {
    key: '2',
    name: '已验收',
    component: accepted,
  },
];

//维修验收-待验收、已验收
export function tableColumns(ifIssue: any): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'code',
    },
    {
      title: '工单名称',
      dataIndex: 'name',
      ifShow: () => ifIssue,
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    //
    {
      title: '下发时间',
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
      title: '故障类型',
      dataIndex: 'troubleTypeText',
    },
    //
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
      dataIndex: 'dealUserNames',
    },
  ];
}
//维修工单--待验收/已验收
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
    //
    {
      field: 'createTime',
      component: 'RangePicker',
      label: '创建时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        // showTime: true,
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
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
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
        fieldNames: {
          value: 'id',
          key: 'id',
          label: 'label',
          children: 'children',
        },
        showSearch: true,
        optionFilterProp: 'label',
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
    //
    {
      field: 'urgentLevel',
      component: 'ApiSelect',
      label: '故障等级',
      componentProps: {
        placeholder: '请选择故障等级',
        api: getDictionarySelectTypeApi,
        showSearch: true,
        optionFilterProp: 'label',
        params: {
          type: 'URGENT_LEVEL',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'maintainStatus',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
        api: getDictionarySelectTypeApi,
        showSearch: true,
        optionFilterProp: 'label',
        params: {
          type: 'MAINTAIN_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
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
  ];
}
//维修工单--已验收
// export function getFormSchemas(): FormSchema[] {
//   return [
//     {
//       field: 'code',
//       component: 'Input',
//       label: '工单单号',
//       componentProps: {
//         placeholder: '请输入工单单号',
//       },
//     },
//     {
//       field: 'chargePeopleId',
//       component: 'ApiSelect',
//       label: '负责人',
//       componentProps: {
//         placeholder: '请输入负责人',
//         api: getPersonSelectApi,
//         showSearch: true,
//         optionFilterProp: 'label',
//         params: {
//           // type: 'APPROVAL_STATUS',
//         },
//         resultField: 'data', //后台返回数据字段
//         labelField: 'name',
//         valueField: 'id',
//       },
//     },
//     {
//       field: 'dealPeopleId',
//       component: 'ApiSelect',
//       label: '处理人',
//       componentProps: {
//         placeholder: '请输入处理人姓名',
//         api: getPersonSelectApi,
//         showSearch: true,
//         optionFilterProp: 'label',
//         params: {
//           // type: 'APPROVAL_STATUS',
//         },
//         resultField: 'data', //后台返回数据字段
//         labelField: 'name',
//         valueField: 'id',
//       },
//     },
//   ];
// }
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
//维修验收-维修结果
export function maintainDetail(index: number): DescItem[] {
  return [
    ...RepairDetail(index),

    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 2,
    //   render: () => {
    //     return <span style={titleStyle}>维修结果{index+1}</span>;
    //   },
    // },
    // {
    //   field: 'dealCase',
    //   label: '处理结果',
    // },
    // {
    //   field: 'beforeDealImgList',
    //   label: '维修前图片',
    //   render: () => {
    //     return (
    //       <Image
    //         style={ImageBox}
    //         src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //       />
    //     );
    //   },
    // },
    // {
    //   field: 'applyUserName',
    //   label: '维修后图片',
    //   render: () => {
    //     return (
    //       <Image
    //         style={ImageBox}
    //         src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //       />
    //     );
    //   },
    // },
    // {
    //   field: 'applyUserName',
    //   label: '是否停机',
    // },
  ];
}

//维修验收-验收结果
export function maintainDetails(index: number): DescItem[] {
  return [
    ...ResultDetail(index),
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 2,
    //   render: () => {
    //     return <span style={titleStyle}>验收结果{index+1}</span>;
    //   },
    // },
    // {
    //   field: 'acceptResultText',
    //   label: '验收结果',
    // },
    // {
    //   field: 'acceptCase',
    //   label: '验收描述',
    // },
    // {
    //   field: 'acceptImgList',
    //   label: '图片',
    //   render: (data) => {
    //     if (data) {
    //       return (
    //         <>
    //           {data.map((item) => {
    //             return (
    //               <div class={fileBox}>
    //                 <Image style={ImageBox} src={item.url} alt="" />
    //               </div>
    //             );
    //           })}
    //         </>
    //       );
    //     } else {
    //       return <div style={noFileBox}>暂无图片</div>;
    //     }
    //   },
    // },
  ];
}

export function getResultFormSchema(): FormSchema[] {
  return [
    {
      field: 'acceptResult',
      component: 'ApiRadioGroup',
      label: '验收结果',
      required: true,
      defaultValue: '0', //（0通过，1不通过）
      componentProps: {
        api: getDictionarySelectTypeApi, //后台路径
        params: {
          type: 'ACCEPT_RESULT',
        },
        resultField: 'data',
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'acceptContent',
      component: 'InputTextArea',
      label: '验收描述',
      required: true,
      componentProps: {
        placeholder: '请输入验收描述',
        rows: 4,
      },
    },
    {
      field: 'acceptImgList',
      component: 'Upload',
      label: '图片',
      required: true,
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
  ];
}

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

// const titleStyle: any = {
//     paddingTop: '16px',
//     fontSize: '15px',
//     fontWeight: '600',
//     position: 'relative',
//     left: '0px',
//   },
//   ImageBox: any = {
//     width: '80px',
//   };
// const fileBox = {
//   padding: '0px',
//   height: '100px',
//   width: 'auto',
//   border: 'dashed 2px #bfbfbf',
//   borderRadius: '6px',
//   overflow: 'hidden',
// };
// const noFileBox: any = {
//   textAlign: 'center',
//   lineHeight: '100px',
//   fontWeight: '600',
//   fontSize: '16px',
//   color: '#999',
//   userSelect: 'none',
//   height: '100px',
//   width: '200px',
//   border: 'dashed 2px #bfbfbf',
//   borderRadius: '6px',
//   overflow: 'hidden',
// };
