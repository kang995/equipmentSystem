<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button
        type="primary"
        class="mr-4"
        preIcon="gonggong_tianjia_xianxing|svg"
        @click="handleAdd"
        >新建</a-button
      >
      <a-button class="mr-4" @click="batchDelete">批量删除</a-button>
      <Tooltip title="不选择即导出全部数据" :mouseLeaveDelay="0" :mouseEnterDelay="0">
        <a-button @click="batchExport"> 批量导出 </a-button>
      </Tooltip>
    </template>

    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除?',
              confirm: handleDelete.bind(null, record),
            },
          },
          {
            label: '绑定模型',
            // onClick: handleDelete.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
  <ModalDetail @register="registerModalDetail" @go-edit="handleEdit" />
  <ModalAdd @register="registerModalAdd" @submitted="handleSubmitted" />
</template>

<script lang="ts" setup>
  import { BasicTable, ColumnChangeParam, useTable, TableAction } from '/@/components/Table';
  import { Tooltip } from 'ant-design-vue';
  import { coalSeamColumns, coalSeamFormConfig } from '../data';
  import { demoListApi } from '/@/api/demo/table';
  import { useModal } from '/@/components/Modal';
  import ModalDetail from './modalDetail.vue';
  import ModalAdd from './modalAdd.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const [
    registerTable,
    {
      // setLoading,
      // setColumns,
      // getColumns,
      // getDataSource,
      // getRawDataSource,
      reload,
      // getPaginationRef,
      // setPagination,
      // getSelectRows,
      getSelectRowKeys,
      // setSelectedRowKeys,
      // clearSelectedRowKeys,
    },
  ] = useTable({
    api: demoListApi,
    // resizeHeightOffset: -8,
    columns: coalSeamColumns(),
    showIndexColumn: true,
    indexColumnProps: {
      width: 60,
      fixed: 'left',
    },
    ellipsis: true,
    useSearchForm: true,
    formConfig: coalSeamFormConfig(),
    // rowKey: 'id',
    // inset: false,
    inTabs: true,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 50,
    },
    onColumnsChange: (data: ColumnChangeParam[]) => {
      console.log('ColumnsChanged', data);
    },
    actionColumn: {
      width: 250,
      title: '操作',
      slots: { customRender: 'action' },
    },
  });

  const [registerModalDetail, { openModal: openModalDetail }] = useModal();
  const [registerModalAdd, { openModal: openModalAdd }] = useModal();

  const { createConfirm, createMessage } = useMessage();

  // 详情
  function handleDetail(record) {
    console.log('handleDetail', record);
    openModalDetail(true, record);
  }

  // 编辑
  function handleEdit(record) {
    console.log('handleEdit', record);
    openModalAdd(true, record);
  }

  // 新增
  function handleAdd() {
    console.log('handleAdd');
    openModalAdd(true);
  }

  // 删除
  function handleDelete(record) {
    console.log('handleDelete', record);
    reload();
  }

  // 批量删除
  function batchDelete() {
    const selectedRowKeys = getSelectRowKeys();
    if (selectedRowKeys.length > 0) {
      createConfirm({
        iconType: 'warning',
        title: '提示',
        content: `您确定要删除${selectedRowKeys.length}条记录吗？`,
        okText: '删除',
        onOk: async () => {
          // deleted(selectedRowKeys);
        },
      });
    } else {
      createMessage.warning('请选择要删除的数据');
    }
  }

  // 批量导出
  function batchExport() {}

  // 新增或者编辑完成事件
  function handleSubmitted() {
    reload();
  }
</script>

<style scoped lang="less"></style>
