import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import chargeOrder from './chargeOrder/index.vue';
import executeOrder from './executeOrder/index.vue';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
import { Image, Tag } from 'ant-design-vue';

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
  const identity = '3'; //1负责人 2执行人 3具有两者身份
  if (identity === '1') {
    achieveList.splice(1, 1);
  } else if (identity === '2') {
    achieveList.splice(0, 1);
    achieveList[0].key = '1';
  }
})();

//列表
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
      title: '是否延期',
      dataIndex: 'delayFlag',
      customRender: ({ record }) => {
        if (record.delayFlag === '0') {
          //0:否
          return <Tag color={'default'}>{record.delayFlagText}</Tag>;
        } else if (record.delayFlag === '1') {
          //1：是
          return <Tag color={'default'}>{record.delayFlagText}</Tag>;
        } else if (record.delayFlag === '2') {
          //2：延期审核
          return <Tag color={'red'}>{record.delayFlagText}</Tag>;
        }
      },
    },
    //
    {
      title: '是否关联故障',
      dataIndex: 'status',
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
        placeholder: '请输入检修计划编号',
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
      field: 'dealUserIdList',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
        api: getPersonSelectApi,
        mode: 'multiple',
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
      componentProps: {
        // showTime: true,
        // format: 'YYYY-MM-DD HH:mm:ss',
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
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  ];
}

// 工单信息、检修明细
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
      label: '工单编号',
    },
    {
      field: 'applyUserName',
      label: '关联检修计划',
    },
    {
      field: 'applyUserName',
      label: '计划负责人',
    },
    {
      field: 'applyUserName',
      label: '工单创建时间',
    },
    {
      field: 'applyUserName',
      label: '工单执行时间',
    },
    {
      field: 'applyUserName',
      label: '工单状态',
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
      label: '检修类型',
    },
    {
      field: 'applyUserName',
      label: '检修方案',
    },
    {
      field: 'applyUserName',
      label: '安全措施',
    },
    {
      field: 'applyUserName',
      label: '检修质量标椎',
    },
    {
      field: 'applyUserName',
      label: '备注',
      span: 3,
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
//关联故障-故障详情
export function WorkInfoSchema(): DescItem[] {
  return [
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
