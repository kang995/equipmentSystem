<template>
  <div class="px-4">
    <Description @register="register" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { WorkDetail } from '../data';

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
