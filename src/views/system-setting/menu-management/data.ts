import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { menuListApi } from '/@/api/sys/systemSetting/menuManagement';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      if (record.icon) {
        return h(Icon, { icon: record.icon });
      }
    },
  },
  {
    title: '菜单类型',
    width: 80,
    dataIndex: 'menuType',
    customRender: ({ record }) => {
      const { menuType } = record;
      return {
        M: '主菜单',
        C: '子菜单',
        F: '按钮权限',
      }[menuType];
    },
  },
  {
    title: '排序',
    width: 50,
    dataIndex: 'sortNo',
  },
  {
    title: '菜单路径',
    align: 'left',
    dataIndex: 'path',
  },
  {
    title: '权限标识',
    align: 'left',
    dataIndex: 'perms',
  },
  {
    title: '启用标识',
    width: 80,
    dataIndex: 'enabled',
    customRender: ({ record }) => {
      const { enabled } = record;
      const color = enabled === 1 ? 'green' : 'red';
      const text = enabled === 1 ? '启用' : '禁用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '更新时间',
    width: 180,
    dataIndex: 'updateTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'templateName',
    label: '模板名称',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入模板名称',
    },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'M',
    componentProps: {
      options: [
        { label: '主菜单', value: 'M' },
        { label: '子菜单', value: 'C' },
        { label: '按钮权限', value: 'F' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    subLabel: '(title)',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    ifShow: ({ values }) => {
      return values.menuType !== 'M';
    },
    required: true,
    componentProps: {
      api: menuListApi,
      placeholder: '请选择上级菜单',
      fieldNames: {
        numberToString: true,
        value: 'menuId',
        key: 'menuId',
        label: 'name',
        children: 'children',
      },
    },
  },
  {
    field: 'icon',
    label: '菜单图标',
    subLabel: '(icon)',
    component: 'IconPicker',
    required: true,
    componentProps: {
      placeholder: '请输入',
    },
    ifShow: ({ values }) => {
      return values.menuType === 'M';
    },
  },
  {
    field: 'path',
    label: '路由地址',
    subLabel: '(path)',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'code',
    label: '组件名称',
    subLabel: '(name)',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'component',
    label: '组件路径',
    subLabel: '(component)',
    required: true,
    component: 'Input',
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'redirect',
    label: '重定向地址',
    subLabel: '(redirect)',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
      return values.menuType === 'M';
    },
  },
  {
    field: 'sortNo',
    label: '排序',
    subLabel: '(orderNo)',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'dynamicLevel',
    label: '动态可打开tab数量',
    subLabel: '(dynamicLevel)',
    component: 'InputNumber',
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'realPath',
    label: '实际Path',
    subLabel: '(realPath)',
    component: 'Input',
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'frameSrc',
    label: '内嵌地址',
    subLabel: '(frameSrc)',
    component: 'Input',
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'currentActiveMenu',
    label: '高亮地址',
    subLabel: '(currentActiveMenu)',
    component: 'Input',
    ifShow: ({ values }) => {
      return values.menuType === 'C';
    },
  },
  {
    field: 'name',
    label: '按钮名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入按钮名称',
    },
    ifShow: ({ values }) => {
      return values.menuType === 'F';
    },
  },

  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入权限标识',
    },
    ifShow: ({ values }) => {
      return values.menuType === 'F';
    },
  },
  {
    field: 'enabled',
    label: '启用/禁用',
    subLabel: '(enabled)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'affix',
    label: '是否固定标签',
    subLabel: '(affix)',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'carryParam',
    label: '是否携带参数',
    subLabel: '(carryParam)',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'ignoreRoute',
    label: '是否忽略路由',
    subLabel: '(ignoreRoute)',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'hidePathForChildren',
    label: '是否忽略本级Path',
    subLabel: '(hidePathForChildren)',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'keepAlive',
    label: '是否忽略缓存',
    subLabel: '(ignoreKeepAlive)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'hideBreadcrumb',
    label: '在面包屑隐藏',
    subLabel: '(hideBreadcrumb)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },

  {
    field: 'hideChildrenInMenu',
    label: '隐藏所有子菜单',
    subLabel: '(hideChildrenInMenu)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'hideTab',
    label: '隐藏标签页显示',
    subLabel: '(hideTab)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
  {
    field: 'hidden',
    label: '隐藏菜单显示',
    subLabel: '(hideMenu)',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
    ifShow: ({ values }) => {
      return values.menuType !== 'F';
    },
  },
];
