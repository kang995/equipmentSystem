<template>
  <TablePage
    :api="DeviceTroubleListApi"
    :dataSource="dataSource"
    :columns="failureColumns(handleClick)"
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
  import { DeviceTroubleListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  const dataSource = ref([]);
  //关联工单跳转
  const handleClick = (record) => {
    router.push({
      name: 'repairDetail',
      query: {
        id: record.workOrderId,
        status: record.maintainStatus,
        identity: '1',
      },
    });
  };
  //详情
  function handleDetails({ record }) {
    router.push({
      name: 'faultDetails',
      query: {
        id: record.id,
        troubleDetermine: record.troubleDetermine, //确认结果：0:自修、1：委外维修 2：列入检修计划
        status: record.troubleStatus, //故障状态：0:待确认、1：待处理、2：处理中、3：已解决、4：已转计划
      },
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
