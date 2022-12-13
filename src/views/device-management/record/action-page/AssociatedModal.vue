<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :canFullscreen="false"
    title="选择备件"
    width="950px"
    :maskClosable="false"
  >
    <template #footer> </template>
    <div> <BasicTable @register="register" /></div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { tableColumns, formSchema } from '../../data';
  const [registerModal] = useModalInner(async () => {});
  const dataSource = ref([{}]);
  const [register] = useTable({
    dataSource: dataSource,
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
</script>
