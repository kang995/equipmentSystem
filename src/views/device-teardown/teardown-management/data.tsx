import { BasicColumn, FormSchema } from '/@/components/Table';
import { getDepartmentSelectApi, getPeopleSelectApi } from '/@/api/device-maintenance/index';
// import { treeListApi } from '/@/api/device-scrap/data';
import { Row, Image } from 'ant-design-vue';
import { DescItem } from '/@/components/Description';
import { getDictionarySelectTypeApi } from '/@/api/device-maintenance/index';
//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '拆除单编号',
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
      title: '拆除原因',
      dataIndex: 'demolishReason',
    },
    {
      title: '危险危害因数分析',
      dataIndex: 'dangerousFactorAnalysis',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'demolishStatus',
      customRender: ({ record }) => {
        return <span>{record.demolishStatusText}</span>;
      },
    },
  ];
}
export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '拆除单编号',
      labelWidth: 80,
      componentProps: {
        placeholder: '请输入拆除单编号',
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
    // {
    //   field: 'facilityCode',
    //   component: 'Input',
    //   label: '设备编号',
    //   componentProps: {
    //     placeholder: '请输入设备编号',
    //   },
    // },
    {
      field: 'facilitiesId',
      component: 'ApiTreeSelect',
      label: '所属装置设施',
      slot: 'deviceSlot',
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '创建时间',
      componentProps: {
        format: 'YYYY-MM-DD',
        placeholder: ['开始时间', '结束时间'],
        // showTime: true,
      },
    },
    {
      field: 'demolishStatus',
      component: 'ApiSelect',
      label: '状态',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'SCRAP_DEMOLISH_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
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
      label: '拆除设备',
      component: 'Input',
      required: true,
      ifShow: routeId ? false : true,
      slot: 'deviceSlot',
      // componentProps: ({ formActionType }) => {
      //   const { setFieldsValue } = formActionType;
      //   return {
      //     placeholder: '请选择设备',
      //     api: treeListApi,
      //     fieldNames: {
      //       value: 'id',
      //       key: 'id',
      //       label: 'label',
      //       children: 'children',
      //     },
      //     getPopupContainer: () => document.body,
      //     onChange: (e) => {
      //       treeListApi().then((res) => {
      //         const data = treeTolist(res).filter((item) => item.id === e);
      //         setFieldsValue({
      //           name1: data[0].position,
      //         });
      //       });
      //     },
      //   };
      // },
    },
    {
      field: 'deviceName',
      label: '拆除设备',
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
      field: 'timeDate',
      component: 'RangePicker',
      label: '拆除时间',
      required: true,
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
        showSearch: true,
        optionFilterProp: 'name',
      },
    },
    {
      field: 'demolishReason',
      component: 'InputTextArea',
      label: '拆除原因',
      required: true,
      componentProps: {
        placeholder: '请输入拆除原因',
        rows: 4,
      },
    },
    {
      field: 'projectContent',
      component: 'InputTextArea',
      label: '项目内容',
      componentProps: {
        placeholder: '请输入项目内容',
        rows: 4,
      },
    },
    {
      field: 'dangerousFactorAnalysis',
      component: 'InputTextArea',
      label: '危险危害因数分析',
      componentProps: {
        placeholder: '请输入危险危害因数分析',
        rows: 4,
      },
    },
    {
      field: 'plan',
      component: 'InputTextArea',
      label: '拆除计划方案',
      componentProps: {
        placeholder: '请输入拆除计划方案',
        rows: 4,
      },
    },
    {
      field: 'safetyProtectionMeasures',
      component: 'InputTextArea',
      label: '安全防护措施',
      componentProps: {
        placeholder: '请输入安全防护措施',
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
    label: '拆除单编号',
    field: 'code',
  },
  {
    label: '状态',
    field: 'demolishStatusText',
  },
  {
    label: '申请部门',
    field: 'applyDeptName',
  },
  {
    label: '申请人',
    field: 'createByName',
  },
  {
    label: '创建时间',
    field: 'createTime',
  },
  {
    label: '设备名称',
    field: 'deviceName',
  },
  {
    label: '所属装置设施',
    field: 'deviceName',
  },
  {
    label: '地理位置',
    field: 'location',
  },
  {
    label: '开始拆除时间',
    field: 'startDate',
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
    label: '项目内容',
    field: 'projectContent',
  },
  {
    label: '危险危害因数分析',
    field: 'dangerousFactorAnalysis',
  },
  {
    label: '拆除原因',
    field: 'demolishReason',
  },
  {
    label: '拆除方案计划',
    field: 'plan',
  },
  {
    label: '安全防护措施',
    field: 'safetyProtectionMeasures',
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
