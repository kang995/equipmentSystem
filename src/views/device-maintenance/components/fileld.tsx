import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';

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

//选择备件-表格
export function partTableColumns(): BasicColumn[] {
  return [
    {
      title: '备件编码',
      dataIndex: 'name1',
    },
    {
      title: '备件名称',
      dataIndex: 'name2',
    },
    {
      title: '备件分类',
      dataIndex: 'name3',
    },
    {
      title: '规格型号',
      dataIndex: 'name4',
    },
    {
      title: '单位',
      dataIndex: 'name5',
    },
    {
      title: '库存',
      dataIndex: 'name6',
    },
  ];
}
//选择备件-表单
export function getPartFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '备件编码',
      componentProps: {
        placeholder: '请输入备件编码',
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: '备件名称',
      componentProps: {
        placeholder: '请输入备件编码',
      },
    },
    {
      field: 'name3',
      component: 'ApiSelect',
      label: '备件分类',
      componentProps: {
        placeholder: '请选择备件分类',
      },
    },
  ];
}

//保养结果详情
export function maintainSchemaDetail(): DescItem[] {
  return [
    {
      field: 'applyUserName',
      label: '处理情况',
    },
    {
      field: 'imgArr',
      label: '图片',
      render: () => {
        return (
          <>
            {/* <a-image style={imgStyle} src={'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F54fbb2fb43166d22c89bb9ebfedb69fc9252d2e1.jpeg%40f_auto%3Ftoken%3D582defe7a081a5287a267c64ed1266f3&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1670605200&t=82e586d8c040c29c7a54667ca29f3418'} alt="" /> */}
          </>
        );
      },
    },
    {
      field: 'applyUserName',
      label: '保养完成时间',
    },
    {
      field: 'applyUserName',
      label: '验收人',
    },
  ];
}

//验收结果详情
export function receiveSchemaDetail(): DescItem[] {
  return [
    {
      field: 'applyUserName',
      label: '验收结果',
    },
    {
      field: 'applyUserName',
      label: '验收内容',
    },
    {
      field: 'imgArr1',
      label: '图片',
      render: () => {
        return (
          <>
            {/* <a-image style={imgStyle} src={'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F54fbb2fb43166d22c89bb9ebfedb69fc9252d2e1.jpeg%40f_auto%3Ftoken%3D582defe7a081a5287a267c64ed1266f3&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1670605200&t=82e586d8c040c29c7a54667ca29f3418'} alt="" /> */}
          </>
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
};
