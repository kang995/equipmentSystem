<template>
  <TablePage
    :dataSource="dataSource"
    :columns="failureColumns"
    :formSchema="failureFormSchema"
    :ifExport="true"
  >
    <template #tableAction="record">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { failureColumns, failureFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const dataSource = ref([{}]);
  function handleDetails() {
    router.push({
      name: 'faultDetails',
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
