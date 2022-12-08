<template>
  <div class="px-15">
    <Description @register="register" />
    <div class="absolute bottom-0 left-0">
      <a-button v-if="props.info?.state !== '3'" class="m-4">取消</a-button>
      <a-button v-if="props.info?.state === '1'" type="primary">提交</a-button>
      <a-button v-if="props.info?.state === '2'" type="primary">撤回</a-button>
      <a-button v-if="props.info?.state === '4'" type="primary">停止计划</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { MaintainDetail } from './fileld';
  const props = defineProps({
    info: {
      type: Object as any,
      default: () => {},
    },
  });
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: MaintainDetail(props.info?.state),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
