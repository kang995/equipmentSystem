import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { getPersonSelectApi } from '/@/api/device-maintenance/index';
import { Image, Tag } from 'ant-design-vue';

//计划详情
export function MaintainDetail(state: string, mode: string): DescItem[] {
  // console.log('模块', mode);
  return [
    {
      field: 'code',
      label: '保养计划编号',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'applyUserName',
      label: '检修计划编号',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'planStatus',
      label: '计划状态',
    },
    {
      field: 'createByName',
      label: '创建人',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'name',
      label: '计划名称',
    },
    //
    {
      field: 'applyUserName',
      label: '检修类型',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'planDateStr',
      label: '计划生效时间',
    },
    {
      field: 'taskStartTime',
      label: '任务起始时间',
    },
    {
      field: 'taskCycle',
      label: '任务周期',
      // render: (data) => {
      //   return <span class="text-red-500">{data}</span>;
      // },
    },
    {
      field: 'taskExecute',
      label: '任务执行时长',
    },
    {
      field: 'workOrder',
      label: '工单生成及下发',
      render: (data) => {
        if (data === '1') {
          return <span>{'一次性全部生成并下发'}</span>;
        } else if (data === '2') {
          return <span>{'定时生成并下发'}</span>;
        } else if (data === '3') {
          return <span>{'按条数生成并下发'}</span>;
        }
      },
    },
    {
      field: 'adventRemind',
      label: '临期提醒',
    },
    {
      field: 'timeoutRemind',
      label: '超时提醒间隔',
    },
    {
      field: 'chargePeopleName',
      label: '计划负责人',
    },
    {
      field: 'designateType',
      label: '任务指派',
      render: (data) => {
        if (data === '1') {
          return <span>{'人员'}</span>;
        } else if (data === '2') {
          return <span>{'岗位'}</span>;
        }
      },
    },
    {
      field: 'dealDeptName',
      label: '处理部门',
    },
    {
      field: 'dealUserName',
      label: '处理人',
    },
    //
    {
      field: 'applyUserName',
      label: '检修方案',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '安全措施',
      show: (data) => mode === '3' || mode === '4',
    },
    {
      field: 'applyUserName',
      label: '检修质量标准',
      show: (data) => mode === '3' || mode === '4',
    },

    {
      field: 'upkeepType',
      label: '保养类型',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'upkeepStandard',
      label: '保养标椎',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'upkeepContent',
      label: '保养内容',
      show: (data) => mode === '1' || mode === '2',
    },
    {
      field: 'safeRule',
      label: '安全规则',
      show: (data) => mode === '1' || mode === '2',
    },

    {
      field: 'remark',
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
      show: (data) => mode === '1' && (state === '3' || state === '4'),
    },
    {
      field: 'applyUserName',
      label: '审核结果',
      show: (data) => mode === '1' && (state === '3' || state === '4'),
    },
    {
      field: 'applyUserName',
      label: '原因（备注）',
      show: (data) => mode === '1' && (state === '3' || state === '4'),
    },
  ];
}

