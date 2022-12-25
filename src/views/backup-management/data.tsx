import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import DescItemTable from './inventory/DescItemTable.vue';
import { Row, Image } from 'ant-design-vue';
import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';
import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
import { posWarehouseSpareApi } from '/@/api/backup-management/backup-details';
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
export const columnsTable: BasicColumn[] = [
  {
    title: '仓库',
    dataIndex: 'warehouseId',
    slots: { customRender: 'WarehouseSlot' },
  },

  {
    title: '数量',
    dataIndex: 'spareNum',
    slots: { customRender: 'NumSlot' },
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
    field: 'principalPeopleName',
    label: '负责人',
  },
  {
    field: 'principalPhone',
    label: '电话',
  },
  {
    field: 'warehouseSite',
    label: '仓库位置',
  },

  {
    field: 'remark',
    label: '备注',
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
//库存详情列表
export const detailsListColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '编号',
    dataIndex: 'spareCode',
  },
  {
    title: '备件分类',
    dataIndex: 'spareClassify',
  },
  {
    title: '数量',
    dataIndex: 'number',
  },
];
export const backupColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件分类',
    dataIndex: 'spareClassify',
  },
  {
    title: '库存下限',
    dataIndex: 'storageLow',
  },
  {
    title: '库存上限',
    dataIndex: 'storageHigh',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
  },
];
//备件台账详情- 关联设备
export const devicesColumns: BasicColumn[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '设备类型',
    dataIndex: 'facilityType',
  },
  {
    title: '是否特种设备',
    dataIndex: 'specialEquipment',
  },
];
//备件台账详情-基本信息
export const informationDescItem: DescItem[] = [
  {
    label: '备件照片',
    field: 'spareImgList',
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
    label: '备件名称',
    field: 'spareName',
  },
  {
    label: '计量单位',
    field: 'measureUnit',
    //计量单位：0个，1件，2台，3组，4套
    render: (data) => {
      if (data) {
        return data === 0 ? '个' : data === 1 ? '件' : data === 2 ? '台' : data === 3 ? '组' : '套';
      }
    },
  },
  {
    label: '规格',
    field: 'specification',
  },
  {
    label: '最低存储额',
    field: 'storageLow',
  },
  {
    label: '最高存储额',
    field: 'storageHigh',
  },
  {
    label: '备件分类',
    field: 'spareClassify',
    //0易损备件，1事故备件，2常用备件，3大修备件
    render: (data) => {
      if (data) {
        return data === 0
          ? '易损备件'
          : data === 1
          ? '事故备件'
          : data === 2
          ? '常用备件'
          : '大修备件';
      }
    },
  },
  {
    label: '生产厂商',
    field: 'manufacturer',
  },
  {
    label: '参考价',
    field: 'referencePrice',
  },
  {
    label: '更换周期',
    field: 'replacementPeriod',
  },
];
//备件台账详情-库存
export const stockColumns: BasicColumn[] = [
  {
    title: '所在地点',
    dataIndex: 'name',
  },
  {
    title: '备件数量',
    dataIndex: 'spareNum',
  },
];
//备件台账详情-出入库明细
export const detailedColumns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'receiptType',
  },
  {
    title: '关联单号',
    dataIndex: 'receiptCode',
  },
  {
    title: '仓库',
    dataIndex: 'warehouseName',
  },
  {
    title: '入库数量',
    dataIndex: 'person',
  },
  {
    title: '出库数量',
    dataIndex: 'person',
  },
];
export const backupFormSchema: FormSchema[] = [
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
];
// 出入库
export const columnsWarehousing: BasicColumn[] = [
  {
    title: '入库单号',
    dataIndex: 'receiptCode',
  },
  {
    title: '入库类型',
    dataIndex: 'inOutType',
  },
  {
    title: '入库仓库',
    dataIndex: 'warehouseName',
  },
  {
    title: '入库时间',
    dataIndex: 'inOutTime',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '经手人',
    dataIndex: 'peopleName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '入库单状态',
    dataIndex: 'receiptStatus',
    //（0：正常；1：作废）
    customRender: ({ text }) => {
      console.log('text: ', text);
      return text === 0 ? '正常' : '作废';
    },
  },
];
export const columnsIssue: BasicColumn[] = [
  {
    title: '出库单号',
    dataIndex: 'receiptCode',
  },
  {
    title: '出库类型',
    dataIndex: 'inOutType',
  },
  {
    title: '出库仓库',
    dataIndex: 'warehouseName',
  },
  {
    title: '出库时间',
    dataIndex: 'inOutTime',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '经手人',
    dataIndex: 'peopleName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '入库单状态',
    dataIndex: 'receiptStatus',
    //（0：正常；1：作废）
  },
];
//出库
export const formSchemaIssue: FormSchema[] = [
  {
    field: 'receiptCode',
    component: 'Input',
    label: '出库单号',
    componentProps: {
      placeholder: '请输入出库单号',
    },
  },
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '出库类型',
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'OUT_WAREHOUSE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择出库类型',
    },
  },
  {
    field: 'inOutTime',
    component: 'DatePicker',
    label: '出库时间',
    componentProps: {
      placeholder: '请选择出库时间',
    },
  },
];
//入库
export const formSchemaWarehousing: FormSchema[] = [
  {
    field: 'receiptCode',
    component: 'Input',
    label: '入库单号',
    componentProps: {
      placeholder: '请输入入库单号',
    },
  },
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '入库类型',
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'IN_WAREHOUSE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择入库类型',
    },
  },
  {
    field: 'inOutTime',
    component: 'DatePicker',
    label: '入库时间',
    componentProps: {
      placeholder: '请选择入库时间',
    },
  },
];

