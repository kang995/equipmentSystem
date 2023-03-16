<template>
  <TablePage
    :api="DeviceServiceListApi"
    :api-export="DeviceExportListApi"
    textExport="检修记录"
    :dataSource="dataSource"
    :columns="overhaulColumns(handleClick)"
    :formSchema="overhaulFormSchema"
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
  import { overhaulColumns, overhaulFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  import {
    DeviceServiceListApi,
    DeviceExportListApi,
  } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  const dataSource = ref([{}]);

  //关联计划跳转
  const handleClick = (record) => {
    router.push({
      name: 'planManagementDetails',
      query: {
        id: record.overhaulPlanId,
        status: record.approvalStatus, //审核状态
        mode: '3',
      },
    });
  };
  function handleDetails({ record }) {
    //跳转到设备检修-检修工单详情
    router.push({
      name: 'overhaulDetail',
      query: {
        id: record.id,
        identity: '1', //负责人：1、执行人：2
        status: record.workOrderStatus, //1：未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
        // delayFlag: record.delayFlag, //工单延期-- 0:否 1：是 2：延期审核
      },
    });
  }
</script>
