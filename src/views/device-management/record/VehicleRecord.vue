<template>
  <BasicTable @register="register">
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
  import { vehicleColumns, vehicleFormSchema } from './data';
  import { Tooltip } from 'ant-design-vue';
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}]);
  const [register] = useTable({
    dataSource: dataSource,
    columns: vehicleColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
    },
    formConfig: {
      schemas: vehicleFormSchema,
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
</script>
<style scoped lang="less"></style>
