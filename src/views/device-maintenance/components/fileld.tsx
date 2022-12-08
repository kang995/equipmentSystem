import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { BasicTable, useTable, TableAction } from '/@/components/Table';

//计划详情
export function MaintainDetail(state: string): DescItem[] {
  return [
    {
      field: 'applyUserName',
      label: '保养计划编号',
    },
    {
      field: 'applyUserName',
      label: '计划状态',
    },
    {
      field: 'applyUserName',
      label: '创建人',
    },
    {
      field: 'applyUserName',
      label: '创建时间',
    },
    {
      field: 'applyUserName',
      label: '保养计划名称',
    },
    {
      field: 'applyUserName',
      label: '计划生效时间',
    },
    {
      field: 'applyUserName',
      label: '任务起始时间',
    },
    {
      field: 'applyUserName',
      label: '任务周期',
    },
    {
      field: 'applyUserName',
      label: '任务执行时长',
    },
    {
      field: 'applyUserName',
      label: '工单生成及下发',
    },
    {
      field: 'applyUserName',
      label: '临期提醒',
    },
    {
      field: 'applyUserName',
      label: '超时提醒间隔',
    },
    {
      field: 'applyUserName',
      label: '计划负责人',
    },
    {
      field: 'applyUserName',
      label: '任务指派',
    },
    {
      field: 'applyUserName',
      label: '处理部门',
    },
    {
      field: 'applyUserName',
      label: '处理人',
    },
    {
      field: 'applyUserName',
      label: '保养类型',
    },
    {
      field: 'applyUserName',
      label: '保养标椎',
    },
    {
      field: 'applyUserName',
      label: '保养内容',
    },
    {
      field: 'applyUserName',
      label: '安全规则',
    },
    {
      field: 'applyUserName',
      label: '备注',
      span: 2,
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>审核信息</span>;
      },
      show: (data) => (state === '3' || state === '4' ? true : false),
    },
    {
      field: 'applyUserName',
      label: '审核结果',
      show: (data) => (state === '3' || state === '4' ? true : false),
    },
    {
      field: 'applyUserName',
      label: '原因（备注）',
      show: (data) => (state === '3' || state === '4' ? true : false),
    },
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
//设备保养
export function tableDeviceColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '设备地点',
      dataIndex: 'productName',
    },
    {
      title: '所属装置',
      dataIndex: 'person',
    },
    {
      title: '设备类型',
      dataIndex: 'time',
    },
    {
      title: '是否特种设备',
      dataIndex: 'status',
    },
  ];
}

//关联工单
export function tableColumns(): BasicColumn[] {
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
      dataIndex: 'person',
    },
    {
      title: '工单处理人',
      dataIndex: 'time',
    },
    {
      title: '工单执行时间',
      dataIndex: 'status',
    },
    // {
    //   title: '关联计划',
    //   dataIndex: 'status',
    // },
    {
      title: '工单状态',
      dataIndex: 'status',
    },
    {
      title: '工单延期',
      dataIndex: 'status',
    },
    {
      title: '完成时间',
      dataIndex: 'time',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '工单编号',
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'status',
      component: 'ApiSelect',
      label: '计划负责人',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择计划负责人',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
      },
    },
    {
      field: 'productId',
      component: 'RangePicker',
      label: '工单执行时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
      },
    },
    {
      field: 'productId1',
      component: 'RangePicker',
      label: '工单完成时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        // format: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD',
      },
    },
  ];
}

//工单信息
export function WorkDetail(status: string): DescItem[] {
  const isShow = status === '3' || status === '4' || status === '5'; //待验收、验收拒绝、验收通过
  const isShow1 = status === '2'; //延期审核
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
    // {
    //   field: '',
    //   label: '',
    //   labelMinWidth: 0,
    //   span: 3,
    //   render: () => {
    //     return <span style={titleStyle}>重新下发</span>;
    //   }
    // },

    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>延期申请</span>;
      },
      show: (data) => (isShow1 ? true : false),
    },
    {
      field: 'applyUserName',
      label: '原截止时间',
      show: (data) => (isShow1 ? true : false),
    },
    {
      field: 'applyUserName',
      label: '延期时间',
      show: (data) => (isShow1 ? true : false),
    },
    {
      field: 'applyUserName',
      label: '延期原因',
      show: (data) => (isShow1 ? true : false),
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>保养结果</span>;
      },
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'applyUserName',
      label: '处理情况',
      span: 3,
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'imgArr',
      label: '图片',
      span: 3,
      show: (data) => (isShow ? true : false),
      render: () => {
        return (
          <>
            {/* <a-image style={imgStyle} src={'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F54fbb2fb43166d22c89bb9ebfedb69fc9252d2e1.jpeg%40f_auto%3Ftoken%3D582defe7a081a5287a267c64ed1266f3&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1670605200&t=82e586d8c040c29c7a54667ca29f3418'} alt="" /> */}
          </>
        );
      },
    },
    {
      field: 'applyUserName',
      label: '保养完成时间',
      span: 3,
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'applyUserName',
      label: '验收人',
      span: 3,
      show: (data) => (isShow ? true : false),
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>验收结果</span>;
      },
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'applyUserName',
      label: '验收结果',
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'applyUserName',
      label: '验收内容',
      span: 3,
      show: (data) => (isShow ? true : false),
    },
    {
      field: 'imgArr1',
      label: '图片',
      show: (data) => (isShow ? true : false),
      render: () => {
        return (
          <>
            {/* <a-image style={imgStyle} src={'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F54fbb2fb43166d22c89bb9ebfedb69fc9252d2e1.jpeg%40f_auto%3Ftoken%3D582defe7a081a5287a267c64ed1266f3&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1670605200&t=82e586d8c040c29c7a54667ca29f3418'} alt="" /> */}
          </>
        );
      },
    },
  ];
}
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
      colProps: {
        span: 14,
      },
      componentProps: {
        placeholder: '请选择处理部门',
      },
    },
    {
      field: 'name',
      component: 'ApiSelect',
      label: '处理人',
      required: true,
      colProps: {
        span: 14,
      },
      componentProps: {
        placeholder: '请选择处理人',
      },
    },
  ];
}
//使用备件
export function tablePartColumns(): BasicColumn[] {
  return [
    {
      title: '备件编码',
      dataIndex: 'name',
    },
    {
      title: '备件名称',
      dataIndex: 'name',
    },
    {
      title: '备件分类',
      dataIndex: 'name',
    },
    {
      title: '使用数量',
      dataIndex: 'name',
    },
  ];
}

//作业许可详情页样式
const titleStyle: any = {
    paddingTop: '16px',
    fontSize: '15px',
    fontWeight: '600',
    position: 'relative',
    left: '0px',
  },
  imgStyle = {
    width: '100px',
    height: '100px',
    display: 'inline',
    zIndex: 10,
  };
