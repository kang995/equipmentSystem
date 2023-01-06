<template>
  <TablePage
    :api="DeviceUpkeepListApi"
    :dataSource="dataSource"
    :columns="maintenanceColumns"
    :formSchema="maintenanceFormSchema"
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
  import { ref } from 'vue';
  import { maintenanceColumns, maintenanceFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import TablePage from '../components/TablePage.vue';
  import { DeviceUpkeepListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  const dataSource = ref([]);

  // DeviceUpkeepListApi({deviceId:id}).then(res=>{
  //   dataSource.value = res.records;
  //   console.log('ressss',res)
  // })

  //详情
  function handleDetails() {
    //跳转到设备保养详情
    router.push({
      name: 'planDetails',
    });
  }
</script>
