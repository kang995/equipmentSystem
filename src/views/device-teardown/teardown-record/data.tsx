import { BasicColumn, FormSchema } from '/@/components/Table';
import { getDepartmentSelectApi, getPeopleSelectApi } from '/@/api/device-maintenance/index';
import { getSelectApi } from '/@/api/device-removal/data';
import { DescItem } from '/@/components/Description';
import { useRouter } from 'vue-router';
const router = useRouter();

function handleClick() {
  router.push({
    name: 'teardownAdd',
  });
}
//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '拆除时间',
      dataIndex: 'dateStr',
      width: 250,
    },
    {
      title: '拆除负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '电话',
      dataIndex: 'chargePeoplePhone',
    },
    {
      title: '拆除情况',
      dataIndex: 'demolishSituation',
    },
    {
      title: '关联拆除单',
      dataIndex: 'demolishStr',
      customRender({ record }) {
        return (
          <a class="pointer" onClick={handleClick}>
            {record.demolishStr}
          </a>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'createByName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];
}
export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'demolishId',
      component: 'ApiSelect',
      label: '关联拆除编号',
      componentProps: {
        placeholder: '请选择拆除单编号',
        api: getSelectApi,
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '拆除时间',
    },
  ];
}
export function schemasAdd(routeId, codeId?): FormSchema[] {
  return [
    {
      field: 'demolishId',
      component: 'ApiSelect',
      label: '拆除单编号',
      required: true,
      ifShow: routeId ? false : true,
      dynamicDisabled: codeId ? true : false,
      componentProps: {
        placeholder: '请输入拆除单编号',
        api: getSelectApi,
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'code',
      component: 'Input',
      label: '拆除单编号',
      ifShow: routeId ? true : false,
      dynamicDisabled: routeId ? true : false,
    },
    {
      field: 'chargeDeptId',
      component: 'ApiTreeSelect',
      label: '拆除负责部门',
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
      label: '拆除负责人',
      required: true,
      componentProps: {
        placeholder: '请选择负责人',
        options: [],
        fieldNames: { label: 'name', value: 'id' },
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'chargePeoplePhone',
      component: 'Input',
      label: '负责人电话',
      componentProps: {
        placeholder: '请输入负责人电话',
      },
      rules: [
        {
          required: true,
          validator: async (_rule, val) => {
            if (!val) {
              return Promise.reject('请输入负责人电话');
            }
            if (/[^\d]/g.test(val)) {
              return Promise.reject('电话只能是数字');
            }
            if (val.length < 11 || val.length > 11) {
              return Promise.reject('电话只能是11位');
            }
            return Promise.resolve();
          },
          trigger: 'blur',
        },
      ],
    },
    {
      field: 'timeDate',
      component: 'RangePicker',
      label: '设备拆除时间',
      required: true,
    },
    {
      field: 'demolishSituation',
      component: 'InputTextArea',
      label: '设备拆除情况',
      required: true,
      componentProps: {
        placeholder: '请输入设备拆除情况',
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
      field: 'imgList',
      component: 'Upload',
      label: '图片',
      componentProps: {
        maxNumber: 5,
        maxSize: 5,
        helpText: '请上传图片',
        accept: '.png,.jpg,.jpeg',
      },
    },
  ];
}
export const informationDescItem: DescItem[] = [
  {
    label: '创建人',
    field: 'createByName',
  },
  {
    label: '创建时间',
    field: 'createTime',
  },
  {
    label: '拆除单编号',
    field: 'code',
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
    label: '负责人电话',
    field: 'chargePeoplePhone',
  },
  {
    label: '设备拆除时间',
    field: 'endDate',
    render(_val, data) {
      return data.startDate + '至' + data.endDate;
    },
  },
  {
    label: '设备拆除情况',
    field: 'demolishSituation',
  },
  {
    label: '附件',
    field: 'affixList',
  },
  {
    label: '图片',
    field: 'imgList',
  },
];
