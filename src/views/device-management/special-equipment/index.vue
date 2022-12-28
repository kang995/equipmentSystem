<template>
  <TreeTable
    :columns="tableSpecialColumns"
    :formSchema="formMechanicaSchema"
    :ifButton="true"
    @export-table="exportTable"
  />
</template>
<script setup lang="ts">
  import TreeTable from '../components/TreeTable.vue';
  import { tableSpecialColumns, formMechanicaSchema } from '../data';

  function exportTable() {}
</script>
<style scoped lang="less"></style>
