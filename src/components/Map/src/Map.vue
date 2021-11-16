<template>
  <div ref="container" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import '@amap/amap-jsapi-types';
  import { useMap } from '/@/components/Map/src/useMap';

  const [_register, { loadAMap }] = useMap();
  const emit = defineEmits<{ (e: 'register', map: AMap.Map): void }>();
  const container = ref<HTMLDivElement | null>(null);
  let map: AMap.Map;

  onMounted(() => {
    initMap();
  });

  /**
   * 初始化地图
   */
  async function initMap() {
    try {
      const AMap: any = await loadAMap();
      const containerEl = unref(container);
      if (!containerEl) {
        console.error('containerEl 为空！！！');
        return;
      }
      map = new AMap.Map(containerEl!, { zoom: 11, viewMode: '3D' });
      const styleName = 'amap://styles/grey';
      map.setMapStyle(styleName);
      // 地图标尺
      map.addControl(new AMap.Scale());
      // 添加 3D 罗盘控制
      map.addControl(new AMap.ControlBar({ position: { right: '10px', bottom: '100px' } }));
      // 添加地图放大缩小按钮
      map.addControl(new AMap.ToolBar({ position: { right: '40px', bottom: '20px' } }));
    } catch (e) {
      console.error('初始化高德地图失败！！！', e);
    }
    emit('register', map);
  }
</script>

<style lang="less" scoped></style>
