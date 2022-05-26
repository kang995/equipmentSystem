<template>
  <div
    :class="[prefixCls, getLayoutContentMode]"
    v-loading="getOpenPageLoading && getPageLoading"
    ref="layoutContent"
  >
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import PageLayout from '/@/layouts/page/index.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useContentViewHeight } from './useContentViewHeight';
  import { RouteLocationNormalized, useRouter } from 'vue-router';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content');
      const { getOpenPageLoading } = useTransitionSetting();
      const { getLayoutContentMode, getPageLoading } = useRootSetting();
      const layoutContent = ref();
      const router = useRouter();

      useContentViewHeight();

      const isHash = (href: string) => {
        return /^#/.test(href);
      };
      // 切换页面，离开当前路由时滚动到顶部
      router.afterEach(async (to) => {
        // scroll top
        isHash((to as RouteLocationNormalized & { href: string })?.href) &&
          layoutContent.value.scrollTo(0, 0);
        return true;
      });

      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
        layoutContent,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{name-space}-layout-content';

  .@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }
  }
</style>
