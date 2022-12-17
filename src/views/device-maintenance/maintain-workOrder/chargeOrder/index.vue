<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '重新下发',
            onClick: handleAgain.bind(null, record),
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
  <basicModel @register="IssuedModal" />
</template>
<script setup lang="ts">
  import { useModal } from '/@/components/Modal';
  import basicModel from '/@/views/corrective-maintenance/repair-workOrder/module/IssuedModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const [IssuedModal, { openModal: openIssuedModal }] = useModal();
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}, {}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
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

  function handleDetails() {
    router.push({
      name: 'workOrderDetail',
      query: {
        identity: '1', //负责人：1、执行人：2
        status: '1', //待执行：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5、未开始：6、计划终止：7
      },
    });
  }
  //重新下发
  function handleAgain() {
    openIssuedModal(true, {});
  }
  function exportTable() {}
</script>
<style scoped lang="less"></style>
