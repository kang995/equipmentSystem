import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import accepting from './accepting/index.vue';
import accepted from './accepted/index.vue';
import { Image } from 'ant-design-vue';
import { deviceNameSelectApi, UnitFacilityApi } from '/@/api/corrective-maintenance/fault';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
import { Tag } from 'ant-design-vue';
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
      dataIndex: 'jobCode',
    },
    {
      title: '工单名称',
      dataIndex: 'jobName',
      ifShow: () => ifIssue,
    },
    {
      title: '负责人',
      dataIndex: 'principalPeopleName',
    },
    //
    {
      title: '创建时间',
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
      title: '工单状态',
      dataIndex: 'maintainStatus',
      customRender: ({ record }) => {
        if (record.maintainStatus === '0') {
          //待处理
          return <Tag color={'default'}>{record.maintainStatusText}</Tag>;
        } else if (record.maintainStatus === '1') {
          //待处理(延期申请)
          return <Tag color={'orange'}>{record.maintainStatusText}</Tag>;
        } else if (record.maintainStatus === '2') {
          //待验收
          return <Tag color={'orange'}>{record.maintainStatusText}</Tag>;
        } else if (record.maintainStatus === '3') {
          //验收未通过
          return <Tag color={'red'}>{record.maintainStatusText}</Tag>;
        } else if (record.maintainStatus === '4') {
          //完成
          return <Tag color={'green'}>{record.maintainStatusText}</Tag>;
        }
      },
    },
    {
      title: '处理人',
      dataIndex: 'disposePeopleNames',
    },
  ];
}
//维修工单--待验收
export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'jobCode',
      component: 'Input',
      label: '工单单号',
      componentProps: {
        placeholder: '请输入工单单号',
      },
    },
    {
      field: 'jobName',
      component: 'Input',
      label: '工单名称',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入工单名称',
      },
    },
    {
      field: 'principalPeopleId',
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
      },
    },
    //
    {
      field: 'createTime',
      component: 'DatePicker',
      label: '创建时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
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
    //
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
      },
    },
    {
      field: 'disposePeopleId',
      component: 'ApiSelect',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入处理人姓名',
        api: getPersonSelectApi,
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
export function getFormSchemas(): FormSchema[] {
  return [
    {
      field: 'jobCode',
      component: 'Input',
      label: '工单单号',
      componentProps: {
        placeholder: '请输入工单单号',
      },
    },
    {
      field: 'principalPeopleId',
      component: 'ApiSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请输入负责人',
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
      field: 'disposePeopleId',
      component: 'ApiSelect',
      label: '处理人',
      componentProps: {
        placeholder: '请输入处理人姓名',
        api: getPersonSelectApi,
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
//工单信息
export function WorkDetail(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>工单信息</span>;
      },
    },
    {
      field: 'jobCode',
      label: '工单单号',
    },
    {
      field: 'jobName',
      label: '工单名称',
    },
    {
      field: 'principalPeopleName',
      label: '负责人',
    },
    {
      field: 'maintainStatusText',
      label: '工单状态',
    },
    {
      field: 'issueTime',
      label: '下发时间',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'disposeUnitName',
      label: '处理岗位',
    },
    {
      field: 'overTime',
      label: '完成时间',
    },
    {
      field: 'jobStartTimeAndEndTime',
      label: '执行时间',
    },
    {
      field: 'disposePeopleNames',
      label: '处理人',
    },
    {
      field: 'plantName',
      label: '所属装置设施',
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
