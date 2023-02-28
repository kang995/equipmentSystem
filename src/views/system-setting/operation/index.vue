<template>
  <PageWrapper>
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <!--按钮-->
      <template #tableTitle>
        <!--        v-if="hasPermission(['system:videoMonitor:export'])"-->
        <Tooltip title="不选择即导出全部数据" :mouseLeaveDelay="0" :mouseEnterDelay="0">
          <a-button
            v-if="hasPermission(['monitor:operlog:export'])"
            class="m-1"
            @click="handleExport"
            :loading="exportLoading"
            >批量导出
          </a-button>
        </Tooltip>
      </template>
      <!--table-->
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './data';
  import { LogListApi, logListExport } from '/@/api/sys/user';
  import { PageWrapper } from '/@/components/Page';
  import { Tooltip } from 'ant-design-vue';
  import { ref } from 'vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';

  const { createMessage } = useMessage();
  const { hasPermission } = usePermission();

  const [registerTable, { getSelectRowKeys, getForm }] = useTable({
    // 请求之前对参数进行处理
    beforeFetch: (res) => {
      if (res.operTime) {
        res.beginTime = res.operTime[0];
        res.endTime = res.operTime[1];
      }
      delete res.operTime;
      return res;
    },
    api: LogListApi,
    columns: getBasicColumns(),
    formConfig: getFormConfig(),
    useSearchForm: true, //使用搜索表单
    showIndexColumn: false, //是否显示序号列
    canResize: true, //宽度自适应
    striped: false, //斑马纹
    bordered: true, //是否边框
    rowKey: 'operId',
  });

  // 批量导出
  const exportLoading = ref(false);
  let handleExport = () => {
    exportLoading.value = true;
    let data = {
      ids: getSelectRowKeys(),
    };
    Object.assign(data, getForm().getFieldsValue());
    logListExport(data)
      .then((res) => {
        if (res) {
          downloadByData(res, '操作日志.xlsx');
          createMessage.success('导出成功');
        } else {
          createMessage.error('导出失败');
        }
      })
      .finally(() => {
        exportLoading.value = false;
      });
  };
</script>