//备件新增
export const sparePartAdd: FormSchema[] = [
  {
    field: 'spareImgList',
    component: 'Upload',
    label: '备件图片',
    colProps: {},
    required: true,
    componentProps: {
      maxNumber: 5,
      accept: '.jpg,.jpeg,.png',
      maxSize: 5,
      helpText: '请上传图片',
    },
  },
  {
    field: 'spareName',
    component: 'Input',
    label: '备件名称',
    required: true,
    componentProps: {
      //OUT_WAREHOUSE_TYPE
      //
      placeholder: '请输入备件名称',
    },
  },
  {
    field: 'spareClassify',
    component: 'ApiSelect',
    label: '备件分类',
    required: true,
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
    field: 'measureUnit',
    component: 'ApiSelect',
    label: '计量单位',
    required: true,
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'MEASURE_UNIT',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择计量单位',
    },
  },
  {
    field: 'specification',
    component: 'Input',
    label: '规格',
    required: true,
    componentProps: {
      placeholder: '请输入规格',
    },
  },
  {
    field: 'storageLow',
    component: 'Input',
    label: '最低存储额',
    required: true,
    componentProps: {
      placeholder: '请输入最低存储额',
    },
  },
  {
    field: 'storageHigh',
    component: 'Input',
    label: '最高存储额',
    required: true,
    componentProps: {
      placeholder: '请输入最高存储额',
    },
  },
  {
    field: 'manufacturer',
    component: 'Input',
    label: '生产厂商',
    required: true,
    componentProps: {
      placeholder: '请输入生产厂商',
    },
  },
  {
    field: 'referencePrice',
    component: 'Input',
    label: '参考价',
    required: true,
    componentProps: {
      placeholder: '请输入参考价',
    },
  },
  {
    field: 'replacementPeriod',
    label: '更换周期',
    component: 'Input',
    required: true,
    slot: 'combination1',
  },
  {
    field: 'replacementPeriodUnit',
    label: '',
    component: 'Input',
    required: true,
    defaultValue: '1',
    show: false,
  },
  {
    //物品清单
    //选择仓库后带出来的数据
    field: 'warehouseSpareAddVOList',
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
//新增出库
export const inboundAdd: FormSchema[] = [
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '出库类型',
    required: true,
    // IN_WAREHOUSE_TYPE
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'OUT_WAREHOUSE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择出库类型',
    },
  },
  {
    field: 'inOutTime',
    component: 'DatePicker',
    label: '出库时间出库出库',
    required: true,
    componentProps: {
      placeholder: '请选择出库时间',
    },
  },
  {
    field: 'userId',
    component: 'ApiSelect',
    label: '经手人',
    required: true,
    slot: 'userSlot',
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
//新增入库
export const OutboundAdd: FormSchema[] = [
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '入库类型',
    required: true,
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'IN_WAREHOUSE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择入库类型',
    },
  },
  {
    field: 'inOutTime',
    component: 'DatePicker',
    label: '入库时间入库',
    required: true,
    componentProps: {
      placeholder: '请选择入库时间',
    },
  },
  {
    field: 'userId',
    component: 'ApiSelect',
    label: '经手人', //可多选
    required: true,
    slot: 'userSlot',
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
//新增物品清单表格 AddTable
export const AddTable: BasicColumn[] = [
  {
    title: '备件编码',
    dataIndex: 'spareCode',
  },
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件类型',
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
    title: '出库仓库',
    dataIndex: 'warehouseId',
    slots: { customRender: 'warehouseIdSlot' },
  },
  {
    title: '使用数量',
    dataIndex: 'numberInput',
    slots: { customRender: 'inputSlot' },
  },
];

