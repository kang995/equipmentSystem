import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image, Row } from 'ant-design-vue';
import {
  getDictionarySelectTypeApi,
  getDepartmentSelectApi,
  getPeopleSelectApi,
  getStationSelectApi,
  getStationPeopleSelectApi,
  getPersonSelectApi,
} from '/@/api/device-maintenance/index';
//工单信息-重新下发
export function getAgainFormSchema(): FormSchema[] {
  return [
    {
      field: 'designateType',
      component: 'ApiRadioGroup',
      label: '任务指派',
      required: true,
      defaultValue: '1',
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          api: getDictionarySelectTypeApi, //后台路径
          params: {
            type: 'DESIGNATE_TYPE',
          },
          resultField: 'data',
          labelField: 'itemName',
          valueField: 'itemValue',
          onChange: (e) => {
            formModel.dealUserIdList = undefined;
            updateSchema({
              field: 'dealUserIdList',
              componentProps: {
                options: [],
              },
            });
            if (e === '2') {
              formModel.dealDeptId = undefined;
              updateSchema({
                field: 'dealDeptId',
                ifShow: false,
              });
              updateSchema({
                field: 'dealStationId',
                ifShow: true,
              });
            } else {
              formModel.dealStationId = undefined;
              updateSchema({
                field: 'dealStationId',
                ifShow: false,
              });
              updateSchema({
                field: 'dealDeptId',
                ifShow: true,
              });
            }
          },
        };
      },
    },
    // 人员
    {
      field: 'dealDeptId',
      component: 'ApiTreeSelect',
      label: '处理部门',
      required: true,
      ifShow: true,
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          placeholder: '请选择处理部门',
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
            formModel.dealUserIdList = undefined;
            getPeopleSelectApi([e]).then((res) => {
              updateSchema({
                field: 'dealUserIdList',
                componentProps: {
                  options: res,
                },
              });
            });
          },
        };
      },
    },
    // 岗位
    {
      field: 'dealStationId',
      component: 'ApiSelect',
      label: '处理岗位',
      required: true,
      ifShow: false,
      componentProps: ({ formModel, formActionType }) => {
        const { updateSchema } = formActionType; //setFieldsValue
        return {
          api: getStationSelectApi,
          resultField: 'data', //后台返回数据字段
          labelField: 'name',
          valueField: 'id',
          showSearch: true,
          optionFilterProp: 'label',
          getPopupContainer: () => document.body,
          onChange: (en) => {
            console.log(en);
            getStationPeopleSelectApi([en]).then((res) => {
              console.log(res);
              updateSchema({
                field: 'dealUserIdList',
                componentProps: {
                  options: res,
                  mode: 'multiple',
                },
              });
              formModel.dealUserIdList = res.map((item) => item.id);
            });
          },
        };
      },
    },
    {
      field: 'dealUserIdList',
      component: 'Select',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
        mode: 'multiple',
        options: [],
        fieldNames: { label: 'name', value: 'id' },
        getPopupContainer: () => document.body,
      },
    },
  ];
}
//工单信息-延期审核
export function getPostponeFormSchema(): FormSchema[] {
  return [
    {
      field: 'approvalResult',
      component: 'RadioGroup',
      label: '审核结果',
      required: true,
      defaultValue: '0',
      componentProps: {
        options: [
          {
            label: '同意',
            value: '0',
          },
          {
            label: '拒绝',
            value: '1',
          },
        ],
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '原因',
      required: true,
      componentProps: {
        placeholder: '请输入原因',
        rows: 4,
        maxlength: 200,
      },
    },
  ];
}
//工单信息-检修结果
export function ResultSchemaDetail(): DescItem[] {
  return [
    {
      field: 'dealCase',
      label: '检修内容',
    },
    {
      field: 'dealImgList',
      label: '图片',
      render: (data) => {
        const ARow = Row;
        if (data) {
          return (
            <ARow gutter={24}>
              <div class="flex flex-1">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="pl-2">
                        <Image width={80} src={item.url} />
                      </div>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </ARow>
          );
        }
      },
    },
    {
      field: 'stopFlag',
      label: '是否停机',
      render: (curVal) => {
        return curVal === '0' ? '是' : '否';
      },
    },
    {
      field: 'finishTime',
      label: '检修完成时间',
    },
    {
      field: 'acceptPeopleNameStr',
      label: '验收人',
    },
  ];
}
//工单信息-检验结果
export function ResultsSchema(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>检验结果</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '检验内容',
    },
    {
      field: 'applyUserName',
      label: '图片',
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
    },
    {
      field: 'applyUserName',
      label: '是否停机',
    },
    {
      field: 'applyUserName',
      label: '验收人',
    },
    {
      field: 'applyUserName',
      label: '检修完成时间',
      span: 2,
    },
  ];
}
//工单信息-验收结果
export function ResultsSchemas(): DescItem[] {
  return [
    {
      field: 'acceptResult',
      label: '验收结果',
      render: (curVal) => {
        return curVal === '0' ? '通过' : '拒绝';
      },
    },
    {
      field: 'acceptContent',
      label: '验收内容',
    },
    {
      field: 'acceptImgList',
      label: '图片',
      render: (data) => {
        const ARow = Row;
        if (data) {
          return (
            <ARow gutter={24}>
              <div class="flex flex-1">
                {data.map((item) => {
                  if (item.url) {
                    return (
                      <div class="pl-2">
                        <Image width={80} src={item.url} />
                      </div>
                    );
                  } else {
                    return '';
                  }
                })}
              </div>
            </ARow>
          );
        }
      },
    },
    {
      field: 'acceptTime',
      label: '验收时间',
    },
    {
      field: 'acceptPeopleNameStr',
      label: '验收人',
    },
  ];
}

