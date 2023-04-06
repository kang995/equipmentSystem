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
  import {
    posWarehouseAddApi,
    posWarehouseEditApi,
    postWarehouseDetailApi,
  } from '/@/api/backup-management/backup-details';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { closeCurrent } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const id = route.query?.id;
  const version = ref<string>('');
  const { createMessage } = useMessage();

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
    if (id) {
      postWarehouseDetailApi({ id: id }).then((res) => {
        setFieldsValue(res);
        version.value = res.version;
      });
    }
  });
  function handleChangeCheck(val) {
    const { phone } = PeopleSelect.value.find((item) => item.id == val);
    setFieldsValue({ principalPhone: phone });
  }
  const [register, { setFieldsValue, getFieldsValue, setProps }] = useForm({
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
      data['version'] = version.value;
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
    setProps({
      submitButtonOptions: {
        loading: true,
      },
    });
    posWarehouseAddApi(data)
      .then(() => {
        createMessage.success('新增成功');
        getRoute();
      })
      .finally(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      });
  }
  function funDetails(data) {
    setProps({
      submitButtonOptions: {
        loading: true,
      },
    });
    posWarehouseEditApi(data)
      .then(() => {
        createMessage.success('修改成功');
        getRoute();
      })
      .finally(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      });
  }
</script>
