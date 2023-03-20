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
  import { postBackupListApi, postBackupOutListApi } from '/@/api/backup-management/backup';
  import { tableColumns, formSchema } from '../../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const state = route.query.state;

  const [registerModal] = useModalInner(async (data) => {
    setSelectedRowKeys(data);
  });

  const [register, { getSelectRowKeys, getSelectRows, setSelectedRowKeys }] = useTable({
    api: state === 'InboundAdd' ? postBackupOutListApi : postBackupListApi,
    columns: tableColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
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
      actionColOptions: {
        span: 6,
        style: {
          textAlign: 'left',
        },
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
