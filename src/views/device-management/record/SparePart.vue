<template>
  <TablePage
    :api="postSpareListApi"
    :columns="sparePartColumns(handleClick)"
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
  function handleDetails({ record }) {
    router.push({
      name: 'BackupDetails',
      query: {
        id: record.spareId,
      },
    });
  }
  //关联计划跳转
  const handleClick = (record) => {
    console.log('record', record);
    if (record.type === '1') {
      //保养工单
      router.push({
        name: 'workOrderDetail',
        query: {
          id: record.workOrderId,
          status: '4', //审核状态--通过
          identity: '1',
        },
      });
    } else if (record.type === '2') {
      //维修工单
      router.push({
        name: 'repairDetail',
        query: {
          id: record.workOrderId,
          status: '4', //审核状态--通过
          identity: '1',
        },
      });
    } else if (record.type === '3') {
      //检修工单
      router.push({
        name: 'overhaulDetail',
        query: {
          id: record.workOrderId,
          status: '4', //审核状态--通过
          identity: '1',
        },
      });
    }
  };
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }

  ::v-deep(.ant-table-wrapper) {
    padding-top: 0;
  }
</style>
