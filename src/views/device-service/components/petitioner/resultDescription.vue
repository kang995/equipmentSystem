<template>
  <div class="mt-[24px]">
    <Description @register="registerResult" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { ResultsSchema } from '../field';

  let result = ref<any>({});
  const [registerResult] = useDescription({
    data: result,
    schema: ResultsSchema(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
