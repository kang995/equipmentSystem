<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
              delBtn: true,
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
        </a-tooltip>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, formSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: tableColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: formSchema,
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

  function handleDetails() {
    router.push({
      name: 'InstallationDetails',
    });
  }

  function exportTable() {}
</script>
<style scoped lang="less"></style>
