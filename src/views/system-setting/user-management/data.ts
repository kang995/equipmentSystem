import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
//import { getGroupListApi } from '/@/api/systemSetting/userManagement';
import { DescItem } from '/@/components/Description/index';
//import { useMessage } from '/@/hooks/web/useMessage';
//import { getInvokeUserAddApi } from '/@/api/systemSetting/userManagement';
////import { h } from 'vue';
//import { Switch } from 'ant-design-vue';
//const { createMessage } = useMessage();

export const personSchema: DescItem[] = [
  {
    field: 'userName',
    label: '登陆账号',
  },
  {
    field: 'nickName',
    label: '姓名',
  },
  {
    field: 'department',
    label: '部门',
  },
  {
    field: 'userGroup',
    label: '所属用户组',
  },

  {
    field: 'createTime',
    label: '创建时间',
  },
  {
    field: 'statusName',
    label: '状态',
  },
];

export const schemasForm: FormSchema[] = [
  {
    field: 'nickName',
    label: '用户名',
    component: 'Input',
    required: true,
  },
];

// 列表表格
export const getBasicColumns: BasicColumn[] = [
  {
    title: '登陆账号',
    dataIndex: 'userName',
  },
  {
    title: '姓名',
    dataIndex: 'nickName',
  },
  // {
  //   title: '部门',
  //   dataIndex: 'department',
  // },
  {
    title: '所属用户组',
    dataIndex: 'userGroup',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '是否是管理员',
    dataIndex: 'roleFlag',
    customRender: ({ value }) => {
      return value === '0' ? '是' : '否';
    },
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   customRender: ({ record }) => {
  //     if (record.roleFlag === '0') {
  //       return '';
  //     }
  //     if (record.status === '2') {
  //       return '异常';
  //     } else {
  //       return h(Switch, {
  //         checked: record.status === '0',
  //         checkedChildren: '启用',
  //         unCheckedChildren: '禁用',
  //         onChange(checked: boolean) {
  //           const newStatus = checked ? '0' : '1';
  //           record.status = newStatus;
  //           const ids = [record.userId];
  //           getInvokeUserAddApi({ ids, status: newStatus }).then(() => {});
  //           newStatus == '0'
  //             ? createMessage.success('启用成功')
  //             : createMessage.success('禁用成功');
  //         },
  //       });
  //     }
  //   },
  // },
];

//列表表单
export function getFormConfig(): Partial<FormProps> {
  return {
    autoSubmitOnEnter: true,
    baseColProps: {
      span: 6,
    },
    rowProps: {
      gutter: 16,
    },
    resetButtonOptions: {
      preIcon: 'gonggong_zhongzhi|svg',
    },
    submitButtonOptions: {
      preIcon: 'gonggong_sousuo|svg',
    },
    schemas: [
      {
        field: `userName`,
        label: `登陆账号`,
        component: 'Input',
        componentProps: {
          placeholder: '请输入登陆账号',
        },
      },
      {
        field: `nickName`,
        label: `姓名`,
        component: 'Input',
        componentProps: {
          placeholder: '请输入姓名',
        },
      },
    ],
  };
}

export const schemaEdit = [
  {
    field: 'areaa',
    label: `所属企业`,
    component: 'Select',
  },
  {
    field: 'areqa',
    label: '用户选择',
    component: 'Select',
  },
];
// 用户组列表表格
export const basicColumns: BasicColumn[] = [
  {
    title: '用户组名称',
    dataIndex: 'name',
  },
  {
    title: '用户数量',
    dataIndex: 'peopleNum',
  },
];
