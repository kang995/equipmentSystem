<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '审核',
            onClick: handleAudit.bind(null, record),
            ifShow: () => {
              return props.ifIssue && record.workOrderStatus === '2' && record.delayFlag === '2'; // 根据业务控制是否显示
            },
            auth: 'device:overhaulWorkOrder:delayAudit',
          },
          {
            label: '重新下发',
            onClick: handleAgain.bind(null, record),
            ifShow: () => {
              return props.ifIssue && record.workOrderStatus === '2'; // 根据业务控制是否显示
            },
            auth: 'device:overhaulWorkOrder:anewIssue',
          },
          {
            label: '申请延期',
            onClick: handlePostpone.bind(null, record),
            ifShow: () => {
              return !props.ifIssue && record.workOrderStatus === '2'; // 根据业务控制是否显示
            },
            auth: 'device:overhaulWorkOrder:applyDelay',
          },
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            auth: 'device:overhaulWorkOrder:detail',
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <div class="flex flex-1 space-x-4">
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button
            @click="exportTable"
            :loading="exportLoading"
            v-if="hasPermission(['device:overhaulWorkOrder:export'])"
            >批量导出</a-button
          >
        </a-tooltip>
      </div>
    </template>
  </BasicTable>
  <!-- 申请延期 -->
  <maintainModel @register="maintainModal" @postpone-event="handlePostpones" />
  <!-- 重新下发 -->
  <IssueModel @register="IssuedModal" @event="handleIssue" />
  <!-- 延期审核 -->
  <delayModal @register="delayModals" @events="handleDelay" />
</template>
<script setup lang="ts">
  import { useModal } from '/@/components/Modal';
  // import maintainModel from './module/maintainModal.vue';
  import maintainModel from '/@/views/device-maintenance/maintain-workOrder/module/maintainModal.vue';
  import IssueModel from '/@/views/corrective-maintenance/repair-workOrder/module/IssuedModal.vue';
  import delayModal from '/@/views/device-service/components/petitioner/postponeModal.vue';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    UpkeepWorkOrderListApi,
    UpkeepWorkOrderExportApi,
    UpkeepWorkOrderAnewIssueApi,
    UpkeepWorkOrderDelayAuditApi,
    UpkeepWorkOrderApplyDelayApi,
  } from '/@/api/device-service/service';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { getTimeByType } from '/@/utils/public';
  const { hasPermission } = usePermission();
  const [maintainModal, { openModal: openMaintainModal }] = useModal();
  const [delayModals, { openModal: openDelayModal }] = useModal();
  const [IssuedModal, { openModal: openIssuedModal }] = useModal();
  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const Btnvalue = route.query.Btnvalue as string;
  const ATooltip = Tooltip;
  const props = defineProps<{
    ifIssue?: any;
  }>();
  //关联计划跳转
  const handleClick = (record) => {
    router.push({
      name: 'planManagementDetails',
      query: {
        id: record.overhaulPlanId,
        status: record.approvalStatus, //审核状态
        mode: '3',
      },
    });
  };
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    api: UpkeepWorkOrderListApi,
    searchInfo: {
      type: props.ifIssue ? '0' : '1', //0：负责工单；1：执行工单
    },
    columns: tableColumns(props.ifIssue, handleClick),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:overhaulWorkOrder:delayAudit',
        'device:overhaulWorkOrder:anewIssue',
        'device:overhaulWorkOrder:applyDelay',
        'device:overhaulWorkOrder:detail',
      ]),
    },
    formConfig: {
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'sousuo|svg',
      },
      baseColProps: {
        span: 6,
      },
      rowProps: {
        gutter: 16,
      },
      actionColOptions: {
        span: 6,
        style: {
          textAlign: 'left',
        },
      },
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['executeTime', ['executeStartTime', 'executeEndTime'], 'YYYY-MM-DD'],
        ['finishTime', ['finishStartTime', 'finishEndTime'], 'YYYY-MM-DD'],
      ],
    },
  });
  onMounted(() => {
    Btnvalue &&
      getForm().setFieldsValue({
        executeTime: handleFun(Btnvalue),
        // finishTime: handleFun(Btnvalue),
      });
  });
  //日期
  function handleFun(num) {
    return {
      '1': getTimeByType('day'),
      '2': getTimeByType('week'),
      '3': getTimeByType('month'),
      '5': getTimeByType('year'),
    }[num];
  }
  //详情
  function handleDetails(record) {
    router.push({
      name: 'overhaulDetail',
      query: {
        id: record.id,
        identity: props.ifIssue ? '1' : '2', //负责人：1、执行人：2
        status: record.workOrderStatus, //1：未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
        delayFlag: record.delayFlag, //工单延期-- 0:否 1：是 2：延期审核
        // status: '1', //待执行：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5、未开始：6、计划终止：7
      },
    });
  }
  //重新下发
  function handleAgain(record) {
    openIssuedModal(true, {
      id: record.id,
    });
  }
  //重新下发-确认
  function handleIssue(data) {
    // console.log('data', data);
    UpkeepWorkOrderAnewIssueApi(data)
      .then(() => {
        createMessage.success('已重新下发');
      })
      .finally(() => {
        openIssuedModal(false);
        reload();
      });
  }
  //延期审核
  function handleAudit(record) {
    openDelayModal(true, {
      id: record.id,
    });
  }
  //延期审核-确认
  function handleDelay(data) {
    console.log('data11', data);
    UpkeepWorkOrderDelayAuditApi(data)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        openDelayModal(false);
        reload();
      });
  }
  //申请延期
  function handlePostpone(record) {
    openMaintainModal(true, {
      executeEndTime: record.executeEndTime,
      id: record.id,
      title: '检修工单延期申请',
    });
  }
  //申请延期-确认
  function handlePostpones(data) {
    UpkeepWorkOrderApplyDelayApi(data)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        openMaintainModal(false);
        reload();
      });
  }
  //导出
  const exportLoading = ref(false);
  function exportTable() {
    const { current, pageSize } = getPaginationRef() as PaginationProps;
    exportLoading.value = true;
    let data = {
      page: current,
      pageSize: pageSize,
      ids: getSelectRowKeys(),
    };
    Object.assign(data, getForm().getFieldsValue());
    UpkeepWorkOrderExportApi(data)
      .then((res) => {
        if (res) {
          const filename = props.ifIssue ? '负责工单列表.xlsx' : '执行工单列表.xlsx';
          downloadByData(res.data, filename);
          createMessage.success('导出成功');
        } else {
          createMessage.error('导出失败');
        }
      })
      .finally(() => {
        exportLoading.value = false;
      });
  }
</script>
<style scoped lang="less"></style>
