import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import DescItemTable from './inventory/DescItemTable.vue';
export const tableColumns: BasicColumn[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '所属产品',
    dataIndex: 'productName',
  },
  {
    title: '设备状态',
    dataIndex: 'status',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '设备名称',
    componentProps: {
      placeholder: '请输入设备名称',
    },
  },
  {
    field: 'status',
    component: 'ApiSelect',
    label: '设备状态',
    componentProps: {
      placeholder: '请选择设备状态',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '所属产品',
    componentProps: {
      placeholder: '请选择产品',
    },
  },
];
export const schemaDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '重大危险源名称',
  },
  {
    field: 'riskLevelName',
    label: '重大危险源级别',
  },
  {
    field: 'projectName',
    label: '所属项目',
  },

  {
    field: 'districtName',
    label: '所属区域',
  },
  {
    field: 'hazardTypeText',
    label: '重大危险源类型',
  },
];
//backupDescItem
export const backupDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '预案编号',
  },
  {
    field: 'dangerName',
    label: '预案名称',
  },
  {
    field: 'dangerName',
    label: '预案类型',
  },
  {
    field: 'dangerName',
    label: '预案响应等级',
  },
  {
    field: 'dangerName',
    label: '适用事件类型',
  },
  {
    field: 'dangerName',
    label: '适用部门',
  },
  {
    field: 'dangerName',
    label: '相关危化品',
  },
  {
    field: 'dangerName',
    label: '更新时间',
  },
  {
    field: 'dangerName',
    label: '标签',
  },
  {
    field: 'dangerName',
    label: '注意事项',
  },
  {
    field: 'dangerName',
    label: '附件',
  },
];
export const backupColumns: BasicColumn[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '所在区域',
    dataIndex: 'productName',
  },
  {
    title: '所属装置',
    dataIndex: 'person',
  },
  {
    title: '是否特种设备',
    dataIndex: 'time',
  },
];

export const backupFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '备件名称',
    componentProps: {
      placeholder: '请输入备件名称',
    },
  },
  {
    field: 'dutyPersonId',
    component: 'ApiSelect',
    label: '备件分类',
    componentProps: {
      placeholder: '请选择备件分类',
    },
  },
];
// 出入库
export const columnsWarehousing: BasicColumn[] = [
  {
    title: '入库单号',
    dataIndex: 'name',
  },
  {
    title: '入库类型',
    dataIndex: 'productName',
  },
  {
    title: '入库仓库',
    dataIndex: 'status',
  },
  {
    title: '入库时间',
    dataIndex: 'status',
  },
  {
    title: '创建人',
    dataIndex: 'status',
  },
  {
    title: '经手人',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'status',
  },
  {
    title: '入库单状态',
    dataIndex: 'status',
  },
];
export const columnsIssue: BasicColumn[] = [
  {
    title: '出库单号',
    dataIndex: 'name',
  },
  {
    title: '出库类型',
    dataIndex: 'productName',
  },
  {
    title: '出库仓库',
    dataIndex: 'status',
  },
  {
    title: '出库时间',
    dataIndex: 'status',
  },
  {
    title: '创建人',
    dataIndex: 'status',
  },
  {
    title: '经手人',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'status',
  },
  {
    title: '入库单状态',
    dataIndex: 'status',
  },
];
export const formSchemaIssue: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '出库单号',
    componentProps: {
      placeholder: '请输入出库单号',
    },
  },
  {
    field: 'name',
    component: 'ApiSelect',
    label: '出库类型',
    componentProps: {
      placeholder: '请选择出库类型',
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '出库时间',
    componentProps: {
      placeholder: '请选择出库时间',
    },
  },
];
export const formSchemaWarehousing: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '入库单号',
    componentProps: {
      placeholder: '请输入入库单号',
    },
  },
  {
    field: 'name',
    component: 'ApiSelect',
    label: '入库类型',
    componentProps: {
      placeholder: '请选择入库类型',
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '入库时间',
    componentProps: {
      placeholder: '请选择入库时间',
    },
  },
];

