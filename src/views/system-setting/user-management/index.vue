<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'roleFlag'">
          <span>{{ record.roleFlag === '0' ? '是' : '否' }}</span>
        </template>
        <span v-else>
          {{ record[column.dataIndex] ? record[column.dataIndex] : '-' }}
        </span>
      </template>
      <!-- 表格右操作 -->
      <template #action="{ record }">
        <TableAction
          :stopButtonPropagation="true"
          :divider="false"
          :actions="createActions(record)"
        />
      </template>
    </BasicTable>
    <ModalT @register="register" @handle-ok="handleOk" :minHeight="400" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import ModalT from './ModalT.vue';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './data';
  import { useRouter, useRoute } from 'vue-router';
  import { getAddGroupApi, getUserListApi } from '/@/api/systemSetting/userManagement';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();

  const router = useRouter();
  const route = useRoute();
  const { createMessage } = useMessage();
  const userGroup = route.query?.id as string;
  const roleId = route.query?.roleId as string;
  console.log('route.query.roleId: ', route.query.id);
  const [register, { openModal: openModal }] = useModal();
  //添加到用户组
  function handleUserGroup(record: Recordable) {
    const { userId } = record;
    openModal(true, { id: [userId] });
  }

  //表格配置
  const [registerTable, { reload }] = useTable({
    api: getUserListApi, //后台路径
    searchInfo: {
      userGroup: userGroup,
      roleId: roleId,
    },
    // 请求之前对参数进行处理
    beforeFetch: (res) => {
      return res;
    },
    rowKey: 'userId',
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: true, //是否开启form搜索表单
    columns: getBasicColumns, //table的表头配置
    //form搜索表单配置
    formConfig: getFormConfig(),

    actionColumn: {
      //右边操作功能配置
      width: 280,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
      defaultHidden: !hasPermission(['system:user:getUserDetailById', 'system:user:addGroup']),
      slots: { customRender: 'action' },
    },
  });
  //表格右边操作
  const createActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: '详情',
        auth: 'system:user:getUserDetailById',
        onClick: detailEquipment.bind(null, record),
      },
      {
        label: '添加用户组',
        onClick: handleUserGroup.bind(null, record),
        auth: 'system:user:addGroup',
      },
    ];
  };

  // 详情跳转
  function detailEquipment(record: Recordable) {
    const { userId } = record;
    router.push({
      name: 'UserDetail',
      query: {
        userId: userId,
      },
    });
  }
  function handleOk(data) {
    const groupId = data.targetKeys;
    const userId = data.id;

    getAddGroupApi(groupId, userId).then(() => {
      createMessage.success('保存成功');
      // 子组件回传事件，刷新列表
      reload();
    });
  }
</script>
