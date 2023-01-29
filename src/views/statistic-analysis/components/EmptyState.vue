<template>
  <div :class="`${prefixCls}`">
    <img src="/@/assets/images/zanwu.png" :class="`${prefixCls}-img`" alt="" />
    <div>
      <div :class="`${prefixCls}-empty-text`">暂无数据</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('empty-state');
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-empty-state';
  .@{prefix-cls} {
    vertical-align: middle; /* 把此元素放置在父元素的中部 */
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    //margin: 32px auto;
    height: 300px;

    &-img {
      width: 200px;
      height: 127px;
      margin: 24px 0 0 0;
    }

    &-empty-text {
      font-size: 14px;
      font-weight: 400;
      color: #9fa3b0;
    }
  }
</style>
