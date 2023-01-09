import { BasicColumn, FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import { getDictionarySelectTypeApi, getPersonSelectApi } from '/@/api/device-maintenance/index';
//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '保养计划编号',
      dataIndex: 'code',
    },
    {
      title: '保养计划名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '计划时间',
      dataIndex: 'planDateStr',
    },
    {
      title: '计划状态',
      dataIndex: 'planStatus',
      customRender: ({ record }) => {
        return <span>{record.planStatusText}</span>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'approvalStatus',
      customRender: ({ record }) => {
        if (record.approvalStatus === '1') {
          //待提交
          return <Tag color={'default'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '2') {
          //审核中
          return <Tag color={'orange'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '3') {
          //审核通过
          return <Tag color={'green'}>{record.approvalStatusText}</Tag>;
        } else if (record.approvalStatus === '4') {
          //审核拒绝
          return <Tag color={'red'}>{record.approvalStatusText}</Tag>;
        }
      },
    },
  ];
}
export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '设备保养编号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入设备保养编号',
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '保养计划名称',
      componentProps: {
        placeholder: '请选择保养计划名称',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '负责人',
      componentProps: {
        placeholder: '请选择负责人',
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
      field: 'planStatus',
      component: 'ApiSelect',
      label: '计划状态',
      componentProps: {
        placeholder: '请选择计划状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'PLAN_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'approvalStatus',
      component: 'ApiSelect',
      label: '审核状态',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择审核状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
  ];
}
