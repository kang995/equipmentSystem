<template>
  <div class="mt-[24px]">
    <template v-for="(item, index) in props.acceptList" :key="item.id">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">保养结果({{ index + 1 }})</div>
      <Description :column="3" :bordered="false" :data="item" :schema="maintainSchemaDetail()" />
      <div v-if="props.status === '4' || props.status === '5'">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果({{ index + 1 }})</div>
        <Description :column="3" :bordered="false" :data="item" :schema="receiveSchemaDetail()" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Description } from '/@/components/Description';
  import { maintainSchemaDetail, receiveSchemaDetail } from '../fileld';

  const props = defineProps({
    acceptList: {
      type: Object as any,
      default: () => {},
    },
    status: {
      type: String,
    },
  });
  // const [registerResult] = useDescription({
  //   data: props.acceptList,
  //   schema: maintainSchemaDetail(),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });
</script>

<style lang="less" scoped></style>
