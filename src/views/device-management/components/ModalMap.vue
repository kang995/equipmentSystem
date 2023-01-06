<template>
  <div>
    <div class="addressList">
      <div class="addressList_list" v-for="(item, index) in sites" :key="index">
        <div class="addressList_index">{{ index + 1 }}</div>
        <a-input class="addressList_input" :value="`${item[0]},${item[1]}`" disabled />
      </div>
    </div>
    <div class="map">
      <Map @register="register" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMap } from '/@/components/Map/src/useMap';
  import { reactive, nextTick } from 'vue';
  import { Map } from '/@/components/Map';

  const [register, { drawPolygon, addMarker, converFrom }] = useMap();
  const props = defineProps({
    dataList: {
      type: Array as PropType<dataListType[]>,
    },
  });

  interface dataListType {
    longAndLatiType: string;
    longitude: string;
    latitude: string;
  }

  //坐标系类型
  const mapType = {
    EARTH_SYSTEM: 'gps',
    BAIDU_SYSTEM: 'baidu',
  };

  //存储处理后地理位置信息
  const sites: Array<Array<string>> = reactive([]);

  //处理地理位置数据
  const readerMap = async (data) => {
    for (let item of data) {
      const { latitude, longitude, longAndLatiType } = item,
        gps = [longitude, latitude],
        type = mapType[longAndLatiType],
        site: Array<string> = type ? await converFrom({ gps, type }) : gps;
      sites.push(site);
    }
    draPolygon(sites);
  };
  nextTick(() => readerMap(props.dataList));

  // 画多边形
  const draPolygon = async (position) => {
    position.length === 1 ? addMarker(position[0]) : drawPolygon(position);
  };
</script>
<style lang="less" scoped>
  .addressList {
    display: flex;
    flex-wrap: wrap;

    .addressList_list {
      display: flex;
      width: 47%;
      margin-bottom: 10px;
      margin-right: 20px;

      .addressList_index {
        width: 36px;
        height: 36px;
        background: #fafafb;
        border-radius: 6px;
        border: 1px solid #d5d7dc;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: normal;
        color: #61687c;
        margin-right: 10px;
      }

      .addressList_input {
        height: 36px;
        border-radius: 6px;
        border: 1px solid #f1f2f5;
      }
    }
  }

  .map {
    width: 100%;
    height: 400px;
  }
</style>