//设备保养
export function tableDeviceColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '设备地点',
      dataIndex: 'districtName',
    },
    {
      title: '所属装置',
      dataIndex: 'facilitiesName',
    },
    {
      title: '设备类型',
      dataIndex: 'deviceTypeName',
    },
    {
      title: '是否特种设备',
      dataIndex: 'specialEquipment',
    },
  ];
}
//关联工单-检修计划管理
export function tableColumn(): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'name',
    },
    {
      title: '计划负责人',
      dataIndex: 'person',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
    },
    {
      title: '工单处理人',
      dataIndex: 'time',
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
      title: '是否延期',
      dataIndex: 'status',
    },
    {
      title: '完成时间',
      dataIndex: 'time',
    },
  ];
}
//关联工单-保养计划管理
export function tableColumns(): BasicColumn[] {
  return [
    {
      title: '工单编号',
      dataIndex: 'code',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '计划负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '工单处理人',
      dataIndex: 'dealUserName',
    },
    {
      title: '工单执行时间',
      dataIndex: 'executeTimeStr',
    },
    {
      title: '工单状态',
      dataIndex: 'workOrderStatus',
      customRender: ({ record }) => {
        if (record.workOrderStatus === '1') {
          //1：未开始
          return <Tag color={'default'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '2') {
          //2：待执行
          return <Tag color={'orange'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '3') {
          //3：待验收
          return <Tag color={'orange'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '4') {
          //4：已完成
          return <Tag color={'green'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '5') {
          //5：验收未通过
          return <Tag color={'red'}>{record.workOrderStatusText}</Tag>;
        } else if (record.workOrderStatus === '6') {
          //6：计划终止
          return <Tag color={'default'}>{record.workOrderStatusText}</Tag>;
        }
      },
    },
    {
      title: '工单延期',
      dataIndex: 'delayFlag',
      customRender: ({ record }) => {
        if (record.delayFlag === '0') {
          //0:否
          return <Tag color={'default'}>否</Tag>;
        } else if (record.delayFlag === '1') {
          //1：是
          return <Tag color={'default'}>是</Tag>;
        } else if (record.delayFlag === '2') {
          //2：延期审核
          return <Tag color={'red'}>延期审核</Tag>;
        }
      },
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
    },
  ];
}

export function getFormSchema(): FormSchema[] {
  return [
    {
      field: 'code',
      component: 'Input',
      label: '工单编号',
      componentProps: {
        placeholder: '请输入工单编号',
      },
    },
    {
      field: 'chargePeopleId',
      component: 'ApiSelect',
      label: '计划负责人',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择计划负责人',
        api: getPersonSelectApi,
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'dealUserName',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
        api: getPersonSelectApi,
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      field: 'executeTime',
      component: 'RangePicker',
      label: '工单执行时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'workOrderStatus',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
      },
    },
    {
      field: 'delayFlag',
      component: 'ApiSelect',
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
      },
    },
    {
      field: 'finishTime',
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

//选择备件-表格
export function partTableColumns(): BasicColumn[] {
  return [
    {
      title: '备件编码',
      dataIndex: 'name1',
    },
    {
      title: '备件名称',
      dataIndex: 'name2',
    },
    {
      title: '备件分类',
      dataIndex: 'name3',
    },
    {
      title: '规格型号',
      dataIndex: 'name4',
    },
    {
      title: '单位',
      dataIndex: 'name5',
    },
    {
      title: '库存',
      dataIndex: 'name6',
    },
  ];
}
//选择备件-表单
export function getPartFormSchema(): FormSchema[] {
  return [
    {
      field: 'name1',
      component: 'Input',
      label: '备件编码',
      componentProps: {
        placeholder: '请输入备件编码',
      },
    },
    {
      field: 'name2',
      component: 'Input',
      label: '备件名称',
      componentProps: {
        placeholder: '请输入备件编码',
      },
    },
    {
      field: 'name3',
      component: 'ApiSelect',
      label: '备件分类',
      componentProps: {
        placeholder: '请选择备件分类',
      },
    },
  ];
}

//保养结果详情
export function maintainSchemaDetail(): DescItem[] {
  return [
    {
      field: 'dealCase',
      label: '处理情况',
    },
    {
      field: 'imgArr',
      label: '图片',
      render: (data) => {
        if (data) {
          return (
            <>
              {data.map((item) => {
                return (
                  <div class={fileBox}>
                    <Image style={ImageBox} src={item.url} alt="" />
                  </div>
                );
              })}
            </>
          );
        } else {
          return <div style={noFileBox}>暂无图片</div>;
        }
      },
    },
    {
      field: 'finishTime',
      label: '保养完成时间',
    },
    {
      field: 'acceptPeopleIdList',
      label: '验收人',
    },
  ];
}

//验收结果详情
export function receiveSchemaDetail(): DescItem[] {
  return [
    {
      field: 'acceptResult',
      label: '验收结果',
    },
    {
      field: 'acceptContent',
      label: '验收内容',
    },
    {
      field: 'imgArr1',
      label: '图片',
      render: (data) => {
        if (data) {
          return (
            <>
              {data.map((item) => {
                return (
                  <div class={fileBox}>
                    <Image style={ImageBox} src={item.url} alt="" />
                  </div>
                );
              })}
            </>
          );
        } else {
          return <div style={noFileBox}>暂无图片</div>;
        }
      },
    },
  ];
}

//保养计划撤回
export function getRecallFormSchema(): FormSchema[] {
  return [
    {
      field: 'revokeReason',
      component: 'InputTextArea',
      label: '撤回原因',
      required: true,
      componentProps: {
        placeholder: '请输入撤回原因',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'revokeRemark',
      component: 'InputTextArea',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
        maxlength: 200,
      },
    },
  ];
}
//保养计划审核-拒绝、同意
export function agreeFormSchema(): FormSchema[] {
  return [
    {
      field: 'approvalRemark',
      component: 'InputTextArea',
      label: '同意原因',
      required: true,
      componentProps: {
        placeholder: '请输入同意原因',
        rows: 6,
        maxlength: 200,
      },
    },
  ];
}
export function rejectFormSchema(): FormSchema[] {
  return [
    {
      field: 'approvalRemark',
      component: 'InputTextArea',
      label: '拒绝原因',
      required: true,
      componentProps: {
        placeholder: '请输入拒绝原因',
        rows: 6,
        maxlength: 200,
      },
    },
  ];
}
//保养计划停止
export function getPlanFormSchema(): FormSchema[] {
  return [
    {
      field: 'stopReason',
      component: 'InputTextArea',
      label: '停止原因',
      required: true,
      componentProps: {
        placeholder: '请输入停止原因',
        rows: 4,
        maxlength: 200,
      },
    },
    {
      field: 'stopRemark',
      component: 'InputTextArea',
      label: '备注',
      componentProps: {
        placeholder: '请输入备注',
        rows: 4,
        maxlength: 200,
      },
    },
  ];
}

//工单信息-延期申请
export function ApplySchemaDetail(): DescItem[] {
  return [
    {
      field: 'oldEndTime',
      label: '原截至时间',
    },
    {
      field: 'delayTime',
      label: '延期时间',
    },
    {
      field: 'delayReason',
      label: '延期原因',
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
