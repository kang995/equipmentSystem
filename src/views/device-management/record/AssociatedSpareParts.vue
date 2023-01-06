<template>
  <TablePage
    :dataSource="dataSource"
    :columns="associatedColumns"
    :formSchema="associatedFormSchema"
    :ifExport="true"
  >
    <!-- <template #tableTitle>
      <a-button type="primary" @click="getModal">关联备件</a-button>
    </template> -->
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
          {
            label: '移除',
            onClick: handleDel.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { associatedColumns, associatedFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const dataSource = ref([{}]);
  function handleDetails() {
    router.push({
      name: 'AssociatedDetail',
    });
  }
  function handleDel() {}
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }
</style>
