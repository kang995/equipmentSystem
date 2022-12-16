import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { BasicTable, useTable, TableAction } from '/@/components/Table';

//计划详情
export function MaintainDetail(state: string, mode: string): DescItem[] {
  console.log('模块', mode);
  return [
    {
      field: 'applyUserName',
      label: '保养计划编号',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'applyUserName',
      label: '检修计划编号',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '计划状态',
    },
    {
      field: 'applyUserName',
      label: '创建人',
    },
    {
      field: 'applyUserName',
      label: '创建时间',
    },
    {
      field: 'applyUserName',
      label: '计划名称',
    },
    //
    {
      field: 'applyUserName',
      label: '检修类型',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '计划生效时间',
    },
    {
      field: 'applyUserName',
      label: '任务起始时间',
    },
    {
      field: 'applyUserName',
      label: '任务周期',
    },
    {
      field: 'applyUserName',
      label: '任务执行时长',
    },
    {
      field: 'applyUserName',
      label: '工单生成及下发',
    },
    {
      field: 'applyUserName',
      label: '临期提醒',
    },
    {
      field: 'applyUserName',
      label: '超时提醒间隔',
    },
    {
      field: 'applyUserName',
      label: '计划负责人',
    },
    {
      field: 'applyUserName',
      label: '任务指派',
    },
    {
      field: 'applyUserName',
      label: '处理部门',
    },
    {
      field: 'applyUserName',
      label: '处理人',
    },
    //
    {
      field: 'applyUserName',
      label: '检修方案',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '安全措施',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '检修质量标准',
      show: (data) => mode === '3' || mode === '4',
    },

    {
      field: 'applyUserName',
      label: '保养类型',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'applyUserName',
      label: '保养标椎',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'applyUserName',
      label: '保养内容',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'applyUserName',
      label: '安全规则',
      show: (data) => mode === '1' || mode === '2',
    },

    {
      field: 'applyUserName',
      label: '备注',
      span: 2,
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>审核信息</span>;
      },
      show: (data) => state === '3' || state === '4',
    },
    {
      field: 'applyUserName',
      label: '审核结果',
      show: (data) => state === '3' || state === '4',
    },
    {
      field: 'applyUserName',
      label: '原因（备注）',
      show: (data) => state === '3' || state === '4',
    },
  ];
}

//设备保养
export function tableDeviceColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备地点',
      dataIndex: 'productName',
    },
    {
      title: '所属装置',
      dataIndex: 'person',
    },
    {
      title: '设备类型',
      dataIndex: 'time',
    },
    {
      title: '是否特种设备',
      dataIndex: 'status',
    },
  ];
}

//关联工单
export function tableColumns(mode: string): BasicColumn[] {
  console.log('mode', mode);
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      ifShow: ({}) => {
        return mode !== '3';
      },
    },
    {
      title: '计划负责人',
      dataIndex: 'person',
    },
    {
      title: '工单处理人',
      dataIndex: 'time',
    },
    {
      title: '工单执行时间',
      dataIndex: 'status',
    },
    {
      title: '关联计划',
      dataIndex: 'status',
      ifShow: ({}) => {
        return mode !== '3';
      },
    },
    {
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '工单延期',
      dataIndex: 'status',
      ifShow: ({}) => {
        return mode !== '3';
      },
    },
    {
      title: '是否延期',
      dataIndex: 'status',
      ifShow: ({}) => {
        return mode === '3';
      },
    },
    {
      title: '完成时间',
      dataIndex: 'time',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '工单编号',
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'status',
      component: 'ApiSelect',
      label: '计划负责人',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单执行时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
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
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
      },
    },
    {
      field: 'productId1',
      component: 'RangePicker',
      label: '工单完成时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        // format: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD',
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
};
