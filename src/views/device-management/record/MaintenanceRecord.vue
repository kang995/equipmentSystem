<template>
  <TablePage
    :api="DeviceUpkeepListApi"
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
  import { useRouter } from 'vue-router';
  import TablePage from '../components/TablePage.vue';
  import { DeviceUpkeepListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  const dataSource = ref([]);

  //详情
  function handleDetails({ record }) {
    // console.log('record',record)
    //跳转到设备保养详情
    router.push({
      name: 'workOrderDetail',
      query: {
        id: record.id,
        identity: '1',
        status: record.workOrderStatus, //1：未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
        // delayFlag: record.delayFlag, //工单延期-- 0:否 1：是 2：延期审核
      },
    });
  }
</script>
