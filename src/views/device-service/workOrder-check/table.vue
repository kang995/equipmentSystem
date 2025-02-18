<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
            ifShow: () => {
              return !props.ifIssue;
            },
          },
          {
            label: '验收',
            onClick: handleCheck.bind(null, record),
            ifShow: () => {
              return props.ifIssue;
            },
            auth: 'device:overhaulWorkOrderAccept:saveAcceptResult',
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <div class="flex flex-1 space-x-4">
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <template v-if="props.ifIssue">
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:overhaulWorkOrderAccept:stayAcceptExport'])"
            >
              批量导出
            </a-button>
          </template>
          <template v-else>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:overhaulWorkOrderAccept:acceptExport'])"
            >
              批量导出
            </a-button>
          </template>
        </a-tooltip>
      </div>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref } from 'vue';
  import {
    AcceptStayListApi,
    AcceptArreadyListApi,
    AcceptStayExportListApi,
    AcceptArreadyExportListApi,
  } from '/@/api/device-service/service';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const ATooltip = Tooltip;
  const router = useRouter();
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
  const [register, { getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    api: props.ifIssue ? AcceptStayListApi : AcceptArreadyListApi,
    columns: tableColumns(props.ifIssue, handleClick),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    inTabs: true,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission(['device:overhaulWorkOrderAccept:saveAcceptResult']),
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
          marginLeft: '35px',
        },
      },
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['Time', ['executeStartTime', 'executeEndTime'], 'YYYY-MM-DD'],
      ],
    },
  });
  //验收
  function handleCheck(record) {
    router.push({
      name: 'checkDetail',
      query: {
        id: record.id,
        // status: props.ifIssue ? '1' : '2', //待验收：1、已验收：2
      },
    });
  }
  //详情
  function handleDetail(record) {
    router.push({
      name: 'checkDetail',
      query: {
        id: record.id,
        // status: props.ifIssue ? '1' : '2', //待验收：1、已验收：2
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
    };
    Object.assign(data, getForm().getFieldsValue());
    (props.ifIssue ? AcceptStayExportListApi(data) : AcceptArreadyExportListApi(data))
      .then((res) => {
        if (res) {
          const filename = props.ifIssue ? '待验收工单列表.xlsx' : '已验收工单列表.xlsx';
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
