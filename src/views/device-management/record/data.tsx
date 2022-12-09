import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
export const installationColumns: BasicColumn[] = [
  {
    title: '装置、设施名称',
    dataIndex: 'name',
  },
  {
    title: '所属项目',
    dataIndex: 'productName',
  },
  {
    title: '所属项目组成部分',
    dataIndex: 'status',
  },
  {
    title: '所属区域',
    dataIndex: 'status',
  },
  {
    title: '类型',
    dataIndex: 'status',
  },
  {
    title: '建筑状态',
    dataIndex: 'status',
  },
  {
    title: '重大危险源级别',
    dataIndex: 'status',
  },
  {
    title: '建筑结构',
    dataIndex: 'status',
  },
  {
    title: '火灾危险性类别',
    dataIndex: 'status',
  },
  {
    title: '耐火等级',
    dataIndex: 'status',
  },
  {
    title: '模型绑定状态',
    dataIndex: 'status',
  },
  {
    title: '排序',
    dataIndex: 'status',
  },
];
export const installationFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '装置、设施名称',
    componentProps: {
      placeholder: '请输入装置、设施名称',
    },
  },
  {
    field: 'status',
    component: 'ApiSelect',
    label: '所属项目组成部分',
    componentProps: {
      placeholder: '请选择所属项目组成部分',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '所属所属区域',
    componentProps: {
      placeholder: '请选择所属区域',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
    },
    labelWidth: 92,
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '重大危险源级别',
    componentProps: {
      placeholder: '请选择重大危险源级别',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '火灾危险性类别',
    componentProps: {
      placeholder: '请选择火灾危险性类别',
    },
    labelWidth: 120,
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '耐火等级',
    componentProps: {
      placeholder: '请选择耐火等级',
    },
    labelWidth: 92,
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '模型绑定状态',
    componentProps: {
      placeholder: '请选择模型绑定状态',
    },
  },
];
//基本信息  机械设备静
export const schemaDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称',
  },
  {
    field: 'projectName',
    label: '所属项目',
  },
  {
    field: 'riskLevelName',
    label: '所属装置设施',
  },
  {
    field: 'aaaa',
    label: '设备性质',
    render: (data) => {
      return (
        <div>
          <a-button style={'color:#4D79FF'}>查看动设备</a-button>
        </div>
      );
    },
  },
  {
    field: 'hazardTypeText',
    label: '设备类型',
  },
  {
    field: 'hazardTypeText',
    label: '介质',
  },
  {
    field: 'hazardTypeText',
    label: '位号',
  },
  {
    field: 'hazardTypeText',
    label: '规格型号',
  },
  {
    field: 'hazardTypeText',
    label: '主体材质',
  },
  {
    field: 'hazardTypeText',
    label: '操作温度（°C）',
  },
  {
    field: 'hazardTypeText',
    label: '操作压力（MPa）',
  },
  {
    field: 'hazardTypeText',
    label: '设计温度（°C）',
  },
  {
    field: 'hazardTypeText',
    label: '设计压力（MPa）',
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'hazardTypeText',
    label: '经纬度',
  },
  {
    field: 'hazardTypeText',
    label: '基本信息',
  },
  {
    field: 'hazardTypeText',
    label: '图纸',
  },
  {
    field: 'hazardTypeText',
    label: '附件',
  },
];
//schemaDescItemMove  机械设备动
export const schemaDescItemMove: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称',
  },
  {
    field: 'projectName',
    label: '所属项目',
  },
  {
    field: 'riskLevelName',
    label: '所属装置设施',
  },
  {
    field: 'aaaa',
    label: '设备性质',
    render: (data) => {
      return (
        <div>
          <a-button style={'color:#4D79FF'}>{data}查看动设备</a-button>
        </div>
      );
    },
  },
  {
    field: 'hazardTypeText',
    label: '设备类型罐',
  },
  {
    field: 'dangerName',
    label: '设备编号',
  },
  {
    field: 'riskLevelName',
    label: '使用状态',
  },
  {
    field: 'projectName',
    label: '设备注册代码',
  },

  {
    field: 'districtName',
    label: '使用证编号',
  },
  {
    field: 'hazardTypeText',
    label: '下次检测日期',
  },
  {
    field: 'projectName',
    label: '制造单位',
  },
  {
    field: 'districtName',
    label: '检测责任所在单位',
  },
  {
    field: 'hazardTypeText',
    label: '管理人员',
  },
  {
    field: 'districtName',
    label: '位号',
  },
  {
    field: 'hazardTypeText',
    label: '介质',
  },
  {
    field: 'hazardTypeText',
    label: '主体材质',
  },
  {
    field: 'hazardTypeText',
    label: '规格型号',
  },
  {
    field: 'hazardTypeText',
    label: '操作压力（MPa）',
  },
  {
    field: 'hazardTypeText',
    label: '操作温度（°C）',
  },
  {
    field: 'hazardTypeText',
    label: '设计温度（°C）',
  },
  {
    field: 'hazardTypeText',
    label: '设计压力（MPa）',
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'hazardTypeText',
    label: '经纬度',
  },
  {
    field: 'hazardTypeText',
    label: '基本信息',
  },
  {
    field: 'hazardTypeText',
    label: '图纸',
  },
  {
    field: 'hazardTypeText',
    label: '附件',
  },
];
//  巡检记录
export const patrolInspectionColumns: BasicColumn[] = [
  {
    title: '巡检任务编号',
    dataIndex: 'name',
  },
  {
    title: '巡检开始时间',
    dataIndex: 'productName',
  },
  {
    title: '巡检结束时间',
    dataIndex: 'status',
  },
  {
    title: '巡检班组',
    dataIndex: 'status',
  },
  {
    title: '巡检人',
    dataIndex: 'status',
  },
  {
    title: '巡检结果',
    dataIndex: 'status',
  },
];
export const patrolInspectionFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '任务编号',
    componentProps: {
      placeholder: '请输入任务编号',
    },
  },
  {
    field: '[]',
    component: 'RangePicker',
    label: '巡检时间段',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '巡检结果',
    componentProps: {
      placeholder: '请选择巡检结果',
    },
  },
];
// 故障记录
export const failureColumns: BasicColumn[] = [
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
    title: '处理状态',
    dataIndex: 'status',
  },
  {
    title: '关联工单',
    dataIndex: 'status',
  },
];
export const failureFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '故障单号',
    componentProps: {
      placeholder: '请输入故障单号',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '上报人',
    componentProps: {
      placeholder: '请选择上报人',
    },
    labelWidth: 64,
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '上报时间',
    componentProps: {
      placeholder: '请选择上报时间',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '巡检结果',
    componentProps: {
      placeholder: '请选择巡检结果',
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
    label: '处理状态',
    componentProps: {
      placeholder: '请选择处理状态',
    },
  },
];
// 检修记录
export const overhaulColumns: BasicColumn[] = [
  {
    title: '工单编号',
    dataIndex: 'name',
  },
  {
    title: '负责人',
    dataIndex: 'productName',
  },
  {
    title: '处理人',
    dataIndex: 'status',
  },
  {
    title: '完成时间',
    dataIndex: 'status',
  },
  {
    title: '关联计划',
    dataIndex: 'status',
  },
];
export const overhaulFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '工单编号',
    componentProps: {
      placeholder: '请输入工单编号',
    },
  },
  {
    //输入选择
    field: 'productId',
    component: 'ApiSelect',
    label: '负责人',
    componentProps: {
      placeholder: '请输入选择负责人',
    },
  },
  {
    //输入选择
    field: 'productId',
    component: 'ApiSelect',
    label: '处理人',
    componentProps: {
      placeholder: '请输入选择处理人',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '关联计划',
    componentProps: {
      placeholder: '请选择关联计划',
    },
  },
];
// 定时检测记录
export const timingDetectionColumns: BasicColumn[] = [
  {
    title: '检测时间',
    dataIndex: 'name',
  },
  {
    title: '特种设备名称',
    dataIndex: 'productName',
  },
  {
    title: '安全附件名称',
    dataIndex: 'status',
  },
  {
    title: '证书编号',
    dataIndex: 'status',
  },
  {
    title: '检验结论',
    dataIndex: 'status',
  },
  {
    title: '下次检验日期',
    dataIndex: 'status',
  },
  {
    title: '备注',
    dataIndex: 'status',
  },
];
export const timingDetectionFormSchema: FormSchema[] = [
  {
    field: '[]',
    component: 'RangePicker',
    label: '检测时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: '[]',
    component: 'RangePicker',
    label: '下次检验日期',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
];
//  保养记录
export const maintenanceColumns: BasicColumn[] = [
  {
    title: '保养工单编号',
    dataIndex: 'name',
  },
  {
    title: '负责人',
    dataIndex: 'productName',
  },
  {
    title: '处理人',
    dataIndex: 'status',
  },
  {
    title: '完全时间',
    dataIndex: 'status',
  },
  {
    title: '关联计划',
    dataIndex: 'status',
  },
];
export const maintenanceFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '工单编号',
    componentProps: {
      placeholder: '请输入工单编号',
    },
  },
  {
    //输入选择
    field: 'productId',
    component: 'ApiSelect',
    label: '负责人',
    componentProps: {
      placeholder: '请输入选择负责人',
    },
  },
  {
    //输入选择
    field: 'productId',
    component: 'ApiSelect',
    label: '处理人',
    componentProps: {
      placeholder: '请输入选择处理人',
    },
  },
  {
    field: '[]',
    component: 'RangePicker',
    label: '保养完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '关联计划',
    componentProps: {
      placeholder: '请选择关联计划',
    },
  },
];
// 应急演练记录
export const emergencyColumns: BasicColumn[] = [
  {
    title: '演练名称',
    dataIndex: 'name',
  },
  {
    title: '计划开始时间',
    dataIndex: 'productName',
  },
  {
    title: '实际开始时间',
    dataIndex: 'status',
  },
  {
    title: '计划演练时长',
    dataIndex: 'status',
  },
  {
    title: '演练对象',
    dataIndex: 'status',
  },
  {
    title: '演练范围',
    dataIndex: 'status',
  },
];
export const emergencyFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '演练名称',
    componentProps: {
      placeholder: '请输入演练名称',
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '计划开始时间',
    componentProps: {
      placeholder: '请选择计划开始时间',
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '实际开始时间',
    componentProps: {
      placeholder: '请选择实际开始时间',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '演练对象',
    componentProps: {
      placeholder: '请选择演练对象',
    },
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    label: '演练部门',
    componentProps: {
      placeholder: '请选择演练部门',
    },
  },
];
