<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '重新提交',
            onClick: handleReSubmit.bind(null, record),
          },
          {
            label: '申请延期',
            onClick: handlePostpone.bind(null, record),
          },
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
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from '../data';
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
      name: 'repairDetail',
      query: {
        identity: '2', //负责人：1、执行人：2
        status: '1', //待处理：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5
      },
    });
  }
  //申请延期
  function handlePostpone() {
    router.push({
      name: 'repairDetail',
      query: {
        identity: '2', //负责人：1、执行人：2
        status: '1', //待处理：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5
        isShow: 'true',
      },
    });
  }
  //重新提交
  function handleReSubmit() {
    router.push({
      name: 'repairDetail',
      query: {
        identity: '2', //负责人：1、执行人：2
        status: '4', //待处理：1、延期审核：2、待验收：3、验收未通过：4、验收通过：5
        isSbumit: 'true',
      },
    });
  }

  function exportTable() {}
</script>
<style scoped lang="less"></style>
