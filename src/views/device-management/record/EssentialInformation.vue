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
  import {
    mechanicsDescItem,
    equipmentDescItemMove,
    mechanicsDescItemMove,
    equipmentDescItem,
  } from './data';
  import { useRoute } from 'vue-router';
  import { postSpecialDetailApi } from '/@/api/device-management/special-equipment';
  const route = useRoute();
  const state = route.query.state as string;
  const id = route.query.id as string;
  const dataSource = route.query.dataSource as string;

  console.log('id: ', state);
  onMounted(() => {
    displayDate();
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
  //位置信息 经纬度
  let PositionData = ref([
    {
      longAndLatiType: 'EARTH_SYSTEM',
      longitude: '',
      latitude: '',
    },
  ]);

  //mechanicsDescItemMove 机械设备动  mechanicsDescItem 机械设备静
  //equipmentDescItemMove 特种设备动  equipmentDescItem 特种设备静

  const mockData = ref<any>([{ aaaa: '动设备' }]);
  const [register] = useDescription({
    data: mockData,
    schema:
      state === '1'
        ? mechanicsDescItem
        : state === '2'
        ? mechanicsDescItemMove
        : state === '3'
        ? equipmentDescItem
        : equipmentDescItemMove,
    size: 'default',
    labelStyle: { width: '180px' },
    column: 1,
  });
  function funDetail() {
    id &&
      postSpecialDetailApi({ id, dataSource }).then((res) => {
        console.log('res: ', res);
      });
  } //
</script>
