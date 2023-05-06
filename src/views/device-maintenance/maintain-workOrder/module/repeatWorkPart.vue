<template>
  <div class="px-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex flex-1 space-x-4">
          <a-button type="primary" @click="handleOpen">选择备件</a-button>
        </div>
      </template>
      <template #useNumSlot="{ record }">
        <a-input-number
          placeholder="请输入数量"
          :min="1"
          :max="99999999"
          v-model:value="record.useNum"
        />
      </template>
      <template #action="{ record, index }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, index),
              },
              color: 'error',
              delBtn: true,
            },
          ]"
        />
      </template>
    </BasicTable>
    <PartModel @register="registerPartModal" @event-open="handleEcho" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import PartModel from '/@/views/device-maintenance/components/changePartModel.vue';
  import { useRouter } from 'vue-router';
  import { deviceTableColumns } from '../data';
  // import { useMessage } from '/@/hooks/web/useMessage';
  // const { createMessage } = useMessage();
  const AInputNumber = InputNumber;
  const router = useRouter();
  const dataSource = ref<any>([]);
  const [registerPartModal, { openModal: openPartModal }] = useModal();
  const [registerTable, { getDataSource, setTableData }] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: deviceTableColumns(),
    rowKey: 'id',
    useSearchForm: false, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  //选择备件
  const targetKeys = ref<any>([]);
  function handleOpen() {
    const data = getDataSource();
    const ids = [] as any; //deviceId
    data.map((v) => {
      ids.push(v.id);
    });
    targetKeys.value = Array.from(new Set(ids));
    openPartModal(true, targetKeys.value);
  }
  //备件回显
  function handleEcho(data) {
    // const arr = data.map((item) => ({ ...item })); //deepCopy
    // dataSource.value.push(...arr);
    dataSource.value = data;
    console.log('dataSource.value', dataSource.value);
  }
  //提交处理结果
  function handleSubmitSpare() {
    return new Promise((resolve) => {
      const data = getDataSource();
      resolve(data);
    });
  }

  //删除
  function handleDelete(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }

  //详情
  function handleDetails(record) {
    router.push({
      name: 'BackupDetails',
      query: {
        id: record.spareId,
      },
    });
  }
  //使用数量
  // function handleChange(value: number | string,index:number){
  //   console.log('value',value,index)
  //   if (Number(value) > dataSource.value[index].inventorySum) {
  //     createMessage.warn('使用数量不能大于库存数量！');
  //   }
  // }
  defineExpose({
    handleSubmitSpare,
  });
</script>

<style lang="less" scoped></style>
