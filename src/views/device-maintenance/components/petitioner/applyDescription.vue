<template>
  <div class="mt-[24px]">
    <div class="font-black text-[#414960] text-[15px] my-[16px]">延期申请</div>
    <Description @register="registerApply" />
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { ApplySchemaDetail } from '../fileld';
  const props = defineProps({
    delayData: {
      type: Object as any,
      default: () => {},
    },
  });

  // 延期申请
  // let postpone = ref<any>({});
  const [registerApply] = useDescription({
    data: props.delayData,
    schema: ApplySchemaDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
