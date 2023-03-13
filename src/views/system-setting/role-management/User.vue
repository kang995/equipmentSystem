<template>
  <BasicTable @register="registerTableArray" :dataSource="dataSource" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumns } from './data';

  const [registerTableArray] = useTable({
    columns: BasicColumns, //表单列信息
    useSearchForm: false, //是否表单
    showIndexColumn: false, //是否序列
    rowKey: 'userId',
    striped: false, // 斑马纹
    // pagination: false,
  });

  defineProps<{
    dataSource: Array<Recordable>;
  }>();
</script>
