<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #personSlot="{ model, field }">
        <Select
          v-model:value="model[field]"
          showSearch
          optionFilterProp="label"
          style="width: 100%"
          placeholder="请选择检查人"
          :options="options"
          @change="handleChangeCheck"
        />
      </template>
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
  import { Select } from 'ant-design-vue';
  import ModalMap from '../components/ModalMap.vue';
  import Position from '../components/MapPosition.vue';
  import { useModal, BasicModal } from '/@/components/Modal';
  import { schemasAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMounted, ref } from 'vue';
  // import {
  //   postSpecialAddApi,
  //   postSpecialEditApi,
  // } from '/@/api/device-management/special-equipment';
  import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
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

  const options = ref<any>([]);
  const PeopleSelect = ref<any>([]);

  function peopleSelect() {
    getPeopleSelect().then((res) => {
      PeopleSelect.value = res;
      options.value = res.map((v) => {
        return {
          value: v.id,
          label: v.name,
        };
      });
    });
  }
  onMounted(() => {
    peopleSelect();
    // if (id) {
    //   postWarehouseDetailApi({ id: id }).then((res) => {
    //     setFieldsValue(res);
    //   });
    // }
  });
  //showSubmitButton showResetButton
  const [register, { setFieldsValue }] = useForm({
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
  function handleChangeCheck(val) {
    const { phone } = PeopleSelect.value.find((item) => item.id == val);
    setFieldsValue({ phone: phone });
  }
  // postSpecialAddApi
</script>
