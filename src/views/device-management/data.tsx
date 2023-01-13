import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { SvgIcon } from '/@/components/Icon';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce';
import { Row, Image } from 'ant-design-vue';
import {
  getDictionarySelectType,
  getMechanicalDeviceApi,
  getSpecialDeviceApi,
} from '/@/api/sys/systemSetting/dictionaryType';
import {
  postBindStateApi,
  postDesignSelectApi,
  postDistrictSelectApi,
  postFireResisRatSelectApi,
  postFireRiskClassesSelectApi,
  postProjectNameSelectApi,
  postRiskLevelSelectApi,
  postTypeSelectApi,
} from '/@/api/device-management/installation';
import {
  postSelectUnitFacilityApi,
  contingencySelectApi,
  contingencyLevelSelectApi,
} from '/@/api/device-management/special-equipment';

export const installationColumns: BasicColumn[] = [
  {
    title: '装置、设施名称',
    dataIndex: 'name',
  },
  {
    title: '所属项目',
    dataIndex: 'proName',
  },
  {
    title: '所属项目组成部分',
    dataIndex: 'itemDesignName',
  },
  {
    title: '所属区域',
    dataIndex: 'districtName',
  },
  {
    title: '类型',
    dataIndex: 'typeName',
  },
  {
    title: '建筑状态',
    dataIndex: 'developStateName',
  },
  {
    title: '重大危险源级别',
    dataIndex: 'riskLevelName',
  },
  {
    title: '建筑结构',
    dataIndex: 'buildStruct',
  },
  {
    title: '火灾危险性类别',
    dataIndex: 'fireRiskClassesName',
  },
  {
    title: '耐火等级',
    dataIndex: 'fireResisRatName',
  },
  {
    title: '模型绑定状态',
    dataIndex: 'bindStateValue',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
];
//应急预案
export const installationFormSchemas: FormSchema[] = [
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
      api: contingencySelectApi,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'grade',
    component: 'ApiSelect',
    label: '预案响应等级',
    componentProps: {
      api: contingencyLevelSelectApi,
      showSearch: true,
      optionFilterProp: 'label',
      resultField: 'data', //后台返回数据字段
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'chemsValue',
    component: 'Input',
    label: '相关危化品',
    componentProps: {
      placeholder: '请输入相关危化品',
    },
  },
  {
    field: 'planNum',
    component: 'Input',
    label: '预案编号',
    componentProps: {
      placeholder: '请输入预案编号',
    },
  },
  // {
  //   field: 'name',
  //   component: 'Input',
  //   label: '预案版本',
  //   componentProps: {
  //     placeholder: '请输入预案版本',
  //   },
  // },
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
    field: 'itemDesign',
    component: 'ApiSelect',
    label: '所属项目组成部分',
    componentProps: {
      api: postDesignSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择所属项目组成部分',
    },
  },
  {
    field: 'district',
    component: 'ApiSelect',
    label: '所属区域',
    componentProps: {
      api: postDistrictSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择所属区域',
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '类型',
    labelWidth: 92,
    componentProps: {
      api: postTypeSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择类型',
    },
  },
  {
    field: 'riskLevel',
    component: 'ApiSelect',
    label: '重大危险源级别',
    componentProps: {
      api: postRiskLevelSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择重大危险源级别',
    },
  },
  {
    field: 'fireRiskClasses',
    component: 'ApiSelect',
    label: '火灾危险性类别',
    componentProps: {
      api: postFireRiskClassesSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择火灾危险性类别',
    },
    labelWidth: 120,
  },
  {
    field: 'fireResisRat',
    component: 'ApiSelect',
    label: '耐火等级',
    componentProps: {
      api: postFireResisRatSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择耐火等级',
    },
    labelWidth: 65,
  },
  {
    field: 'bindState',
    component: 'ApiSelect',
    label: '模型绑定状态',
    componentProps: {
      api: postBindStateApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择模型绑定状态',
    },
  },
];
//应急预案详情
export const meetSchema: DescItem[] = [
  {
    field: 'planNum',
    label: '预案编号',
  },
  {
    field: 'planName',
    label: '预案名称',
  },
  {
    field: 'planTypeValue',
    label: '预案类型',
  },
  {
    field: 'gradeValue',
    label: '预案响应等级',
  },
  {
    field: 'accidentTypeValue',
    label: '适用事件类型',
  },
  {
    field: 'applyDeptName',
    label: '适用部门',
  },
  {
    field: 'chemsValue',
    label: '相关危化品',
  },
  {
    field: 'updateTime',
    label: '更新时间',
    render: (curVal) => {
      return curVal ? curVal : '--';
    },
  },
  {
    field: 'label',
    label: '标签',
  },
  {
    field: 'announcements',
    label: '注意事项',
  },
  {
    field: 'affixes',
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
export const installationSchema: DescItem[] = [
  {
    field: 'name',
    label: '装置设施名称',
  },
  {
    field: 'proName',
    label: '所属项目',
  },

  {
    field: 'itemDesignName',
    label: '所属项目组成部分',
  },
  {
    field: 'districtName',
    label: '所属区域',
  },
  {
    field: 'typeName',
    label: '类型',
  },
  {
    field: 'monitorDirectionValue',
    label: '监测方向',
  },

  {
    field: 'riskLevelName',
    label: '重大危险源级别',
  },
  {
    field: 'position',
    label: '地理位置',
  },
  {
    field: 'developStateName',
    label: '建设状态',
  },
  {
    field: 'floorArea',
    label: '占地面积',
  },
  {
    field: 'coveredArea',
    label: '建筑面积',
  },
  {
    field: 'buildStruct',
    label: '建筑结构',
  },
  {
    field: 'storeyHeight',
    label: '层高',
  },
  {
    field: 'fireRiskClassesName',
    label: '火灾危险性类别',
  },
  {
    field: 'fireResisRatName',
    label: '耐火等级',
  },
  {
    field: 'basicInformat',
    label: '基本信息',
    render: (val) => {
      if (val) {
        return <div v-html={val}></div>;
      }
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
            <div class="flex flex-1 items-center">
              {data.map((item) => {
                return (
                  <div class="pl-4 pr-4">
                    <Image width={100} src={item} />
                  </div>
                );
              })}
            </div>
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
//应急演练报告
export const reportSchema: DescItem[] = [
  {
    field: 'drillName',
    label: '演练名称',
  },
  {
    field: 'planStartTime',
    label: '计划开始时间',
  },
  {
    field: 'actualStartDate',
    label: '实际开始时间',
  },
  {
    field: 'duration',
    label: '计划演练时长',
  },
  {
    field: 'actualDuration',
    label: '实际演练时长',
  },
  {
    field: 'planIdName',
    label: '演练对象',
  },
  {
    field: 'drillAim',
    label: '演练目的',
  },
  {
    field: 'remark',
    label: '备注描述',
  },
  {
    field: 'fileList',
    label: '演练报告',
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
//新建特种设备
export function schemasAdd(dataSource: string): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '设备名称',
      required: true,
      componentProps: {
        placeholder: '请输入设备名称',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'proId',
      component: 'ApiSelect',
      label: '所属项目',
      required: true,
      componentProps: {
        api: postProjectNameSelectApi, //后台路径
        resultField: 'data', //后台返回数据字段
        labelField: 'name', //设置label字段
        valueField: 'id', //设置value字段
        placeholder: '请选择所属项目',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'parentId',
      component: 'ApiSelect',
      label: '所属装置设施',
      required: true,
      componentProps: {
        api: postSelectUnitFacilityApi, //后台路径
        resultField: 'data', //后台返回数据字段
        labelField: 'name', //设置label字段
        valueField: 'id', //设置value字段
        placeholder: '请选择所属装置设施',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'facilityType',
      component: 'ApiSelect',
      label: '设备类型',
      required: true,
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'DEVICE_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        placeholder: '请选择设备类型',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'facilityCode',
      component: 'Input',
      label: '设备编码',
      componentProps: {
        placeholder: '请输入设备编码',
      },
    },
    {
      field: 'useStatus',
      component: 'ApiSelect',
      label: '使用状态',
      required: true,
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'USE_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        placeholder: '选择使用状态',
      },
    },
    {
      field: 'useCardCode',
      component: 'Input',
      label: '特种设备使用证编号',
      componentProps: {
        placeholder: '请输入特种设备使用证编号',
      },
    },
    {
      field: 'manufactureEnterprise',
      component: 'Input',
      label: '制造单位',
      componentProps: {
        placeholder: '请输入制造单位',
      },
    },
    {
      field: 'inspectionResponsibilityEnterprise',
      component: 'Input',
      label: '检验责任所在单位',
      componentProps: {
        placeholder: '请输入检验责任所在单位',
      },
    },
    {
      field: 'detectionNextDate',
      component: 'DatePicker',
      label: '首次检测日期',
      componentProps: {
        placeholder: '请输入首次检测日期',
      },
    },
    {
      field: 'managementPeopleId',
      component: 'ApiSelect',
      label: '管理人员',
      slot: 'personSlot',
    },
    {
      //自动代入
      field: 'managementPeoplePhone',
      component: 'Input',
      label: '管理人员联系方式',
      componentProps: {
        placeholder: '请输入管理人员联系方式',
        disabled: true,
      },
    },

    {
      field: 'facilityQuality',
      component: 'ApiRadioGroup',
      label: '设备性质',
      required: true,
      defaultValue: '0',
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'FACILITY_NATURE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        disabled: dataSource === '1',
      },
    },

    {
      field: 'medium',
      component: 'Input',
      label: '介质',
      required: true,
      componentProps: {
        placeholder: '请输入介质',
        disabled: dataSource === '1',
      },
    },

    {
      field: 'bitNumber',
      component: 'Input',
      label: '位号',
      componentProps: {
        placeholder: '请输入位号',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '1';
      },
    },
    {
      field: 'specifModels',
      component: 'Input',
      label: '设备型号',
      componentProps: {
        placeholder: '请输入设备型号',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'mediumTemp',
      component: 'Input',
      label: '介质温度',
      componentProps: {
        placeholder: '请输入介质温度',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'specifModels',
      component: 'Input',
      label: '规格型号',
      componentProps: {
        placeholder: '请输入规格型号',
        disabled: dataSource === '1',
      },
    },

    {
      field: 'subjectTexture',
      component: 'Input',
      label: '主体材质',
      componentProps: {
        placeholder: '请输入主体材质',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'temperature',
      component: 'Input',
      label: '操作温度（°C）',
      componentProps: {
        placeholder: '请输入操作温度',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '1';
      },
    },

    {
      field: 'pressure',
      component: 'Input',
      label: '操作压力（MPa）',
      componentProps: {
        placeholder: '请输入操作压力',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '1';
      },
    },
    {
      field: 'designTemp',
      component: 'Input',
      label: '设计温度（°C）',
      componentProps: {
        placeholder: '请输入设计温度',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '1';
      },
    },
    {
      field: 'designPres',
      component: 'Input',
      label: '设计压力（MPa）',
      componentProps: {
        placeholder: '请输入设计压力',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '1';
      },
    },
    {
      field: 'temperature',
      component: 'Input',
      label: '设计流量（m³/h）',
      componentProps: {
        placeholder: '请输入设计流量',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'designLift',
      component: 'Input',
      label: '设计扬程（m）',
      componentProps: {
        placeholder: '请输入设计扬程',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'designShaftPower',
      component: 'Input',
      label: '设计轴功率（kw）',
      componentProps: {
        placeholder: '请输入设计轴功率',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'designRevolutions',
      component: 'Input',
      label: '设计转数（rpm）',
      componentProps: {
        placeholder: '请输入设计转数',
        disabled: dataSource === '1',
      },
      ifShow: ({ values }) => {
        return values.facilityQuality === '0';
      },
    },
    {
      field: 'position',
      component: 'Input',
      label: '地理位置',
      componentProps: {
        placeholder: '请输入地理位置',
        disabled: dataSource === '1',
      },

      //选择经纬度
    },
    {
      field: 'positionList',
      label: ' ',
      component: 'ApiSelect',
      slot: 'position',
    },
    {
      field: 'blueprintList',
      component: 'Upload',
      label: '图纸',
      componentProps: {
        maxNumber: 5,
        maxSize: 5,
        accept: '.jpg,.png,.jpeg',
        helpText: '请上传图片',
        disabled: dataSource === '1',
      },
    },
    {
      field: 'basicInformat',
      component: 'Input',
      label: '基本信息',
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          options: { readonly: dataSource === '1' },
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
    {
      field: 'affixList',
      component: 'Upload',
      label: '上传附件',
      componentProps: {
        type: '',
        maxNumber: 10,
        maxSize: 10,
        accept: '.rar,.zip,.docx,.pdf,.jpg',
        helpText: '请上传附件',
        disabled: dataSource === '1',
      },
    },
  ];
}
//新增检测记录
export const testingAdd: FormSchema[] = [
  {
    field: 'deviceName',
    component: 'Input',
    label: '设备名称',
    required: true,
    componentProps: {
      disabled: true,
      placeholder: '请输入设备名称',
    },
  },
  {
    field: 'position',
    component: 'Input',
    label: '地理位置',
    componentProps: {
      disabled: true,
      placeholder: '请输入地理位置',
    },
  },
  {
    field: 'detectionOrgan',
    component: 'Input',
    label: '检测机构',
    required: true,
    componentProps: {
      placeholder: '请输入检测机构',
    },
  },
  {
    field: 'detectionContent',
    component: 'InputTextArea',
    label: '检测内容',
    componentProps: {
      placeholder: '请输入检测内容',
      rows: 4,
    },
  },
  {
    field: 'detectionDate',
    component: 'DatePicker',
    label: '检测时间',
    required: true,
    componentProps: {
      placeholder: '请选择检测时间',
    },
  },
  {
    field: 'certificateCode',
    component: 'Input',
    label: '证书编号',
    componentProps: {
      placeholder: '请输入证书编号',
    },
  },
  {
    field: 'detectionResult',
    component: 'Input',
    label: '检测结论',
    required: true,
    componentProps: {
      placeholder: '请输入检测结论',
    },
  },
  {
    field: 'detectionNextDate',
    component: 'DatePicker',
    label: '下次检测日期',
    required: true,
    componentProps: {
      placeholder: '请选择检测时间',
    },
  },
  {
    field: 'safeAffixList',
    component: 'Upload',
    label: '安全附件',
    componentProps: {
      type: '',
      maxNumber: 5,
      maxSize: 10,
      accept: '.rar,.zip,.docx,.pdf,.jpg',
      helpText: '请上传附件',
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
      rows: 4,
      maxlength: 200,
    },
  },
];
export const tableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件分类',
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
  {
    title: '库存',
    dataIndex: 'inventorySum',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'spareName',
    component: 'Input',
    label: '备件姓名',
    componentProps: {
      placeholder: '请输入备件姓名',
    },
  },
  {
    field: 'status',
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
];
// FailureDetail 故障详情
export const FailureDetail: DescItem[] = [
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
//机械设备表格
export const tabletMechanicaColumns: BasicColumn[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '设备类型',
    dataIndex: 'deviceTypeName',
  },
  {
    title: '设备性质',
    dataIndex: 'deviceNatureName',
  },
  {
    title: '规格型号',
    dataIndex: 'specifModels',
  },
  {
    title: '绑定模型状态',
    dataIndex: 'bindStateName',
  },
];
//机械设备查询
export function formMechanicaSchema(state: string): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'ApiSelect',
      label: '设备名称',
      labelWidth: 92,
      componentProps: {
        placeholder: '请输入设备名称',
        api: state === 'ifMechanics' ? getMechanicalDeviceApi : getSpecialDeviceApi, //后台路径
        resultField: 'data', //后台返回数据字段
        labelField: 'name', //设置label字段
        valueField: 'id', //设置value字段
      },
    },
    {
      field: 'facilityType',
      component: 'ApiSelect',
      label: '设备类型',
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'DEVICE_TYPE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        placeholder: '请选择设备类型',
      },
    },
    {
      field: 'facilityQuality',
      component: 'ApiSelect',
      label: '设备性质',
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'FACILITY_NATURE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        placeholder: '请选择设备性质',
      },
    },
    {
      field: 'bindState',
      component: 'ApiSelect',
      label: '绑定模型状态',
      componentProps: {
        api: getDictionarySelectType, //后台路径
        params: {
          type: 'MODEL_BOUND_STATE',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName', //设置label字段
        valueField: 'itemValue', //设置value字段
        placeholder: '请选择绑定模型状态',
      },
    },
  ];
}
//特种设备台账 tableSpecialColumns, formSpecialSchema
export const tableSpecialColumns: BasicColumn[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '设备类型',
    dataIndex: 'deviceTypeName',
  },
  {
    title: '设备性质',
    dataIndex: 'deviceNatureName',
  },
  {
    title: '规格型号',
    dataIndex: 'specifModels',
  },
  {
    title: '绑定模型状态',
    dataIndex: 'bindStateName',
  },
];
