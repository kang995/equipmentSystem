<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #position>
        <Position @view-map="viewMap" :positionData="PositionData" />
      </template>
    </BasicForm>
    <BasicModal
      title="预览位置"
      width="800px"
      @register="registerModal"
      :footer="null"
      :destroyOnClose="true"
    >
      <ModalMap :dataList="PositionData" />
    </BasicModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import ModalMap from '../components/ModalMap.vue';
  import Position from '../components/MapPosition.vue';
  import { useModal, BasicModal } from '/@/components/Modal';
  import { schemasAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { ref } from 'vue';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  // 预览位置
  const [registerModal, { openModal }] = useModal();
  //位置信息 经纬度
  let PositionData = ref([
    {
      longAndLatiType: 'EARTH_SYSTEM',
      longitude: '',
      latitude: '',
    },
  ]);
  const viewMap = () => {
    openModal(true);
  };

  //showSubmitButton showResetButton
  const [register, {}] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd,
    actionColOptions: {
      offset: 8,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
  });
  async function resetSubmitFunc() {
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }

  async function sumitForm() {
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }
</script>
