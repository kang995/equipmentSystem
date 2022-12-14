import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { BasicTable } from '/@/components/Table';
import checking from './checking/index.vue';
import checked from './checked/index.vue';
import { Image } from 'ant-design-vue';
export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '待验收',
    component: checking,
  },
  {
    key: '2',
    name: '已验收',
    component: checked,
  },
];

//保养验收-待验收、已验收
export function tableColumns(type: string): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
    },
    {
      title: '计划负责人',
      dataIndex: 'productName',
    },
    {
      title: '工单处理人',
      dataIndex: 'status',
    },
    {
      title: '工单执行时间',
      dataIndex: 'status',
    },
    {
      title: '关联计划',
      dataIndex: 'status',
    },
    {
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '验收时间',
      dataIndex: 'status',
      ifShow: type === 'checked' ? true : false,
    },
  ];
}

export function getFormSchema(type: string): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '工单编号',
      labelWidth: type === 'checked' ? 96 : 64,
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'status',
      component: 'ApiSelect',
      label: '计划负责人',
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单处理人',
      componentProps: {
        placeholder: '请选择工单处理人',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单执行时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单验收时间',
      labelWidth: 96,
      componentProps: {
        format: 'YYYY-MM-DD',
      },
      ifShow: type === 'checked' ? true : false,
    },
  ];
}

//工单信息
export function WorkDetail(): DescItem[] {
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>工单信息</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '工单编号',
    },
    {
      field: 'applyUserName',
      label: '关联保养计划',
    },
    {
      field: 'applyUserName',
      label: '计划负责人',
    },
    {
      field: 'applyUserName',
      label: '工单创建时间',
    },
    {
      field: 'applyUserName',
      label: '工单执行之时间',
    },
    {
      field: 'applyUserName',
      label: '工单状态',
    },
    {
      field: 'applyUserName',
      label: '工单处理部门',
    },
    {
      field: 'applyUserName',
      label: '工单处理人',
    },
    {
      field: 'applyUserName',
      label: '完成时间',
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>保养明细</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '保养类型',
    },
    {
      field: 'applyUserName',
      label: '保养内容',
    },
    {
      field: 'applyUserName',
      label: '保养标椎',
    },
    {
      field: 'applyUserName',
      label: '安全规则',
      span: 3,
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>保养设备</span>;
      },
    },
    {
      field: 'storageTankList',
      label: '',
      span: 3,
      // show: (data: any) => {
      //   return data.hazardType == '1';
      // },
      //表格
      render: (data) => {
        // if (data) {
        console.log('data: ', data);
        return (
          <div>
            <BasicTable
              pagination={false}
              dataSource={data}
              bordered={true}
              columns={keepDeviceColumns()}
              style={'color:#61687C'}
              class={'mr-6'}
            ></BasicTable>
          </div>
        );
        // }
      },
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>保养结果</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '处理情况',
    },
    {
      field: 'imgArr',
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
      label: '保养完成时间',
    },
    {
      field: 'applyUserName',
      label: '验收人',
    },
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 3,
    //   render: () => {
    //     return <span style={titleStyle}>验收结果</span>;
    //   },
    // },
    // {
    //   field: 'applyUserName',
    //   label: '验收结果',
    // },
    // {
    //   field: 'applyUserName',
    //   label: '验收内容',
    //   span: 3,
    // },
    // {
    //   field: 'imgArr1',
    //   label: '图片',
    //   render: () => {
    //     return (
    //       <>
    //         {/* <a-image style={imgStyle} src={'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F54fbb2fb43166d22c89bb9ebfedb69fc9252d2e1.jpeg%40f_auto%3Ftoken%3D582defe7a081a5287a267c64ed1266f3&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1670605200&t=82e586d8c040c29c7a54667ca29f3418'} alt="" /> */}
    //       </>
    //     );
    //   },
    // },
  ];
}
//保养设备
export function keepDeviceColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '所在区域',
      dataIndex: 'productName',
    },
    {
      title: '所属装置',
      dataIndex: 'person',
    },
    {
      title: '是否特种设备',
      dataIndex: 'time',
    },
  ];
}
//验收结果
export function MaintenanceFormSchema(status: string): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'RadioGroup',
      label: '验收结果',
      required: true,
      colProps: {
        span: 10,
      },
      componentProps: {
        options: [
          {
            label: '通过',
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
      field: 'attachment',
      component: 'Upload',
      label: '图片',
      colProps: {
        span: 10,
      },
      componentProps: {
        maxNumber: 5,
        accept: '.jpg,.jpeg,.png',
        maxSize: 5,
        helpText: '请上传图片',
      },
    },
    {
      field: 'name2',
      component: 'InputTextArea',
      label: '验收内容（备注）',
      required: true,
      colProps: {
        span: 10,
      },
      componentProps: {
        placeholder: '请输入验收内容（备注）',
      },
    },
    {
      field: 'time',
      component: 'Input',
      label: '验收时间',
      colProps: {
        span: 10,
      },
      componentProps: {
        placeholder: '请输入验收时间',
      },
      ifShow: status === '2' ? true : false,
    },
    {
      field: 'person',
      component: 'Input',
      label: '验收人',
      colProps: {
        span: 10,
      },
      componentProps: {
        placeholder: '请输入验收人',
      },
      ifShow: status === '2' ? true : false,
    },
  ];
}

const titleStyle: any = {
  paddingTop: '16px',
  fontSize: '15px',
  fontWeight: '600',
  position: 'relative',
  left: '0px',
};

const ImageBox: any = {
  width: '80px',
};
