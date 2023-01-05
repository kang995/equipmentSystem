import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import checking from './checking/index.vue';
import checked from './checked/index.vue';

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
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'person',
    },
    {
      title: '计划负责人',
      dataIndex: 'time',
    },
    {
      title: '工单处理人',
      dataIndex: 'status',
    },
    {
      title: '工单执行时间',
      dataIndex: 'status',
    },
    {
      title: '关联计划',
      dataIndex: 'status',
    },
    {
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '完成时间',
      dataIndex: 'status',
      ifShow: activeKey === '2' ? true : false,
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '故障单号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入故障单号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '上报人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入上报人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '所属装置设施',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择所属装置设施',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障类别',
      labelWidth: 64,
      componentProps: {
        placeholder: '请选择故障类别',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障等级',
      componentProps: {
        placeholder: '请选择故障等级',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障状态',
      componentProps: {
        placeholder: '请选择故障状态',
      },
    },
  ];
}

//工单信息、检修明细
export function workOrderlSchema(): DescItem[] {
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
      field: 'applyUserName',
      label: '工单编号',
    },
    {
      field: 'applyUserName',
      label: '工单状态',
    },
    {
      field: 'applyUserName',
      label: '工单创建时间',
    },
    {
      field: 'applyUserName',
      label: '工单执行之时间',
    },
    {
      field: 'applyUserName',
      label: '负责人',
    },
    {
      field: 'applyUserName',
      label: '关联保养计划',
    },
    {
      field: 'applyUserName',
      label: '处理部门',
    },
    {
      field: 'applyUserName',
      label: '处理人',
    },
    {
      field: 'applyUserName',
      label: '下发时间',
    },
    {
      field: 'applyUserName',
      label: '完成时间',
      span: 3,
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>检修明细</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '设备名称',
    },
    {
      field: 'applyUserName',
      label: '所属装置设施',
    },
    {
      field: 'applyUserName',
      label: '地理位置',
    },
    {
      field: 'applyUserName',
      label: '安全措施',
    },
    {
      field: 'applyUserName',
      label: '检修方案',
    },
    {
      field: 'applyUserName',
      label: '检修质量标准',
    },
  ];
}
//检修设备
export function deviceTableColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '所在区域',
      dataIndex: 'name',
    },
    {
      title: '所在装置',
      dataIndex: 'name',
    },
    {
      title: '是否特种设备',
      dataIndex: 'name',
    },
  ];
}
//验收结果提交
export function getResultFormSchema(): FormSchema[] {
  return [
    {
      field: 'result',
      component: 'RadioGroup',
      label: '验收结果',
      required: true,
      componentProps: {
        options: [
          {
            label: '通过',
            value: '1',
          },
          {
            label: '拒绝',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'attachment',
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
      field: 'name1',
      component: 'InputTextArea',
      label: '验收内容（备注）',
      componentProps: {
        placeholder: '请输入验收内容（备注）',
        rows: 4,
      },
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
