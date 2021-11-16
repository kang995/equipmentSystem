export interface MapActionType {
  loadAMap: () => Promise<any>;
  addMarker: () => Promise<AMap.Marker>;
}

export type RegisterFn = (map: AMap.Map) => void;
export type UseMapReturnType = [RegisterFn, MapActionType];
