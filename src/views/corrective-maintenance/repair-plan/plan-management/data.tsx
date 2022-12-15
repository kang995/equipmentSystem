import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '维修计划编号',
      dataIndex: 'name',
    },
    {
      title: '维修计划名称',
      dataIndex: 'productName',
    },
    {
      title: '任务下发时间',
      dataIndex: 'person',
    },
    {
      title: '故障数量',
      dataIndex: 'time',
    },
    {
      title: '负责人',
      dataIndex: 'status',
    },
    {
      title: '计划状态',
      dataIndex: 'status',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '维修计划编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入维修计划编号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '维修计划名称',
      componentProps: {
        placeholder: '请输入维修计划名称',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请选择负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '计划状态',
      componentProps: {
        placeholder: '请选择计划状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '审核状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择审核状态',
      },
    },
  ];
}

//新增、编辑维修计划表单
export function getCommonFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '计划名称',
      required: true,
      componentProps: {
        placeholder: '请输入计划名称',
      },
    },
    {
      field: 'type',
      component: 'ApiSelect',
      label: '负责人',
      required: true,
      componentProps: {
        placeholder: '请选择负责人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '任务下发时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '任务执行时间',
      required: true,
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'issue',
      component: 'RadioGroup',
      label: '任务指派',
      required: true,
      componentProps: {
        options: [
          {
            label: '人员',
            value: '0',
          },
          {
            label: '岗位',
            value: '1',
          },
        ],
      },
    },
    {
      field: 'type',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      componentProps: {
        placeholder: '请选择处理部门',
      },
    },
    {
      field: 'type',
      component: 'ApiSelect',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
    // {
    //   field: 'field1',
    //   component:'Input',
    //   colProps:{
    //     span:24
    //   },
    //   labelWidth:1,
    //   label:' ',
    //   slot:'tableSlot'
    // },
    {
      field: 'maintain',
      component: 'InputTextArea',
      label: '维修方案',
      required: true,
      componentProps: {
        placeholder: '请输入维修方案',
        rows: 4,
      },
    },
    {
      field: 'maintain1',
      component: 'InputTextArea',
      label: '备注',
      required: true,
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
      },
    },
  ];
}
//新增、编辑维修计划表格
export function planTableColumns(): BasicColumn[] {
  return [
    {
      title: '关联故障',
      dataIndex: 'relevance',
      slots: { customRender: 'relevanceSlot' },
    },
    {
      title: '关联设备',
      dataIndex: 'device',
    },
    {
      title: '设备位置',
      dataIndex: 'Delocation',
    },
    {
      title: '地理位置',
      dataIndex: 'Gelocation',
    },
    {
      title: '故障等级',
      dataIndex: 'Grade',
    },
    {
      title: '故障类型',
      dataIndex: 'Types',
    },
    {
      title: '故障描述',
      dataIndex: 'Description',
    },
  ];
}

//计划详情
export function planInfoDetail(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}></span>;
      },
    },
    {
      field: 'applyUserName',
      label: '维修计划编号',
    },
    {
      field: 'applyUserName',
      label: '计划状态',
    },
    {
      field: 'applyUserName',
      label: '计划名称',
    },
    {
      field: 'applyUserName',
      label: '创建人',
    },
    {
      field: 'applyUserName',
      label: '任务下发时间',
    },
    {
      field: 'applyUserName',
      label: '任务执行时间',
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
      label: '岗位',
    },
    {
      field: 'applyUserName',
      label: '处理人',
    },
    {
      field: 'applyUserName',
      label: '备注',
    },
    {
      field: 'applyUserName',
      label: '关联故障',
    },
  ];
}

export function planDetailsColumns(): BasicColumn[] {
  return [
    {
      title: '关联故障',
      dataIndex: 'name',
    },
    {
      title: '关联设备',
      dataIndex: 'productName',
    },
    {
      title: '所属装置设施',
      dataIndex: 'productName',
    },
    {
      title: '',
      dataIndex: 'productName',
    },
    {
      title: '故障等级',
      dataIndex: 'productName',
    },
    {
      title: '故障类型',
      dataIndex: 'productName',
    },
    {
      title: '',
      dataIndex: 'productName',
    },
  ];
}
const titleStyle: any = {
  fontSize: '15px',
  fontWeight: '600',
  position: 'relative',
  left: '0px',
};
