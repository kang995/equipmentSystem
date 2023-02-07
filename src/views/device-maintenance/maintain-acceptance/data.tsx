import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
// import { BasicTable } from '/@/components/Table';
import checking from './checking/index.vue';
import checked from './checked/index.vue';
import { Badge } from 'ant-design-vue';
import { getPersonSelectApi } from '/@/api/device-maintenance/index';
// import { getAcceptCountApi } from "/@/api/device-maintenance/work"
export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待验收',
    component: checking,
  },
  {
    key: '2',
    name: '已验收',
    component: checked,
  },
];

//保养验收-待验收、已验收
export function tableColumns(type: any): BasicColumn[] {
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
          return <Badge status="default" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '2') {
          //2：待执行
          return <Badge status="warning" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '3') {
          //3：待验收
          return <Badge status="warning" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '4') {
          //4：已完成
          return <Badge status="success" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '5') {
          //5：验收未通过
          return <Badge status="error" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '6') {
          //6：计划终止
          return <Badge status="default" text={record.workOrderStatusText} />;
        }
      },
    },
    {
      title: '验收时间',
      dataIndex: 'acceptTime',
      ifShow: ({}) => !type,
    },
  ];
}

export function getFormSchema(type: any): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '工单编号',
      labelWidth: type === 'checked' ? 96 : 64,
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '计划负责人',
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
      field: 'dealPeopleId',
      component: 'ApiSelect',
      label: '工单处理人',
      componentProps: {
        placeholder: '请选择工单处理人',
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
      field: 'Time',
      component: 'RangePicker',
      label: '工单执行时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'Time1',
      component: 'RangePicker',
      label: '工单验收时间',
      labelWidth: 96,
      componentProps: {
        format: 'YYYY-MM-DD',
      },
      ifShow: ({}) => !type,
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
      render: (_curVal, data) => {
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
      field: 'upkeepTypeText',
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
  ];
}
//保养设备
// export function keepDeviceColumns(): BasicColumn[] {
//   return [
//     {
//       title: '设备名称',
//       dataIndex: 'name',
//     },
//     {
//       title: '所在区域',
//       dataIndex: 'productName',
//     },
//     {
//       title: '所属装置',
//       dataIndex: 'person',
//     },
//     {
//       title: '是否特种设备',
//       dataIndex: 'time',
//     },
//   ];
// }
//验收结果
export function MaintenanceFormSchema(): FormSchema[] {
  return [
    {
      field: 'acceptResult',
      component: 'RadioGroup',
      label: '验收结果',
      required: true,
      componentProps: {
        options: [
          {
            label: '通过',
            value: '0',
          },
          {
            label: '拒绝',
            value: '1',
          },
        ],
      },
    },
    {
      field: 'acceptImgList',
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
      field: 'acceptContent',
      component: 'InputTextArea',
      label: '验收内容（备注）',
      required: true,
      componentProps: {
        placeholder: '请输入验收内容（备注）',
        rows: 4,
        maxlength: 200,
      },
    },
    // {
    //   field: 'time',
    //   component: 'Input',
    //   label: '验收时间',
    //   colProps: {
    //     span: 10,
    //   },
    //   componentProps: {
    //     placeholder: '请输入验收时间',
    //   },
    //   ifShow: status === '2' ? true : false,
    // },
    // {
    //   field: 'person',
    //   component: 'Input',
    //   label: '验收人',
    //   colProps: {
    //     span: 10,
    //   },
    //   componentProps: {
    //     placeholder: '请输入验收人',
    //   },
    //   ifShow: status === '2' ? true : false,
    // },
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
  width: '80px',
};
