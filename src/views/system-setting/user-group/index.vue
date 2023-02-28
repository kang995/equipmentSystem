<template>
  <PageWrapper>
    <BasicTable
      @register="registerTableArray"
      :rowSelection="{ type: 'checkbox', onChange: onSelectChange }"
      @edit-end="handleEditEnd"
    >
      <!--按钮-->
      <template #tableTitle>
        <a-button
          type="primary"
          preIcon="gonggong_tianjia_xianxing|svg"
          class="m-1"
          @click="addEquipment()"
          >新建</a-button
        >
        <a-button class="m-1" @click="showDeleteConfirm(checkedKeys)">批量删除</a-button>
      </template>
      <!--table-->
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :actions="[
            {
              label: '编辑',
              onClick: editEquipment.bind(null, record),
              auth: 'system:group:edit',
            },
            {
              label: '详情',
              onClick: detailEquipment.bind(null, record),
              auth: 'system:group:query',
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否删除？',
                confirm: handleDelete.bind(null, record),
              },
              auth: 'system:group:remove',
            },
          ]"
          :dropDownActions="[
            {
              label: '添加用户成员',
              onClick: openModalReady.bind(null, record),
              auth: 'system:group:saveUserAndGroups',
            },
            {
              label: '添加权限',
              onClick: toAddPermission.bind(null, record),
              auth: 'system:group:addPerm',
            },
          ]"
        />
      </template>
      <template #peopleNumSlots="{ text, record }">
        <a-button type="link" @click="peopleNumTap(record)">{{ text }}</a-button>
      </template>
    </BasicTable>
    <AddUserModal @register="register" :minHeight="400" @handle-ok="handleOk" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, createVNode } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { getBasicColumns, getFormConfig } from './data';
  import AddUserModal from '../components/AddUserModal.vue';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { Modal } from 'ant-design-vue';
  import {
    deleteUserGroupApi,
    getUserGroupListApi,
    saveUserAndGroups,
  } from '/@/api/systemSetting/userGroupManagement';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useModal } from '/@/components/Modal';
  const { hasPermission } = usePermission();
  const router = useRouter();
  const checkedKeys = ref<Array<string | number>>([]);
  const { createMessage } = useMessage();
  const [register, { openModal: openModal }] = useModal();
  const [registerTableArray, { reload }] = useTable({
    api: getUserGroupListApi,
    columns: getBasicColumns(),
    formConfig: getFormConfig(),
    useSearchForm: true, //是否表单
    rowKey: 'id',
    actionColumn: {
      width: 220,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  // 新建跳转
  function addEquipment() {
    router.push({
      name: 'UserGroupAdd',
    });
  }
  // 用户数量
  function peopleNumTap(record: Recordable) {
    console.log('record: ', record);
    const id = record.id;
    router.push({
      name: 'UserManagement',
      query: {
        id: id,
      },
    });
  }
  // 添加用户成员
  function openModalReady(record: Recordable) {
    const { id } = record;
    openModal(true, { id: id, type: 'userGroup' });
  }
  function handleOk(data) {
    saveUserAndGroups(data.id, data.targetKeys).then(() => {
      createMessage.success('保存成功');
      // 子组件回传事件，刷新列表
      reload();
    });
  }
  // 详情
  function detailEquipment(record: Recordable) {
    const { id } = record;
    console.log('record: ', record);
    console.log('id: ', id);
    router.push({
      name: 'UserGroupDetail',
      query: {
        id: id,
      },
    });
  }
  // 编辑跳转
  function editEquipment(record: Recordable) {
    const { id } = record;
    router.push({
      name: 'UserGroupEdit',
      query: {
        id: id,
      },
    });
  }
  // 添加权限
  function toAddPermission(record: Recordable) {
    const { id } = record;
    router.push({
      name: 'AddUserPermission',
      query: {
        id: id,
        name: 'userGroup',
      },
    });
  }
  // 排序输入框确认成功
  function handleEditEnd({ record, index, key, value }: Recordable) {
    console.log(record, index, key, value);
    return false;
  }
  // 批量删除
  const showDeleteConfirm = (checkedKeys) => {
    console.log(checkedKeys);

    if (checkedKeys.length > 0) {
      Modal.confirm({
        title: '您确定要删除多条记录吗？',
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          deleted(checkedKeys);
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    } else {
      createMessage.warning('请先选择需要删除的数据～');
    }
  };
  // 删除一项
  function handleDelete(record: Recordable) {
    const id = record.id;
    deleted([id]);
  }
  function deleted(ids) {
    deleteUserGroupApi(ids).then(() => {
      reload();
      createMessage.success('删除成功');
      checkedKeys.value = [];
    });
  }
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    // console.log(selectedRowKeys);
    checkedKeys.value = selectedRowKeys;
  }
</script>
<style scoped lang="less">
  .tsit-basic-table-form-container {
    padding: 0;
  }
</style>
