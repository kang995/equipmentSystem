import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { Image } from 'ant-design-vue';
import { deviceTreeSelectApi } from '/@/api/corrective-maintenance/fault';

//列表
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '故障单号',
      dataIndex: 'name',
    },
    {
      title: '上报人',
      dataIndex: 'productName',
    },
    {
      title: '上报时间',
      dataIndex: 'person',
    },
    {
      title: '关联设备',
      dataIndex: 'time',
    },
    {
      title: '所属装置设施',
      dataIndex: 'status',
    },
    {
      title: '故障类别',
      dataIndex: 'status',
    },
    {
      title: '故障等级',
      dataIndex: 'status',
    },
    {
      title: '故障描述',
      dataIndex: 'status',
    },
    {
      title: '故障状态',
      dataIndex: 'status',
    },
    {
      title: '确认结果',
      dataIndex: 'status',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '故障单号',
      labelWidth: 96,
      componentProps: {
        placeholder: '请输入故障单号',
      },
    },
    {
      field: 'status',
      component: 'Input',
      label: '上报人',
      labelWidth: 64,
      componentProps: {
        placeholder: '请输入上报人',
      },
    },
    {
      field: 'name',
      component: 'RangePicker',
      label: '上报时间',
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '关联设备',
      componentProps: {
        placeholder: '请选择关联设备',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '所属装置设施',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择所属装置设施',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障类别',
      labelWidth: 64,
      componentProps: {
        placeholder: '请选择故障类别',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障等级',
      componentProps: {
        placeholder: '请选择故障等级',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '故障状态',
      componentProps: {
        placeholder: '请选择故障状态',
      },
    },
    {
      field: 'productId',
      component: 'ApiSelect',
      label: '确认结果',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择确认结果',
      },
    },
  ];
}

//新增、编辑故障表单
export function getCommonFormSchema(): FormSchema[] {
  return [
    // {
    //   field: 'name',
    //   component: 'Input',
    //   label: '故障单号',
    //   required: true,
    //   componentProps: {
    //     placeholder: '请输入故障单号',
    //   },
    // },
    {
      field: 'deviceId',
      component: 'ApiTreeSelect',
      label: '关联设备',
      required: true,
      componentProps: ({ formModel, formActionType }) => {
        // const { updateSchema, setFieldsValue } = formActionType;
        return {
          placeholder: '请输入关联设备',
          api: deviceTreeSelectApi,
          fieldNames: {
            label: 'label',
            key: 'id',
            value: 'id',
            children: 'children',
          },
          onChange: (id: string) => {
            deviceTreeSelectApi().then((res) => {
              const pos = res.find((item) => item.id === id);
              // console.log('pos',pos)
              formModel.position = pos.position;
            });
          },
        };
      },
      // slot: 'treeSlot',
    },
    {
      field: 'position',
      component: 'Input',
      label: '安装位置',
      // required: true,
      componentProps: {
        placeholder: '请输入安装位置',
      },
    },
    {
      field: 'findTime',
      component: 'DatePicker',
      label: '发现故障时间',
      required: true,
      componentProps: {
        placeholder: '请输入发现故障时间',
      },
    },
    {
      field: 'troubleType',
      component: 'ApiSelect',
      label: '故障类别',
      componentProps: {
        placeholder: '请输入故障类别',
      },
    },
    {
      field: 'urgentLevel',
      component: 'ApiSelect',
      label: '紧急程度',
      componentProps: {
        placeholder: '请输入紧急程度',
      },
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: '故障描述',
      componentProps: {
        placeholder: '请输入故障描述',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'expression',
      component: 'InputTextArea',
      label: '表现症状',
      componentProps: {
        placeholder: '请输入表现症状',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '故障原因',
      componentProps: {
        placeholder: '请输入故障原因',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '采取措施',
      componentProps: {
        placeholder: '请输入采取措施',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'imgList',
      component: 'Upload',
      label: '图片上传',
      required: true,
      componentProps: {
        maxNumber: 5,
        maxSize: 5,
        accept: '.jpg,.png,.jpeg',
        helpText: '请上传图片',
      },
    },
  ];
}

//故障详情
export function faultDetail(status: string): DescItem[] {
  console.log('status', status);
  return [
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 3,
      render: () => {
        return <span style={titleStyle}>故障信息</span>;
      },
    },
    {
      field: 'applyUserName',
      label: '故障单号',
    },
    {
      field: 'applyUserName',
      label: '故障状态',
    },
    {
      field: 'applyUserName',
      label: '上报人',
    },
    {
      field: 'applyUserName',
      label: '联系电话',
    },
    {
      field: 'applyUserName',
      label: '上报时间',
    },
    {
      field: 'applyUserName',
      label: '发现故障时间',
    },
    {
      field: 'applyUserName',
      label: '关联设备',
    },
    {
      field: 'applyUserName',
      label: '所属装置设施',
    },
    {
      field: 'applyUserName',
      label: '地理位置',
    },
    {
      field: 'applyUserName',
      label: '故障类别',
    },
    {
      field: 'applyUserName',
      label: '紧急程度',
    },
    {
      field: 'applyUserName',
      label: '故障描述',
    },
    {
      field: 'applyUserName',
      label: '表新症状',
    },
    {
      field: 'applyUserName',
      label: '故障原因',
    },
    {
      field: 'applyUserName',
      label: '采取措施',
      span: 2,
    },
    {
      field: 'applyUserName',
      label: '图片',
      span: 2,
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
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>故障确认</span>;
      },
      show: (data) => status !== '1',
    },
    //
    {
      field: 'applyUserName',
      label: '故障确认',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '三方名称',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '维修时间',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '维修内容',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '图片',
      show: (data) => status === '4',
      render: () => {
        return (
          <Image
            style={ImageBox}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      },
    },
    //
    {
      field: 'applyUserName',
      label: '关联检修计划',
      show: (data) => status === '4',
    },
    {
      field: 'applyUserName',
      label: '关联检修工单',
      show: (data) => status === '4',
    },
    //
    {
      field: 'applyUserName',
      label: '确认结果',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '工单名称',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '负责人',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '任务起止时间',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '任务指派',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '处理部门',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '处理人',
      show: (data) => status === '2' || status === '3',
    },
    {
      field: 'applyUserName',
      label: '维修方案',
      show: (data) => status === '2' || status === '3',
    },
    //
    {
      field: 'applyUserName',
      label: '关联工单',
      span: 2,
      show: (data) => status === '3',
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>维修结果</span>;
      },
      show: (data) => status === '3',
    },
    {
      field: 'applyUserName',
      label: '处理结果',
      show: (data) => status === '3',
    },
    {
      field: 'applyUserName',
      label: '维修前图片',
      show: (data) => status === '3',
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
      label: '维修后图片',
      show: (data) => status === '3',
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
      show: (data) => status === '3',
    },
    {
      field: 'applyUserName',
      label: '验收人',
      span: 2,
      show: (data) => status === '3',
    },
    {
      field: '',
      label: '',
      labelMinWidth: 0,
      span: 2,
      render: () => {
        return <span style={titleStyle}>验收结果</span>;
      },
      show: (data) => status === '3',
    },
    {
      field: 'applyUserName',
      label: '验收结果',
      show: (data) => status === '3',
    },
    {
      field: 'applyUserName',
      label: '验收描述',
      show: (data) => status === '3',
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
