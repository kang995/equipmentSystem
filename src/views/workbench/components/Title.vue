<template>
  <div
    :class="`${prefixCls}`"
    :style="{ marginBottom: item.isBottom ? '0' : '16px' }"
    v-for="(item, index) in titleList"
    :key="index"
  >
    <SvgIcon :name="item.icon" size="24" :class="`${prefixCls}-SvgIcon`" />
    <span :class="`${prefixCls}-title`">{{ item.title }} </span>
  </div>
</template>
<script lang="ts" setup>
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { toRefs } from '@vueuse/core';
  const { prefixCls } = useDesign('enterprise-personnel');

  interface TitleParams {
    title: string;
    icon: string;
    isBottom?: boolean;
  }
  const props = defineProps<{
    titleList: Array<TitleParams>;
  }>();
  const { titleList } = toRefs(props);
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-enterprise-personnel';
  .@{prefix-cls} {
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    &-title {
      margin-left: 4px;
      font-weight: 600;
      color: @custom-body1;
      text-align: center;
    }
  }
</style>
