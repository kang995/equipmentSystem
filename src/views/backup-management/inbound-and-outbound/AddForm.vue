<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register">
      <template #tableSlot>
        <BasicTable @register="registerTable">
          <template #inputSlot>
            <a-input :v-model="inputValue" placeholder="请输入数量" />
          </template>
          <template #action="{ record }">
            <TableAction
              :divider="false"
              :stopButtonPropagation="true"
              :actions="[
                {
                  label: '详情',
                  onClick: handleDetail.bind(null, record),
                  delBtn: true,
                },

                {
                  label: '删除',
                  onClick: handleDel.bind(null, record),
                  delBtn: true,
                },
              ]"
          /></template>
          <template #tableTitle>
            <a-button type="primary" @click="handleAdd" class="mr-4">选择备件</a-button>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { inboundAdd, AddTable } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref } from 'vue';
  import { Input } from 'ant-design-vue';

  const { closeCurrent } = useTabs();
  const router = useRouter();
  const AInput = Input;
  const inputValue = ref();
  const dataSource = ref([{}]);
  const [registerTable] = useTable({
    dataSource: dataSource,
    columns: AddTable,
    rowKey: 'id',
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    pagination: false,
  });
  const [register, {}] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: inboundAdd,
    actionColOptions: {
      offset: 5,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
  });
  async function resetSubmitFunc() {
    await closeCurrent();
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }

  async function sumitForm() {
    await closeCurrent();
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }
  function handleDetail() {}
  function handleAdd() {}
  function handleDel() {}
</script>
