import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image } from 'ant-design-vue';

//工单信息-重新下发
export function getAgainFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'RadioGroup',
      label: '任务指派',
      required: true,
      componentProps: {
        options: [
          {
            label: '人员',
            value: '1',
          },
          {
            label: '岗位',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'name',
      component: 'ApiSelect',
      label: '处理部门',
      required: true,
      componentProps: {
        placeholder: '请选择处理部门',
      },
    },
    {
      field: 'name',
      component: 'ApiSelect',
      label: '处理人',
      required: true,
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
  ];
}
//工单信息-延期申请
export function ApplySchemaDetail(): DescItem[] {
  return [
    {
      field: 'applyUserName',
      label: '原截至时间',
    },
    {
      field: 'applyUserName',
      label: '延期时间',
    },
    {
      field: 'applyUserName',
      label: '延期原因',
    },
  ];
}
//工单信息-延期审核
export function getPostponeFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'RadioGroup',
      label: '审核结果',
      required: true,
      componentProps: {
        options: [
          {
            label: '同意',
            value: '1',
          },
          {
            label: '拒绝',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'problem',
      component: 'InputTextArea',
      label: '拒绝原因',
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
      field: 'applyUserName',
      label: '检修内容',
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
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>验收结果</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '验收结果',
    },
    {
      field: 'applyUserName',
      label: '验收内容',
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
      label: '验收时间',
    },
    {
      field: 'applyUserName',
      label: '验收人',
    },
  ];
}

//工单信息-申请延期
export function getApplyFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'DatePicker',
      label: '原截止时间',
      // colProps: {
      //   span: 14,
      // },
      componentProps: {
        // placeholder: '请输入',
      },
    },
    {
      field: 'name1',
      component: 'DatePicker',
      label: '延期时间',
      required: true,
      // colProps: {
      //   span: 14,
      // },
      componentProps: {
        placeholder: '请选择时间',
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: ' 延期原因',
      required: true,
      // colProps: {
      //   span: 14,
      // },
      componentProps: {
        placeholder: '请输入原因',
      },
    },
  ];
}
//工单信息-检修结果
export function getAcceptFormSchema(status: string): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'InputTextArea',
      label: '检修结果',
      required: true,
      componentProps: {
        placeholder: '请输入检修结果',
        rows: 4,
      },
    },
    {
      field: 'attachment',
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
      field: 'name',
      component: 'RadioGroup',
      label: '是否停机',
      required: true,
      componentProps: {
        options: [
          {
            label: '是',
            value: '1',
          },
          {
            label: '否',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'name2',
      component: 'ApiSelect',
      label: '验收人',
      required: true,
      componentProps: {
        placeholder: '请选择验收人',
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
