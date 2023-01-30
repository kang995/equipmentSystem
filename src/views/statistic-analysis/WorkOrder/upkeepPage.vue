<template>
  <div>
    <div class="block">
      <UpkeepCount />
    </div>
    <div class="block">
      <UpkeepPlan />
    </div>
    <div class="block">
      <UpkeepCirculation />
    </div>
    <div class="block">
      <UpkeepFinsh />
    </div>
  </div>
</template>
<script setup lang="ts">
  import UpkeepCount from './module/UpkeepCount.vue';
  import UpkeepPlan from './module/UpkeepPlan.vue';
  import UpkeepCirculation from './module/UpkeepCirculation.vue';
  import UpkeepFinsh from './module/UpkeepFinsh.vue';
</script>
<style lang="less" scoped>
  .block {
    margin-top: 16px;
  }
</style>
