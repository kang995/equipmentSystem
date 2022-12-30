import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
// import { BasicTable, useTable, TableAction } from '/@/components/Table';
import chargeOrder from './chargeOrder/index.vue';
import executeOrder from './executeOrder/index.vue';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
import { upkeepShowApi } from '/@/api/device-maintenance/work';
import { Tag } from 'ant-design-vue';
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
  upkeepShowApi().then((res) => {
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
//   let identity = '3'; //1负责人 2执行人 3具有两者身份
//   if (identity === '1') {
//     achieveList.splice(1, 1);
//   } else if (identity === '2') {
//     achieveList.splice(0, 1);
//     achieveList[0].key = '1';
//   }
// })();

export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'code',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '计划负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '工单处理人',
      dataIndex: 'dealUserName',
    },
    {
      title: '工单执行时间',
      dataIndex: 'executeTimeStr',
    },
    {
      title: '关联计划',
      dataIndex: 'upkeepPlanName',
    },
    {
      title: '工单状态',
      dataIndex: 'workOrderStatus',
      customRender: ({ record }) => {
        if (record.workOrderStatus === '1') {
          //1：未开始
          return <Tag color={'default'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '2') {
          //2：待执行
          return <Tag color={'orange'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '3') {
          //3：待验收
          return <Tag color={'orange'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '4') {
          //4：已完成
          return <Tag color={'green'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '5') {
          //5：验收未通过
          return <Tag color={'red'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '6') {
          //6：计划终止
          return <Tag color={'default'}>{record.workOrderStatusText}</Tag>;
        }
      },
    },
    {
      title: '工单延期',
      dataIndex: 'delayFlag',
      customRender: ({ record }) => {
        if (record.delayFlag === '0') {
          //0:否
          return <Tag color={'default'}>否</Tag>;
        } else if (record.delayFlag === '1') {
          //1：是
          return <Tag color={'default'}>是</Tag>;
        } else if (record.delayFlag === '2') {
          //2：延期审核
          return <Tag color={'red'}>延期审核</Tag>;
        }
      },
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '工单编号',
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '计划负责人',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择计划负责人',
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
      field: 'dealUserName',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
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
      field: 'executeTime',
      component: 'RangePicker',
      label: '工单执行时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'workOrderStatus',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'WORK_ORDER_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'delayFlag',
      component: 'ApiSelect',
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'DELAY_FLAG',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'finishTime',
      component: 'RangePicker',
      label: '工单完成时间',
      labelWidth: 96,
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
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>工单信息</span>;
      },
    },
    {
      field: 'code',
      label: '工单编号',
    },
    {
      field: 'upkeepPlanName',
      label: '关联保养计划',
    },
    {
      field: 'chargePeopleName',
      label: '计划负责人',
    },
    {
      field: 'createTime',
      label: '工单创建时间',
    },
    {
      field: 'executeStartTime',
      label: '工单执行时间',
      render: (curVal, data) => {
        return `${data.executeStartTime}至${data.executeEndTime}`;
      },
    },
    {
      field: 'workOrderStatus',
      label: '工单状态',
    },
    {
      field: 'dealDeptName',
      label: '工单处理部门',
    },
    {
      field: 'dealUserName',
      label: '工单处理人',
    },
    {
      field: 'finishTime',
      label: '完成时间',
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>保养明细</span>;
      },
    },
    {
      field: 'upkeepType',
      label: '保养类型',
    },
    {
      field: 'upkeepContent',
      label: '保养内容',
    },
    {
      field: 'upkeepContent',
      label: '保养标椎',
    },
    {
      field: 'upkeepContent',
      label: '安全规则',
      span: 3,
    },
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 3,
    //   render: () => {
    //     return <span style={titleStyle}>保养设备</span>;
    //   },
    // },
    // {
    //   field: 'storageTankList',
    //   label: '',
    //   span: 3,
    //   //表格
    //   render: (data) => {
    //     // if (data) {
    //     console.log('data: ', data);
    //     return (
    //       <div>
    //         <BasicTable
    //           pagination={false}
    //           dataSource={data}
    //           bordered={true}
    //           columns={keepDeviceColumns()}
    //           style={'color:#61687C'}
    //           class={'mr-6'}
    //         ></BasicTable>
    //       </div>
    //     );
    //     // }
    //   },
    // },
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 3,
    //   render: () => {
    //     return <span style={titleStyle}>延期申请</span>;
    //   },
    //   show: (data) => (isShow2 ? true : false),
    // },
    // {
    //   field: 'applyUserName',
    //   label: '原截止时间',
    //   show: (data) => (isShow2 ? true : false),
    // },
    // {
    //   field: 'applyUserName',
    //   label: '延期时间',
    //   show: (data) => (isShow2 ? true : false),
    // },
    // {
    //   field: 'applyUserName',
    //   label: '延期原因',
    //   show: (data) => (isShow2 ? true : false),
    // },
  ];
}
//保养设备
export function keepDeviceColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '所在区域',
      dataIndex: 'districtName',
      customRender: ({ record }) => {
        if (record.districtName) {
          return <span>{record.districtName}</span>;
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '所属装置',
      dataIndex: 'facilitiesName',
      customRender: ({ record }) => {
        if (record.facilitiesName) {
          return <span>{record.facilitiesName}</span>;
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '是否特种设备',
      dataIndex: 'specialEquipment',
    },
  ];
}
//工单信息-重新下发
// export function getAgainFormSchema(): FormSchema[] {
//   return [
//     {
//       field: 'name',
//       component: 'RadioGroup',
//       label: '任务指派',
//       required: true,
//       componentProps: {
//         options: [
//           {
//             label: '人员',
//             value: '1',
//           },
//           {
//             label: '岗位',
//             value: '2',
//           },
//         ],
//       },
//     },
//     {
//       field: 'name',
//       component: 'ApiSelect',
//       label: '处理部门',
//       required: true,
//       colProps: {
//         span: 14,
//       },
//       componentProps: {
//         placeholder: '请选择处理部门',
//       },
//     },
//     {
//       field: 'name',
//       component: 'ApiSelect',
//       label: '处理人',
//       required: true,
//       colProps: {
//         span: 14,
//       },
//       componentProps: {
//         placeholder: '请选择处理人',
//       },
//     },
//   ];
// }

//工单信息-申请延期、保养工单延期申请弹窗
export function postponeFormSchema(): FormSchema[] {
  return [
    {
      field: 'oldEndTime',
      component: 'DatePicker',
      label: '原截止时间',
      componentProps: {
        // placeholder: '请输入',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'delayTime',
      component: 'DatePicker',
      label: '延期时间',
      required: true,
      componentProps: {
        placeholder: '请选择时间',
        getPopupContainer: () => document.body,
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
//工单信息-提交验收
export function ResultFormSchema(): FormSchema[] {
  return [
    {
      field: 'dealCase',
      component: 'InputTextArea',
      label: '处理情况',
      required: true,
      componentProps: {
        placeholder: '请输入处理情况',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'dealImgList',
      component: 'Upload',
      label: '图片',
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'acceptPeopleId',
      component: 'ApiSelect',
      label: '验收人',
      required: true,
      componentProps: {
        placeholder: '请输入验收人',
        // mode: 'multiple',
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
    },
  ];
}
//工单信息-重新提交
/* export function RefuseFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'InputTextArea',
      label: '处理情况',
      required: true,
      componentProps: {
        placeholder: '请输入处理结果',
      },
    },
    {
      field: 'attachment',
      component: 'Upload',
      label: '图片',
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'person',
      component: 'ApiSelect',
      label: '验收人',
      required: true,
      componentProps: {
        placeholder: '请选择验收人',
      },
    },
  ];
}
 */
//使用备件
export function tablePartColumns(): BasicColumn[] {
  return [
    // {
    //   title: '备件编码',
    //   dataIndex: 'spareCode',
    // },
    {
      title: '备件名称',
      dataIndex: 'spareName',
    },
    {
      title: '备件分类',
      dataIndex: 'spareClassifyText',
    },
    {
      title: '使用数量',
      dataIndex: 'useNum',
    },
  ];
}

//重选使用备件
export function deviceTableColumns(): BasicColumn[] {
  return [
    // {
    //   title: '备件编码',
    //   dataIndex: 'spareCode',
    // },
    {
      title: '备件名称',
      dataIndex: 'spareName',
    },
    {
      title: '备件分类',
      dataIndex: 'spareClassify',
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
    },
    {
      title: '单位',
      dataIndex: 'measureUnitText',
    },
    {
      title: '使用数量',
      dataIndex: 'useNum',
      slots: { customRender: 'useNumSlot' },
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
  imgStyle = {
    width: '100px',
    height: '100px',
    display: 'inline',
    zIndex: 10,
  };
