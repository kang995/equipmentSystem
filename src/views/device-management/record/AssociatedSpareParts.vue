<template>
  <TablePage
    :dataSource="dataSource"
    :columns="associatedColumns"
    :formSchema="associatedFormSchema"
    :ifExport="true"
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
            onClick: handleDel.bind(null, record),
            delBtn: true,
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
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import AssociatedModal from './action-page/AssociatedModal.vue';
  const [registerModal, { openModal, closeModal }] = useModal();
  const router = useRouter();
  const dataSource = ref<any>([]);
  function handleDetails() {
    router.push({
      name: 'AssociatedDetail',
    });
  }
  function getModal() {
    openModal(true);
  }
  function handleOk(ids, data) {
    console.log('ids: ', ids);
    dataSource.value = data;
    closeModal();
    console.log(dataSource.value);
  }
  //移除
  function handleDel() {}
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }
</style>
