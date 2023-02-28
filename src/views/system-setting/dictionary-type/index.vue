<template>
  <PageWrapper>
    <BasicTable @register="register" @expand="onExpand">
      <!-- 表格按钮 -->
      <template #tableTitle>
        <div class="flex space-x-4">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button @click="handleDelEdit"> 批量删除 </a-button>
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
    <!-- 新增 -->
    <Common @register="registerModal" @reload="reloadTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref, h } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    BasicTable,
    useTable,
    TableAction,
    ActionItem,
    PaginationProps,
  } from '/@/components/Table';
  import {
    getManagementDictionaryList,
    deleteManagementDictionary,
  } from '/@/api/systemSetting/dictionaryType';
  import { getDictionaryTypeTableColumns, dictionaryTypeFormConfig } from './data';
  import { useModal } from '/@/components/Modal';
  import Common from './Common.vue';
  // import { usePermission } from '/@/hooks/web/usePermission';
  // const { hasPermission } = usePermission();
  const { createMessage, createConfirm } = useMessage();
  //新增弹窗配置
  const [registerModal, { openModal: openModal }] = useModal();
  //表格配置
  const [
    register,
    {
      getSelectRowKeys,
      setLoading,
      collapseAll,
      deleteTableDataRecord,
      reload,
      getPaginationRef,
      getForm,
      setTableData,
      setPagination,
      clearSelectedRowKeys,
    },
  ] = useTable({
    api: getManagementDictionaryList, //后台路径
    rowKey: 'id',
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: true, //是否开启form搜索表单
    isTreeTable: true, //是否开启树表
    columns: getDictionaryTypeTableColumns(), //table的表头配置
    //form搜索表单配置
    formConfig: dictionaryTypeFormConfig(submitResetFunc),
    rowSelection: {
      //多选框的配置
      type: 'checkbox',
    },
    actionColumn: {
      //右边操作功能配置
      width: 280,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
      // defaultHidden: !hasPermission([
      //   'system:dictionary:addLevel',
      //   'system:dictionary:edit',
      //   'system:dictionary:remove',
      // ]),
      // defaultHidden: false,
      slots: { customRender: 'action' },
    },
    //请求之前对参数进行处理
    beforeFetch: (data) => {
      data.parentId = 0;
    },
    //请求之后对返回值进行处理
    afterFetch: (data) => {
      data.map((item) => {
        const { hasChild } = item;
        if (hasChild === '1') {
          item.children = [];
        }
      });
    },
  });
  //表格右边操作
  const createActions = (record: Recordable): ActionItem[] => {
    return [
      {
        label: '添加下级',
        // auth: 'system:dictionary:addLevel',
        onClick: handleAddChildren.bind(null, record),
      },
      {
        label: '编辑',
        // auth: 'system:dictionary:edit',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
        // auth: 'system:dictionary:remove',
        color: 'error',
        popConfirm: {
          title: '删除选中项后，选中项的子项也将会删除。请确认是否删除？',
          okText: '删除',
          confirm: handleDelEdit.bind(null, record),
        },
      },
    ];
  };
  //新增
  const handleAdd = () => {
    openModal(true, { id: 'add', params: { id: '0' } });
  };
  const ParentName = ref(''); //父级名称

  //编辑
  const handleEdit = (record: Recordable) => {
    const { id, itemName, type, parentId, itemValue } = record;
    openModal(true, {
      id: 'editChildren',
      params: { id, itemName, type, parentId, itemValue, ParentName },
    });
  };
  //添加下级
  const handleAddChildren = (record: Recordable) => {
    const { id, itemName, type, parentId } = record;
    openModal(true, { id: 'addChildren', params: { id, itemName, type, parentId } });
  };
  //删除
  const handleDelEdit = (record: Recordable) => {
    const { id } = record;
    let ids = ref<string[]>([]);
    if (id) {
      ids.value = [id];
      deleteApi(ids.value);
    } else {
      const data = getSelectRowKeys();
      if (data.length > 0) {
        ids.value = data;
      } else {
        createMessage.warning('至少选择一个删除');
        return;
      }
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '提示'),
        content: () => h('span', `是否要删除${ids.value.length}条数据？`),
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
    deleteManagementDictionary(ids)
      .then(() => {
        deleteTableDataRecord(ids);
        reloadTable();
        clearSelectedRowKeys();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //点树下标
  const onExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      const { id } = record;
      onExpandFunc(id, record);
    }
  };
  //点树下标方法
  async function onExpandFunc(id: number, record: any) {
    ParentName.value = record.itemName;
    getManagementDictionaryList({
      parentId: id,
    }).then(({ records }) => {
      records.map((item) => {
        const { hasChild } = item;
        if (hasChild === '1') {
          item.children = [];
        }
      });
      record.children = records;
    });
  }
  //重写form提交按钮
  async function submitResetFunc() {
    const { itemName, type } = getForm().getFieldsValue();
    const { current, pageSize } = getPaginationRef() as PaginationProps;
    collapseAll();
    formTableLoading(true);
    console.log(current);
    getManagementDictionaryList({
      parentId: 0,
      itemName,
      type,
      page: 1,
      pageSize: pageSize!,
    })
      .then(({ records, total }) => {
        records.map((item) => {
          const { hasChild } = item;
          if (hasChild === '1') {
            item.children = [];
          }
        });
        setPagination({ total: total });
        setTableData(records);
      })
      .finally(() => {
        formTableLoading(false);
      });
  }

  //loading状态
  function formTableLoading(boolean: boolean) {
    getForm().setProps({
      submitButtonOptions: {
        loading: boolean,
      },
    });
    setLoading(boolean);
  }

  //刷新表格
  const reloadTable = () => {
    reload();
    collapseAll();
  };
</script>
