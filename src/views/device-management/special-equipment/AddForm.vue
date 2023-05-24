<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #personSlot="{ model, field }">
        <Select
          v-model:value="model[field]"
          showSearch
          optionFilterProp="label"
          style="width: 100%"
          placeholder="请选择管理人员"
          :options="options"
          @change="handleChangeCheck"
        />
      </template>
      <template #position>
        <Position
          @view-map="viewMap"
          :positionData="PositionData"
          :testState="dataSource === '1' ? true : false"
        />
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
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { onMounted, ref } from 'vue';
  import {
    postSpecialAddApi,
    postSpecialEditApi,
    postSpecialDetailApi,
  } from '/@/api/device-management/special-equipment';
  import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const dataSource = route.query?.dataSource as string;
  const versionVal = ref();
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
    funDetail();
  });
  function funDetail() {
    id &&
      postSpecialDetailApi({ id: id, dataSource: dataSource }).then((res) => {
        setFieldsValue(res);
        versionVal.value = res.version;
        res.positionList && setLatitudeLongitude(res.positionList);
      });
  }

  const [register, { setFieldsValue, getFieldsValue, validateFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd(dataSource ? dataSource : '2'),
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
    getRouter();
  }

  function handleChangeCheck(val) {
    const { phone } = PeopleSelect.value.find((item) => item.id == val);
    setFieldsValue({ managementPeoplePhone: phone });
  }
  async function sumitForm() {
    await validateFields();
    const data = getFieldsValue();
    if (!data.affixList) {
      data['affixList'] = [];
    }
    if (!data.blueprintList) {
      data['blueprintList'] = [];
    }
    const geographicalPositionValue = PositionData.value as any;
    if (
      geographicalPositionValue[0].longitude !== '' ||
      geographicalPositionValue[0].latitude !== ''
    ) {
      geographicalPositionValue.forEach((item) => {
        if (item.longitude === '' || item.latitude === '') {
          PositionData.value = geographicalPositionValue.filter(
            (val) => val.latitude !== '' && val.longitude !== '',
          );
        }
      });
    }
    Object.assign(data, {
      positionList: PositionData.value,
    });
    if (id) {
      data['id'] = id;
      data['version'] = versionVal.value;
      console.log('versionVal.value: ', versionVal.value);
      data['dataSource'] = dataSource;
      funAdd(postSpecialEditApi, data, '编辑成功');
    } else {
      funAdd(postSpecialAddApi, data, '新增成功');
    }
  }
  function funAdd(api, data, test) {
    api(data).then(() => {
      createMessage.success(test);
      getRouter();
    });
  }
  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'specialEquipment',
    });
  }
  //回显地理位置
  function setLatitudeLongitude(siteList: any[]) {
    if (siteList.length > 0) {
      siteList.forEach((item, index) => {
        if (index === 0) {
          PositionData.value.forEach((itemData) => {
            itemData.longAndLatiType = item.longAndLatiType;
            itemData.latitude = item.latitude;
            itemData.longitude = item.longitude;
          });
        } else {
          PositionData.value.push({
            longAndLatiType: item.longAndLatiType,
            longitude: item.longitude,
            latitude: item.latitude,
          });
        }
      });
    }
  }
</script>
