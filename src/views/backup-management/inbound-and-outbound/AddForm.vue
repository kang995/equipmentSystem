<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #userSlot="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="multiple"
          placeholder="请选择经手人"
          :options="optionsSelect"
          :show-search="true"
          :allow-clear="true"
          option-filter-prop="label"
      /></template>
      <template #tableSlot>
        <BasicTable @register="registerTable">
          <template #warehouseIdSlot="{ record, index }">
            <Select
              v-model:value="record.warehouseId"
              @change="(warehouseId) => handleChange(warehouseId, record, index)"
              :options="record.options"
              placeholder="请选择仓库"
          /></template>
          <template #stockSlot="{ record }">
            <Input v-model:value="record.stock" placeholder="库存数量" :readonly="true" />
          </template>
          <template #inputSlot="{ record, index }">
            <Input
              :controls="false"
              v-model:value="record.numberInput"
              placeholder="请输入数量"
              @change="handleLimt(record.numberInput, index)"
            />
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
  import { inboundAdd, AddTable, OutboundAdd, inboundAddTable } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref, onMounted } from 'vue';
  import { Input, Select, InputNumber } from 'ant-design-vue';
  import {
    postWarehouseListApi,
    postWarehouseOutListApi,
  } from '/@/api/backup-management/backup-details';
  import { useModal } from '/@/components/Modal';
  import AssociatedModal from '/@/views/device-management/record/action-page/AssociatedModal.vue';
  import { getPeopleSelect } from '/@/api/sys/systemSetting/systemType';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    posInAddApi,
    posOUTAddApi,
    getSpareListApi,
  } from '/@/api/backup-management/inbound-and-outbound';
  const { closeCurrent } = useTabs();
  const { createMessage } = useMessage();

  const router = useRouter();
  const route = useRoute();
  const state = route.query.state;

  const optionsSelect = ref();
  const dataSource = ref<Array<any>>([]);

  onMounted(() => {
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

  const [registerModal, { openModal, closeModal }] = useModal();
  const targetKeys = ref<any>([]);
  function getModal() {
    const data = getDataSource();
    const ids = [] as any; //deviceId
    data.map((v) => {
      ids.push(v.id);
    });
    targetKeys.value = Array.from(new Set(ids));
    openModal(true, targetKeys.value);
    // openModal(true);
  }
  const [registerTable, { getDataSource, setTableData }] = useTable({
    dataSource: dataSource,
    columns: state === 'OutboundAdd' ? AddTable : inboundAddTable,
    rowKey: 'id',
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    pagination: false,
  });
  const [register, { validateFields }] = useForm({
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
    const data = await validateFields();
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
  }
  function funAdd(api, data) {
    api(data)
      .then(() => {
        createMessage.success('新增成功');
        getRouter();
      })
      .finally(() => {});
  }
  //使用数量
  function handleLimt(num, index) {
    const data = getDataSource();
    console.log(num, data[index].stock);
    handleNum(String(num));
    if (state === 'InboundAdd' && Number(num) > data[index].stock) {
      createMessage.warn('使用数量不能大于库存数量！');
    }
  }
  // 限制提示
  function handleNum(value) {
    // console.log('value',value)
    if (!value) {
      return true;
    } else {
      if (value.length > 6) {
        createMessage.warn('使用数量为最大6位数');
        return false;
      }
      const IsNumber = /(^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$)/;
      if (!IsNumber.test(value)) {
        createMessage.warn('使用数量只能为数字');
        return false;
      }
    }
    return true;
  }
  //出库仓库
  function handleChange(warehouseId, { id }, index) {
    //仓库id、备件id、index
    console.log('warehouseId', warehouseId, id, index);
    const data = getDataSource();
    dataSource.value.some((item, indexs) => {
      // debugger
      if (indexs !== index && item.id === id && item.warehouseId === warehouseId) {
        createMessage.warn('同一备件下，不可选择同一仓库！');
      } else {
        //查询库存
        getSpareListApi({
          spareId: id, //备件id
          warehouseId, //仓库id
        }).then((res) => {
          // console.log('res',res)
          // data[index].stock = res.records[0].number;
          data[index].stock = res.records.length ? res.records[0].number : '0'; //接口返回值为空数组时，库存显示0
          setTableData(data);
        });
      }
    });
  }
  function handleDetail(data) {
    const id = data.id;
    router.push({
      name: 'BackupDetails',
      query: {
        id,
        type: '详情',
      },
    });
  }
  function handleOk(ids, data) {
    console.log('ids: ', ids);
    const arr = data.map((item) => ({ ...item })); //deepCopy
    dataSource.value.push(...arr);
    // dataSource.value = data;
    if (state === 'OutboundAdd') {
      dataSource.value.map((item) => {
        postWarehouseListApi().then((res) => {
          item['options'] = funOptions(res.records);
        });
      });
    } else {
      dataSource.value.map((item) => {
        postWarehouseOutListApi({ id: item.id }).then((res) => {
          item['options'] = funOptions(res.records);
        });
      });
    }
    closeModal();
  }
  function funOptions(res) {
    const data = res.map((v) => {
      return {
        value: v.warehouseId,
        label: v.warehouseName,
      };
    });
    return data;
  }
  function handleDel(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }
</script>
