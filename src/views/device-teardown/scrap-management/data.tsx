import { BasicColumn, FormSchema } from '/@/components/Table';
import {
  getDepartmentSelectApi,
  getDictionarySelectTypeApi,
  getPeopleSelectApi,
  getPersonSelectApi,
} from '/@/api/device-maintenance/index';
import { treeListApi } from '/@/api/device-scrap/data';
//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '报废单编号',
      dataIndex: 'code',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '所属装置设施',
      dataIndex: 'facilitiesName',
    },
    {
      title: '设备单价',
      dataIndex: 'unitPrice',
      customRender: ({ value }) => {
        return value ? value + '万元' : '';
      },
    },
    {
      title: '设备折旧',
      dataIndex: 'depreciation',
      customRender: ({ value }) => {
        return value ? value + '万元' : '';
      },
    },
    {
      title: '设备出厂日期',
      dataIndex: 'manufactureDate',
    },
    {
      title: '设备已使用年限',
      dataIndex: 'usedYear',
      customRender: ({ value }) => {
        return value ? value + '年' : '';
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'scrapStatus',
      customRender: ({ record }) => {
        return <span>{record.scrapStatusText}</span>;
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
// 树结构转列表
const treeTolist = (tree, result = [] as any, level = 0) => {
  tree.forEach((node) => {
    result.push(node);
    node.level = level + 1;
    node.children && treeTolist(node.children, result, level + 1);
  });
  return result;
};
//
export function schemasAdd(location): FormSchema[] {
  return [
    {
      field: 'deviceId',
      label: '选择设备',
      component: 'ApiTreeSelect',
      required: true,
      ifShow: location ? false : true,
      componentProps: ({ formActionType }) => {
        const { setFieldsValue } = formActionType;
        return {
          placeholder: '请选择设备',
          api: treeListApi,
          fieldNames: {
            value: 'id',
            key: 'id',
            label: 'label',
            children: 'children',
          },
          getPopupContainer: () => document.body,
          onChange: (e) => {
            treeListApi().then((res) => {
              const data = treeTolist(res).filter((item) => item.id === e);
              setFieldsValue({
                name1: data[0].position,
              });
            });
          },
        };
      },
    },
    {
      field: 'deviceName',
      label: '选择设备',
      component: 'Input',
      required: true,
      dynamicDisabled: true,
      ifShow: location ? true : false,
      componentProps: ({ formActionType }) => {
        const { setFieldsValue } = formActionType;
        setFieldsValue({
          name1: location,
        });
      },
    },
    {
      field: 'name1',
      component: 'Input',
      label: '设备安装位置',
      dynamicDisabled: true,
      componentProps: {
        placeholder: '请输入设备安装位置',
      },
    },
    {
      field: 'unitPrice',
      component: 'Input',
      label: '设备单价',
      rules: [
        {
          // @ts-ignore
          validator: async (rule, value) => {
            if (!value) {
              return Promise.reject('设备单价不能为空');
            }
            const IsNumber = /^[0-9]*$/;
            if (!IsNumber.test(value)) {
              return Promise.reject('设备单价只能为数字');
            }
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
      componentProps: {
        placeholder: '请输入设备单价',
      },
    },
    {
      field: 'depreciation',
      component: 'Input',
      label: '设备折旧',
      required: true,
      rules: [
        {
          // @ts-ignore
          validator: async (rule, value) => {
            if (!value) {
              return Promise.reject('设备折旧不能为空');
            }
            const IsNumber = /^[0-9]*$/;
            if (!IsNumber.test(value)) {
              return Promise.reject('设备折旧只能为数字');
            }
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
      componentProps: {
        placeholder: '请输入设备折旧价',
      },
    },
    {
      field: 'chargeDeptId',
      component: 'ApiTreeSelect',
      label: '负责部门',
      required: true,
      componentProps: ({ formActionType }) => {
        const { updateSchema, setFieldsValue } = formActionType; //setFieldsValue
        return {
          placeholder: '请选择负责部门',
          api: getDepartmentSelectApi,
          fieldNames: {
            numberToString: true,
            value: 'id',
            key: 'id',
            label: 'label',
            children: 'children',
          },
          getPopupContainer: () => document.body,
          onChange: (e: any) => {
            setFieldsValue({
              chargePeopleId: undefined,
            });
            getPeopleSelectApi([e]).then((res) => {
              updateSchema({
                field: 'chargePeopleId',
                componentProps: {
                  options: res,
                },
              });
            });
          },
        };
      },
    },
    {
      field: 'chargePeopleId',
      component: 'Select',
      label: '负责人',
      required: true,
      componentProps: {
        placeholder: '请选择负责人',
        options: [],
        fieldNames: { label: 'name', value: 'id' },
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'manufactureDate',
      component: 'DatePicker',
      label: '设备出厂日期',
      componentProps: {
        placeholder: '请选择设备出厂日期',
      },
    },
    {
      field: 'useDate',
      component: 'DatePicker',
      label: '投入使用时间',
      componentProps: {
        placeholder: '请选择投入使用时间',
      },
    },
    {
      field: 'regularUseYear',
      component: 'Input',
      label: '设备固定使用年限',
      componentProps: {
        placeholder: '请输入设备固定使用年限',
      },
      renderComponentContent: () => {
        return {
          suffix: () => '年',
        };
      },
    },
    {
      field: 'usedYear',
      component: 'Input',
      label: '设备已使用年限',
      componentProps: {
        placeholder: '请输入设备已使用年限',
      },
      renderComponentContent: () => {
        return {
          suffix: () => '年',
        };
      },
    },
    {
      field: 'actuality',
      component: 'InputTextArea',
      label: '设备现状',
      componentProps: {
        placeholder: '请输入设备现状',
        rows: 4,
      },
    },
    {
      field: 'scrapDate',
      component: 'DatePicker',
      required: true,
      label: '设备报废时间',
      defaultValue: new Date(),
      componentProps: {
        placeholder: '请选择设备报废时间',
      },
    },
    {
      field: 'scrapReason',
      component: 'InputTextArea',
      label: '设备报废原因',
      required: true,
      componentProps: {
        placeholder: '请输入设备报废原因',
        rows: 4,
      },
    },
    {
      field: 'affixList',
      component: 'Upload',
      label: '附件',
      componentProps: {
        maxNumber: 5,
        maxSize: 5,
        accept: '.jpg,.png,.jpeg',
        helpText: '请上传图片',
      },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
      },
    },
  ];
}
