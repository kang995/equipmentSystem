<template>
  <TablePage
    :api="mechanicalpatrolRecordListApi"
    :columns="patrolInspectionColumns"
    :formSchema="patrolInspectionFormSchema"
    :ifExport="true"
  >
    <template #tableTitle="{ source }">
      <div class="flex flex-1 space-x-4">
        <div>巡检次数：{{ source?.patrolNum }}</div>
        <div>异常次数：{{ source?.abnormalNum }}</div>
        <div>隐患次数：{{ source?.faultNum }}</div>
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
  // import { ref,onMounted } from 'vue';
  import { patrolInspectionColumns, patrolInspectionFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  import { mechanicalpatrolRecordListApi } from '/@/api/device-management/special-equipment';
  const router = useRouter();
  // const route = useRoute();
  // const deviceId = route.query.id as string;
  // const dataSource = ref([{}]);
  // const abnormalNum = ref<string>('');//异常次数
  // const faultNum = ref<string>('');//隐患次数
  // const patrolNum = ref<string>('');//巡检次数
  // onMounted(()=>{
  //   handleCount();
  // })

  // function handleCount(){
  //   mechanicalpatrolCountListApi({ deviceId	}).then((res)=>{
  //     abnormalNum.value = res.abnormalNum;
  //     faultNum.value = res.faultNum;
  //     patrolNum.value = res.patrolNum;
  //   })
  // }

  function handleDetails({ record }) {
    router.push({
      name: 'PatrolInspectionReport',
      query: {
        id: record.id,
        recordCode: record.recordCode,
        patrolResult: record.patrolResult,
      },
    });
  }
</script>
