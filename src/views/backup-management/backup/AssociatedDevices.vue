<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            delBtn: true,
          },
          {
            label: '删除',
            onClick: handleDel.bind(null, record),
            delBtn: true,
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <a-button type="primary" class="mr-4" :loading="exportLoading" @click="getModal()"
        >选择设备</a-button
      >
    </template>
  </BasicTable>
  <SelectDevice @register="registerModal" :minHeight="400" @handle-ok="handleOk" />
</template>
<script setup lang="ts">
  import SelectDevice from '../components/SelectDevice.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { backupColumns } from '../data';
  import { useModal } from '/@/components/Modal';
  const router = useRouter();
  const exportLoading = ref(false);

  const dataSource = ref([{}]);
  const [registerModal, { openModal: openModal }] = useModal();

  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: backupColumns,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDetails() {
    router.push({
      name: 'specialEquipmentDetails',
    });
  }
  function getModal() {
    openModal(true);
  }
  function handleOk() {}
  function handleDel() {}
</script>
<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 16px;
  }

  ::v-deep(.ant-form-item) {
    margin-bottom: 0;
  }

  ::v-deep(.tsit-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
    margin-bottom: 0;
  }

  ::v-deep(.ant-table-wrapper) {
    border-top: none;
    border-radius: 0 0 6px 6px;
  }
</style>
