<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '验收',
            onClick: handleCheck.bind(null, record),
            ifShow: () => {
              return props.ifIssue; // 根据业务控制是否显示
            },
          },
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
            ifShow: () => {
              return !props.ifIssue; // 根据业务控制是否显示
            },
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
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const props = defineProps<{
    ifIssue?: any;
  }>();
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const dataSource = ref([{}, {}]);
  const type = ref<string>('checked');
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: tableColumns(type.value),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    inTabs: true,
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: getFormSchema(type.value),
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
  //导出
  function exportTable() {}
  //验收
  function handleCheck() {
    router.push({
      name: 'acceptanceDetail',
      query: {
        status: '1', //待验收：1、已验收：2
      },
    });
  }
  //详情
  function handleDetail() {
    router.push({
      name: 'acceptanceDetail',
      query: {
        status: '2', //待验收：1、已验收：2
      },
    });
  }
</script>
<style scoped lang="less"></style>
