<template>
  <TablePage
    :api="SpareListApiApi"
    :columns="associatedColumns"
    :formSchema="associatedFormSchema(deviceId)"
    :ifExport="true"
    ref="spareRef"
  >
    <template #tableTitle>
      <a-button type="primary" @click="getModal">关联备件</a-button>
    </template>
    <template #tableAction="record">
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
            label: '移除',
            color: 'error',
            // onClick: handleDel.bind(null, record),
            popConfirm: {
              title: '是否确认移除?',
              confirm: handleDel.bind(null, record),
            },
            // delBtn: true,
          },
        ]"
      />
    </template>
  </TablePage>
  <AssociatedModal @register="registerModal" @handle-ok="handleOk" />
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { associatedColumns, associatedFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import AssociatedModal from './action-page/AssociatedModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    SpareListApiApi,
    SpareAddApi,
    SpareRemoveApi,
  } from '/@/api/device-management/special-equipment';

  const { createMessage } = useMessage();
  const [registerModal, { openModal, closeModal }] = useModal();
  const router = useRouter();
  const route = useRoute();
  const spareRef = ref();
  const deviceId = route.query.id as string;
  // const dataSource = ref<any>([]);
  function handleDetails({ record }) {
    router.push({
      name: 'BackupDetails',
      query: {
        id: record.id,
      },
    });
  }
  //关联备件
  const targetKeys = ref<any>([]);
  function getModal() {
    const data = spareRef.value.getDataSource();
    const ids = [] as any; //deviceId
    data.map((v) => {
      ids.push(v.id);
    });
    targetKeys.value = Array.from(new Set(ids));
    openModal(true, targetKeys.value);
  }
  function handleOk(ids, _data) {
    // console.log('ids: ', ids);
    // dataSource.value = data;
    SpareAddApi({ ids, deviceId }).then(() => {
      closeModal();
      spareRef.value.reload();
    });
  }
  //移除
  function handleDel({ record }) {
    // console.log('record',record)
    SpareRemoveApi({ deviceId, spareId: record.id }).then(() => {
      createMessage.success('移除成功');
      spareRef.value.reload();
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }
</style>
