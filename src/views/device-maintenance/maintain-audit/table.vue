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
              return record.approvalButtonShow === true;
            },
            auth: 'device:upkeepPlanApproval:approval',
          },
          {
            label: '详情',
            onClick: handleAudit.bind(null, record),
            ifShow: () => {
              return record.approvalStatus !== '2';
            },
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  // import { ref } from 'vue';
  import { getProcessingListApi, getProcessedListApi } from '/@/api/device-maintenance/index';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const router = useRouter();
  const props = defineProps<{
    ifIssue?: any;
  }>();

  // const dataSource = ref<any>([]);
  const [register] = useTable({
    // dataSource: dataSource,
    api: props.ifIssue ? getProcessingListApi : getProcessedListApi,
    columns: tableColumns(),
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
      defaultHidden: !hasPermission(['device:upkeepPlanApproval:approval']),
    },
    formConfig: {
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
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

  function handleAudit(record) {
    router.push({
      name: 'maintainDetails',
      query: {
        id: record.id,
        status: record.approvalStatus, //审核状态（1：待提交；2：审核中；3：审核通过；4：审核拒绝）
        mode: '2', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
        fullSubmitId: record.fullSubmitId, //审批流程id
      },
    });
  }
</script>
<style scoped lang="less"></style>
