<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <slot name="tableAction" :record="record"></slot>
    </template>
    <template #tableTitle>
      <a-tooltip>
        <template #title>不选择即导出全部数据</template>
        <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
      </a-tooltip>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    dataSource: any;
    columns: any;
    formSchema: any;
  }>();
  const [register] = useTable({
    dataSource: props.dataSource,
    columns: props.columns,
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
      schemas: props.formSchema,
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

  function exportTable() {}
</script>
<style scoped lang="less"></style>
