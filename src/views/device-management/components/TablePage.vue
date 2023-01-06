<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <slot name="tableAction" :record="record"></slot>
    </template>
    <template #tableTitle>
      <div v-if="!ifExport">
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
        </a-tooltip>
      </div>
      <slot name="tableTitle"></slot>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    dataSource: any;
    columns: any;
    formSchema: any;
    ifExport?: any;
    api?: any;
    deviceId?: any;
  }>();
  console.log('dataSource', props.dataSource);
  const [register] = useTable({
    api: props.api,
    searchInfo: {
      deviceId: props.deviceId,
    },
    // dataSource: props.dataSource,
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: true,
    inTabs: true, //取消table搜索form顶部边框及圆角
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    formConfig: {
      schemas: props.formSchema,
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
  const emit = defineEmits(['exportTable']);
  function exportTable() {
    emit('exportTable');
  }
</script>
<style scoped lang="less"></style>
