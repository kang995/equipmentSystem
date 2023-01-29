<template>
  <div class="flex justify-between align-middle">
    <div :class="`${prefixCls}`" v-for="(item, index) in titleList" :key="index">
      <SvgIcon :name="item.icon" v-if="item.icon" size="24" :class="`${prefixCls}-SvgIcon`" />
      <span v-else :class="`${prefixCls}-span`"></span>
      <span :class="`${prefixCls}-title`">{{ item.title }} </span>
    </div>
    <slot name="search"></slot>
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
  }
  const props = defineProps<{
    titleList: Array<TitleParams>;
  }>();
  const { titleList } = toRefs(props);
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-enterprise-personnel';
  .@{prefix-cls} {
    //margin-bottom: 8px;
    display: flex;
    align-items: center;

    &-SvgIcon {
      margin: 0 auto;
      position: relative;
    }

    &-span {
      //margin: 0 auto;
      //position: absolute;
      margin-right: 3px;
      width: 4px;
      height: 14px;
      background: #61687c;
      border-radius: 2px;
      //top: 1px;
      //left: -12px;
    }

    &-title {
      font-weight: 600;
      color: @custom-body2;
      text-align: center;
      //position: absolute;
      // left: 60px;
      padding: 0 4px;
    }
  }
</style>
