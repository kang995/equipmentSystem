<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '通过',
          },
          {
            label: '拒绝',
          },
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
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
  import { ref, watch } from 'vue';
  const router = useRouter();
  const props = defineProps({
    activeKey: { type: String, default: '' },
  });
  const newActiveKey = ref<string>('');
  watch(
    () => props.activeKey,
    (newVal) => {
      newActiveKey.value = newVal;
      console.log('tabs', newVal);
    },
    { immediate: true },
  );
  const dataSource = ref([{}, {}]);
  const [register, {}] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: tableColumns(),
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

  function handleDetail() {
    router.push({
      name: 'approvalDetails',
      query: {
        status: '5', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
      },
    });
  }
</script>
<style scoped lang="less"></style>