//工单信息-申请延期
export function getApplyFormSchema(): FormSchema[] {
  return [
    {
      field: 'oldEndTime',
      component: 'DatePicker',
      label: '原截止时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        disabled: true,
      },
    },
    {
      field: 'delayTime',
      component: 'DatePicker',
      label: '延期时间',
      required: true,
      componentProps: {
        placeholder: '请选择时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: true,
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'delayReason',
      component: 'InputTextArea',
      label: ' 延期原因',
      required: true,
      componentProps: {
        placeholder: '请输入原因',
        rows: 4,
        maxlength: 200,
      },
    },
  ];
}
//工单信息-检修结果
export function getAcceptFormSchema(status: string): FormSchema[] {
  return [
    {
      field: 'dealCase',
      component: 'InputTextArea',
      label: '检修结果',
      required: true,
      componentProps: {
        placeholder: '请输入检修结果',
        rows: 4,
      },
    },
    {
      field: 'dealImgList',
      component: 'Upload',
      label: '图片',
      required: ({}) => status === '1',
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'stopFlag',
      component: 'ApiRadioGroup',
      label: '是否停机',
      required: true,
      defaultValue: '0',
      componentProps: {
        api: getDictionarySelectTypeApi, //（0是，1否）
        params: {
          type: 'STOP_FLAG',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
      },
    },
    {
      field: 'acceptPeopleId',
      component: 'ApiSelect',
      label: '验收人',
      required: true,
      componentProps: {
        placeholder: '请选择验收人',
        showSearch: true,
        optionFilterProp: 'label',
        api: getPersonSelectApi,
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
      ifShow: ({}) => status !== '1',
    },
  ];
}

const titleStyle: any = {
    paddingTop: '16px',
    fontSize: '15px',
    fontWeight: '600',
    position: 'relative',
    left: '0px',
  },
  ImageBox: any = {
    width: '80px',
  };
const fileBox = {
  padding: '0px',
  height: '100px',
  width: 'auto',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
const noFileBox: any = {
  textAlign: 'center',
  lineHeight: '100px',
  fontWeight: '600',
  fontSize: '16px',
  color: '#999',
  userSelect: 'none',
  height: '100px',
  width: '200px',
  border: 'dashed 2px #bfbfbf',
  borderRadius: '6px',
  overflow: 'hidden',
};
