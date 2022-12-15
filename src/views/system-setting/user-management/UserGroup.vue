<template>
  <BasicTable @register="registerTableArray" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { onMounted, ref } from 'vue';
  import { basicColumns } from './data';
  import { getGroupByUserIdApi } from '/@/api/sys/systemSetting/userManagement';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const userId = route.query.userId as string;

  const dataSource = ref([]);
  const [registerTableArray] = useTable({
    dataSource: dataSource,
    columns: basicColumns, //表单列信息
    useSearchForm: false, //是否表单
    showIndexColumn: false, //是否序列
    rowKey: 'userId',
    striped: false, // 斑马纹
    pagination: false,
  });
  onMounted(() => {
    getGroupByUserIdApi(userId).then((res) => {
      dataSource.value = res;
    });
  });
</script>
