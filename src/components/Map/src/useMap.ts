import AMapLoader from '@amap/amap-jsapi-loader';
import { UseMapReturnType, MapActionType, gpsType } from '/@/components/Map/src/typing';
import '@amap/amap-jsapi-types';

export function useMap(): UseMapReturnType {
  let map: AMap.Map;

  function register(instance: AMap.Map) {
    if (instance === map) return;
    map = instance;
  }

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
    // const key = '26e663425c7f341b695d5b5c57d5e07f'; //首次load key为必填
    const key = 'd11bfe86f5e20e86e5292f5448cf7122'; //替换成公司的key
    const version = '2.0'; // 版本号
    const plugins = ['AMap.Scale', 'AMap.ControlBar', 'AMap.ToolBar']; // 插件
    console.log('plugins', plugins);
    return await AMapLoader.load({ key, version, plugins, ...options });
  }

  //将其他坐标转换成高德坐标。
  const converFrom = async (params: gpsType) => {
    const AMap: any = await loadAMap();
    return new Promise<Array<string>>((resolve) => {
      AMap.convertFrom(params.gps, params.type, (status, result) => {
        if (result.info === 'ok' && status) {
          resolve(result.locations[0].toString().split(','));
        }
      });
    });
  };

  /**
   * 添加Marker
   */
  async function addMarker(position) {
    const AMap: any = await loadAMap();
    const marker: AMap.Marker = new AMap.Marker({
      position,
    });
    map.add(marker);
    return marker;
  }

  /**
   * 画多边形
   */
  async function drawPolygon(path) {
    const AMap: any = await loadAMap();
    const polygon: AMap.Polygon = new AMap.Polygon({
      path: path,
      fillColor: '#ccebc5',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeColor: '#2b8cbe',
      strokeWeight: 1,
      strokeStyle: 'solid',
      strokeDasharray: [5, 5],
    });
    map.add(polygon);
    map.setFitView([polygon]);
    return polygon;
  }

  const methods: MapActionType = {
    // 加载地图
    loadAMap,
    // 添加Marker
    addMarker,
    // 画多边形
    drawPolygon,
    // 类型转换
    converFrom,
  };
  return [register, methods];
}
