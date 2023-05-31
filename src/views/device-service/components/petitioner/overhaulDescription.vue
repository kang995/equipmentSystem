<template>
  <div class="mt-[24px]">
    <template v-for="(item, index) in props.acceptList" :key="item.id">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">检修结果({{ index + 1 }})</div>
      <Description :column="3" :bordered="false" :data="item" :schema="ResultSchemaDetail()" />
      <div v-if="props.status === '4' || props.status === '5'">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果({{ index + 1 }})</div>
        <Description :column="3" :bordered="false" :data="item" :schema="ResultsSchemas()" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Description } from '/@/components/Description';
  import { ResultSchemaDetail, ResultsSchemas } from '../field';
  const props = defineProps({
    acceptList: {
      type: Object as any,
      default: () => {},
    },
    status: {
      type: String,
    },
  });
  //检修结果
  // let result = ref<any>({});
  // const [registerResult] = useDescription({
  //   data: result,
  //   schema: ResultSchemaDetail(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });
</script>

<style lang="less" scoped></style>
