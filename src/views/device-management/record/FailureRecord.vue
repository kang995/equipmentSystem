<template>
  <TablePage
    :dataSource="dataSource"
    :columns="failureColumns"
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
  import { ref, onMounted } from 'vue';
  import { failureColumns, failureFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { DeviceTroubleListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  const route = useRoute();
  const dataSource = ref([]);
  const id = route.query.id as string;
  onMounted(() => {
    //列表
    DeviceTroubleListApi({ deviceId: id }).then((res) => {
      dataSource.value = res.records;
    });
  });

  //详情
  function handleDetails() {
    router.push({
      name: 'faultDetails',
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
