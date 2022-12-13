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
  <AssociatedModal @register="registerModal" />
</template>
<script setup lang="ts">
  import AssociatedModal from './action-page/AssociatedModal.vue';

  import { ref } from 'vue';
  import { associatedColumns, associatedFormSchema } from './data';
  import { TableAction } from '/@/components/Table';
  import TablePage from '../components/TablePage.vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  const router = useRouter();
  const dataSource = ref([{}]);
  const [registerModal, { openModal: openModal }] = useModal();
  function handleDetails() {
    router.push({
      name: 'AssociatedDetail',
    });
  }
  function handleDel() {}
  function getModal() {
    openModal(true);
  }
</script>
