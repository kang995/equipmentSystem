<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #warehouseIdListSlot="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="multiple"
          placeholder="请选择仓库"
          :options="options"
          @change="handleChange"
      /></template>
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
  import { ref, onMounted } from 'vue';
  import { Form, message, Select } from 'ant-design-vue';
  import { postTakeStockAddApi, stockSpareListApi } from '/@/api/backup-management/inventory';
  // import { posWarehouseSpareApi } from '/@/api/backup-management/backup-details';
  import { postWarehouseListApi } from '/@/api/backup-management/backup-details';
  const AFormItemRest = Form.ItemRest;

  const { closeCurrent } = useTabs();

  const router = useRouter();
  const dataSource = ref([{}]);
  const options = ref<any>([]);
  // const WarehouseSelect = ref<any>([]);
  onMounted(() => {
    funSelect();
  });
  function funSelect() {
    postWarehouseListApi().then((res) => {
      options.value = res.records.map((v) => {
        return {
          value: v.warehouseId,
          label: v.warehouseName,
        };
      });
      // WarehouseSelect.value = res.records;
      // options.value = res.records.map((v) => {
      //   return {
      //     value: v.warehouseId,
      //     label: v.warehouseName,
      //   };
      // });
    });
  }

  const [registerTable] = useTable({
    dataSource: dataSource,
    columns: tableAddColumns,
    pagination: false,
  });
  const [register, { getFieldsValue }] = useForm({
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

    resetButtonOptions: {
      text: '下发',
    },
    submitButtonOptions: {
      text: '保存',
    },
    resetFunc: resetFunc,
    submitFunc: sumitForm,
  });
  //合并数组
  function initFun(arr) {
    let newArr: any = [];
    return newArr.concat(...arr.map((x) => x.spareList));
  }
  //选择仓库
  function handleChange(val) {
    stockSpareListApi({ idList: val }).then((res) => {
      dataSource.value = initFun(res);
      // console.log('dataSource.value',dataSource.value)
    });
  }

  async function resetFunc() {
    const data = getFieldsValue();
    data['stockStatus'] = '4';
    postTakeStockAddApi(data).then(() => {
      message.success('下发成功');
      getRouter();
    });
  }

  async function sumitForm() {
    const data = getFieldsValue();
    data['stockStatus'] = '0';
    postTakeStockAddApi(data).then(() => {
      message.success('保存成功');
      getRouter();
    });
  }
  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'Inventory',
    });
  }
</script>
