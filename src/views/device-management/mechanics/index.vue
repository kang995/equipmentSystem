<template>
  <TreeTable
    :columns="tabletMechanicaColumns"
    :formSchema="formMechanicaSchema('ifMechanics')"
    @export-table="exportTable"
    :ifMechanics="true"
  />
</template>
<script setup lang="ts">
  import TreeTable from '../components/TreeTable.vue';
  import { tabletMechanicaColumns, formMechanicaSchema } from '../data';
  function exportTable() {}
</script>
<style scoped lang="less"></style>
