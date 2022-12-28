<template>
  <TreeTable
    :columns="tabletMechanicaColumns"
    :formSchema="formMechanicaSchema"
    @export-table="exportTable"
  />
</template>
<script setup lang="ts">
  import TreeTable from '../components/TreeTable.vue';
  import { tabletMechanicaColumns, formMechanicaSchema } from '../data';
  function exportTable() {}
</script>
<style scoped lang="less"></style>
