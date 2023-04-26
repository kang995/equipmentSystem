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
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <div class="flex flex-1 space-x-4">
          <a-button type="primary" preIcon="gonggong_tianjia_xianxing|svg" @click="handleAdd"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
          </a-tooltip>
          <a-button>批量删除</a-button>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}, {}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: tableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
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
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'sousuo|svg',
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
  //新增
  function handleAdd() {
    router.push({
      name: 'repairAdd',
    });
  }
  //详情
  function handleDetails() {
    router.push({
      name: 'repairDetails',
      query: {
        status: '4', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
      },
    });
  }

  function exportTable() {}
</script>
<style scoped lang="less"></style>