//出库详情
export const inboundDescItem: DescItem[] = [
  {
    field: 'receiptCode',
    label: '出库单号',
  },
  {
    field: 'createTime',
    label: '创建时间',
  },
  {
    field: 'receiptStatus',
    label: '出库单状态',
    render: (data) => {
      return data === 0 ? '正常' : '作废';
    },
  },
  {
    field: 'inOutType',
    label: '出库类型',
  },
  {
    field: 'peopleName',
    label: '经手人',
  },
  {
    field: 'warehouseName',
    label: '出手仓库',
  },
  {
    field: 'inOutTime',
    label: '出库时间',
  },
  {
    field: 'remark',
    label: '备注',
  },
  {
    field: 'spareList',
    label: '物品清单',
    render: (data) => {
      if (data) {
        return <DescItemTable dataSource={data} columns={inboundTableColumns} ifAction={true} />;
      }
    },
  },
];
//入库详情 OutboundDescItem
export const OutboundDescItem: DescItem[] = [
  {
    field: 'createBy',
    label: '创建人',
  },
  {
    field: 'receiptCode',
    label: '入库单号',
  },
  {
    field: 'riskLevelName',
    label: '创建时间',
  },
  {
    field: 'receiptStatus',
    label: '入库单状态',
    render: (data) => {
      return data === 0 ? '正常' : '作废';
    },
  },
  {
    field: 'inOutType',
    label: '入库类型',
  },
  {
    field: 'peopleName',
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
    field: 'spareList',
    label: '物品清单',
    render: (data) => {
      if (data) {
        return <DescItemTable dataSource={data} columns={inboundTableColumns} ifAction={true} />;
      }
    },
  },
];
//库存详情模块
// 新建
//新增检测记录
export const schemasAdd: FormSchema[] = [
  {
    field: 'warehouseName',
    component: 'Input',
    label: '仓库名称',
    required: true,
    componentProps: {
      placeholder: '请输入仓库名称',
    },
  },

  {
    field: 'principalPeopleId',
    component: 'ApiSelect',
    label: '负责人',
    required: true,
    slot: 'personSlot',
  },
  {
    field: 'principalPhone',
    component: 'Input',
    label: '负责人电话',
    required: true,
    componentProps: {
      placeholder: '请输入负责人电话',
    },
  },
  {
    field: 'warehouseSite',
    component: 'Input',
    label: '仓库位置',
    required: true,
    componentProps: {
      placeholder: '请输入仓库位置',
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
//盘点
export const inventoryColumns: BasicColumn[] = [
  {
    title: '盘点单编号',
    dataIndex: 'stockCode',
  },
  {
    title: '盘点单名称',
    dataIndex: 'stockName',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '状态',
    dataIndex: 'stockStatus',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const inventoryFormSchema: FormSchema[] = [
  {
    field: 'stockCode',
    component: 'Input',
    label: '盘点单编号',
    componentProps: {
      placeholder: '请输入盘点单编号',
    },
  },
  {
    field: 'stockName',
    component: 'Input',
    label: '盘点单名称',
    componentProps: {
      placeholder: '请输入盘点单名称',
    },
  },
  {
    field: 'stockStatus',
    component: 'ApiSelect',
    label: '状态',
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'STOCK_STATUS',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择状态',
    },
  },
];
//新建盘点 schemasInventoryAdd
export const schemasInventoryAdd: FormSchema[] = [
  {
    field: 'stockName',
    component: 'Input',
    label: '盘点名称',
    required: true,
    componentProps: {
      placeholder: '请输入盘点名称',
    },
  },

  {
    field: 'deadlineTime',
    component: 'DatePicker',
    label: '截止时间',
    required: true,
    componentProps: {
      placeholder: '请选择截止时间',
    },
  },
  {
    field: 'executor',
    component: 'ApiSelect',
    label: '执行人',
    required: true,
    componentProps: {
      api: getPeopleSelect, //后台路径
      resultField: 'data', //后台返回数据字段
      labelField: 'name', //设置label字段
      valueField: 'id', //设置value字段
      placeholder: '请选择执行人',
    },
  },
  {
    field: 'warehouseIdList',
    component: 'ApiSelect',
    label: '选择仓库',
    required: true,
    slot: 'warehouseIdListSlot',
    componentProps: {
      api: posWarehouseSpareApi, //后台路径
      resultField: 'records', //后台返回数据字段
      labelField: 'warehouseName', //设置label字段
      valueField: 'warehouseId', //设置value字段
      placeholder: '请选择仓库',
    },
  },
  {
    //选择仓库后带出来的数据
    field: 'warehouseIdList',
    component: 'ApiSelect',
    label: '物品清单',
    // required: true,
    slot: 'tableSlot',
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
//新建的物品清单 tableAddColumns
export const tableAddColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件类型',
    dataIndex: 'spareClassify',
  },
  {
    title: '规格型号',
    dataIndex: 'specification',
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

//出库详情
export const inventoryDescItem: DescItem[] = [
  {
    field: 'stockCode',
    label: '盘点单编号',
  },
  {
    field: 'stockStatus',
    label: '盘点单状态',
    render: (data) => {
      if (data) {
        return data === 0 ? '未下发' : data === 1 ? '进行中' : data === 2 ? '已完成' : '已作废'; //0未下发,1进行中,2已完成,3已作废
      }
    },
  },
  {
    field: 'stockName',
    label: '盘点名称',
  },

  {
    field: 'createTime',
    label: '创建时间',
  },
  {
    field: 'hazardTypeText6',
    label: '截止时间',
  },
  {
    field: 'executorName',
    label: '执行人',
  },
  {
    field: 'completeTime',
    label: '完成时间',
  },
  {
    field: 'warehouseName',
    label: '盘点仓库',
  },
  {
    field: 'spareList',
    label: '物品清单',
    render: (data) => {
      if (data) {
        return <DescItemTable dataSource={data} columns={inventoryTableColumns} />;
      }
    },
  },
  {
    field: 'remark',
    label: '备注',
  },
];
//inbound
//出库详情物品清单
const inboundTableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件类型',
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
    title: '使用数量',
    dataIndex: 'number',
  },
];
//盘点详情物品清单
const inventoryTableColumns: BasicColumn[] = [
  {
    title: '备件名称',
    dataIndex: 'spareName',
  },
  {
    title: '备件类型',
    dataIndex: 'spareClassify',
  },
  {
    title: '规格型号',
    dataIndex: 'specification',
  },
  {
    title: '所在仓库',
    dataIndex: 'warehouseName',
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
