<template>
  <div class="mt-[24px]">
    <Description @register="registerResult" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { ResultsSchemas } from '../field';

  //检修结果
  let result = ref<any>({});
  const [registerResult] = useDescription({
    data: result,
    schema: ResultsSchemas(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
