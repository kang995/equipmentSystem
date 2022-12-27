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
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, tableColumn, getFormSchema } from './fileld';
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getPlanListApi, upkeepExportApi } from '/@/api/device-maintenance/work';

  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const mode = route.query?.mode as string; //保养计划管理：1、检修计划管理：2、
  const ATooltip = Tooltip;

  // const dataSource = ref([{}, {}]);
  const [register, { getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    // dataSource: dataSource,
    api: mode === '1' ? getPlanListApi : undefined,
    searchInfo: {
      upkeepPlanId: id, //保养计划id
    },
    columns: mode === '1' ? tableColumns() : tableColumn(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
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
  //详情
  function handleDetails() {
    router.push({
      name: 'overhaulDetail',
    });
  }
  //导出
  const exportLoading = ref(false);
  function exportTable() {
    const { current, pageSize } = getPaginationRef() as PaginationProps;
    exportLoading.value = true;
    if (mode === '1') {
      //保养计划管理
      let data = {
        page: current,
        pageSize: pageSize,
        ids: getSelectRowKeys(),
        upkeepPlanId: id,
      };
      Object.assign(data, getForm().getFieldsValue());
      upkeepExportApi(data)
        .then((res) => {
          if (res) {
            const filename = '关联工单列表.xlsx';
            downloadByData(res.data, filename);
            createMessage.success('导出成功');
          } else {
            createMessage.error('导出失败');
          }
        })
        .finally(() => {
          exportLoading.value = false;
        });
    } else {
      //检修计划管理
    }
  }
</script>
<style scoped lang="less"></style>
