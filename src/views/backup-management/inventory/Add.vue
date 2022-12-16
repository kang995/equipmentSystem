<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #tableSlot>
        <AFormItemRest> <BasicTable @register="registerTable" /> </AFormItemRest
      ></template>
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { schemasInventoryAdd, tableAddColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { BasicTable, useTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { Form } from 'ant-design-vue';
  const AFormItemRest = Form.ItemRest;

  const { closeCurrent } = useTabs();
  const router = useRouter();
  const dataSource = ref([{}]);

  const [registerTable] = useTable({
    dataSource: dataSource,
    columns: tableAddColumns,
    pagination: false,
  });
  const [register, {}] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: schemasInventoryAdd,
    actionColOptions: {
      offset: 5,
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
    resetFunc: resetFunc,
    submitFunc: sumitForm,
  });
  async function resetFunc() {
    await closeCurrent();
    router.push({
      name: 'Inventory',
    });
  }

  async function sumitForm() {
    await closeCurrent();
    router.push({
      name: 'Inventory',
    });
  }
</script>
