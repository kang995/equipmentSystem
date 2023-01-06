<template>
  <TablePage
    :api="DeviceMechanicalListApi"
    :dataSource="dataSource"
    :columns="emergencyColumns"
    :formSchema="emergencyFormSchema"
  >
    <template #tableAction="record">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '查看演练报告',
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
  import { emergencyColumns, emergencyFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { DeviceMechanicalListApi } from '/@/api/device-management/special-equipment';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const dataSource = ref([{}]);
  function handleDetails({ record }) {
    router.push({
      name: 'EmergencyDetail',
      query: {
        id: record.id,
      },
    });
  }
</script>
