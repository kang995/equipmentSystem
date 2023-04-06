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
          },
          {
            label: '删除',
            onClick: handleDel.bind(null, record),
            delBtn: true,
            ifShow: () => (type ? false : true),
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <a-button
        v-if="!type"
        type="primary"
        class="mr-4"
        :loading="exportLoading"
        @click="getModal()"
        >选择设备</a-button
      >
    </template>
  </BasicTable>
  <SelectDevice @register="registerModal" :minHeight="400" @handle-ok="handleOk" />
</template>
<script setup lang="ts">
  import SelectDevice from '../components/SelectDevice.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { devicesColumns } from '../data';
  import { useModal } from '/@/components/Modal';
  import { postBackupListlApi } from '/@/api/backup-management/backup';
  const router = useRouter();
  const route = useRoute();
  const exportLoading = ref(false);
  const id = route.query?.id;
  const type = route.query?.type;

  const dataSource = ref([]);
  const [registerModal, { openModal: openModal, closeModal }] = useModal();
  id &&
    postBackupListlApi({ id }).then((res) => {
      dataSource.value = res;
    });
  const [register] = useTable({
    dataSource: dataSource,
    columns: devicesColumns,
    rowKey: 'id',

    actionColumn: {
      width: 280,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleDetails(data) {
    let name;
    let state;
    const natureType = data.deviceNature; //设备类型 1静0动
    const dataSource = data.dataSource; //数据来源(1:企业综合；2：本系统)
    const id = data.deviceId;
    if (data.specialEquip === 'yes') {
      if (natureType === '1') {
        name = 'specialEquipmentDetails'; //特种设备详情静
        state = '3';
      } else {
        name = 'specialEquipmentDetailsMove'; //特种设备详情静
        state = '4';
      }
    } else {
      if (natureType === '1') {
        name = 'MechanicsDetails'; //机械设备详情静
        state = '2';
      } else {
        name = 'MechanicsDetailsMove'; //机械设备详情动
        state = '1';
      }
    }
    router.push({
      name: name,
      query: {
        id,
        state,
        dataSource,
      },
    });
  }
  function getModal() {
    openModal(true);
  }
  function handleOk(data) {
    console.log('data: ', data);
    closeModal();
  }
  function handleDel() {}
</script>
<style scoped lang="less">
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }

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
