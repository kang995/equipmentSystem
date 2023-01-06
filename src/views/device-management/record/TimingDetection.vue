<template>
  <TablePage
    :api="postSpecialRecordListApi"
    :columns="timingDetectionColumns"
    :formSchema="timingDetectionFormSchema"
    :ifDataSource="true"
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
  import { timingDetectionColumns, timingDetectionFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  import { postSpecialRecordListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  // 定期检测记录
  function handleDetails() {
    router.push({
      name: 'TimingDetectionDetail',
    });
  }
</script>
