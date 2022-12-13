import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image } from 'ant-design-vue';
import chargeOrder from './chargeOrder/index.vue';
import executeOrder from './executeOrder/index.vue';

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
const identity = '3'; //1负责人 2执行人 3具有两者身份
(() => {
  if (identity === '1') {
    achieveList.splice(1, 1);
  } else if (identity === '2') {
    achieveList.splice(0, 1);
    achieveList[0].key = '1';
  }
})();

//列表--负责工单、执行工单
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单单号',
      dataIndex: 'name',
    },
    {
      title: '工单名称',
      dataIndex: 'productName',
    },
    {
      title: '负责人',
      dataIndex: 'person',
    },
    {
      title: '起止时间',
      dataIndex: 'time',
    },
    {
      title: '关联设备',
      dataIndex: 'status',
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
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '处理人',
      dataIndex: 'status',
    },
    {
      title: '完成时间',
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
      field: 'status',
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
      field: 'time',
      component: 'RangePicker',
      label: '起止时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
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
      field: 'productId',
      component: 'ApiSelect',
      label: '处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
    {
      field: 'time1',
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
