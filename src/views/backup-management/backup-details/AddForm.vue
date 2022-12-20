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
        /> </template
    ></BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Select } from 'ant-design-vue';
  import { schemasAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { ref, onMounted } from 'vue';
  import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
  import { posWarehouseAddApi, posWarehouseEditApi } from '/@/api/backup-management/backup-details';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { closeCurrent } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const id = route.query?.id;

  const { createMessage } = useMessage();

  const options = ref([]);
  const PeopleSelect = ref([]);
  onMounted(() => {
    peopleSelect();
  });

  function peopleSelect() {
    getPeopleSelect().then((res) => {
      PeopleSelect.value = res;
      console.log('res: ', res); //phone
      options.value = res.map((v) => {
        return {
          value: v.id,
          label: v.name,
        };
      });
    });
  }

  function handleChangeCheck(val, DATA) {
    console.log('DATA: ', DATA);
    console.log('val: ', val);
    // const { phone } = PeopleSelect.value;
    setFieldsValue({ principalPhone: '15267289380' });
  }
  const [register, { setFieldsValue, getFieldsValue }] = useForm({
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
    getRoute();
  }
  //保存
  async function sumitForm() {
    const data = getFieldsValue();
    if (id) {
      data['id'] = id;
      funDetails(data);
    } else {
      funAdd(data);
    }
  }
  function getRoute() {
    closeCurrent();
    router.push({
      name: 'BackupDetailsList',
    });
  }
  function funAdd(data) {
    console.log('data:111111 ', data);
    posWarehouseAddApi(data).then((res) => {
      console.log('res: ', res);
      createMessage.success('新增成功');
      getRoute();
    });
  }
  function funDetails(data) {
    posWarehouseEditApi(data).then((res) => {
      console.log('res: ', res);
      createMessage.success('修改成功');
      getRoute();
    });
  }
</script>
