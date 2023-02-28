<template>
  <BasicTable @register="registerTableArray" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { onMounted, ref } from 'vue';
  import { BasicColumns } from './data';
  import { useRoute } from 'vue-router';
  import { getUserByGroupId } from '/@/api/systemSetting/userGroupManagement';
  // const router = useRouter();
  const route = useRoute();
  const id = route.query.id as string;
  // const checkedKeys = ref<Array<string | number>>([]);
  const dataSource = ref([]);
  const [registerTableArray] = useTable({
    dataSource: dataSource,
    columns: BasicColumns, //表单列信息
    useSearchForm: false, //是否表单
    showIndexColumn: false, //是否序列
    rowKey: 'userId',
    striped: false, // 斑马纹
    pagination: false,
  });
  onMounted(() => {
    getUserByGroupId(id).then((res) => {
      dataSource.value = res;
    });
  });
</script>
