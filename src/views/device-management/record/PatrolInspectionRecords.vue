<template>
  <TablePage
    :dataSource="dataSource"
    :columns="patrolInspectionColumns"
    :formSchema="patrolInspectionFormSchema"
    :ifExport="true"
  >
    <template #tableTitle>
      <div class="flex flex-1 space-x-4">
        <div>巡检次数：50</div>
        <div>异常次数：2</div>
        <div>隐患次数：2</div>
      </div>
    </template>
    <template #tableAction="record">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '巡检报告',
            onClick: handleDetails.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { patrolInspectionColumns, patrolInspectionFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const dataSource = ref([{}]);
  function handleDetails() {
    router.push({
      name: 'PatrolInspectionReport',
    });
  }
</script>
