import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { getManagementDictionaryList } from '/@/api/sys/systemSetting/dictionaryType';
import { getPersonSelectApi } from '/@/api/device-maintenance/index';
//装置设置
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

//基本信息  机械设备静 state === '1'
export const mechanicsDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称/机械设备静/1',
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
    field: 'position',
    label: '经纬度',
    render: (val) => {
      if (val) {
        return (
          <div>
            <p>{val}</p>
            <a-button id="testReviewBtn" preIcon="gonggong_dingwei|svg">
              预览位置
            </a-button>
          </div>
        );
      } else {
      }
    },
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
//基本信息  机械设备动 state === '2'
export const mechanicsDescItemMove: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称/机械设备动/2',
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
    label: '设备型号',
  },
  {
    field: 'hazardTypeText',
    label: '介质温度（°C）',
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
    label: '设计流量（m³/h）',
  },
  {
    field: 'hazardTypeText',
    label: '设计轴功率（kw）',
  },
  {
    field: 'hazardTypeText',
    label: '设计扬程（m）',
  },
  {
    field: 'hazardTypeText',
    label: '设计转数（rpm）',
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'position',
    label: '经纬度',
    render: (val) => {
      if (val) {
        return (
          <div>
            <p>{val}</p>
            <a-button id="testReviewBtn" preIcon="gonggong_dingwei|svg">
              预览位置
            </a-button>
          </div>
        );
      } else {
      }
    },
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
//基本信息  特种设备静 state === '3'
export const equipmentDescItem: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称/特种设备静/3',
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
  },
  {
    field: 'hazardTypeText',
    label: '设备类型',
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
    field: 'position',
    label: '经纬度',
    render: (val) => {
      if (val) {
        return (
          <div>
            <p>{val}</p>
            <a-button id="testReviewBtn" preIcon="gonggong_dingwei|svg">
              预览位置
            </a-button>
          </div>
        );
      } else {
      }
    },
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
//基本信息  特种设备动 state === '4'
export const equipmentDescItemMove: DescItem[] = [
  {
    field: 'dangerName',
    label: '设备名称/特种设备动/4',
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
  },
  {
    field: 'hazardTypeText',
    label: '设备类型',
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
    field: 'hazardTypeText',
    label: '介质',
  },
  {
    field: 'districtName',
    label: '设备型号',
  },
  {
    field: 'districtName',
    label: '介质温度（°C）',
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
    label: '设计流量（m³/h）',
  },
  {
    field: 'hazardTypeText',
    label: '设计轴功率（kw）',
  },
  {
    field: 'hazardTypeText',
    label: '设计扬程（m）',
  },
  {
    field: 'hazardTypeText',
    label: '操作压力（MPa）',
  },
  {
    field: 'hazardTypeText',
    label: '设计转数（rpm）',
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'position',
    label: '经纬度',
    render: (val) => {
      if (val) {
        return (
          <div>
            <p>{val}</p>
            <a-button id="testReviewBtn" preIcon="gonggong_dingwei|svg">
              预览位置
            </a-button>
          </div>
        );
      } else {
      }
    },
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
    dataIndex: 'troubleCode',
  },
  {
    title: '上报人',
    dataIndex: 'createBy',
  },
  {
    title: '上报时间',
    dataIndex: 'createTime',
  },
  {
    title: '故障类型',
    dataIndex: 'troubleTypeText',
  },
  {
    title: '故障等级',
    dataIndex: 'urgentLevelText',
  },
  {
    title: '故障描述',
    dataIndex: 'description',
  },
  {
    title: '处理状态',
    dataIndex: 'troubleDetermineText',
  },
  {
    title: '关联工单',
    dataIndex: 'jobCode',
  },
];
export const failureFormSchema: FormSchema[] = [
  {
    field: 'troubleCode',
    component: 'Input',
    label: '故障单号',
    componentProps: {
      placeholder: '请输入故障单号',
    },
  },
  {
    field: 'createBy',
    component: 'ApiSelect',
    label: '上报人',
    componentProps: {
      placeholder: '请选择上报人',
    },
    labelWidth: 64,
  },
  {
    field: 'createTime',
    component: 'DatePicker',
    label: '上报时间',
    componentProps: {
      placeholder: '请选择上报时间',
    },
  },
  // {
  //   field: 'productId',
  //   component: 'ApiSelect',
  //   label: '巡检结果',
  //   componentProps: {
  //     placeholder: '请选择巡检结果',
  //   },
  // },
  {
    field: 'troubleType',
    component: 'ApiSelect',
    label: '故障类型',
    componentProps: {
      placeholder: '请选择故障类型',
      api: getManagementDictionaryList,
      params: {
        type: 'TROUBLE_TYPE',
      },
      resultField: 'records', //后台返回数据字段
      labelField: 'itemName',
      valueField: 'itemValue',
    },
  },
  {
    field: 'urgentLevel',
    component: 'ApiSelect',
    label: '故障等级',
    componentProps: {
      placeholder: '请选择故障等级',
      api: getManagementDictionaryList,
      params: {
        type: 'URGENT_LEVEL',
      },
      resultField: 'records', //后台返回数据字段
      labelField: 'itemName',
      valueField: 'itemValue',
    },
  },
  {
    field: 'troubleStatus',
    component: 'ApiSelect',
    label: '处理状态',
    componentProps: {
      placeholder: '请选择处理状态',
      api: getManagementDictionaryList,
      params: {
        type: 'TROUBLE_STATUS',
      },
      resultField: 'records', //后台返回数据字段
      labelField: 'itemName',
      valueField: 'itemValue',
    },
  },
];
//巡检报告
export const patrolInspectionReportSchema: DescItem[] = [
  {
    field: 'dangerName',
    label: '巡检任务编号',
  },
  {
    field: 'districtName',
    label: '巡检开始时间',
  },
  {
    field: 'hazardTypeText',
    label: '巡检结束时间',
  },
  {
    field: 'riskLevelName',
    label: '巡检状态',
  },
  {
    field: 'hazardTypeText',
    label: '巡检时长',
  },
  {
    field: 'hazardTypeText',
    label: '巡检结果',
  },
  {
    field: 'projectName',
    label: '巡检班组',
  },

  {
    field: 'districtName',
    label: '巡检开始时间',
  },

  {
    field: 'hazardTypeText',
    label: '负责人',
  },

  {
    field: 'hazardTypeText',
    label: '巡检人员',
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
    dataIndex: 'code',
  },
  {
    title: '负责人',
    dataIndex: 'chargePeopleName',
  },
  {
    title: '处理人',
    dataIndex: 'dealUserName',
  },
  {
    title: '完成时间',
    dataIndex: 'finishTime',
  },
  {
    title: '关联计划',
    dataIndex: 'upkeepPlanName',
  },
];
export const maintenanceFormSchema: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '工单编号',
    componentProps: {
      placeholder: '请输入工单编号',
    },
  },
  {
    //输入选择
    field: 'chargePeopleId',
    component: 'ApiSelect',
    label: '负责人',
    componentProps: {
      placeholder: '请输入选择负责人',
      api: getPersonSelectApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    //输入选择
    field: 'dealUserIdList',
    component: 'ApiSelect',
    label: '处理人',
    componentProps: {
      placeholder: '请输入选择处理人',
      mode: 'multiple',
      api: getPersonSelectApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: '[finishStartTime,finishEndTime]',
    component: 'RangePicker',
    label: '保养完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: true,
    },
  },
  {
    field: 'upkeepPlanId',
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

//开停车记录
export const vehicleColumns: BasicColumn[] = [
  {
    title: '开停车类型',
    dataIndex: 'name',
  },
  {
    title: '开/停车时间',
    dataIndex: 'productName',
  },
  {
    title: '开/停车方案',
    dataIndex: 'status',
  },
  {
    title: '开/停车人',
    dataIndex: 'status',
  },
  {
    title: '开停车前隐患排查',
    dataIndex: 'status',
  },
  {
    title: '备注',
    dataIndex: 'status',
  },
];
export const vehicleFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'ApiSelect',
    label: '开停车类型',
    componentProps: {
      placeholder: '请选择开停车类型',
    },
  },
  {
    field: '[]',
    component: 'RangePicker',
    label: '开停车时间段',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
];
// 关联备件
export const associatedColumns: BasicColumn[] = [
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
];
export const associatedFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'ApiSelect',
    label: '备件名称',
    componentProps: {
      placeholder: '请选择备件名称',
    },
  },
  {
    field: 'name',
    component: 'ApiSelect',
    label: '备件分类',
    componentProps: {
      placeholder: '请选择备件分类',
    },
  },
];
// 备件更换记录
export const sparePartColumns: BasicColumn[] = [
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
  {
    title: '关联工单',
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
export const sparePartFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'ApiSelect',
    label: '备件名称',
    componentProps: {
      placeholder: '请选择备件名称',
    },
  },
  {
    field: 'name',
    component: 'ApiSelect',
    label: '备件分类',
    componentProps: {
      placeholder: '请选择备件分类',
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '处理人',
    componentProps: {
      placeholder: '请输入处理人',
    },
  },
  {
    field: '[]',
    component: 'RangePicker',
    label: '完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
];
