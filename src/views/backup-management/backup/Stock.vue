<template>
  <div class="bg-white">
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <div>总数量：{{ countInventorySum }}</div>
      </template>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { stockColumns } from '../data';
  import { postBackupInventorylApi } from '/@/api/backup-management/backup';
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id;
  const dataSource = ref([{}]);
  const countInventorySum = ref();
  const [register] = useTable({
    dataSource: dataSource,
    columns: stockColumns,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  id &&
    postBackupInventorylApi({ id }).then((res) => {
      dataSource.value = res.inventoryVOList;
      countInventorySum.value = res.countInventorySum;
    });
  function handleDetails() {
    router.push({
      name: 'BackupDetailsList',
    });
  }
</script>
<style scoped lang="less">
  ::v-deep(.ant-table-wrapper) {
    border-top: none;
    border-radius: 0 0 6px 6px;
  }
</style>
