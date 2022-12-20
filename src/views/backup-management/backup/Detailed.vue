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
  const router = useRouter();
  const route = useRoute();

  const id = route.query?.id;
  const dataSource = ref([{ receiptType: '出库' }, { receiptType: '入库' }]);

  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: detailedColumns,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    pagination: true,
    actionColumn: {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDetails(data) {
    const type = data.receiptType;
    let name;
    if (type == '出库') {
      name = 'InboundDetails';
    } else {
      name = 'OutboundDetails';
    }
    router.push({
      name: name,
    });
  }
</script>
<style scoped lang="less"></style>
