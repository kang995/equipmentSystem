<template>
  <TablePage
    :dataSource="dataSource"
    :columns="sparePartColumns"
    :formSchema="sparePartFormSchema"
    :ifExport="true"
  >
    <template #tableAction="record">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '备件详情',
            onClick: handleDetail.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { sparePartColumns, sparePartFormSchema } from './data';
  import { TableAction } from '/@/components/Table';

  import TablePage from '../components/TablePage.vue';
  const dataSource = ref([{}]);
  function handleDetail() {}
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }

  ::v-deep(.ant-table-wrapper) {
    padding-top: 0;
  }
</style>
