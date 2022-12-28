<template>
  <div class="mt-[24px]">
    <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果</div>
    <Description @register="registerResult" />
  </div>
</template>

<script setup lang="ts">
  import { Description, useDescription } from '/@/components/Description';
  import { receiveSchemaDetail } from '../fileld';

  const props = defineProps({
    acceptList: {
      type: Object as any,
      default: () => {},
    },
  });
  //验收结果
  const [registerResult] = useDescription({
    data: props.acceptList,
    schema: receiveSchemaDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
