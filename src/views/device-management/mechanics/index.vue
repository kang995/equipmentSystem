<template>
  <TreeTable :columns="tableColumns" :formSchema="formSchema" @export-table="exportTable" />
</template>
<script setup lang="ts">
  import TreeTable from '../components/TreeTable.vue';
  import { tableColumns, formSchema } from '../data';
  function exportTable() {}
</script>
<style scoped lang="less"></style>
