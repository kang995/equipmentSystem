<template>
  <BasicModal
    v-bind="$attrs"
    title="关联应急预案"
    :destroy-on-close="true"
    :mask-closable="false"
    @ok="submitForm"
    @cancel="goBack"
    width="1200px"
    @register="registerModalc"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="ts">
  // import { ref } from "vue"
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  // import { BasicForm, useForm } from '/@/components/Form';
  import { partTableColumns, getPartFormSchema } from './data';
  import { contingencyPlanApi } from '/@/api/device-management/special-equipment';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const deviceId = route.query.id as string;
  const emit = defineEmits(['register', 'eventOpen']);
  const [registerModalc, { closeModal }] = useModalInner(async () => {
    // console.log(111, data);
  });
  const [registerTable, { getSelectRows }] = useTable({
    api: contingencyPlanApi,
    searchInfo: {
      deviceId,
    },
    columns: partTableColumns,
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    formConfig: {
      schemas: getPartFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
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

  //提交
  async function submitForm() {
    const data = getSelectRows();
    console.log('data', data);
    emit('eventOpen', data);
    closeModal();
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
