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
  import {
    upkeepExportApi,
    troubleExportApi,
    overhaulExportApi,
  } from '/@/api/statisticalAnalysis/WorkOrder';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const UpkeepObj = userStore.getUpkeep;
  const RepairObj = userStore.getRepair;
  const OverhaulingObj = userStore.getOverhauling;

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
  const sourceObj = ref<any>({});
  const sourceList = ref<any>([]);
  const [registerModal, { closeModal }] = useModalInner(async (res) => {
    sourceObj.value = res;
    sourceList.value = res.dataSourceList;
    // console.log('sourceObj.value',sourceObj.value)
  });
  // 表格
  const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
    columns: columns,
    dataSource: sourceList,
    pagination: false, //取消分页
  });
  function clickOk() {
    const rowId = getSelectRows();
    const dataId = ref<any>([]);
    rowId.map((item) => {
      dataId.value.push(item.id);
    });
    loading.value = true;
    if (dataId.value.length > 0) {
      if (sourceObj.value.activeKey === '1') {
        //保养统计
        upkeepExportApi({
          num: dataId.value,
          oneTimeType: UpkeepObj.oneTimeType || null,
          twoTimeType: UpkeepObj.twoTimeType || null,
          threeTimeType: UpkeepObj.threeTimeType || null,
          upkeepPlanId: UpkeepObj.upkeepPlanId || null,
          planStatus: UpkeepObj.planStatus || null,
        })
          .then((res) => {
            if (res) {
              downloadByData(res, '保养统计.xlsx');
              loading.value = false;
            }
          })
          .finally(() => {
            loading.value = false;
          });
        clearSelectedRowKeys();
        closeModal();
      } else if (sourceObj.value.activeKey === '2') {
        //维修统计
        console.log('维修统计');
        troubleExportApi({
          num: dataId.value,
          oneTimeType: RepairObj.oneTimeType || null,
          twoTimeType: RepairObj.twoTimeType || null,
          threeTimeType: RepairObj.threeTimeType || null,
        })
          .then((res) => {
            if (res) {
              downloadByData(res, '维修统计.xlsx');
              loading.value = false;
            }
          })
          .finally(() => {
            loading.value = false;
          });
        clearSelectedRowKeys();
        closeModal();
      } else {
        //检修统计
        console.log('检修统计');
        overhaulExportApi({
          num: dataId.value,
          oneTimeType: OverhaulingObj.oneTimeType || null,
          twoTimeType: OverhaulingObj.twoTimeType || null,
          threeTimeType: OverhaulingObj.threeTimeType || null,
          overhaulPlanId: OverhaulingObj.overhaulPlanId || null,
        })
          .then((res) => {
            if (res) {
              downloadByData(res, '检修统计.xlsx');
              loading.value = false;
            }
          })
          .finally(() => {
            loading.value = false;
          });
        clearSelectedRowKeys();
        closeModal();
      }
    } else {
      loading.value = false;
      createMessage.success('未选择导出数据');
    }
  }
</script>
<style scoped lang="less">
  ::v-deep(.selected_number) {
    bottom: -4px;
  }
</style>
