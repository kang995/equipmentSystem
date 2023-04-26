<template>
  <TablePage
    :api="postSpecialRecordListApi"
    :columns="timingDetectionColumns"
    :formSchema="timingDetectionFormSchema"
    :ifDataSource="true"
    :api-export="postSpecialRExportApi"
    :textExport="'定期检测记录'"
    ref="recordRef"
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
          {
            label: '删除',
            popConfirm: {
              title: '是否确认删除',
              confirm: handleDelete.bind(null, record),
            },
            color: 'error',
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { timingDetectionColumns, timingDetectionFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  import {
    postSpecialRecordListApi,
    postSpecialRExportApi,
    postSpecialRemovetApi,
  } from '/@/api/device-management/special-equipment';
  import { useMessage } from '/@/hooks/web/useMessage';
  const router = useRouter();
  const { createMessage } = useMessage();
  const recordRef = ref<any>();
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
  //删除
  function handleDelete({ record }) {
    console.log('record', record);
    const { id } = record;
    let ids = ref<any>({});
    if (id) {
      //单条删除
      ids.value = { id: record.id };
      deleteApi(ids.value);
    }
  }
  //删除api
  function deleteApi(ids: any) {
    recordRef.value.setLoading(true);
    postSpecialRemovetApi(ids)
      .then(() => {
        createMessage.success('删除成功');
        recordRef.value.reload();
      })
      .finally(() => {
        recordRef.value.setLoading(false);
      });
  }
</script>
