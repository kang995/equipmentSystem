import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';

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
