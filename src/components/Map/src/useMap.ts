import AMapLoader from '@amap/amap-jsapi-loader';
import { UseMapReturnType, MapActionType } from '/@/components/Map/src/typing';
import '@amap/amap-jsapi-types';

export function useMap(): UseMapReturnType {
  let map: AMap.Map;

  function register(instance: AMap.Map) {
    if (instance === map) return;
    map = instance;
    console.log('useMap instance', instance);
  }

  const methods: MapActionType = {
    // 加载地图
    loadAMap,
    // 添加Marker
    addMarker,
  };

  /**
   * 加载地图
   */
  async function loadAMap(options?: {
    // 是否加载 AMapUI，缺省不加载
    AMapUI?: {
      version?: string; // AMapUI 缺省 1.1
      plugins?: string[]; // 需要加载的 AMapUI ui插件
    };
    // 是否加载 Loca， 缺省不加载
    Loca?: {
      version?: string; // Loca 版本，缺省 1.3.2
    };
  }) {
    const key = '26e663425c7f341b695d5b5c57d5e07f'; //首次load key为必填
    const version = '2.0'; // 版本号
    const plugins = ['AMap.Scale', 'AMap.ControlBar', 'AMap.ToolBar']; // 插件
    return await AMapLoader.load({ key, version, plugins, ...options });
  }

  /**
   * 添加Marker
   */
  async function addMarker() {
    const AMap: any = await loadAMap();
    const marker: AMap.Marker = new AMap.Marker({
      position: [map.getCenter().lng, map.getCenter().lat],
    });
    map.add(marker);
    return marker;
  }

  return [register, methods];
}
