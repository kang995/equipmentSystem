import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import {
  getDictionarySelectType,
  getManagementDictionaryList,
} from '/@/api/sys/systemSetting/dictionaryType';
import {
  UpkeepPlanListApi,
  DeviceSelectListApi,
  SparePartSelectApi,
  contingencySelectApi,
  contingencyLevelSelectApi,
} from '/@/api/device-management/special-equipment';
import { getPersonSelectApi } from '/@/api/device-maintenance/index';
import { SvgIcon } from '/@/components/Icon';
import { getBlob, saveAs } from '/@/utils/downloadFile';
import { Image, Row, Tag } from 'ant-design-vue';
import {
  postPlanNameListApi,
  postSectionListApi,
} from '/@/api/device-management/special-equipment'; //装置设置

// import { useRoute } from 'vue-router';
// const route = useRoute();
// const deviceId = route.query.id as string;

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

//关联应急预案
export const partTableColumns: BasicColumn[] = [
  {
    title: '应急预案名称',
    dataIndex: 'planName',
  },
  {
    title: '预案编号',
    dataIndex: 'planNum',
  },
  {
    title: '事件类别',
    dataIndex: 'accidentTypeValue',
  },
  {
    title: '预案类型',
    dataIndex: 'planTypeValue',
  },
  {
    title: '响应等级',
    dataIndex: 'gradeValue',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

export const getPartFormSchema: FormSchema[] = [
  {
    field: 'planName',
    component: 'Input',
    label: '预案名称',
    componentProps: {
      placeholder: '请输入预案名称',
    },
  },
  {
    field: 'planType',
    component: 'ApiSelect',
    label: '预案类型',
    componentProps: {
      placeholder: '请选择预案类型',
      api: contingencySelectApi,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
    labelWidth: 92,
  },
  {
    field: 'grade',
    component: 'ApiSelect',
    label: '预案响应等级',
    componentProps: {
      placeholder: '请选择预案响应等级',
      api: contingencyLevelSelectApi,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
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

//基本信息   特种设备'
export const mechanicsDescItem: DescItem[] = [
  {
    field: 'name',
    label: '设备名称',
  },
  {
    field: 'projectName',
    label: '所属项目',
  },
  {
    field: 'facilitiesName',
    label: '所属装置设施',
  },
  {
    field: 'deviceNatureName',
    label: '设备性质',
  },
  {
    field: 'deviceTypeName',
    label: '设备类型',
  },
  {
    field: 'facilityCode',
    label: '设备编码',
  },
  {
    field: 'useStatusText',
    label: '使用状态',
  },
  {
    field: 'useCardCode',
    label: '特种设备使用证编号',
  },
  {
    field: 'manufactureEnterprise',
    label: '制造单位',
  },
  {
    field: 'inspectionResponsibilityEnterprise',
    label: '检验责任所在单位',
  },
  {
    field: 'detectionNextDate',
    label: '首次检测日期',
  },
  {
    field: 'managementPeopleName',
    label: '管理人员',
  },
  {
    field: 'managementPeoplePhone',
    label: '管理人员联系方式',
  },

  {
    field: 'medium',
    label: '介质',
  },
  {
    field: 'bitNumber',
    label: '位号',
    show: (data) => {
      return data.facilityQuality == '1';
    },
  },

  {
    field: 'specifModels',
    label: '设备型号',
    show: (data) => {
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'mediumTemp',
    label: '介质温度',
    show: (data) => {
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'specifModels',
    label: '规格型号',
  },
  {
    field: 'subjectTexture',
    label: '主体材质',
  },
  {
    field: 'temperature',
    label: '操作温度（°C）',
    show: (data) => {
      return data.facilityQuality == '1';
    },
  },
  {
    field: 'pressure',
    label: '操作压力（MPa）',
    show: (data) => {
      return data.facilityQuality == '1';
    },
  },
  {
    field: 'designTemp',
    label: '设计温度（°C）',
    show: (data) => {
      return data.facilityQuality == '1';
    },
  },
  {
    field: 'designPres',
    label: '设计压力（MPa）',
    show: (data) => {
      return data.facilityQuality == '1';
    },
  },
  {
    field: 'temperature',
    label: '设计流量（m³/h）',
    show: (data) => {
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'designLift',
    label: '设计扬程（m）',
    show: (data) => {
      console.log('data.facilityQuality: ', data.facilityQuality);
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'designShaftPower',
    label: '设计轴功率（kw）',
    show: (data) => {
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'designRevolutions',
    label: '设计转数（rpm）',
    show: (data) => {
      return data.facilityQuality == '0';
    },
  },
  {
    field: 'position',
    label: '地理位置',
  },
  {
    field: 'positionList',
    label: '经纬度',
    render: (val) => {
      console.log('val: ', val);
      if (val) {
        return (
          <div>
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
    field: 'basicInformat',
    label: '基本信息',
    render: (val: string) => {
      return <div class="overflow-auto max-h-[150px]" v-html={val}></div>;
    },
  },
  {
    field: 'blueprintList',
    label: '图纸',
    render: (data) => {
      console.log('data:333 ', data);
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            {data.map((item) => {
              return <Image width={100} src={item.url} />;
            })}
          </ARow>
        );
      }
    },
  },
  {
    field: 'affixList',
    label: '附件',
    render: (data) => {
      if (data) {
        return (
          <div>
            {data.map((item) => {
              return (
                <div class="flex items-center">
                  <SvgIcon name="gonggong_fujian" class={'mr-2'} />
                  <span class={'mr-6 text-[#61687C]'}>{item.name}</span>
                  <SvgIcon name="gonggong_xiazai" color="#4D79FF" />
                  <button
                    onClick={async () => saveAs(await getBlob(item.url), item.name)}
                    class={'text-[#4D79FF]'}
                  >
                    下载
                  </button>
                </div>
              );
            })}
          </div>
        );
      }
    },
  },
];

//基本信息  机械设备
export const equipmentDescItem: DescItem[] = [
  {
    field: 'name',
    label: '设备名称',
  },
  {
    field: 'projectName',
    label: '所属项目',
  },
  {
    field: 'facilitiesName',
    label: '所属装置设施',
  },
  {
    field: 'deviceNatureName',
    label: '设备性质',
    //0 动 1 静
  },
  {
    field: 'deviceTypeName',
    label: '设备类型',
  },
  {
    field: 'useStatusText',
    label: '设备状态',
  },
  {
    field: 'facilityModel',
    label: '设备型号',
    show: (data) => {
      return data.deviceNature == '0';
    },
  },
  {
    field: 'districtName',
    label: '位号',
    show: (data) => {
      return data.deviceNature == '1';
    },
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
    field: 'specifModels',
    label: '规格型号',
  },
  {
    field: 'mediumTemp',
    label: '介质温度（°C）',
    show: (data) => {
      return data.deviceNature == '0';
    },
  },
  {
    field: 'temperature',
    label: '设计流量（m³/h）',
    show: (data) => {
      return data.deviceNature == '2';
    },
  },
  {
    field: 'designLift',
    label: '设计扬程（m）',
    show: (data) => {
      return data.deviceNature == '2';
    },
  },
  {
    field: 'designShaftPower',
    label: '设计轴功率（kw）',
    show: (data) => {
      return data.deviceNature == '2';
    },
  },
  {
    field: 'designRevolutions',
    label: '设计转数（rpm）',
    show: (data) => {
      return data.deviceNature == '2';
    },
  },

  {
    field: 'hazardTypeText',
    label: '操作压力（MPa）',
    show: (data) => {
      return data.deviceNature == '1';
    },
  },
  {
    field: 'hazardTypeText',
    label: '操作温度（°C）',
    show: (data) => {
      return data.deviceNature == '1';
    },
  },

  {
    field: 'hazardTypeText',
    label: '设计压力（MPa）',
    show: (data) => {
      return data.deviceNature == '1';
    },
  },
  {
    field: 'hazardTypeText',
    label: '设计温度（°C）',
    show: (data) => {
      return data.deviceNature == '1';
    },
  },
  {
    field: 'hazardTypeText',
    label: '地理位置',
  },
  {
    field: 'positionList',
    label: '经纬度',
    render: (val) => {
      console.log('val: ', val);
      if (val) {
        return (
          <div>
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
    field: 'basicInformat',
    label: '基本信息',
    render: (val: string) => {
      return <div class="overflow-auto max-h-[150px]" v-html={val}></div>;
    },
  },
  {
    field: 'pictureList',
    label: '图纸',
    render: (data) => {
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            {data.map((item) => {
              return <Image width={100} src={item.url} />;
            })}
          </ARow>
        );
      }
    },
  },
  {
    field: 'affixList',
    label: '附件',
    render: (data) => {
      if (data) {
        return (
          <div>
            {data.map((item) => {
              return (
                <div class="flex items-center">
                  <SvgIcon name="gonggong_fujian" class={'mr-2'} />
                  <span class={'mr-6 text-[#61687C]'}>{item.name}</span>
                  <SvgIcon name="gonggong_xiazai" color="#4D79FF" />
                  <button
                    onClick={async () => saveAs(await getBlob(item.url), item.name)}
                    class={'text-[#4D79FF]'}
                  >
                    下载
                  </button>
                </div>
              );
            })}
          </div>
        );
      }
    },
  },
];

//  巡检记录
export const patrolInspectionColumns: BasicColumn[] = [
  {
    title: '巡检任务编号',
    dataIndex: 'recordCode',
  },
  {
    title: '巡检开始时间',
    dataIndex: 'startDate',
  },
  {
    title: '巡检结束时间',
    dataIndex: 'endDate',
  },
  {
    title: '巡检班组',
    dataIndex: 'teamName',
  },
  {
    title: '巡检人',
    dataIndex: 'inspectorName',
  },
  {
    title: '巡检结果',
    dataIndex: 'patrolResult', //巡检结果（0代表正常，1代表异常 -1代表未上报显示 - 即可）
    customRender: ({ record }) => {
      if (record.patrolResult === '0') {
        return <Tag color={'green'}>{'正常'}</Tag>;
      } else if (record.patrolResult === '1') {
        return <Tag color={'red'}>{'异常'}</Tag>;
      } else if (record.patrolResult === '-1') {
        return '--';
      }
    },
  },
];
export const patrolInspectionFormSchema: FormSchema[] = [
  {
    field: 'recordCode',
    component: 'Input',
    label: '任务编号',
    componentProps: {
      placeholder: '请输入任务编号',
    },
  },
  {
    field: '[startDate,endDate]',
    component: 'RangePicker',
    label: '巡检时间段',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
  },
  {
    field: 'patrolResult',
    component: 'Select',
    label: '巡检结果',
    componentProps: {
      placeholder: '请选择巡检结果',
      options: [
        { label: '正常', value: '0' },
        { label: '异常', value: '1' },
      ],
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
    field: 'recordCode',
    label: '巡检任务编号',
  },
  {
    field: 'patrolStateText',
    label: '巡检状态',
  },
  {
    field: 'teamName',
    label: '巡检班组',
  },
  {
    field: 'startDate',
    label: '巡检开始时间',
  },
  {
    field: 'patrolDuration',
    label: '巡检时长',
  },
  {
    field: 'chargeName',
    label: '负责人',
  },
  {
    field: 'endDate',
    label: '巡检结束时间',
  },
  //列表带过来
  {
    field: 'hazardTypeText',
    label: '巡检结果',
  },
  {
    field: 'inspectorName',
    label: '巡检人员',
  },
];
// 检修记录
export const overhaulColumns: BasicColumn[] = [
  {
    title: '工单编号',
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
    dataIndex: 'overhaulPlanName',
  },
];
export const overhaulFormSchema: FormSchema[] = [
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
    field: 'overhaulPlanId',
    component: 'ApiSelect',
    label: '关联计划',
    componentProps: {
      placeholder: '请选择关联计划',
      api: DeviceSelectListApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
];
// 定时检测记录
export const timingDetectionColumns: BasicColumn[] = [
  {
    title: '检测时间',
    dataIndex: 'detectionDate',
  },
  {
    title: '特种设备名称',
    dataIndex: 'deviceName',
  },
  {
    title: '安全附件名称',
    dataIndex: 'safeAffixName',
  },
  {
    title: '证书编号',
    dataIndex: 'certificateCode',
  },
  {
    title: '检验结论',
    dataIndex: 'detectionResult',
  },
  {
    title: '下次检验日期',
    dataIndex: 'detectionNextDate',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
export const timingDetectionFormSchema: FormSchema[] = [
  {
    field: '[detectionStartDate,detectionEndDate]',
    component: 'RangePicker',
    label: '检测时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    field: '[detectionNextStartDate,detectionNextEndDate]',
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
      api: UpkeepPlanListApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
];
// 应急演练记录
export const emergencyColumns: BasicColumn[] = [
  {
    title: '演练名称',
    dataIndex: 'planIdName',
  },
  {
    title: '计划开始时间',
    dataIndex: 'planStartTime',
  },
  {
    title: '实际开始时间',
    dataIndex: 'actualStartDate',
  },
  {
    title: '计划演练时长',
    dataIndex: 'duration',
  },
  {
    title: '演练对象',
    dataIndex: 'planIdName',
  },
  {
    title: '演练范围',
    dataIndex: 'departmentIdName',
  },
];
export const emergencyFormSchema: FormSchema[] = [
  {
    field: 'drillName',
    component: 'Input',
    label: '演练名称',
    componentProps: {
      placeholder: '请输入演练名称',
    },
  },
  {
    field: '[planStartTime,planEndTime]',
    component: 'RangePicker',
    label: '计划开始时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: true,
    },
  },
  {
    field: '[actualStartTime,actualEndTime]',
    component: 'RangePicker',
    label: '实际开始时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: true,
    },
  },
  {
    field: 'planId',
    component: 'ApiSelect',
    label: '演练对象',
    componentProps: {
      placeholder: '请选择演练对象',
      api: postPlanNameListApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'departmentId',
    component: 'ApiTreeSelect',
    label: '演练部门',
    componentProps: {
      placeholder: '请选择演练部门',
      api: postSectionListApi,
      params: {
        // type: 'PLAN_STATUS'
      },
      fieldNames: {
        numberToString: true,
        value: 'id',
        key: 'id',
        label: 'label',
        children: 'children',
      },
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
    dataIndex: 'spareName',
  },
  {
    title: '备件类型',
    dataIndex: 'spareClassifyText',
  },
  {
    title: '规格型号',
    dataIndex: 'specification',
  },
  {
    title: '单位',
    dataIndex: 'measureUnitText',
  },
];
export function associatedFormSchema(deviceId): FormSchema[] {
  return [
    {
      field: 'spareId',
      component: 'ApiSelect',
      label: '备件名称',
      componentProps: {
        placeholder: '请选择备件名称',
        api: SparePartSelectApi, //后台路径
        params: {
          deviceId,
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name', //设置label字段
        valueField: 'id', //设置value字段
      },
    },
    {
      field: 'spareClassify',
      component: 'ApiSelect',
      label: '备件分类',
      componentProps: {
        placeholder: '请选择备件分类',
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'SPARE_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
      },
    },
  ];
}
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
    field: 'spareName',
    component: 'Input',
    label: '备件名称',
    componentProps: {
      placeholder: '请输入备件名称',
    },
  },
  {
    field: 'spareClassify',
    component: 'ApiSelect',
    label: '备件分类',
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'SPARE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择备件分类',
    },
  },
  {
    field: 'dealPeopleName',
    component: 'Input',
    label: '处理人',
    componentProps: {
      placeholder: '请输入处理人',
    },
  },
  {
    field: '[finishStartTime,finishEndTime]',
    component: 'RangePicker',
    label: '完成时间',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
    },
  },
];
