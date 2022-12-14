<template>
  <div v-if="ifAction">
    <BasicTable @register="registerActionTable">
      <template #action="{ record }">
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
        /> </template
    ></BasicTable>
  </div>
  <div v-else>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  const props = defineProps<{
    dataSource: any; //出库
    columns: any;
    ifAction?: any;
  }>();
  const router = useRouter();
  const [registerTable] = useTable({
    dataSource: props.dataSource,
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: false,
    pagination: false,
  });
  const [registerActionTable] = useTable({
    dataSource: props.dataSource,
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: false,
    pagination: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  function handleDetails() {
    //备件管理详情
    router.push({
      name: 'BackupDetails',
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-wrapper) {
    border: none;
    padding: 0;
  }
</style>
