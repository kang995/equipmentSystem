import { BasicColumn, FormSchema } from '/@/components/Table';
import confirming from './confirming/index.vue';
import confirmed from './confirmed/index.vue';
import { DescItem } from '/@/components/Description';
import { Image } from 'ant-design-vue';
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
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '故障单号',
      dataIndex: 'name',
    },
    {
      title: '上报人',
      dataIndex: 'productName',
    },
    {
      title: '上报时间',
      dataIndex: 'person',
    },
    {
      title: '关联设备',
      dataIndex: 'time',
    },
    {
      title: '所属装置设施',
      dataIndex: 'status',
    },
    {
      title: '故障类别',
      dataIndex: 'status',
    },
    {
      title: '故障等级',
      dataIndex: 'status',
    },
    {
      title: '故障描述',
      dataIndex: 'status',
    },
    {
      title: '故障状态',
      dataIndex: 'status',
    },
    {
      title: '确认结果',
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
        // showTime: true,
        format: 'YYYY-MM-DD',
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
    field: 'applyUserName',
    label: '故障单号',
  },
  {
    field: 'applyUserName',
    label: '故障状态',
  },
  {
    field: 'applyUserName',
    label: '上报人',
  },
  {
    field: 'applyUserName',
    label: '联系电话',
  },
  {
    field: 'applyUserName',
    label: '上报时间',
  },
  {
    field: 'applyUserName',
    label: '发现故障时间',
  },
  {
    field: 'applyUserName',
    label: '关联设备',
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
    label: '故障类别',
  },
  {
    field: 'applyUserName',
    label: '紧急程度',
  },
  {
    field: 'applyUserName',
    label: '故障描述',
  },
  {
    field: 'applyUserName',
    label: '表新症状',
  },
  {
    field: 'applyUserName',
    label: '故障原因',
  },
  {
    field: 'applyUserName',
    label: '采取措施',
    span: 2,
  },
  {
    field: 'applyUserName',
    label: '图片',
    span: 2,
    render: () => {
      return (
        <Image
          style={ImageBox}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      );
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
      field: 'radioValue',
      component: 'RadioGroup',
      label: '故障确认',
      required: true,
      colProps: {
        span: 13,
      },
      defaultValue: '1',
      componentProps: ({ formModel }) => {
        return {
          // onChange:(e)=>{

          // },
          options: [
            {
              label: '自修',
              value: '1',
            },
            {
              label: '委外维修',
              value: '2',
            },
            {
              label: '列入检修计划',
              value: '3',
            },
          ],
        };
      },
    },
    // 自修
    {
      field: 'name1',
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
        return values?.radioValue === '1';
      },
    },
    {
      field: 'person',
      component: 'ApiSelect',
      label: '负责人',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请选择负责人',
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '1';
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '任务起止时间',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '1';
      },
    },
    {
      field: 'test',
      component: 'RadioGroup',
      label: '任务指派',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        options: [
          {
            label: '人员',
            value: '1',
          },
          {
            label: '岗位',
            value: '2',
          },
        ],
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '1';
      },
    },
    {
      field: 'person',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请选择处理部门',
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '1';
      },
    },
    {
      field: 'person',
      component: 'ApiSelect',
      label: '处理人',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请选择处理人',
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '1';
      },
    },
    {
      field: 'name5',
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
        return values?.radioValue === '1';
      },
    },
    // 委外维修
    {
      field: 'name6',
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
        return values?.radioValue === '2';
      },
    },
    {
      field: 'name',
      component: 'DatePicker',
      label: '维修时间',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {},
      ifShow: ({ values }) => {
        return values?.radioValue === '2';
      },
    },
    {
      field: 'name5',
      component: 'InputTextArea',
      label: '维修内容',
      required: true,
      colProps: {
        span: 16,
      },
      componentProps: {
        placeholder: '请输入维修内容',
        rows: 4,
      },
      ifShow: ({ values }) => {
        return values?.radioValue === '2';
      },
    },
    {
      field: 'attachment',
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
        return values?.radioValue === '2';
      },
    },
    // 列入检修计划
    {
      field: 'person2',
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
        return values?.radioValue === '3';
      },
    },
    {
      field: 'person3',
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
        return values?.radioValue === '3';
      },
    },
  ];
}

//故障详情--已确认
export function confirmdingDetail(status: string): DescItem[] {
  return [
    ...commonDetail,
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
      field: 'applyUserName',
      label: '故障确认',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '三方名称',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '维修时间',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '维修内容',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '图片',
      span: 2,
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '确认结果',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '工单名称',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '负责人',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '任务起止时间',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '任务指派',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '处理部门',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '处理人',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '维修方案',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '关联工单',
      show: (data) => status === '3',
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
    width: '100px',
  };
