<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <!-- 状态未下发：下发，查看 ，删除-->
        <!-- 状态进行中：查看 -->
        <!-- 状态已完成/已作废：查看 ，删除-->

        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              //二次确认
              label: '下发',
              delBtn: true,
            },
            {
              label: '查看',
              onClick: handleDetails.bind(null, record),
              delBtn: true,
            },
            {
              label: '作废',
              delBtn: true,
            },
            {
              label: '删除',
              delBtn: true,
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" class="mr-4">新增盘点</a-button>
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
        </a-tooltip>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { inventoryColumns, inventoryFormSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: inventoryColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: inventoryFormSchema,
      autoSubmitOnEnter: true,
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
      name: 'InventoryDetails',
    });
  }
  function handleAdd() {
    router.push({
      name: 'InventoryAdd',
    });
  }
  function exportTable() {}
</script>
<style scoped lang="less"></style>
