import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { getPersonSelectApi, getDictionarySelectTypeApi } from '/@/api/device-maintenance/index';
import { Image, Tag } from 'ant-design-vue';

//保养基本信息
export function infoDetails(_state: string, mode: string): DescItem[] {
  return [
    {
      field: 'code',
      label: '保养计划编号',
      show: () => mode === '1' || mode === '2',
    },
    {
      field: 'code',
      label: '检修计划编号',
      show: () => mode === '3' || mode === '4',
    },
    {
      field: 'planStatusText',
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
    {
      field: 'effectStartDate',
      label: '计划生效时间',
      render: (val, data) => {
        if (val && data.effectEndDate) {
          return val + '至' + data.effectEndDate;
        } else {
          return '';
        }
      },
    },
  ];
}

//保养计划详情
export function MaintainDetail(_state: string, mode: string): DescItem[] {
  // console.log('模块', mode);
  return [
    {
      field: 'overhaulTypeText',
      label: '检修类型',
      show: () => mode === '3' || mode === '4',
    },
    {
      field: 'taskStartTime',
      label: '任务起始时间',
    },
    {
      field: 'taskCycle',
      label: '任务周期',
      render: (_curVal, data) => {
        if (data.taskCycle && data.taskCycleUnitText) {
          return `${data.taskCycle}/${data.taskCycleUnitText}`;
        } else {
          return '';
        }
      },
      show: (values) => {
        return values.overhaulType === '1' ? false : true; //0:周期 1：单次
      },
    },
    {
      field: 'taskExecute',
      label: '任务执行时长',
      render: (_curVal, data) => {
        if (data.taskExecute && data.taskExecuteUnitText) {
          return `${data.taskExecute}/${data.taskExecuteUnitText}`;
        } else {
          return '';
        }
      },
    },
    {
      field: 'workOrder',
      label: '工单下发',
      render: (curVal, data) => {
        if (curVal === '1') {
          return <span>{'一次性全部生成并下发'}</span>;
        } else if (curVal === '2') {
          return <span>{'定时生成并下发'}</span>;
        } else if (curVal === '3') {
          return <span>{`按${data.workOrderNum}条生成并下发`}</span>;
        }
      },
      show: (values) => {
        return values.overhaulType === '1' ? false : true; //0:周期 1：单次
      },
    },
    {
      field: 'adventRemind',
      label: '临期提醒',
      render: (_curVal, data) => {
        if (data.adventRemindUnit && data.adventRemindUnitText) {
          return `${data.adventRemindUnit}/${data.adventRemindUnitText}`;
        } else {
          return '';
        }
      },
    },
    {
      field: 'timeoutRemind',
      label: '超时提醒间隔',
      render: (_curVal, data) => {
        if (data.adventRemindUnit && data.adventRemindUnitText) {
          return `${data.timeoutRemindUnit}/${data.timeoutRemindUnitText}`;
        } else {
          return '';
        }
      },
    },
    {
      field: 'chargePeopleName',
      label: '计划负责人',
    },
    {
      field: 'designateTypeText',
      label: '任务指派',
      // render: (data) => {
      //   if (data === '1') {
      //     return <span>{'人员'}</span>;
      //   } else if (data === '2') {
      //     return <span>{'岗位'}</span>;
      //   }
      // },
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
      field: 'overhaulContent',
      label: '检修方案',
      show: () => mode === '3' || mode === '4',
    },
    {
      field: 'safeRule',
      label: '安全措施',
      show: () => mode === '3' || mode === '4',
    },
    {
      field: 'overhaulStandard',
      label: '检修质量标准',
      show: () => mode === '3' || mode === '4',
    },

    {
      field: 'upkeepTypeText',
      label: '保养类型',
      show: () => mode === '1' || mode === '2',
    },
    {
      field: 'upkeepStandard',
      label: '保养标椎',
      show: () => mode === '1' || mode === '2',
    },
    {
      field: 'upkeepContent',
      label: '保养内容',
      show: () => mode === '1' || mode === '2',
    },
    {
      field: 'safeRule',
      label: '安全规则',
      show: () => mode === '1' || mode === '2',
    },
    {
      field: 'remark',
      label: '备注',
      span: 2,
    },
  ];
}
//保养计划审核信息
export function MaintainDetails(): DescItem[] {
  return [
    {
      field: 'approvalStatusText',
      label: '审核结果',
      render: (curVal, data) => {
        if (data.approvalStatus === '3') {
          return <span class={'text-green-500'}>{curVal}</span>;
        } else {
          return <span class={'text-red-500'}>{curVal}</span>;
        }
      },
    },
    {
      field: 'approvalRemark',
      label: '原因（备注）',
    },
  ];
}
//检修计划审核信息
export function ServiceDetails(): DescItem[] {
  return [
    {
      field: 'approvalStatusText', //审核结果（0：通过；1：拒绝）
      label: '审核结果',
      render: (curVal, data) => {
        if (data.approvalStatus === '3') {
          return <span class={'text-green-500'}>{curVal}</span>;
        } else {
          return <span class={'text-red-500'}>{curVal}</span>;
        }
      },
    },
    {
      field: 'approvalRemark',
      label: '原因（备注）',
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
      customRender: ({ text }) => {
        return text ? text : '--';
      },
    },
    {
      title: '所属装置',
      dataIndex: 'facilitiesName',
      customRender: ({ text }) => {
        return text ? text : '--';
      },
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
      dataIndex: 'code',
    },
    {
      title: '计划负责人',
      dataIndex: 'chargePeopleName',
    },
    {
      title: '下发时间',
      dataIndex: 'createTime',
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
      title: '关联计划',
      dataIndex: 'upkeepPlanName',
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
      title: '是否延期',
      dataIndex: 'delayFlag',
      customRender: ({ record }) => {
        if (record.delayFlag === '0') {
          //0:否
          return <Tag color={'default'}>{record.delayFlagText}</Tag>;
        } else if (record.delayFlag === '1') {
          //1：是
          return <Tag color={'default'}>{record.delayFlagText}</Tag>;
        } else if (record.delayFlag === '2') {
          //2：延期审核
          return <Tag color={'red'}>{record.delayFlagText}</Tag>;
        }
      },
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
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
      title: '下发时间',
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
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'dealPeopleId',
      component: 'ApiSelect',
      label: '工单处理人',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择工单处理人',
        api: getPersonSelectApi,
        // mode: 'multiple',
        params: {
          // type: 'APPROVAL_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'executeTime',
      component: 'RangePicker',
      label: '工单执行时间',
      labelWidth: 96,
      componentProps: {
        // showTime: true,
        // format: 'YYYY-MM-DD HH:mm:ss',
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'workOrderStatus',
      component: 'ApiSelect',
      label: '工单状态',
      componentProps: {
        placeholder: '请选择工单状态',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'WORK_ORDER_STATUS',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
    {
      field: 'delayFlag',
      component: 'ApiSelect',
      label: '工单延期',
      labelWidth: 80,
      componentProps: {
        placeholder: '请选择工单延期',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'DELAY_FLAG',
        },
        resultField: 'data', //后台返回数据字段
        labelField: 'itemName',
        valueField: 'itemValue',
        showSearch: true,
        optionFilterProp: 'label',
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
    // {
    //   title: '备件编码',
    //   dataIndex: 'spareCode',
    // },
    {
      title: '备件名称',
      dataIndex: 'spareName',
    },
    {
      title: '备件分类',
      dataIndex: 'spareClassify',
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
    },
    {
      title: '单位',
      dataIndex: 'measureUnitText',
    },
    {
      title: '库存',
      dataIndex: 'inventorySum',
    },
  ];
}
//选择备件-表单
export function getPartFormSchema(): FormSchema[] {
  return [
    // {
    //   field: 'spareCode',
    //   component: 'Input',
    //   label: '备件编码',
    //   componentProps: {
    //     placeholder: '请输入备件编码',
    //   },
    // },
    {
      field: 'spareName',
      component: 'Input',
      label: '备件名称',
      componentProps: {
        placeholder: '请输入备件名称',
      },
    },
    {
      field: 'spareClassify',
      component: 'ApiSelect',
      label: '备件分类',
      componentProps: {
        placeholder: '请选择备件分类',
        api: getDictionarySelectTypeApi,
        params: {
          type: 'SPARE_TYPE',
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

//保养结果详情
export function maintainSchemaDetail(): DescItem[] {
  return [
    {
      field: 'dealCase',
      label: '处理情况',
    },
    {
      field: 'dealImgList',
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
      field: 'acceptPeopleNameStr',
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
      field: 'acceptTime',
      label: '验收时间',
    },
    {
      field: 'acceptPeopleNameStr',
      label: '验收人',
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
