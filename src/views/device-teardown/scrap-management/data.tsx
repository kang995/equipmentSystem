import { BasicColumn, FormSchema } from '/@/components/Table';
import { getDepartmentSelectApi, getPeopleSelectApi } from '/@/api/device-maintenance/index';
import { treeListApi } from '/@/api/device-scrap/data';
import { Row, Image } from 'ant-design-vue';
import { DescItem } from '/@/components/Description';
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
        return value ? value + '元' : '';
      },
    },
    {
      title: '设备折旧',
      dataIndex: 'depreciation',
      customRender: ({ value }) => {
        return value ? value + '元' : '';
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
      label: '报废单编号',
      componentProps: {
        placeholder: '请输入报废单编号',
      },
    },
    {
      field: 'deviceName',
      component: 'Input',
      label: '设备名称',
      componentProps: {
        placeholder: '请选择设备名称',
      },
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '申请时间',
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        getPopupContainer: () => document.body,
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
export function schemasAdd(location, routeId): FormSchema[] {
  return [
    {
      field: 'deviceId',
      label: '选择设备',
      component: 'ApiTreeSelect',
      required: true,
      ifShow: routeId ? false : true,
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
      ifShow: routeId ? true : false,
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
              return Promise.resolve();
            } else {
              if (value.length > 9) {
                return Promise.reject('设备单价最大为9位数');
              }
              const IsNumber = /(^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$)/;
              if (!IsNumber.test(value)) {
                return Promise.reject('设备单价只能为数字,且只能保留两位小数');
              }
              return Promise.resolve();
            }
          },
          trigger: 'change',
        },
      ],
      componentProps: {
        placeholder: '请输入设备单价',
      },
      renderComponentContent: () => {
        return {
          suffix: () => '元',
        };
      },
    },
    {
      field: 'depreciation',
      component: 'Input',
      label: '设备折旧',
      rules: [
        {
          required: true,
          // @ts-ignore
          validator: async (rule, value) => {
            if (!value) {
              return Promise.reject('设备折旧不能为空');
            }
            const IsNumber = /(^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$)/;
            if (value.length > 9) {
              return Promise.reject('设备折旧最大为9位数');
            }
            if (!IsNumber.test(value)) {
              return Promise.reject('设备折旧只能为数字,且只能保留两位小数');
            }
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
      componentProps: {
        placeholder: '请输入设备折旧价',
      },
      renderComponentContent: () => {
        return {
          suffix: () => '元',
        };
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
      rules: [
        {
          // @ts-ignore
          validator: async (rule, value) => {
            if (value.length > 3) {
              return Promise.reject('设备固定使用年限不能超过3位');
            }
            const IsNumber = /^[0-9]*$/;
            if (!IsNumber.test(value)) {
              return Promise.reject('设备固定使用年限只能为数字');
            }
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
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
      rules: [
        {
          // @ts-ignore
          validator: async (rule, value) => {
            if (value.length > 3) {
              return Promise.reject('设备已使用年限不能超过3位');
            }
            const IsNumber = /^[0-9]*$/;
            if (!IsNumber.test(value)) {
              return Promise.reject('设备已使用年限只能为数字');
            }
            return Promise.resolve();
          },
          trigger: 'change',
        },
      ],
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
        type: '',
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
      },
    },
  ];
}
export const informationDescItem: DescItem[] = [
  {
    label: '报废单编号',
    field: 'code',
  },

  {
    label: '状态',
    field: 'scrapStatusText',
  },
  {
    label: '提交部门',
    field: 'commitDeptName',
  },
  {
    label: '提交人',
    field: 'createByName',
  },
  {
    label: '提交时间',
    field: 'createTime',
  },
  {
    label: '设备名称',
    field: 'deviceName',
  },
  {
    label: '设备安装位置',
    field: 'location',
  },
  {
    label: '负责部门',
    field: 'chargeDeptName',
  },
  {
    label: '负责人',
    field: 'chargePeopleName',
  },
  {
    label: '设备单价',
    field: 'unitPrice',
    render: (value) => {
      return value ? value + '元' : '';
    },
  },
  {
    label: '设备折旧',
    field: 'depreciation',
    render: (value) => {
      return value ? value + '元' : '';
    },
  },
  {
    label: '设备出厂日期',
    field: 'manufactureDate',
  },
  {
    label: '设备报废时间',
    field: 'scrapDate',
  },
  {
    label: '设备使用时间',
    field: 'useDate',
  },
  {
    label: '设备固定使用期限',
    field: 'regularUseYear',
    render: (value) => {
      return value ? value + '年' : '';
    },
  },
  {
    label: '设备已使用期限',
    field: 'usedYear',
    render: (value) => {
      return value ? value + '年' : '';
    },
  },
  {
    label: '设备现状',
    field: 'actuality',
  },
  {
    label: '设备报废原因',
    field: 'scrapReason',
  },
  {
    label: '附件',
    field: 'affixList',
    render: (data) => {
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            <div class="flex-col">
              {data.map((item) => {
                const name = item.url.substring(item.url.lastIndexOf('.') + 1);
                if (name == 'png' || name == 'jpg' || name == 'jpeg') {
                  return (
                    <div class="flex flex-1">
                      <Image width={100} src={item.url} />
                    </div>
                  );
                } else {
                  return (
                    <div class="flex flex-1">
                      <a href={item.url}>{item.name}</a>
                    </div>
                  );
                }
              })}
            </div>
          </ARow>
        );
      }
    },
  },
  {
    label: '备注',
    field: 'remark',
  },
];
