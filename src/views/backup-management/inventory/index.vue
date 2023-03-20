<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <!-- 状态未下发：下发，查看 ，删除-->
        <!-- 状态进行中：查看 -->
        <!-- 状态已完成/已作废：查看 ，删除-->

        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              //二次确认
              label: '下发',
              delBtn: true,
              popConfirm: {
                title: '是否确认下发',
                confirm: handleIssued.bind(null, record),
              },
              ifShow: () => record.stockStatus == 0,
            },
            {
              label: '查看',
              onClick: handleDetails.bind(null, record),
              delBtn: true,
            },
            {
              label: '作废',
              delBtn: true,
              popConfirm: {
                title: '是否确认作废',
                confirm: handleCancellation.bind(null, record),
              },
              ifShow: () => record.stockStatus == 2,
            },
            {
              label: '删除',
              delBtn: true,
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDel.bind(null, record),
              },
              ifShow: () =>
                record.stockStatus == 0 || record.stockStatus == 3 || record.stockStatus == 4,
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <a-button
          type="primary"
          preIcon="gonggong_tianjia_xianxing|svg"
          @click="handleAdd"
          class="mr-4"
          >新增盘点</a-button
        >
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button @click="exportTable" :loading="loading">批量导出</a-button>
        </a-tooltip>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { inventoryColumns, inventoryFormSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import {
    postTakeStockCancellationApi,
    postTakeStockIssueApi,
    postTakeStockListApi,
    postTakeStockRemoveApi,
    exportTakeStockApi,
  } from '/@/api/backup-management/inventory';
  import { useMessage } from '/@/hooks/web/useMessage';
  const router = useRouter();
  const ATooltip = Tooltip;
  const { createMessage } = useMessage();
  const loading = ref<boolean>(false);
  const [register, { getSelectRowKeys, reload, getForm }] = useTable({
    api: postTakeStockListApi,
    columns: inventoryColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: inventoryFormSchema,
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
      actionColOptions: {
        span: 6,
        style: {
          textAlign: 'left',
        },
      },
    },
  });

  function handleDetails(record) {
    const id = record.id;
    const stockStatus = record.stockStatus;
    console.log('stockStatus: ', stockStatus);
    router.push({
      name: 'InventoryDetails',
      query: {
        id,
        stockStatus,
      },
    });
  }
  function handleAdd() {
    router.push({
      name: 'InventoryAdd',
    });
  }
  function handleIssued(record) {
    const id = record.id;
    getApi(postTakeStockIssueApi, id, '下发成功');
  }
  function handleCancellation(record) {
    const id = record.id;
    getApi(postTakeStockCancellationApi, id, '作废成功');
  }
  function handleDel(record) {
    const id = record.id;
    getApi(postTakeStockRemoveApi, id, '删除成功');
  }
  function getApi(api, id, test) {
    api({ id }).then(() => {
      createMessage.success(test);
      reload();
    });
  }
  function exportTable() {
    const ids = getSelectRowKeys();
    loading.value = true;
    let data = {
      ids: ids,
    };
    Object.assign(data, getForm().getFieldsValue());
    exportTakeStockApi(data)
      .then((res) => {
        downloadByData(res, '盘点列表.xlsx');
        loading.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>
<style scoped lang="less"></style>
