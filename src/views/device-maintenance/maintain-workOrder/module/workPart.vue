<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  import { tablePartColumns } from '../data';
  import { getOrderSpareListApi } from '/@/api/device-maintenance/work';
  const router = useRouter();
  const route = useRoute();
  const id = route.query.id as string;

  const [register] = useTable({
    api: getOrderSpareListApi,
    columns: tablePartColumns(),
    searchInfo: {
      id, //工单id
    },
    rowKey: 'id',
    useSearchForm: false, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  //详情
  function handleDetails(record) {
    router.push({
      name: 'BackupDetails',
      query: {
        id: record.id,
        type: '详情',
      },
    });
  }
</script>

<style lang="less" scoped></style>
