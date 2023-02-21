<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe
        :src="frameSrc"
        :class="`${prefixCls}__main`"
        ref="frameRef"
        @load="hideLoading"
      ></iframe>
    </Spin>
  </div>
</template>
<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { ref, unref, computed, onMounted } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLayoutHeight } from '/@/layouts/default/content/useContentViewHeight';
  import { getFullSubmitApi } from '/@/api/device-maintenance/index';
  // import { propTypes } from '/@/utils/propTypes';
  // defineProps({
  //   frameSrc: propTypes.string.def('https://workflow-plat-dev.ts-it.cn/api/free/login/getUserInfo?info=e201&pathCode=1&to=create&enCode=0109&id=382060939370825093&formType=2&url=https://10.20.100.66:3100'),
  // });

  const loading = ref(true);
  const topRef = ref(50);
  const heightRef = ref(window.innerHeight);
  const frameRef = ref<HTMLFrameElement>();
  const { headerHeightRef } = useLayoutHeight();
  const { prefixCls } = useDesign('iframe-page');
  useWindowSizeFn(calcHeight, 150, { immediate: true });
  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`,
    };
  });
  const props = defineProps<{
    fullSubmitId?: String;
  }>();

  onMounted(() => {
    handleGetLink();
  });
  //接口获取访问链接
  const frameSrc = ref<any>('');
  function handleGetLink() {
    getFullSubmitApi(props.fullSubmitId).then((res) => {
      console.log('frameSrc', res);
      frameSrc.value = res;
    });
  }

  function calcHeight() {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
    const top = headerHeightRef.value;
    topRef.value = top;
    heightRef.value = window.innerHeight - top;
    const clientHeight = document.documentElement.clientHeight - top;
    iframe.style.height = `${clientHeight}px`;
  }

  function hideLoading() {
    loading.value = false;
    calcHeight();
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: @component-background;
      border: 0;
      box-sizing: border-box;
    }
  }
</style>
