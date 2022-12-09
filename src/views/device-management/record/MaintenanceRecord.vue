<template>
  <TablePage
    :dataSource="dataSource"
    :columns="maintenanceColumns"
    :formSchema="maintenanceFormSchema"
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
  import { maintenanceColumns, maintenanceFormSchema } from './data';
  import { TableAction } from '/@/components/Table';

  import TablePage from '../components/TablePage.vue';
  const dataSource = ref([{}]);
  function handleDetails() {
    //跳转到设备保养详情
    // router.push({
    //   // name: 'OverhaulDetail',
    // });
  }
</script>