//新增出库
export const inboundAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'ApiSelect',
    label: '出库仓库',
    required: true,
    componentProps: {
      placeholder: '请选择出库仓库',
    },
  },

  {
    field: 'problem',
    component: 'ApiSelect',
    label: '出库类型',
    required: true,
    componentProps: {
      placeholder: '请选择出库类型',
    },
  },
  {
    field: 'problem',
    component: 'Input',
    label: '出库时间',
    required: true,
    componentProps: {
      placeholder: '请选择出库时间',
    },
  },
  {
    field: 'checkDate',
    component: 'Input',
    label: '申请人',
    required: true,
    componentProps: {
      placeholder: '请选择申请人',
    },
  },
  {
    //物品清单
    //选择仓库后带出来的数据
    field: 'checkDate',
    component: 'Input',
    label: '物品清单',
    // required: true,
    slot: 'tableSlot',
  },
  {
    field: 'problem',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      maxlength: 200,
    },
  },
];
//新增入库
export const OutboundAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'ApiSelect',
    label: '入库仓库',
    required: true,
    componentProps: {
      placeholder: '请选择入库仓库',
    },
  },

  {
    field: 'problem',
    component: 'ApiSelect',
    label: '入库类型',
    required: true,
    componentProps: {
      placeholder: '请选择入库类型',
    },
  },
  {
    field: 'problem',
    component: 'Input',
    label: '入库时间',
    required: true,
    componentProps: {
      placeholder: '请选择入库时间',
    },
  },
  {
    field: 'checkDate',
    component: 'Input',
    label: '申请人',
    required: true,
    componentProps: {
      placeholder: '请选择申请人',
    },
  },
  {
    //物品清单
    //选择仓库后带出来的数据
    field: 'checkDate',
    component: 'Input',
    label: '物品清单',
    // required: true,
    slot: 'tableSlot',
  },
  {
    field: 'problem',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      maxlength: 200,
    },
  },
];
//新增物品清单表格 AddTable
export const AddTable: BasicColumn[] = [
  {
    title: '备件编码',
    dataIndex: 'name',
  },
  {
    title: '备件名称',
    dataIndex: 'productName',
  },
  {
    title: '备件类型',
    dataIndex: 'status',
  },
  {
    title: '规格型号',
    dataIndex: 'status',
  },
  {
    title: '单位',
    dataIndex: 'status',
  },
  {
    title: '使用数量',
    dataIndex: 'status',
    slots: { customRender: 'inputSlot' },
  },
];

//出库详情
export const inboundDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '出库单号',
  },
  {
    field: 'riskLevelName',
    label: '创建时间',
  },
  {
    field: 'projectName',
    label: '出库单状态',
  },
  {
    field: 'districtName',
    label: '出库类型',
  },
  {
    field: 'hazardTypeText',
    label: '经手人',
  },
  {
    field: 'hazardTypeText',
    label: '出手仓库',
  },
  {
    field: 'hazardTypeText',
    label: '出库时间',
  },
  {
    field: 'hazardTypeText',
    label: '备注',
  },
  {
    field: 'hazardTypeText',
    label: '物品清单',
    render: (data) => {
      console.log('data: ', data);
      return (
        <DescItemTable dataSource={dataSource} columns={inboundTableColumns} ifAction={true} />
      );
    },
  },
];
//入库详情 OutboundDescItem
export const OutboundDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '创建人',
  },
  {
    field: 'dangerName',
    label: '入库单号',
  },
  {
    field: 'riskLevelName',
    label: '创建时间',
  },
  {
    field: 'projectName',
    label: '入库单状态',
  },
  {
    field: 'districtName',
    label: '入库类型',
  },
  {
    field: 'hazardTypeText',
    label: '经手人',
  },
  {
    field: 'hazardTypeText',
    label: '入手仓库',
  },
  {
    field: 'hazardTypeText',
    label: '入库时间',
  },
  {
    field: 'hazardTypeText',
    label: '备注',
  },
  {
    field: 'hazardTypeText',
    label: '物品清单',
    render: (data) => {
      console.log('data: ', data);
      return (
        <DescItemTable dataSource={dataSource} columns={inboundTableColumns} ifAction={true} />
      );
    },
  },
];
//库存详情模块
// 新建
//新增检测记录
export const schemasAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'Input',
    label: '仓库名称',
    required: true,
    componentProps: {
      placeholder: '请输入仓库名称',
    },
  },

  {
    field: 'problem',
    component: 'ApiSelect',
    label: '负责人',
    required: true,
    componentProps: {
      placeholder: '请选择负责人',
    },
  },
  {
    field: 'problem',
    component: 'Input',
    label: '负责人电话',
    required: true,
    componentProps: {
      placeholder: '请输入负责人电话',
    },
  },
  {
    field: 'checkDate',
    component: 'Input',
    label: '仓库位置',
    required: true,
    componentProps: {
      placeholder: '请输入仓库位置',
    },
  },

  {
    field: 'problem',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      maxlength: 200,
    },
  },
];
//盘点
export const inventoryColumns: BasicColumn[] = [
  {
    title: '盘点单编号',
    dataIndex: 'name',
  },
  {
    title: '盘点单名称',
    dataIndex: 'productName',
  },
  {
    title: '创建人',
    dataIndex: 'status',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '备注',
    dataIndex: 'status',
  },
];

