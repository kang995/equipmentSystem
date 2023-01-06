<template>
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
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { detailedColumns } from '../data';
  import { postBackupInoutApi } from '/@/api/backup-management/backup';
  const router = useRouter();
  const route = useRoute();

  const id = route.query?.id;
  const dataSource = ref([{ receiptType: '出库' }, { receiptType: '入库' }]);
  id &&
    postBackupInoutApi({ id }).then((res) => {
      dataSource.value = res.records;
    });
  const [register] = useTable({
    dataSource: dataSource,
    columns: detailedColumns,
    rowKey: 'id',

    pagination: true,
    actionColumn: {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDetails(data) {
    const id = data.receiptId;
    const type = data.receiptType;
    let name;
    if (type == '1') {
      name = 'InboundDetails';
    } else {
      name = 'OutboundDetails';
    }
    router.push({
      name: name,
      query: {
        id,
      },
    });
  }
</script>
<style scoped lang="less">
  ::v-deep(.ant-table-wrapper) {
    border-radius: 0 0 6px 6px;
    border-top: none;
  }
</style>
