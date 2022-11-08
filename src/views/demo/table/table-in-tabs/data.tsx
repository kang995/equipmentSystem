import CoalSeam from './coal-seam/index.vue';
import Rock from './rock/index.vue';
import WorkingFace from './working-face/index.vue';
import Roadway from './roadway/index.vue';
import GroundBuildings from './ground-buildings/index.vue';
import { FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';

export interface TabItem {
  key: string;
  name: string;
  component: any;
}

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '煤层',
    component: CoalSeam,
  },
  {
    key: '2',
    name: '岩层',
    component: Rock,
  },
  {
    key: '3',
    name: '工作面',
    component: WorkingFace,
  },
  {
    key: '4',
    name: '巷道',
    component: Roadway,
  },
  {
    key: '5',
    name: '地面建筑',
    component: GroundBuildings,
  },
];

export function coalSeamColumns(): BasicColumn[] {
  return [
    {
      title: '煤层名称',
      dataIndex: 'name',
    },
    {
      title: '平均厚度',
      dataIndex: 'height',
    },
    {
      title: '最小厚度',
      dataIndex: 'min',
    },
    {
      title: '最大厚度',
      dataIndex: 'max',
    },
    {
      title: '单项抗压强度',
      dataIndex: 'max',
    },
    {
      title: '单项抗拉程度',
      dataIndex: 'max',
    },
    {
      title: '分层厚度',
      dataIndex: 'max',
    },
  ];
}

export function coalSeamFormConfig(): Partial<FormProps> {
  return {
    rowProps: {
      gutter: 16,
    },
    baseColProps: {
      span: 6,
    },
    schemas: [
      {
        field: 'name',
        component: 'Input',
        label: '煤层名称',
        defaultValue: '',
        componentProps: {
          placeholder: '请输入煤层名称',
        },
      },
    ],
  };
}
