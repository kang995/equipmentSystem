<template>
  <BasicModal
    v-bind="$attrs"
    title="选择备件"
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
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  // import { BasicForm, useForm } from '/@/components/Form';
  import { partTableColumns, getPartFormSchema } from './fileld';

  const [registerModalc, { closeModal }] = useModalInner(async (data) => {
    console.log(111, data);
  });
  const dataSource = ref([{}, {}]);
  const [registerTable, { getForm }] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: partTableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
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
    },
  });

  // const [registerForm, { validate, getFieldsValue }] = useForm({
  //   schemas: getAgainFormSchema(),
  //   baseColProps: {
  //     span: 22,
  //     style: {
  //       margin: '0 auto',
  //     },
  //   }, //配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
  //   labelWidth: 80,
  //   actionColOptions: {
  //     offset: 18,
  //     span: 10,
  //     style: {
  //       textAlign: 'left',
  //     },
  //   }, //操作按钮外层 Col 组件配置
  //   showActionButtonGroup: false,
  // });

  //提交
  async function submitForm() {
    const data = getForm().getFieldsValue();
    console.log('数据', data);
  }
  //取消
  async function goBack() {
    closeModal();
  }
</script>

<style lang="less" scoped></style>
