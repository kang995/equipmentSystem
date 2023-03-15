<template>
  <div class="mt-[24px]">
    <!-- <Description @register="registerResult" /> -->
    <template v-for="(item, index) in props.acceptList" :key="item.id">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果({{ index + 1 }})</div>
      <Description :column="3" :bordered="false" :data="item" :schema="ResultsSchemas()" />
    </template>
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue';
  import { Description } from '/@/components/Description';
  import { ResultsSchemas } from '../field';

  const props = defineProps({
    acceptList: {
      type: Object as any,
      default: () => {},
    },
  });
  //检修结果
  // let result = ref<any>({});
  // const [registerResult] = useDescription({
  //   data: result,
  //   schema: ResultsSchemas(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });
</script>

<style lang="less" scoped></style>
