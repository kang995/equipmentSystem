export interface MapActionType {
  loadAMap: () => Promise<any>;
  addMarker: (params: Array<number>) => Promise<AMap.Marker>;
  drawPolygon: (params: any) => Promise<AMap.Polygon>;
  converFrom: (params: Object) => Promise<Array<string>>;
}

export interface gpsType {
  gps: Array<string>;
  type: string;
}

export type RegisterFn = (map: AMap.Map) => void;
export type UseMapReturnType = [RegisterFn, MapActionType];
