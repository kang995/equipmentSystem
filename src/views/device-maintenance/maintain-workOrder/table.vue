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
            auth: 'device:upkeepWorkOrder:delayAudit',
          },
          {
            label: '重新下发',
            onClick: handleAgain.bind(null, record),
            ifShow: () => {
              return props.ifIssue && record.workOrderStatus === '2'; // 根据业务控制是否显示
            },
            auth: 'device:upkeepWorkOrder:anewIssue',
          },
          {
            label: '申请延期',
            onClick: handlePostpone.bind(null, record),
            ifShow: () => {
              return !props.ifIssue && record.workOrderStatus === '2'; // 根据业务控制是否显示
            },
            auth: 'device:upkeepWorkOrder:applyDelay',
          },
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            auth: 'device:upkeepWorkOrder:detail',
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
            v-if="hasPermission(['device:upkeepWorkOrder:export'])"
            >批量导出</a-button
          >
        </a-tooltip>
      </div>
    </template>
  </BasicTable>
  <!-- 申请延期 -->
  <maintainModel @register="maintainModal" @postponeEvent="handlePostpones" />
  <!-- 重新下发 -->
  <IssueModel @register="IssuedModal" @Event="handleIssue" />
  <!-- 延期审核 -->
  <delayModal @register="delayModals" @events="handleDelay" />
</template>
<script setup lang="ts">
  import { useModal } from '/@/components/Modal';
  import IssueModel from '/@/views/corrective-maintenance/repair-workOrder/module/IssuedModal.vue';
  import maintainModel from './module/maintainModal.vue';
  import delayModal from '/@/views/device-service/components/petitioner/postponeModal.vue';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    getPlanListApi,
    upkeepExportApi,
    upkeepAnewIssueApi,
    upkeepDelayAuditApi,
    upkeepApplyDelayApi,
  } from '/@/api/device-maintenance/work';
  import { usePermission } from '/@/hooks/web/usePermission';
  import dayjs from 'dayjs';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const [delayModals, { openModal: openDelayModal }] = useModal();
  const [IssuedModal, { openModal: openIssuedModal }] = useModal();
  const [maintainModal, { openModal: openMaintainModal }] = useModal();
  const router = useRouter();
  const route = useRoute();
  const timeFlag = route.query.timeFlag as string;
  const ATooltip = Tooltip;
  const props = defineProps<{
    ifIssue?: any;
  }>();

  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    api: getPlanListApi,
    searchInfo: {
      type: props.ifIssue ? '0' : '1', //0：负责工单；1：执行工单
    },
    columns: tableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:upkeepWorkOrder:delayAudit',
        'device:upkeepWorkOrder:anewIssue',
        'device:upkeepWorkOrder:applyDelay',
        'device:upkeepWorkOrder:detail',
      ]),
    },
    formConfig: {
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['executeTime', ['executeStartTime', 'executeEndTime'], 'YYYY-MM-DD'],
        ['finishTime', ['finishStartTime', 'finishEndTime'], 'YYYY-MM-DD'],
      ],
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'gonggong_sousuo|svg',
      },
      baseColProps: {
        span: 6,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });
  onMounted(() => {
    timeFlag &&
      getForm().setFieldsValue({
        executeTime: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
        finishTime: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      });
  });
  //详情
  function handleDetails(record) {
    router.push({
      name: 'workOrderDetail',
      query: {
        id: record.id,
        identity: props.ifIssue ? '1' : '2', //负责人：1、执行人：2
        status: record.workOrderStatus, //1：未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
        delayFlag: record.delayFlag, //工单延期-- 0:否 1：是 2：延期审核
        // status: '1', //待执行：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5
      },
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
    upkeepDelayAuditApi(data)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        openDelayModal(false);
        reload();
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
    console.log('data', data);
    upkeepAnewIssueApi(data)
      .then(() => {
        createMessage.success('已重新下发');
      })
      .finally(() => {
        openIssuedModal(false);
        reload();
      });
  }
  //申请延期
  function handlePostpone(record) {
    openMaintainModal(true, {
      id: record.id,
      title: '保养工单延期申请',
    });
  }
  //申请延期-确认
  function handlePostpones(data) {
    upkeepApplyDelayApi(data)
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
    upkeepExportApi(data)
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
