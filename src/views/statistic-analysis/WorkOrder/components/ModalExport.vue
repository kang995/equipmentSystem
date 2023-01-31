<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :canFullscreen="false"
    title="批量导出"
    width="680px"
    :showOkBtn="false"
  >
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }" />
    <template #appendFooter>
      <a-tooltip>
        <a-button type="primary" @click="clickOk" :loading="loading" class="ml-4">
          导出选中记录
        </a-button>
      </a-tooltip>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { upkeepExportApi } from '/@/api/statisticalAnalysis/WorkOrder';

  const ATooltip = Tooltip;
  const loading = ref<boolean>(false);
  const { createMessage } = useMessage();

  interface itemListParams {
    disLocationName: string;
    id: string;
  }
  const props = defineProps<{
    dataSourceList: Array<itemListParams>;
    activeKey: String;
  }>();

  const columns = [
    {
      title: '导出内容',
      dataIndex: 'disLocationName',
    },
  ];

  // 表格
  const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
    columns: columns,
    dataSource: props.dataSourceList,
    pagination: false, //取消分页
  });
  const num1 = ref('');
  const num2 = ref('');
  const num3 = ref('');

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    num1.value = data.riskPointRiskCategories;
    num2.value = data.riskPointControlLevel;
    num3.value = data.dangerRiskCategories;
  });
  function clickOk() {
    const rowId = getSelectRows();
    const dataId = ref<any>([]);
    rowId.map((item) => {
      dataId.value.push(item.id);
    });
    loading.value = true;
    if (dataId.value.length > 0) {
      if (props.activeKey === '1') {
        //保养统计
        upkeepExportApi({
          num: dataId.value,
          // riskPointRiskCategories: num1.value,
          // riskPointControlLevel: num2.value,
          // dangerRiskCategories: num3.value,
        })
          .then((res) => {
            downloadByData(res, '保养统计.xlsx');
            loading.value = false;
          })
          .finally(() => {
            loading.value = false;
          });
        clearSelectedRowKeys();
        closeModal();
      } else if (props.activeKey === '2') {
        //维修统计
        console.log('维修统计');
      } else {
        //检修统计
        console.log('检修统计');
      }
    } else {
      loading.value = false;
      createMessage.success('未选择导出数据');
    }
  }
</script>
