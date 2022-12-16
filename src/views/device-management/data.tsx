import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { SvgIcon } from '/@/components/Icon';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce';
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

//新建特种设备
export const schemasAdd: FormSchema[] = [
  {
    field: 'dutyTypeId',
    component: 'Input',
    label: '设备名称',
    required: true,
    componentProps: {
      placeholder: '请输入设备名称',
    },
  },
  {
    field: 'dutyPersonId',
    component: 'ApiSelect',
    label: '所属项目',
    required: true,
    componentProps: {
      placeholder: '请选择所属项目',
    },
  },
  {
    field: 'checkDate',
    component: 'ApiSelect',
    label: '所属装置设施',
    componentProps: {
      placeholder: '请选择所属装置设施',
    },
  },
  {
    field: 'checkDate',
    component: 'ApiSelect',
    label: '设备类型',
    required: true,
    componentProps: {
      placeholder: '请选择设备类型',
    },
  },
  {
    field: 'disclosure',
    component: 'RadioGroup',
    label: '设备性质',
    required: true,
    componentProps: {
      options: [
        {
          label: '动设备',
          value: '1',
        },
        {
          label: '静设备',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'checkPersonId',
    component: 'Input',
    label: '设备编码',
    componentProps: {
      placeholder: '请输入设备编码',
    },
  },
  {
    field: 'checkPersonPost',
    component: 'ApiSelect',
    label: '使用状态',
    required: true,
    componentProps: {
      placeholder: '选择使用状态',
    },
  },
  {
    field: 'checkPersonPhone',
    component: 'Input',
    label: '设备注册代码',
    componentProps: {
      placeholder: '请输入设备注册代码',
    },
  },
  {
    field: 'checkPersonPhone',
    component: 'Input',
    label: '使用证编号',
    componentProps: {
      placeholder: '请输入使用证编号',
    },
  },
  {
    field: 'checkPersonPhone',
    component: 'Input',
    label: '制造单位',
    componentProps: {
      placeholder: '请输入制造单位',
    },
  },
  {
    field: 'checkPersonPhone',
    component: 'Input',
    label: '检验责任所在单位',
    componentProps: {
      placeholder: '请输入检验责任所在单位',
    },
  },
  {
    field: 'checkDate',
    component: 'ApiSelect',
    label: '管理人员',
    componentProps: {
      placeholder: '请选择管理人员',
    },
  },
  {
    //自动代入
    field: 'checkPersonPhone',
    component: 'Input',
    label: '管理人员联系方式',
    componentProps: {
      placeholder: '请输入管理人员联系方式',
    },
  },
  {
    field: 'contentAndMode',
    component: 'Input',
    label: '介质',
    required: true,
    componentProps: {
      placeholder: '请输入介质',
    },
  },

  {
    field: 'conditionDescribe',
    component: 'Input',
    label: '位号',
    componentProps: {
      placeholder: '请输入位号',
    },
  },

  {
    field: 'problem',
    component: 'Input',
    label: '规格型号',
    componentProps: {
      placeholder: '请输入规格型号',
    },
  },

  {
    field: 'result',
    component: 'Input',
    label: '主体材质',
    componentProps: {
      placeholder: '请输入主体材质',
    },
  },
  {
    field: 'result',
    component: 'Input',
    label: '操作温度（°C）',
    componentProps: {
      placeholder: '请输入操作温度',
    },
  },
  {
    field: 'result',
    component: 'Input',
    label: '操作压力（MPa）',
    componentProps: {
      placeholder: '请输入操作压力',
    },
  },
  {
    field: 'result',
    component: 'Input',
    label: '设计温度（°C）',
    componentProps: {
      placeholder: '请输入设计温度',
    },
  },
  {
    field: 'result',
    component: 'Input',
    label: '设计压力（MPa）',
    componentProps: {
      placeholder: '请输入设计压力',
    },
  },
  {
    field: 'result',
    component: 'Input',
    label: '地理位置',
    componentProps: {
      placeholder: '请输入地理位置',
    },

    //选择经纬度
  },
  {
    field: 'warehouseId',
    label: ' ',
    component: 'ApiSelect',
    slot: 'position',

    // componentProps: {
    //   placeholder: '请选择存放位置',
    //   api: getWareHouseListApi,
    //   resultField: 'records',
    //   labelField: 'name',
    //   valueField: 'id',
    // },
  },
  {
    field: 'attachment',
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
    field: 'securityPermis',
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
    field: 'attachment',
    component: 'Upload',
    label: '上传附件',
    required: true,
    componentProps: {
      type: '',
      maxNumber: 5,
      maxSize: 5,
      accept: '.jpg,.png,.jpeg',
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
    dataIndex: 'name',
  },
  {
    title: '备件分类',
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
    title: '库存',
    dataIndex: 'status',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'status',
    component: 'ApiSelect',
    label: '备件分类',
    componentProps: {
      placeholder: '请选择备件分类',
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '备件姓名',
    componentProps: {
      placeholder: '请输入备件姓名',
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
