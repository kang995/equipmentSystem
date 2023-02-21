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
            auth: props.ifIssue ? 'device:outReceipt:detail' : 'device:inReceipt:detail',
          },
          {
            label: '作废',
            onClick: handleDiscard.bind(null, record),
            delBtn: true,
            ifShow: record.receiptStatus ? false : true,
            auth: props.ifIssue ? 'device:outReceipt:discard' : 'device:inReceipt:discard',
          },
          {
            label: '删除',
            delBtn: true,
            popConfirm: {
              title: '是否确认删除',
              confirm: handleDel.bind(null, record),
            },
            auth: props.ifIssue ? 'device:outReceipt:remove' : 'device:inReceipt:remove',
          },
        ]"
    /></template>
    <template #tableTitle>
      <template v-if="props.ifIssue">
        <a-button
          type="primary"
          preIcon="gonggong_tianjia_xianxing|svg"
          @click="handleAdd"
          class="mr-4"
          v-if="hasPermission(['device:outReceipt:save'])"
          >新增</a-button
        >
      </template>
      <template v-else>
        <a-button
          type="primary"
          preIcon="gonggong_tianjia_xianxing|svg"
          @click="handleAdd"
          class="mr-4"
          v-if="hasPermission(['device:inReceipt:save'])"
          >新增</a-button
        >
      </template>

      <template v-if="props.ifIssue">
        <a-button
          :loading="exportLoading"
          class="mr-4"
          @click="handleModal"
          v-if="hasPermission(['device:outReceipt:importExcel'])"
          >批量导入</a-button
        >
      </template>
      <template v-else>
        <a-button
          :loading="exportLoading"
          class="mr-4"
          @click="handleModal"
          v-if="hasPermission(['device:inReceipt:importExcel'])"
          >批量导入</a-button
        >
      </template>
      <a-tooltip>
        <template #title>不选择即导出全部数据</template>
        <template v-if="props.ifIssue">
          <a-button
            @click="handleExport"
            :loading="loading"
            v-if="hasPermission(['device:outReceipt:export'])"
            >批量导出</a-button
          >
        </template>
        <template v-else>
          <a-button
            @click="handleExport"
            :loading="loading"
            v-if="hasPermission(['device:inReceipt:export'])"
            >批量导出</a-button
          >
        </template>
      </a-tooltip>
    </template>
  </BasicTable>
  <ImportModal
    @register="registerImportModal"
    @handle-ok="handleOk"
    @handle-err="handleErr"
    @handle-import="handleModal"
  />
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
  import { ImportModal } from '/@/components/ImportModal';
  import {
    posInRemoveApi,
    posOUTRemoveApi,
    postInApi,
    postOUTApi,
    posOutDiscardApi,
    posInDiscardApi,
    exporInApi,
    exporOUTApi,
    importData,
    importTemplate,
    importWarehousingData,
    importWarehousingTemplate,
  } from '/@/api/backup-management/inbound-and-outbound';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();

  const [registerImportModal, { openModal: openImportModal }] = useModal();
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
      defaultHidden: !hasPermission([
        'device:outReceipt:detail',
        'device:inReceipt:detail',
        'device:outReceipt:discard',
        'device:inReceipt:discard',
        'device:outReceipt:remove',
        'device:inReceipt:remove',
      ]),
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
  // 打开导入弹框
  function handleModal() {
    openImportModal(true, {
      updateSupport: 'true',
      uploadUrlApi: props.ifIssue ? importData : importWarehousingData,
      downloadUrlApi: props.ifIssue ? importTemplate : importWarehousingTemplate,
    });
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
  function handleOk() {
    reload();
  }
  const visible = ref<boolean>(false);
  const msg = ref('');
  function handleErr(err) {
    console.log(err);
    // msg.value = err.split('<br/>');
    msg.value = err;
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 3000);
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
