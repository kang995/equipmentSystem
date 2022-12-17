<template>
  <div class="px-4">
    <template v-for="(item, index) in data.length" :key="index">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">故障信息{{ index + 1 }}</div>
      <Description @register="registerInfo" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { WorkInfoSchema } from '../data';

  let data = ref<any>([{}, {}]);
  const [registerInfo] = useDescription({
    data,
    schema: WorkInfoSchema(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
