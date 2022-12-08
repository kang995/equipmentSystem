import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { SvgIcon } from '/@/components/Icon';
import EssentialInformation from './record/EssentialInformation.vue';
import PatrolInspectionRecords from './record/PatrolInspectionRecords.vue';
import FailureRecord from './record/FailureRecord.vue';
import OverhaulRecord from './record/OverhaulRecord.vue';
import MaintenanceRecord from './record/MaintenanceRecord.vue';
import TimingDetection from './record/TimingDetection.vue';
import EmergencyDrillRecord from './record/EmergencyDrillRecord.vue';
import EmergencyPlan from './record/EmergencyPlan.vue';
import VehicleRecord from './record/VehicleRecord.vue';
import AssociatedSpareParts from './record/AssociatedSpareParts.vue';
import SparePart from './record/SparePart.vue';

export interface TabItem {
  key: string;
  name: string;
  component?: any;
  ifShow?: boolean;
}
//机械动：1 机械静：2 特种静：3 特种动：4
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '基本信息', //1 2 3 4
    component: EssentialInformation,
  },
  {
    key: '2',
    name: '巡检记录', //1 2 3 4
    component: PatrolInspectionRecords,
  },
  {
    key: '3',
    name: '故障记录', //1 2 3 4
    component: FailureRecord,
  },
  {
    key: '4',
    name: '检修记录', //1 2 3 4
    component: OverhaulRecord,
  },
  {
    key: '5',
    name: '保养记录', //1 2 3 4
    component: MaintenanceRecord,
  },
  {
    key: '6',
    name: '定时检测记录', // 3 4
    component: TimingDetection,
  },
  {
    key: '7',
    name: '应急演练记录', //1 3 4
    component: EmergencyDrillRecord,
  },
  {
    key: '8',
    name: '应急预案', //1 3 4
    component: EmergencyPlan,
  },
  {
    key: '9',
    name: '开停车记录', // 2
    component: VehicleRecord,
  },
  {
    key: '10',
    name: '关联备件', //1 2 3 4
    component: AssociatedSpareParts,
  },
  {
    key: '11',
    name: '备件更换记录', //1 2 3 4
    component: SparePart,
  },
];
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
export const installationSchema: DescItem[] = [
  {
    field: 'dangerName',
    label: '装置名称',
  },
  {
    field: 'riskLevelName',
    label: '所属项目',
  },
  {
    field: 'projectName',
    label: '所属项目组成部分',
  },

  {
    field: 'districtName',
    label: '所属区域',
  },
  {
    field: 'hazardTypeText',
    label: '类型',
  },
  {
    field: 'hazardTypeText',
    label: '监测方向',
  },
  {
    field: 'hazardTypeText',
    label: '重大危险源级别',
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'hazardTypeText',
    label: '建筑状态',
  },
  {
    field: 'hazardTypeText',
    label: '占地面积',
  },
  {
    field: 'hazardTypeText',
    label: '建筑面积',
  },
  {
    field: 'hazardTypeText',
    label: '建筑结构',
  },
  {
    field: 'hazardTypeText',
    label: '层高',
  },
  {
    field: 'hazardTypeText',
    label: '火灾危险性类别',
  },
  {
    field: 'hazardTypeText',
    label: '耐火级别',
  },
  {
    field: 'basicFormat',
    label: '基本信息',
    span: 4,
    render: (val: string) => {
      return <div style="overflow: auto; max-height: 200px" v-html={val}></div>;
    },
  },
  {
    field: 'hazardTypeText',
    label: '图纸',
    span: 4,
  },
  {
    field: 'affixList',
    label: '附件',
    span: 4,
    render: (data) => {
      if (data) {
        return (
          <div>
            {data.map((item) => {
              return (
                <div>
                  <SvgIcon name="gonggong_fujian" class={'mr-2'} />
                  <span style={'color:#61687C'} class={'mr-6'}>
                    {item.name}
                  </span>
                  <a href={item.url} target="_blank">
                    <SvgIcon name="gonggong_xiazai" color="#4D79FF" />
                    <span style={'color:#4D79FF'}>下载</span>
                  </a>
                </div>
              );
            })}
          </div>
        );
      }
    },
  },
];
export const schemasAdd: FormSchema[] = [
  {
    field: 'dutyPersonId',
    component: 'ApiSelect',
    label: '履职人',
    slot: 'selectSlot',
    componentProps: {
      placeholder: '请选择履职人',
      maxlength: 20,
    },
    required: true,
  },
  {
    field: 'dutyTypeId',
    component: 'Input',
    label: '职责',
    required: true,
    componentProps: {
      disabled: true,
      placeholder: '请输入职责',
    },
  },
  {
    field: 'checkDate',
    component: 'DatePicker',
    label: '检查时间',
    required: true,
  },

  {
    //1.默认带入当前账号人员。
    // 2.企业架构：可选择企业内部人员，支持输入性选择、下拉选择。
    // 3.其他人员：支持手动输入
    field: 'checkPersonId',
    component: 'Input',
    label: '检查人',
    required: true,
    slot: 'checkPersonSlot',
  },
  {
    field: 'checkPersonPost',
    component: 'Input',
    label: '检查人职务',
    componentProps: {
      disabled: true,
      placeholder: '请输入检查人职务',
    },
  },

  {
    field: 'checkPersonPhone',
    component: 'Input',
    label: '联系方式',
    componentProps: {
      disabled: true,

      placeholder: '请输入联系方式',
    },
    required: true,
  },

  {
    field: 'contentAndMode',
    component: 'InputTextArea',
    label: '检查内容及方式',
    required: true,
    componentProps: {
      placeholder: '请输入检查内容及方式',
    },
  },

  {
    field: 'conditionDescribe',
    component: 'InputTextArea',
    label: '检查情况描述',
    required: true,
    componentProps: {
      placeholder: '请输入检查情况描述',
    },
  },

  {
    field: 'problem',
    component: 'InputTextArea',
    label: '存在问题',

    componentProps: {
      placeholder: '请输入存在问题',
    },
  },

  {
    field: 'result',
    component: 'InputTextArea',
    label: '检查结果',
    required: true,
    componentProps: {
      placeholder: '请输入检查结果',
    },
  },
  {
    //附件
    field: 'accessory',
    component: 'InputTextArea',
    label: '上传附件',
    slot: 'filesSlot',
  },
];
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