export const inventoryFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '盘点单编号',
    componentProps: {
      placeholder: '请输入盘点单编号',
    },
  },
  {
    field: 'status',
    component: 'Input',
    label: '盘点单名称',
    componentProps: {
      placeholder: '请输入盘点单名称',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
    },
  },
];
//新建盘点 schemasInventoryAdd
export const schemasInventoryAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'Input',
    label: '盘点名称',
    required: true,
    componentProps: {
      placeholder: '请输入盘点名称',
    },
  },

  {
    field: 'problem',
    component: 'ApiSelect',
    label: '截止时间',
    required: true,
    componentProps: {
      placeholder: '请选择截止时间',
    },
  },
  {
    field: 'problem',
    component: 'ApiSelect',
    label: '执行人',
    required: true,
    componentProps: {
      placeholder: '请选择执行人',
    },
  },
  {
    field: 'checkDate',
    component: 'ApiSelect',
    label: '选择仓库',
    required: true,
    componentProps: {
      placeholder: '请选择仓库',
    },
  },
  {
    //选择仓库后带出来的数据
    field: 'checkDate1',
    component: 'ApiSelect',
    label: '物品清单',
    required: true,
    slot: 'tableSlot',
  },

  {
    field: 'problem',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      maxlength: 200,
    },
  },
];
//新建的物品清单 tableAddColumns
export const tableAddColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'name',
  },
  {
    title: '备件类型',
    dataIndex: 'productName',
  },
  {
    title: '规格型号',
    dataIndex: 'status',
  },
  {
    title: '仓库数量',
    dataIndex: 'status',
  },
  {
    title: '实际数量',
    dataIndex: 'status',
  },
];
const dataSource = [{ name: '222', status1: '2' }];

//出库详情
export const inventoryDescItem: DescItem[] = [
  {
    field: 'dangerName9',
    label: '盘点单编号',
  },
  {
    field: 'riskLevelName9',
    label: '盘点单状态',
  },
  {
    field: 'projectName8',
    label: '盘点名称',
  },

  {
    field: 'districtName7',
    label: '创建时间',
  },
  {
    field: 'hazardTypeText6',
    label: '截止时间',
  },
  {
    field: 'hazardTypeText5',
    label: '执行人',
  },
  {
    field: 'hazardTypeText1',
    label: '完成时间',
  },
  {
    field: 'hazardTypeText2',
    label: '盘点仓库',
  },
  {
    field: 'hazardTypeText2',
    label: '物品清单',
    render: (data) => {
      console.log('data: ', data);
      return <DescItemTable dataSource={dataSource} columns={inventoryTableColumns} />;
    },
  },
];
//inbound
//出库详情物品清单
const inboundTableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'name',
  },
  {
    title: '备件类型',
    dataIndex: 'productName',
  },
  {
    title: '规格型号',
    dataIndex: 'status',
  },
  {
    title: '单位',
    dataIndex: 'status',
  },
  {
    title: '使用数量',
    dataIndex: 'status',
  },
];
//盘点详情物品清单
const inventoryTableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'name',
  },
  {
    title: '备件类型',
    dataIndex: 'productName',
  },
  {
    title: '规格型号',
    dataIndex: 'status',
  },
  {
    title: '所在仓库',
    dataIndex: 'status',
  },
  {
    title: '库存数量',
    dataIndex: 'status',
  },
  {
    title: '实际数量',
    dataIndex: 'status1',
    //已完成时编辑状态
    edit: true,
  },
  {
    //已完成时
    title: '盘点结果',
    dataIndex: 'status',
  },
  {
    //已完成时
    title: '图片',
    dataIndex: 'status',
  },
];
