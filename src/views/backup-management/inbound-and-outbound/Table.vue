<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '查看明细',
            onClick: handleDetail.bind(null, record),
            delBtn: true,
          },
          {
            label: '作废',
            onClick: handleDetail.bind(null, record),
            delBtn: true,
          },
          {
            label: '删除',
            onClick: handleDetail.bind(null, record),
            delBtn: true,
          },
        ]"
    /></template>
    <template #tableTitle>
      <a-button
        type="primary"
        preIcon="gonggong_tianjia_xianxing|svg"
        @click="handleAdd"
        class="mr-4"
        >新增</a-button
      >

      <a-button :loading="exportLoading" class="mr-4">批量导入</a-button>
      <a-tooltip>
        <template #title>不选择即导出全部数据</template>
        <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
      </a-tooltip>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import {
    columnsIssue,
    columnsWarehousing,
    formSchemaIssue,
    formSchemaWarehousing,
  } from '../data';
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    ifIssue?: any; //出库
  }>();
  const dataSource = ref([{}]);
  const dataSource1 = ref([{}]);

  const [register] = useTable({
    dataSource: props.ifIssue ? dataSource : dataSource1,
    columns: props.ifIssue ? columnsIssue : columnsWarehousing,
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
      schemas: props.ifIssue ? formSchemaIssue : formSchemaWarehousing,
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
  const emit = defineEmits(['exportTable']);
  function exportTable() {
    emit('exportTable');
  }
  function handleAdd() {}
  function handleDetail() {}
</script>
<style scoped lang="less"></style>
