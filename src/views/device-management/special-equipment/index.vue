<template>
  <TreeTable
    :columns="tableColumns"
    :formSchema="formSchema"
    :ifButton="true"
    @export-table="exportTable"
  />
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import TreeTable from '../components/TreeTable.vue';
  import { tableColumns, formSchema } from '../data';
  const dataSource = ref([{}]);

  function exportTable() {}
</script>
<style scoped lang="less"></style>
