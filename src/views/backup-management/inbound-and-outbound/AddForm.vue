<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #userSlot="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="multiple"
          placeholder="请选择经手人"
          :options="optionsSelect"
      /></template>
      <template #tableSlot>
        <BasicTable @register="registerTable">
          <template #warehouseIdSlot="{ record }">
            <Select v-model:value="record.warehouseId" :options="options" placeholder="请选择仓库"
          /></template>
          <template #stockSlot="{ record }">
            <Input v-model:value="record.stock" placeholder="库存数量" :readonly="true" />
          </template>
          <template #inputSlot="{ record }">
            <Input v-model:value="record.numberInput" placeholder="请输入数量" />
          </template>
          <template #action="{ record, index }">
            <TableAction
              :divider="false"
              :stopButtonPropagation="true"
              :actions="[
                {
                  label: '详情',
                  onClick: handleDetail.bind(null, record),
                  delBtn: true,
                },

                {
                  label: '删除',
                  onClick: handleDel.bind(null, index),
                  delBtn: true,
                },
              ]"
          /></template>
          <template #tableTitle>
            <a-button type="primary" @click="getModal" class="mr-4">选择备件</a-button>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
    <AssociatedModal @register="registerModal" @handle-ok="handleOk" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { inboundAdd, AddTable, OutboundAdd } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref, onMounted } from 'vue';
  import { Input, Select } from 'ant-design-vue';
  import { postWarehouseListApi } from '/@/api/backup-management/backup-details';
  import { useModal } from '/@/components/Modal';
  import AssociatedModal from '/@/views/device-management/record/action-page/AssociatedModal.vue';
  import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { posInAddApi, posOUTAddApi } from '/@/api/backup-management/inbound-and-outbound';
  const { closeCurrent } = useTabs();
  const { createMessage } = useMessage();

  const router = useRouter();
  const route = useRoute();
  const state = route.query.state;

  const options = ref([]);
  const optionsSelect = ref();
  const dataSource = ref([]);

  onMounted(() => {
    funWarehouseList();
    peopleSelect();
  });
  //经手人
  function peopleSelect() {
    getPeopleSelect().then((res) => {
      optionsSelect.value = res.map((v) => {
        return {
          value: v.id,
          label: v.name,
        };
      });
    });
  }
  //仓库 postWarehouseOutListApi
  function funWarehouseList() {
    postWarehouseListApi().then((res) => {
      options.value = res.records.map((v) => {
        return {
          value: v.warehouseId,
          label: v.warehouseName,
        };
      });
    });
  }
  const [registerModal, { openModal, closeModal }] = useModal();

  function getModal() {
    openModal(true);
  }
  const [registerTable, { getDataSource, setTableData }] = useTable({
    dataSource: dataSource,
    columns: AddTable,
    rowKey: 'id',
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    pagination: false,
  });
  const [register, { getFieldsValue }] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: state === 'OutboundAdd' ? OutboundAdd : inboundAdd,
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
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
  });
  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'InboundAndOutbound',
    });
  }
  async function resetSubmitFunc() {
    getRouter();
  }

  async function sumitForm() {
    const data = getFieldsValue();
    const table = getDataSource();
    console.log('table: ', table);
    const tableList = table.map((v) => {
      return {
        spareId: v.id,
        warehouseId: v?.warehouseId,
        number: v?.numberInput,
      };
    });
    data['receiptSpareAddDTOList'] = tableList;

    if (state === 'OutboundAdd') {
      funAdd(posInAddApi, data); //入库新增
    } else {
      funAdd(posOUTAddApi, data);
    }
    getRouter();
  }
  function funAdd(api, data) {
    api(data).then(() => {
      createMessage.success('新增成功');
    });
  }
  function handleDetail() {}
  function handleOk(ids, data) {
    console.log('ids: ', ids);
    dataSource.value = data;
    closeModal();
  }
  function handleDel(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }
</script>
