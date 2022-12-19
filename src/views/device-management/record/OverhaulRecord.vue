<template>
  <TablePage :dataSource="dataSource" :columns="overhaulColumns" :formSchema="overhaulFormSchema">
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
  import { overhaulColumns, overhaulFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const dataSource = ref([{}]);
  function handleDetails() {
    //跳转到设备检修详情
    router.push({
      name: 'overhaulDetail',
    });
  }
</script>
