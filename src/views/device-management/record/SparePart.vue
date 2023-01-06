<template>
  <TablePage
    :api="postSpareListApi"
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
            onClick: handleDetails.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { sparePartColumns, sparePartFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import TablePage from '../components/TablePage.vue';
  import { postSpareListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  function handleDetails(data) {
    console.log('data: ', data);
    router.push({
      name: 'BackupDetails',
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }

  ::v-deep(.ant-table-wrapper) {
    padding-top: 0;
  }
</style>
