<template>
  <BasicModal
    v-bind="$attrs"
    title="选择备件"
    :mask-closable="false"
    :canFullscreen="false"
    @ok="submitForm"
    @cancel="goBack"
    width="1200px"
    @register="registerModalc"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  // import { BasicForm, useForm } from '/@/components/Form';
  import { partTableColumns, getPartFormSchema } from './fileld';
  import { getSpartPartListApi } from '/@/api/device-maintenance/work';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const emit = defineEmits(['register', 'eventOpen']);
  const [registerModalc, { closeModal }] = useModalInner(async (data) => {
    console.log('data', data);
    setSelectedRowKeys(data);
  });
  const [registerTable, { getSelectRows, setSelectedRowKeys }] = useTable({
    // dataSource: dataSource,
    api: getSpartPartListApi,
    columns: partTableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    // actionColumn: {
    //   title: '操作',
    //   dataIndex: 'action',
    //   slots: { customRender: 'action' },
    // },
    formConfig: {
      schemas: getPartFormSchema(),
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
      actionColOptions: {
        span: 6,
        style: {
          textAlign: 'left',
        },
      },
    },
  });

  //提交
  async function submitForm() {
    const data = getSelectRows();
    console.log('data', data);
    if (!data.length) {
      createMessage.warn('至少选择一项！');
      return;
    }
    emit('eventOpen', data);
    closeModal();
    // console.log('数据', data);
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
