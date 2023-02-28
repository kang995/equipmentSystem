<template>
  <PageWrapper contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex flex-1 justify-start">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
          <a-button class="ml-4" @click="handleDeletes"> 批量删除 </a-button>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              // auth: 'system:menu:edit',
            },
            {
              label: '删除',
              color: 'error',
              // auth: 'system:menu:remove',
              popConfirm: {
                title: '是否确认删除？',
                okText: '删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { columns } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { menuDelApi, menuListApi } from '/@/api/systemSetting/menuManagement';
  import { h } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  // import { usePermission } from '/@/hooks/web/usePermission';
  // const { hasPermission } = usePermission();
  const { createMessage, createConfirm } = useMessage();
  const router = useRouter();
  const [registerTable, { reload, getSelectRowKeys, clearSelectedRowKeys }] = useTable({
    api: menuListApi,
    rowKey: 'menuId',
    columns,
    isTreeTable: true,
    clickToRowSelect: false,
    bordered: true,
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      // defaultHidden: !hasPermission(['system:menu:edit', 'system:menu:remove']),
      slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    router.push({ name: 'menuManagementAdd' });
  }

  function handleEdit(record: Recordable) {
    const { menuId } = record;
    router.push({
      name: 'menuManagementEdit',
      query: {
        id: menuId,
      },
    });
  }
  // 删除
  const handleDeletes = () => {
    const selectedRowKeys = getSelectRowKeys();
    if (selectedRowKeys.length > 0) {
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '提示'),
        content: () => h('span', `您确定要删除多条记录吗？`),
        okText: '删除',
        onOk: async () => {
          deleted(selectedRowKeys);
        },
      });
    } else {
      createMessage.warning('请选择要删除的选项');
    }
  };
  function deleted(ids) {
    menuDelApi(ids).then(() => {
      createMessage.success('删除成功');
      reload();
      clearSelectedRowKeys();
    });
  }

  function handleDelete(record: Recordable) {
    const menuId = record.menuId;
    deleted([menuId]);
  }
</script>
