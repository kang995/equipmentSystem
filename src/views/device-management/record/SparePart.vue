<template>
  备件更换记录
  <TablePage
    :dataSource="dataSource"
    :columns="installationColumns"
    :formSchema="installationFormSchema"
  >
    <template #tableAction="record">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { installationColumns, installationFormSchema } from '../data';
  import { TableAction } from '/@/components/Table';

  import TablePage from '../components/TablePage.vue';
  const dataSource = ref([{}]);
  function handleEdit() {}
</script>
