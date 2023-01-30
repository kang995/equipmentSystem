<template>
  <div>
    <div class="block">
      <overhaulingCount />
    </div>
    <div class="block">
      <overhaulingPlan />
    </div>
    <div class="block">
      <overhaulingRate />
    </div>
  </div>
</template>
<script setup lang="ts">
  import overhaulingCount from './module/overhaulingCount.vue';
  import overhaulingPlan from './module/overhaulingPlan.vue';
  import overhaulingRate from './module/overhaulingRate.vue';
</script>
<style lang="less" scoped>
  .block {
    margin-top: 16px;
  }
</style>
