<template>
  <BasicTable @register="register">
    <!-- 关联设备 -->
    <template #form-deviceSlots="{ model, field }">
      <a-tree-select
        v-model:value="model[field]"
        :tree-data="deviceList"
        :dropdownMatchSelectWidth="false"
        show-search
        allow-clear
        treeNodeFilterProp="label"
        tree-default-expand-all
        placeholder="请选择关联设备"
        :fieldNames="{
          value: 'id',
          key: 'id',
          label: 'label',
          children: 'children',
        }"
      />
    </template>
    <!-- 所属装置设施 -->
    <template #form-deviceSlot="{ model, field }">
      <a-tree-select
        v-model:value="model[field]"
        :tree-data="gasList"
        :dropdownMatchSelectWidth="false"
        show-search
        allow-clear
        treeNodeFilterProp="label"
        tree-default-expand-all
        placeholder="请选择所属装置设施"
        :fieldNames="{
          value: 'id',
          key: 'id',
          label: 'label',
          children: 'children',
        }"
      />
    </template>
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <div class="flex flex-1 space-x-4">
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <template v-if="props.ifIssue">
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:determineAccept:waitExport'])"
            >
              批量导出
            </a-button>
          </template>
          <template v-else>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:determineAccept:export'])"
            >
              批量导出
            </a-button>
          </template>
        </a-tooltip>
      </div>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { Tooltip, TreeSelect } from 'ant-design-vue';
  import { ref } from 'vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    DeterminesListApi,
    DetermineListApi,
    DeterminesExportApi,
    DetermineExportApi,
  } from '/@/api/corrective-maintenance/repair';
  import { UnitFacilityApi, deviceTreeSelectApi } from '/@/api/corrective-maintenance/fault';
  import { usePermission } from '/@/hooks/web/usePermission';
  const ATreeSelect = TreeSelect;
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const ATooltip = Tooltip;
  const router = useRouter();
  const props = defineProps<{
    ifIssue?: any;
  }>();

  const [register, { getSelectRowKeys, getForm, getPaginationRef }] = useTable({
    api: props.ifIssue ? DeterminesListApi : DetermineListApi,
    columns: tableColumns(props.ifIssue),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    inTabs: true,
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
      schemas: getFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false, //是否显示收起展开按钮
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'sousuo|svg',
      },
      baseColProps: {
        span: 6,
      },
      rowProps: {
        gutter: 16,
      },
      actionColOptions: {
        span: 6,
        style: {
          textAlign: 'left',
        },
      },
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['createTime', ['createStartTime', 'createEndTime'], 'YYYY-MM-DD'],
      ],
    },
  });
  // 添加disabled-关联设备
  const handleDisableds = (tree) => {
    tree &&
      tree.forEach((node) => {
        if (node.type && node.type !== 3) {
          //type为3才可选择
          node.disabled = true;
          node.children && handleDisableds(node.children);
        }
      });
    return tree;
  };
  const deviceList = ref<any>([]);
  deviceTreeSelectApi().then((res) => {
    deviceList.value = handleDisableds(res);
  });
  // 添加disabled-所属装置设施
  const handleDisabled = (tree) => {
    tree &&
      tree.forEach((node) => {
        if (node.type && node.type !== 2) {
          //type为2才可选择
          node.disabled = true;
          node.children && handleDisabled(node.children);
        }
      });
    return tree;
  };
  const gasList = ref<any>([]);
  UnitFacilityApi().then((res) => {
    gasList.value = handleDisabled(res);
  });
  //详情
  function handleDetail(record) {
    router.push({
      name: 'checkDetails',
      query: {
        id: record.id, //维修工单id
        status: record.maintainStatus, //0:待处理、 1：待处理(延期申请)、2：待验收、3：验收未通过、4：完成
        // status: '3', //待验收：1、已完成：2、未通过：3
      },
    });
  }
  //导出
  const exportLoading = ref(false);
  function exportTable() {
    const { current, pageSize } = getPaginationRef() as PaginationProps;
    exportLoading.value = true;
    let data = {
      page: current,
      pageSize: pageSize,
      ids: getSelectRowKeys(),
    };
    Object.assign(data, getForm().getFieldsValue());
    (props.ifIssue ? DeterminesExportApi(data) : DetermineExportApi(data))
      .then((res) => {
        if (res) {
          const filename = props.ifIssue ? '待验收工单列表.xlsx' : '已验收工单列表.xlsx';
          downloadByData(res.data, filename);
          createMessage.success('导出成功');
        } else {
          createMessage.error('导出失败');
        }
      })
      .finally(() => {
        exportLoading.value = false;
      });
  }
</script>
<style scoped lang="less"></style>
