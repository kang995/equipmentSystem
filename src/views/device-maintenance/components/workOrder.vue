<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '重新下发',
              onClick: handleAgain.bind(null, record),
              ifShow: () => {
                return mode === '1' && record.workOrderStatus === '2'; // 根据业务控制是否显示
              },
            },
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <div class="flex flex-1 space-x-4">
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
    <!-- 重新下发 -->
    <IssueModel @register="IssuedModal" @Event="handleIssue" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import IssueModel from '/@/views/corrective-maintenance/repair-workOrder/module/IssuedModal.vue';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, tableColumn, getFormSchema } from './fileld';
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    getPlanListApi,
    upkeepExportApi,
    upkeepAnewIssueApi,
  } from '/@/api/device-maintenance/work';
  import { UpkeepWorkOrderListApi, UpkeepWorkOrderExportApi } from '/@/api/device-service/service';
  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const mode = route.query?.mode as string; //保养计划：1、检修计划：3、
  const ATooltip = Tooltip;

  const [IssuedModal, { openModal: openIssuedModal }] = useModal();
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    api: mode === '1' ? getPlanListApi : UpkeepWorkOrderListApi,
    // searchInfo: {
    //   upkeepPlanId: id, //保养计划id
    // },
    // 请求之前对参数进行处理
    beforeFetch: (res) => {
      const arg = mode === '1' ? 'upkeepPlanId' : 'overhaulPlanId'; //保养计划id、检修计划id
      res[arg] = id;
      return res;
    },
    columns: mode === '1' ? tableColumns() : tableColumn(),
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
    },
    formConfig: {
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['executeTime', ['executeStartTime', 'executeEndTime'], 'YYYY-MM-DD HH:mm:ss'],
        ['finishTime', ['finishStartTime', 'finishEndTime'], 'YYYY-MM-DD HH:mm:ss'],
      ],
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
    },
  });
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

  //详情
  function handleDetails(record) {
    router.push({
      name: mode === '1' ? 'workOrderDetail' : 'overhaulDetail',
      query: {
        id: record.id,
        identity: '1', //负责人：1、执行人：2
        status: record.workOrderStatus, //1：未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
        delayFlag: record.delayFlag, //工单延期-- 0:否 1：是 2：延期审核
      },
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
      // upkeepPlanId: id,
    };
    const arg = mode === '1' ? 'upkeepPlanId' : 'overhaulPlanId'; //保养计划id、检修计划id
    data[arg] = id;
    Object.assign(data, getForm().getFieldsValue());
    (mode === '1' ? upkeepExportApi(data) : UpkeepWorkOrderExportApi(data))
      .then((res) => {
        if (res) {
          const filename = '关联工单列表.xlsx';
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
