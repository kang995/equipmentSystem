<template>
  <div>
    <div class="addressList">
      <div class="addressList_list" v-for="(item, index) in data" :key="index">
        <div class="addressList_index">{{ index + 1 }}</div>
        <a-input class="addressList_input" :value="item" disabled />
      </div>
    </div>
    <div class="map">
      <Map @register="register" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useMap } from '/@/components/Map/src/useMap';
  import { ref } from 'vue';
  import { Map } from '/@/components/Map';
  import { nextTick, onMounted } from 'vue';
  const [register, { drawPolygon }] = useMap();
  onMounted(async () => {
    await nextTick();
  });
  interface dataListType {
    longAndLatiType: string;
    longitude: string;
    latitude: string;
  }
  // 父组件传值
  const props = defineProps({
    dataList: {
      type: Array as PropType<dataListType[]>,
    },
  });
  // console.log('props:', props.dataList);
  backReturn();
  const data = ref<string[]>([]);
  function backReturn() {
    return new Promise(function () {
      dataChange();
      async function dataChange() {
        const { dataList } = props;
        // console.log('dataList', dataList);
        // const AMap: any = await loadAMap();
        data.value = [];
        const arr = ref<any>([]);
        dataList?.map(async (item) => {
          // console.log('item:', item);
          arr.value.push(testPromise(item));
          // console.log('arr:', arr.value);
        });
        Promise.all(arr.value).then((res) => {
          // console.log('Promise.all', res);
          data.value = res;
          draPolygon(res);
        });
      }
    });
  }

  function testPromise(item) {
    // console.log('item:', item);
    return new Promise((resolve) => {
      let gps = [parseFloat(item.longitude), parseFloat(item.latitude)];
      if (item.longAndLatiType !== 'MARS_SYSTEM') {
        let type = 'gps';
        if (item.longAndLatiType === 'BAIDU_SYSTEM') {
          type = 'baidu';
        }
        AMap.convertFrom(gps, type, function (status, result) {
          console.log('status:', status);
          if (result.info === 'ok') {
            // console.log('result:', result);
            let lnglats = result.locations[0].toString();
            // console.log('lnglats:', lnglats);
            resolve(lnglats);
          }
        });
      } else {
        resolve(item.longitude + ',' + item.latitude);
      }
    });
  }

  // 画多边形
  async function draPolygon(res) {
    if (res.length > 0) {
      const path = ref<number[][]>([]);
      console.log(res.length);
      res.map((item) => {
        const address = item.split(',');
        const position = [parseFloat(address[0]), parseFloat(address[1])];
        path.value.push(position);
      });
      await drawPolygon(path.value);
    }
  }
  // 其他类型坐标转高德
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
