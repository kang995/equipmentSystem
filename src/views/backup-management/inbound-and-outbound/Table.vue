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
            onClick: handleDiscard.bind(null, record),
            delBtn: true,
            ifShow: record.receiptStatus ? false : true,
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
        <a-button @click="handleExport" :loading="loading">批量导出</a-button>
      </a-tooltip>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref } from 'vue';
  import { downloadByData } from '/@/utils/file/download';
  import { Tooltip } from 'ant-design-vue';
  import {
    columnsIssue,
    columnsWarehousing,
    formSchemaIssue,
    formSchemaWarehousing,
  } from '../data';
  import { useRouter } from 'vue-router';
  import {
    posInRemoveApi,
    posOUTRemoveApi,
    postInApi,
    postOUTApi,
    posOutDiscardApi,
    posInDiscardApi,
    exporInApi,
    exporOUTApi,
  } from '/@/api/backup-management/inbound-and-outbound';
  import { useMessage } from '/@/hooks/web/useMessage';
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    ifIssue?: any; //出库
  }>();
  const { createMessage } = useMessage();
  const loading = ref<boolean>(false);
  const [register, { reload, getSelectRowKeys }] = useTable({
    api: props.ifIssue ? postOUTApi : postInApi,
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

  async function getRouter() {
    const name = props.ifIssue ? 'InboundAdd' : 'OutboundAdd';

    router.push({
      name: name,
      query: {
        state: name,
      },
    });
  }
  function handleAdd() {
    getRouter();
  }
  function handleDetail(data) {
    const id = data.id;
    const name = props.ifIssue ? 'InboundDetails' : 'OutboundDetails';
    console.log('name: ', name);

    router.push({
      name: name, //入库
      query: {
        id,
      },
    });
  }
  //作废
  function handleDiscard(record) {
    const { id } = record;
    const api = props.ifIssue ? posOutDiscardApi : posInDiscardApi;
    deleted(api, id, '作废成功');
  }
  //删除
  const handleDel = (record: Recordable) => {
    const { id } = record;
    const api = props.ifIssue ? posOUTRemoveApi : posInRemoveApi;
    deleted(api, id, '删除成功');
  };
  function deleted(api, id, test) {
    api({ id }).then(() => {
      reload();
      createMessage.success(test);
    });
  }
  // 导出
  function handleExport() {
    const api = props.ifIssue ? exporOUTApi : exporInApi;
    const text = props.ifIssue ? '备件出库' : '备件入库';
    const ids = getSelectRowKeys();
    loading.value = true;
    let data = {
      ids: ids,
    };
    Object.assign(data);
    api(data)
      .then((res) => {
        downloadByData(res, text + '列表.xlsx');
        loading.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
    // loading.value = true;
  }
</script>
<style scoped lang="less"></style>
