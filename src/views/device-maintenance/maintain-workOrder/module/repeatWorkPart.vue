<template>
  <div class="px-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex flex-1 space-x-4">
          <a-button type="primary" @click="handleOpen">选择备件</a-button>
        </div>
      </template>
      <template #useNumSlot="{ record }">
        <a-input-number placeholder="请输入数量" v-model:value="record.useNum" />
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
              onClick: handleDelete.bind(null, index),
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
  const AInputNumber = InputNumber;
  const router = useRouter();
  const dataSource = ref([]);
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
  function handleOpen() {
    // console.log('表格数据',getDataSource())
    openPartModal(true);
  }
  //备件回显
  function handleEcho(data) {
    dataSource.value = data;
    console.log('data', data);
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
  defineExpose({
    handleSubmitSpare,
  });
</script>

<style lang="less" scoped></style>
