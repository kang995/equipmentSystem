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
      <slot name="tableTitle" :source="getRawDataSource().patrolRecordCountVO"></slot>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { downloadByData } from '/@/utils/file/download';
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const route = useRoute();
  const deviceId = route.query.id as string;
  const dataSource = route.query.dataSource as string;

  const props = defineProps<{
    dataSource?: any;
    columns: any;
    formSchema: any;
    ifExport?: any;
    api?: any;
    ifDataSource?: any; //定期检测记录传dataSource
    apiExport?: any; //
    textExport?: string;
  }>();

  const [register, { getSelectRowKeys, reload, getRawDataSource, setLoading }] = useTable({
    api: props.api,
    searchInfo: {
      deviceId,
      dataSource: props.ifDataSource ? dataSource : '',
    },
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: true,
    inTabs: true, //取消table搜索form顶部边框及圆角
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

  function exportTable() {
    const ids = getSelectRowKeys();
    exportLoading.value = true;
    let data = {
      ids: ids,
      deviceId,
    };
    Object.assign(data);
    props.ifDataSource ? (data['dataSource'] = dataSource) : data,
      props
        .apiExport(data)
        .then((res) => {
          downloadByData(res, props.textExport + '列表.xlsx');
          exportLoading.value = false;
        })
        .finally(() => {
          exportLoading.value = false;
        });
    exportLoading.value = true;
  }
  defineExpose({
    reload,
    setLoading,
  });
</script>
<style scoped lang="less"></style>
