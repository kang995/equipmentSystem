<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '查看明细',
            onClick: handleDetail.bind(null, record),
            delBtn: true,
          },
          {
            label: '作废',
            //  onClick: handleDetail.bind(null, record),
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
      <a-button
        type="primary"
        preIcon="gonggong_tianjia_xianxing|svg"
        @click="handleAdd"
        class="mr-4"
        >新增</a-button
      >

      <a-button :loading="exportLoading" class="mr-4">批量导入</a-button>
      <a-tooltip>
        <template #title>不选择即导出全部数据</template>
        <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
      </a-tooltip>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import {
    columnsIssue,
    columnsWarehousing,
    formSchemaIssue,
    formSchemaWarehousing,
  } from '../data';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    ifIssue?: any; //出库
  }>();
  const dataSource = ref([{}]);
  const dataSource1 = ref([{}]);

  const [register] = useTable({
    dataSource: props.ifIssue ? dataSource : dataSource1,
    columns: props.ifIssue ? columnsIssue : columnsWarehousing,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
    },
    inTabs: true, //取消table搜索form顶部边框及圆角
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: props.ifIssue ? formSchemaIssue : formSchemaWarehousing,
      autoSubmitOnEnter: true,
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
  const emit = defineEmits(['exportTable']);
  function exportTable() {
    emit('exportTable');
  }
  async function getRouter() {
    let name;
    if (props.ifIssue) {
      name = 'InboundAdd';
    } else {
      name = 'OutboundAdd'; //入库
    }
    router.push({
      name: name,
    });
  }
  function handleAdd() {
    getRouter();
  }
  function handleDetail() {
    let name;
    if (props.ifIssue) {
      name = 'InboundDetails';
    } else {
      name = 'OutboundDetails'; //入库
    }
    router.push({
      name: name, //入库
    });
  }
  function handleDel() {}
</script>
<style scoped lang="less"></style>
