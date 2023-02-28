<template>
  <BasicTable @register="register">
    <!-- 表格按钮 -->
    <template #tableTitle>
      <div class="flex space-x-4">
        <a-button
          type="primary"
          preIcon="gonggong_tianjia_xianxing|svg"
          @click="createRecord(props.type)"
          v-if="hasPermission(['system:ipInfo:add'])"
        >
          新建
        </a-button>
        <a-button
          type="primary"
          @click="deleteRecord(false)"
          v-if="hasPermission(['system:ipInfo:remove'])"
          >批量删除</a-button
        >
      </div>
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
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { ipListColumns, ipListForm } from './data';
  import { postEditIdentity, postIpDelete, postIpInfoList } from '/@/api/systemSetting/ip-list';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createConfirm } = useMessage();
  const router = useRouter();
  const props = defineProps({
    type: { type: Number, default: 0 },
  });

  //表格右边操作
  const createActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: `${props.type === 0 ? '移入黑名单' : '移入白名单'}`,
        onClick: () => moveRecord(record),
        auth: 'system:ipInfo:editIdentity',
      },
      {
        label: '编辑',
        onClick: () => editRecord(record.id, props.type),
        auth: 'system:ipInfo:edit',
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除？',
          okText: '删除',
          confirm: () => deleteRecord([record.id]),
        },
        auth: 'system:ipInfo:remove',
      },
    ];
  };

  //新增
  const createRecord = (type) => {
    router.push({
      name: type == 1 ? 'RosterCreate' : 'RosterCreateWhite',
      query: {
        type: props?.type,
      },
    });
  };

  //编辑
  const editRecord = (id: string, type) => {
    router.push({
      name: type == 1 ? 'RosterEdit' : 'RosterCreateWhiteEdit',
      query: {
        id,
        type,
      },
    });
  };

  //转移
  const moveRecord = (record: Recordable) => {
    const { identity, id } = record;
    console.log('identity, id: ', identity, id);
    console.log(identity, id);
    postEditIdentity({ identity: identity == '0' ? '1' : '0', id }).then(() => {
      message.success('操作成功');
      reload();
    });
  };

  //删除
  const deleteRecord = async (params) => {
    if (params) {
      await postIpDelete({ idList: params });
      message.success('删除成功');
      reload();
    } else {
      params = getSelectRowKeys();
      if (params.length === 0) {
        message.warning('请先选择需要删除的数据～');
        return;
      }
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '提示'),
        content: () => h('span', `是否要删除${params.length}条数据？`),
        okText: '删除',
        onOk: async () => {
          await postIpDelete({ idList: params });
          message.success('删除成功');
          reload();
        },
      });
    }
  };
  //表格配置
  const [register, { getSelectRowKeys, reload }] = useTable({
    api: postIpInfoList, //后台路径
    rowKey: 'id',
    showIndexColumn: false, //是否显示序号列
    clickToRowSelect: false, //是否开启点击行选中
    canResize: true, //是否开启自适应高度
    useSearchForm: true, //是否开启form搜索表单
    bordered: true, //是否开启表格边框
    isTreeTable: false, //是否开启树表
    inTabs: true,
    columns: ipListColumns(), //table的表头配置
    formConfig: ipListForm(), //form搜索表单配置
    beforeFetch: (params) => {
      params.identity = props.type;
    },
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
      slots: { customRender: 'action' },
    },
  });
</script>
