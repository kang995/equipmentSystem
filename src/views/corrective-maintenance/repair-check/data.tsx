import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import accepting from './accepting/index.vue';
import accepted from './accepted/index.vue';
import { Image } from 'ant-design-vue';

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
export function tableColumns(activeKey: string): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'name',
    },
    {
      title: '工单名称',
      dataIndex: 'name',
      ifShow: activeKey === '1' ? true : false,
    },
    {
      title: '负责人',
      dataIndex: 'productName',
    },
    {
      title: '创建时间',
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
      title: '故障类型',
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
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '处理人',
      dataIndex: 'status',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '工单单号',
      componentProps: {
        placeholder: '请输入工单单号',
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: '工单名称',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入工单名称',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '负责人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入负责人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '创建时间',
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
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入处理人',
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
      field: 'applyUserName',
      label: '工单单号',
    },
    {
      field: 'applyUserName',
      label: '工单名称',
    },
    {
      field: 'applyUserName',
      label: '负责人',
    },
    {
      field: 'applyUserName',
      label: '工单状态',
    },
    {
      field: 'applyUserName',
      label: '下发时间',
    },
    {
      field: 'applyUserName',
      label: '创建时间',
    },
    {
      field: 'applyUserName',
      label: '处理岗位',
    },
    {
      field: 'applyUserName',
      label: '完成时间',
    },
    {
      field: 'applyUserName',
      label: '执行时间',
    },
    {
      field: 'applyUserName',
      label: '处理人',
    },
    {
      field: 'applyUserName',
      label: '所属装置设施',
    },
    {
      field: 'applyUserName',
      label: '关联设备',
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
      label: '联系电话',
    },
    {
      field: 'applyUserName',
      label: '故障上报人',
    },
    {
      field: 'applyUserName',
      label: '表新症状',
    },
    {
      field: 'applyUserName',
      label: '故障描述',
    },
    {
      field: 'applyUserName',
      label: '采取措施',
    },
    {
      field: 'applyUserName',
      label: '故障原因',
    },
    {
      field: 'applyUserName',
      label: '维修方案',
    },
    {
      field: 'imgArr',
      label: '图片',
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>维修结果</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '处理结果',
    },
    {
      field: 'applyUserName',
      label: '维修前图片',
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
    },
    {
      field: 'applyUserName',
      label: '维修后图片',
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
    },
    {
      field: 'applyUserName',
      label: '是否停机',
    },
  ];
}

export function getResultFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
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
            label: '不通过',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'des',
      component: 'InputTextArea',
      label: '验收描述',
      required: true,
      componentProps: {
        placeholder: '请输入验收描述',
        rows: 4,
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
  ];
}

export function ResultDetails(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>验收结果</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '验收结果',
    },
    {
      field: 'applyUserName',
      label: '验收描述',
    },
    {
      field: 'applyUserName',
      label: '图片',
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
}
//使用备件
export function tablePartColumns(): BasicColumn[] {
  return [
    {
      title: '备件编码',
      dataIndex: 'name',
    },
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
