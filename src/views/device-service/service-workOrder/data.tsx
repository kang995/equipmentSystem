import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import chargeOrder from './chargeOrder/index.vue';
import executeOrder from './executeOrder/index.vue';
import { Image, Tag, Badge, Row } from 'ant-design-vue';
import {
  getDictionarySelectTypeApi,
  getPersonSelectApi,
  getRelevancesApi,
} from '/@/api/device-maintenance/index';
// import { whetherShowApi } from '/@/api/device-service/service';
import { usePermission } from '/@/hooks/web/usePermission';
const { hasPermission } = usePermission();
export interface TabItem {
  key: string;
  name: string;
  component: any;
}
export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '负责工单',
    component: chargeOrder,
  },
  {
    key: '2',
    name: '执行工单',
    component: executeOrder,
  },
];
//根据状态判断当前用户身份
(() => {
  //设备检修-负责工单:device:overhaulWorkOrder:responsible 设备检修-执行工单:device:overhaulWorkOrder:execute
  if (
    hasPermission(['device:overhaulWorkOrder:responsible']) &&
    hasPermission(['device:overhaulWorkOrder:execute'])
  ) {
  } else if (hasPermission(['device:overhaulWorkOrder:responsible'])) {
    achieveList.splice(1, 1);
  } else if (hasPermission(['device:overhaulWorkOrder:execute'])) {
    achieveList.splice(0, 1);
    achieveList[0].key = '1';
  }
})();

// (() => {
//   const identity = '3'; //1负责人 2执行人 3具有两者身份
//   if (identity === '1') {
//     achieveList.splice(1, 1);
//   } else if (identity === '2') {
//     achieveList.splice(0, 1);
//     achieveList[0].key = '1';
//   }
// })();

//列表
export function tableColumns(ifIssue: any, handleClick: Function): BasicColumn[] {
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
      title: '关联计划',
      dataIndex: 'overhaulPlanName',
      customRender({ record }) {
        return (
          <a class="pointer" onClick={handleClick.bind(null, record)}>
            {record.overhaulPlanName}
          </a>
        );
      },
    },
    {
      title: '工单状态',
      dataIndex: 'workOrderStatus',
      customRender: ({ record }) => {
        if (record.workOrderStatus === '1') {
          //1：未开始
          return <Badge status="default" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '2') {
          //2：待执行
          return <Badge color="gold" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '3') {
          //3：待验收
          return <Badge color="yellow" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '4') {
          //4：已完成
          return <Badge status="success" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '5') {
          //5：验收未通过
          return <Badge status="error" text={record.workOrderStatusText} />;
        } else if (record.workOrderStatus === '6') {
          //6：计划终止
          return <Badge status="default" text={record.workOrderStatusText} />;
        }
      },
    },
    {
      title: '是否延期',
      dataIndex: 'delayFlagText',
      // customRender: ({ record }) => {
      //   if (record.delayFlag === '0') {
      //     //0:否
      //     return <Tag color={'default'}>{record.delayFlagText}</Tag>;
      //   } else if (record.delayFlag === '1') {
      //     //1：是
      //     return <Tag color={'default'}>{record.delayFlagText}</Tag>;
      //   } else if (record.delayFlag === '2') {
      //     //2：延期审核
      //     return <Tag color={'red'}>{record.delayFlagText}</Tag>;
      //   }
      // },
    },
    //
    {
      title: '是否关联故障',
      dataIndex: 'troubleFlag',
      ifShow: ({}) => ifIssue,
    },
    {
      title: '完成时间',
      dataIndex: 'finishTime',
      customRender: ({ record }) => {
        return record.finishTime ? record.finishTime : '--';
      },
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
        placeholder: '请输入检修计划编号',
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
      componentProps: {
        // showTime: true,
        format: 'YYYY-MM-DD',
        // format: 'YYYY-MM-DD',
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
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'overhaulPlanId',
      component: 'ApiSelect',
      label: '关联计划',
      labelWidth: 96,
      componentProps: {
        placeholder: '请选择关联计划',
        api: getRelevancesApi,
        // params: {
        //   type: 'DELAY_FLAG',
        // },
        resultField: 'data', //后台返回数据字段
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        optionFilterProp: 'label',
      },
    },
  ];
}

