<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :canFullscreen="false"
    title="选择备件"
    width="950px"
    @ok="handleOk"
    :maskClosable="false"
  >
    <div> <BasicTable @register="register" /></div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { postBackupListApi } from '/@/api/backup-management/backup';

  import { tableColumns, formSchema } from '../../data';
  const [registerModal] = useModalInner(async () => {});
  const [register, { getSelectRowKeys, getSelectRows }] = useTable({
    api: postBackupListApi,
    columns: tableColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
    },
    formConfig: {
      schemas: formSchema,
      autoSubmitOnEnter: true,
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'gonggong_sousuo|svg',
      },
      baseColProps: {
        span: 6,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });
  const emit = defineEmits(['handleOk', 'register']);

  function handleOk() {
    const ids = getSelectRowKeys();
    const data = getSelectRows();
    emit('handleOk', ids, data);
  }
</script>
