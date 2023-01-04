import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { SvgIcon } from '/@/components/Icon';
import { Image, Row } from 'ant-design-vue';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce';
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
  postRiskLevelSelectApi,
  postTypeSelectApi,
} from '/@/api/device-management/installation';
import { postSelectUnitFacilityApi } from '/@/api/device-management/special-equipment';

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
    labelWidth: 92,
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
export const installationSchema: DescItem[] = [
  {
    field: 'name',
    label: '装置名称',
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
    label: '建筑状态',
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
    label: '耐火级别',
  },
  {
    field: 'basicInformat',
    label: '基本信息',
    span: 4,
    render: (val: string) => {
      return <div style="overflow: auto; max-height: 200px" v-html={val}></div>;
    },
  },
  {
    field: 'pictureList',
    label: '图纸',
    span: 4,
    render: (data) => {
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            {data.map((item) => {
              return <Image width={100} src={item} />;
            })}
          </ARow>
        );
      }
    },
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

//新建特种设备
export const schemasAdd: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '设备名称',
    required: true,
    componentProps: {
      placeholder: '请输入设备名称',
    },
  },
  {
    field: 'proId',
    component: 'ApiSelect',
    label: '所属项目',
    required: true,
    componentProps: {
      api: postDesignSelectApi, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择所属项目',
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
    },
  },
  {
    field: 'facilityCode',
    component: 'Input',
    label: '设备编码',
    componentProps: {
      placeholder: '请输入设备编码',
    },
    ifShow: ({ values }) => {
      console.log('data: ', values);
      return true;
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
    field: 'facilityRegistratCode',
    component: 'Input',
    label: '设备注册代码',
    componentProps: {
      placeholder: '请输入设备注册代码',
    },
  },
  {
    field: 'useCardCode',
    component: 'Input',
    label: '使用证编号',
    componentProps: {
      placeholder: '请输入使用证编号',
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
    field: 'managementPeopleId',
    component: 'ApiSelect',
    label: '管理人员',
    slot: 'personSlot',
  },
  {
    //自动代入
    field: 'phone',
    component: 'Input',
    label: '管理人员联系方式',
    componentProps: {
      placeholder: '请输入管理人员联系方式',
      disabled: true,
    },
  },
  {
    field: 'medium',
    component: 'Input',
    label: '介质',
    required: true,
    componentProps: {
      placeholder: '请输入介质',
    },
  },

  {
    field: 'bitNumber',
    component: 'Input',
    label: '位号',
    componentProps: {
      placeholder: '请输入位号',
    },
  },

  {
    field: 'specifModels',
    component: 'Input',
    label: '规格型号',
    componentProps: {
      placeholder: '请输入规格型号',
    },
  },

  {
    field: 'subjectTexture',
    component: 'Input',
    label: '主体材质',
    componentProps: {
      placeholder: '请输入主体材质',
    },
  },
  {
    field: 'temperature',
    component: 'Input',
    label: '操作温度（°C）',
    componentProps: {
      placeholder: '请输入操作温度',
    },
  },
  {
    field: 'pressure',
    component: 'Input',
    label: '操作压力（MPa）',
    componentProps: {
      placeholder: '请输入操作压力',
    },
  },
  {
    field: 'designTemp',
    component: 'Input',
    label: '设计温度（°C）',
    componentProps: {
      placeholder: '请输入设计温度',
    },
  },
  {
    field: 'designPres',
    component: 'Input',
    label: '设计压力（MPa）',
    componentProps: {
      placeholder: '请输入设计压力',
    },
  },
  {
    field: 'position',
    component: 'Input',
    label: '地理位置',
    componentProps: {
      placeholder: '请输入地理位置',
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
      type: '',
      maxNumber: 5,
      maxSize: 5,
      accept: '.jpg,.png,.jpeg',
      helpText: '请上传图片',
    },
  },
  {
    field: 'basicInformat',
    component: 'Input',
    label: '基本信息',
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
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
    required: true,
    componentProps: {
      type: '',
      maxNumber: 5,
      maxSize: 5,
      accept: '.rar,.zip,.docx,.pdf,.jpg',
      helpText: '请上传附件',
    },
  },
];
//新增检测记录
export const testingAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'Input',
    label: '设备名称',
    required: true,
    componentProps: {
      disabled: true,
      placeholder: '请输入设备名称',
    },
  },
  {
    field: 'dutyPersonId',
    component: 'Input',
    label: '地理位置',
    required: true,
    componentProps: {
      disabled: true,
      placeholder: '请输入地理位置',
    },
  },
  {
    field: 'problem',
    component: 'Input',
    label: '检测机构',
    required: true,
    componentProps: {
      placeholder: '请输入检测机构',
    },
  },
  {
    field: 'problem',
    component: 'InputTextArea',
    label: '检测内容',
    componentProps: {
      placeholder: '请输入检测内容',
      rows: 4,
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '检测时间',
    required: true,
    componentProps: {
      placeholder: '请选择检测时间',
    },
  },
  {
    field: 'checkDate',
    component: 'Input',
    label: '证书编号',
    componentProps: {
      placeholder: '请输入证书编号',
    },
  },
  {
    field: 'checkDate',
    component: 'Input',
    label: '检测结论',
    required: true,
    componentProps: {
      placeholder: '请输入检测结论',
    },
  },
  {
    field: 'status',
    component: 'DatePicker',
    label: '下次检测日期',
    required: true,
    componentProps: {
      placeholder: '请选择检测时间',
    },
  },
  {
    field: 'attachment',
    component: 'Upload',
    label: '安全附件',
    componentProps: {
      type: '',
      maxNumber: 5,
      maxSize: 5,
      accept: '.jpg,.png,.jpeg',
      helpText: '请上传附件',
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
export const tableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件分类',
    dataIndex: 'spareClassify',
  },
  {
    title: '规格型号',
    dataIndex: 'specification',
  },
  {
    title: '单位',
    dataIndex: 'measureUnit',
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
