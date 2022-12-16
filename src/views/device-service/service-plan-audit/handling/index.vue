<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '审核',
            onClick: handleAudit.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  const router = useRouter();
  const props = defineProps({
    activeKey: { type: String, default: '' },
  });
  const dataSource = ref([{}, {}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: tableColumns(props.activeKey),
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

  function handleAudit() {
    router.push({
      name: 'planAuditDetails',
      query: {
        status: '5', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
        mode: '4', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
      },
    });
  }
</script>
<style scoped lang="less"></style>
