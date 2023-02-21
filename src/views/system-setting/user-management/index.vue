<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <!-- 表格右操作 -->
      <template #action="{ record }">
        <TableAction
          :stopButtonPropagation="true"
          :divider="false"
          :actions="createActions(record)"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './data';
  import { useRouter, useRoute } from 'vue-router';
  ///Users/gaolin/equipment-safety/src/api/sys/systemSetting/userManagement.ts
  import { getUserListApi } from '/@/api/sys/systemSetting/userManagement';
  // import { usePermission } from '/@/hooks/web/usePermission';

  // const { hasPermission } = usePermission();
  const router = useRouter();
  const route = useRoute();
  const roleId = route.query.roleId as string;

  //表格配置
  const [registerTable] = useTable({
    api: getUserListApi, //后台路径
    rowKey: 'userId',
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: true, //是否开启form搜索表单
    columns: getBasicColumns, //table的表头配置
    //form搜索表单配置
    formConfig: getFormConfig(),
    beforeFetch: (data) => {
      data.roleId = roleId;
    },
    actionColumn: {
      //右边操作功能配置
      width: 280,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
      // defaultHidden: !hasPermission([
      //   'system:user:detail',
      //   'system:user:remove',
      //   'system:user:addGroup',
      // ]),
      slots: { customRender: 'action' },
    },
  });
  //表格右边操作
  const createActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: '详情',
        // auth: 'system:user:detail',
        onClick: detailEquipment.bind(null, record),
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
</script>
