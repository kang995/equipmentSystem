<template>
  <TablePage
    :api="postSpecialRecordListApi"
    :columns="timingDetectionColumns"
    :formSchema="timingDetectionFormSchema"
    :ifDataSource="true"
    :api-export="postSpecialRExportApi"
    :textExport="'定期检测记录'"
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
  import {
    postSpecialRecordListApi,
    postSpecialRExportApi,
  } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  // 定期检测记录
  function handleDetails(data) {
    const dataSource = data.record.dataSource;
    const id = data.record.id;
    console.log('id: ', id);
    router.push({
      name: 'TimingDetectionDetail',
      query: {
        id,
        dataSource,
      },
    });
  }
  //postSpecialRExportApi
</script>
