<template>
  <div>
    <div class="block">
      <RepairCount />
    </div>
    <div class="block">
      <RepairPlan />
    </div>
  </div>
</template>
<script setup lang="ts">
  import RepairCount from './module/RepairCount.vue';
  import RepairPlan from './module/RepairPlan.vue';
</script>
<style lang="less" scoped>
  .block {
    margin-top: 16px;
  }
</style>
