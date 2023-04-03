<template>
  <div class="p-4 bg-white">
    <Description @register="register" />
    <BasicModal
      title="预览位置"
      width="800px"
      @register="registerModal"
      :footer="null"
      :destroyOnClose="true"
    >
      <ModalMap :dataList="PositionData" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import ModalMap from '/@/views/device-management/components/ModalMap.vue';
  import { useModal, BasicModal } from '/@/components/Modal';
  import { Description, useDescription } from '/@/components/Description';
  import { onMounted, ref, nextTick } from 'vue';
  import { mechanicsDescItem, equipmentDescItem } from './data';
  import { useRoute } from 'vue-router';
  import { postSpecialDetailApi } from '/@/api/device-management/special-equipment';
  import { postMechanicalDetailApi } from '/@/api/device-management/mechanics';
  const route = useRoute();
  const state = route.query.state as string;
  const id = route.query.id as string;
  const dataSource = route.query.dataSource as string;
  //位置信息 经纬度
  let PositionData = ref([
    {
      longAndLatiType: 'EARTH_SYSTEM',
      longitude: '',
      latitude: '',
    },
  ]);
  onMounted(() => {
    // displayDate();
    funDetail();
  });
  // 获取dom的click事件
  async function displayDate() {
    await nextTick();
    document.getElementById('testReviewBtn')?.addEventListener('click', clickBtn);
  }
  // 预览位置
  const [registerModal, { openModal }] = useModal();
  function clickBtn() {
    openModal(true);
  }

  // equipmentDescItem 机械设备 state:1,2
  // mechanicsDescItem 特种设备

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: state === '1' || state === '2' ? equipmentDescItem : mechanicsDescItem,

    size: 'default',
    labelStyle: { width: '160px' },
    column: 2,
  });
  function funDetail() {
    if (state === '3' || state === '4') {
      //特种设备详情
      id &&
        postSpecialDetailApi({ id, dataSource }).then((res) => {
          mockData.value = res;
          PositionData.value = res?.positionList;
          displayDate();
        });
    } else {
      id &&
        postMechanicalDetailApi({ id, dataSource }).then((res) => {
          mockData.value = res;
          PositionData.value = res?.siteList;
          displayDate();
        });
    }
  } //
</script>
