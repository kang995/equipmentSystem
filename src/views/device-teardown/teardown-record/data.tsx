import { BasicColumn, FormSchema } from '/@/components/Table';
import { getDepartmentSelectApi, getPeopleSelectApi } from '/@/api/device-maintenance/index';
import { getSelectApi } from '/@/api/device-removal/data';
import { Row, Image } from 'ant-design-vue';
import { DescItem } from '/@/components/Description';
//列表
export function tableColumns(handleClick?): BasicColumn[] {
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
      ifShow: handleClick ? true : false,
      customRender({ record }) {
        return (
          <a class="pointer" onClick={handleClick.bind(null, record)}>
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
        params: {
          type: '1',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
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
        params: {
          type: 2,
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
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
            const reg_tel =
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (!reg_tel.test(val)) {
              return Promise.reject('格式不正确');
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
        accept: '.docx,.doc,.pptx,.ppt,.xlsx,.xls,.pdf,application/msword',
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
      if (data) {
        return data.startDate + '至' + data.endDate;
      }
    },
  },
  {
    label: '设备拆除情况',
    field: 'demolishSituation',
  },
  {
    label: '附件',
    field: 'affixList',
    render: (data) => {
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            <div class="flex flex-1">
              {data.map((item) => {
                const name = item.url.substring(item.url.lastIndexOf('.') + 1);
                if (name == 'png' || name == 'jpg' || name == 'jpeg') {
                  return (
                    <div class="pl-2">
                      <Image width={100} src={item.url} />
                    </div>
                  );
                } else {
                  return (
                    <div class="pl-2">
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
    label: '图片',
    field: 'imgList',
    render: (data) => {
      const ARow = Row;
      if (data) {
        return (
          <ARow gutter={24}>
            <div class="flex flex-1 items-center">
              {data.map((item) => {
                return (
                  <div class="pl-4 pr-4">
                    <Image width={100} src={item.url} />
                  </div>
                );
              })}
            </div>
          </ARow>
        );
      }
    },
  },
];
