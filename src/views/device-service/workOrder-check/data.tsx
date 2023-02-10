import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import checking from './checking/index.vue';
import checked from './checked/index.vue';
import { Badge } from 'ant-design-vue';
import { getPersonSelectApi } from '/@/api/device-maintenance/index';
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

//检修工单验收-待验收、已验收
export function tableColumns(ifIssue: any, handleClick): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'code',
    },
    {
      title: '下发时间',
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
      dataIndex: 'overhaulPlanName',
      customRender({ record }) {
        return (
          <a class="pointer" onClick={handleClick.bind(null, record)}>
            {record.overhaulPlanName}
          </a>
        );
      },
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
      title: '完成时间',
      dataIndex: 'acceptTime',
      ifShow: !ifIssue,
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '工单编号',
      labelWidth: 96,
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
  ];
}

//工单信息、检修明细
// export function workOrderlSchema(): DescItem[] {
//   return [
//     {
//       field: '',
//       label: '',
//       labelMinWidth: 0,
//       span: 3,
//       render: () => {
//         return <span style={titleStyle}>工单信息</span>;
//       },
//     },
//     {
//       field: 'code',
//       label: '工单编号',
//     },
//     {
//       field: 'workOrderStatusText',
//       label: '工单状态',
//     },
//     {
//       field: 'createTime',
//       label: '工单创建时间',
//     },
//     {
//       field: 'executeStartTime',
//       label: '工单执行时间',
//       render: (curVal, data) => {
//         return `${data.executeStartTime}至${data.executeEndTime}`;
//       },
//     },
//     {
//       field: 'chargePeopleName',
//       label: '负责人',
//     },
//     {
//       field: 'upkeepPlanName',
//       label: '关联保养计划',
//     },
//     {
//       field: 'dealDeptName',
//       label: '处理部门',
//     },
//     {
//       field: 'dealUserName',
//       label: '处理人',
//     },
//     //
//     {
//       field: 'createTime',
//       label: '下发时间',
//     },
//     {
//       field: 'finishTime',
//       label: '完成时间',
//       span: 3,
//     },
//     {
//       field: '',
//       label: '',
//       labelMinWidth: 0,
//       span: 3,
//       render: () => {
//         return <span style={titleStyle}>检修明细</span>;
//       },
//     },
//     {
//       field: 'overhaulTypeText',
//       label: '检修类型',
//     },
//     {
//       field: 'overhaulContent',
//       label: '检修方案',
//     },
//     {
//       field: 'safeRule',
//       label: '安全措施',
//     },
//     {
//       field: 'overhaulStandard',
//       label: '检修质量标椎',
//     },
//     {
//       field: 'remark',
//       label: '备注',
//       span: 3,
//     },
//   ];
// }
//检修设备
export function deviceTableColumns(): BasicColumn[] {
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
      title: '所在装置',
      dataIndex: 'facilitiesName',
    },
    {
      title: '是否特种设备',
      dataIndex: 'specialEquipment',
    },
  ];
}
//验收结果提交
export function getResultFormSchema(): FormSchema[] {
  return [
    {
      field: 'acceptResult',
      component: 'RadioGroup',
      label: '验收结果',
      required: true,
      defaultValue: '0',
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
      required: true,
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
      componentProps: {
        placeholder: '请输入验收内容（备注）',
        rows: 4,
        maxlength: 200,
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
//   ImageBox: any = {
//     width: '80px',
//   };