// 工单信息
export function WorkDetail(handleRouteDetails): DescItem[] {
  return [
    {
      field: 'code',
      label: '工单编号',
    },
    {
      field: 'overhaulPlanName',
      label: '关联检修计划',
      render: (val) => {
        return <a onClick={handleRouteDetails}>{val}</a>;
      },
    },
    {
      field: 'chargePeopleName',
      label: '计划负责人',
    },
    {
      field: 'createTime',
      label: '下发时间',
    },
    {
      field: 'executeStartTime',
      label: '工单执行时间',
      render: (_curVal, data) => {
        return `${data.executeStartTime}至${data.executeEndTime}`;
      },
    },
    {
      field: 'workOrderStatusText',
      label: '工单状态',
    },
    {
      field: 'dealDeptName',
      label: '处理部门',
    },
    {
      field: 'dealUserName',
      label: '处理人',
    },
    {
      field: 'finishTime',
      label: '完成时间',
      span: 3,
      render: (curVal) => {
        return curVal ? curVal : '--';
      },
    },
  ];
}
// 检修明细
export function WorkDetails(): DescItem[] {
  return [
    {
      field: 'overhaulTypeText',
      label: '检修类型',
    },
    {
      field: 'overhaulContent',
      label: '检修方案',
    },
    {
      field: 'safeRule',
      label: '安全措施',
    },
    {
      field: 'overhaulStandard',
      label: '检修质量标椎',
    },
    {
      field: 'remark',
      label: '备注',
      span: 3,
    },
  ];
}
//检修设备
export function deviceTableColumns(): BasicColumn[] {
  return [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '所在区域',
      dataIndex: 'districtName',
      customRender: ({ record }) => {
        if (record.districtName) {
          return <span>{record.districtName}</span>;
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '所属装置',
      dataIndex: 'facilitiesName',
      customRender: ({ record }) => {
        if (record.facilitiesName) {
          return <span>{record.facilitiesName}</span>;
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '是否特种设备',
      dataIndex: 'specialEquipment',
    },
  ];
}
//工单信息-检修结果
export function getAcceptFormSchema(): FormSchema[] {
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
      // required: ({}) => status === '1',
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
      // ifShow: ({}) => status !== '1',
    },
  ];
}
//关联故障-故障详情
export function WorkInfoSchema(): DescItem[] {
  return [
    {
      field: 'troubleCode',
      label: '故障单号',
    },
    {
      field: 'troubleStatusText',
      label: '故障状态',
    },
    {
      field: 'createByName',
      label: '上报人',
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'createTime',
      label: '上报时间',
    },
    {
      field: 'findTime',
      label: '发现故障时间',
    },
    {
      field: 'deviceName',
      label: '关联设备',
    },
    {
      field: 'plantName',
      label: '所属装置设施',
    },
    {
      field: 'position',
      label: '地理位置',
    },
    {
      field: 'troubleTypeText',
      label: '故障类别',
    },
    {
      field: 'urgentLevelText',
      label: '紧急程度',
    },
    {
      field: 'description',
      label: '故障描述',
    },
    {
      field: 'expression',
      label: '表新症状',
    },
    {
      field: 'reason',
      label: '故障原因',
    },
    {
      field: 'measure',
      label: '采取措施',
    },
    {
      field: 'imgList',
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
  ];
}

// const titleStyle: any = {
//     paddingTop: '16px',
//     fontSize: '15px',
//     fontWeight: '600',
//     position: 'relative',
//     left: '0px',
//   },
//   ImageBox: any = {
//     width: '80px',
//   };
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
