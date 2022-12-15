<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <!-- 表格按钮 -->
      <template #tableTitle>
        <div class="flex space-x-4">
          <a-button type="primary" @click="addEquipment" v-if="hasPermission(['system:role:add'])">
            新增
          </a-button>
          <a-button @click="handleDelete" v-if="hasPermission(['system:role:remove'])">
            批量删除
          </a-button>
        </div>
      </template>
      <!-- 表格右操作 -->
      <template #action="{ record }">
        <TableAction
          :stopButtonPropagation="true"
          :divider="false"
          :actions="createActions(record)"
          :dropDownActions="dropDownActions(record)"
        />
      </template>
      <template #userNumSlots="{ text, record }">
        <a-button type="link" @click="userNumTap(record)">{{ text }}</a-button>
      </template>
    </BasicTable>
    <AddRoleUserModal @register="registerModal" :minHeight="400" @handle-ok="handleOk" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, h } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './data';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import {
    addRoleUserApi,
    deleteRoleApi,
    getRoleManagementListApi,
  } from '/@/api/sys/systemSetting/roleManagement';
  import AddRoleUserModal from '../components/AddUserModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { message } from 'ant-design-vue';

  const { hasPermission } = usePermission();
  const { createMessage, createConfirm } = useMessage();
  const router = useRouter();
  const [registerModal, { openModal: openModal }] = useModal();

  //表格配置
  const [registerTable, { getSelectRows, setLoading, reload }] = useTable({
    api: getRoleManagementListApi, //后台路径
    rowKey: 'roleId',
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: true, //是否开启form搜索表单
    columns: getBasicColumns(), //table的表头配置
    //form搜索表单配置
    formConfig: getFormConfig(),
    rowSelection: {
      //多选框的配置
      type: 'checkbox',
    },
    actionColumn: {
      //右边操作功能配置
      width: 300,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
      defaultHidden: !hasPermission([
        'system:role:edit',
        'system:role:detail',
        'system:role:remove',
        'system:role:addUser',
        'system:role:addMenu',
      ]),
      slots: { customRender: 'action' },
    },
  });
  //表格右边操作
  const createActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: '编辑',
        auth: 'system:role:edit',
        ifShow: record.admin === true ? false : true,
        onClick: editEquipment.bind(null, record),
      },
      {
        label: '详情',
        auth: 'system:role:detail',
        onClick: detailEquipment.bind(null, record),
      },
      {
        label: '删除',
        ifShow: record.admin === true ? false : true,
        color: 'error',
        auth: 'system:role:remove',
        popConfirm: {
          title: '确认删除吗？',
          okText: '删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  };

  const dropDownActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: '添加用户成员',
        onClick: openModalReady.bind(null, record),
        auth: 'system:role:addUser',
      },
      {
        label: '添加权限',
        ifShow: record.admin === true ? false : true,
        onClick: toAddPermission.bind(null, record),
        auth: 'system:role:addMenu',
      },
    ];
  };
  function userNumTap(record: Recordable) {
    const roleId = record.roleId;
    router.push({
      name: 'UserManagement',
      query: {
        roleId: roleId,
      },
    });
  }
  // 添加用户成员
  function openModalReady(record: Recordable) {
    const { roleId } = record;
    openModal(true, { id: roleId });
  }
  // 添加权限
  function toAddPermission(record: Recordable) {
    const { roleId } = record;
    router.push({
      name: 'AddRolePermission',
      query: {
        id: roleId,
      },
    });
  }
  // 新建跳转
  function addEquipment() {
    router.push({
      name: 'roleManagementAdd',
    });
  }

  // 编辑跳转
  function editEquipment(record: Recordable) {
    const { roleId } = record;
    router.push({
      name: 'roleManagementEdit',
      query: {
        id: roleId,
      },
    });
  }
  // 详情跳转
  function detailEquipment(record: Recordable) {
    const { roleId, roleFlag } = record;
    router.push({
      name: 'roleManagementDetail',
      query: {
        id: roleId,
        roleFlag,
      },
    });
  }
  //删除
  const handleDelete = (record: Recordable) => {
    const { roleId } = record;
    let ids = ref<string[]>([]);
    if (roleId) {
      ids.value = [roleId];
      deleteApi(ids.value);
    } else {
      const data = getSelectRows();
      if (data.length > 0) {
        if (data.filter((item) => item.roleFlag === '0').length > 0) {
          createMessage.warning('admin角色不能删除');
          return;
        } else {
          ids.value = data.map((item) => item.roleId);
        }
      } else {
        createMessage.warning('请选择需要删除的数据');
        return;
      }
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '提示'),
        content: () => h('span', `您确定要删除多条记录吗？`),
        okText: '删除',
        onOk: async () => {
          deleteApi(ids.value);
        },
      });
    }
  };

  //删除api
  function deleteApi(ids: string[]) {
    setLoading(true);
    deleteRoleApi(ids)
      .then(() => {
        message.success('删除成功');
        reload();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleOk(data) {
    addRoleUserApi(data.id, data.targetKeys).then(() => {
      createMessage.success('保存成功');
      reload();
    });
  }
</script>
