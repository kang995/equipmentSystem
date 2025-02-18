<template>
  <PageWrapper>
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
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.troubleStatus === '0';
              },
              auth: 'device:trouble:update',
            },
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
              auth: 'device:trouble:detail',
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: () => {
                return record.troubleStatus === '0';
              },
              auth: 'device:trouble:remove',
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <div class="flex flex-1 space-x-4">
          <a-button
            type="primary"
            preIcon="gonggong_tianjia_xianxing|svg"
            @click="handleAdd"
            v-if="hasPermission(['device:trouble:save'])"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:trouble:export'])"
              >批量导出</a-button
            >
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TreeSelect } from 'ant-design-vue';
  import {
    TroubleListApi,
    TroubleExportApi,
    TroubleRemoveApi,
    UnitFacilityApi,
    deviceTreeSelectApi,
  } from '/@/api/corrective-maintenance/fault';
  import { usePermission } from '/@/hooks/web/usePermission';
  const ATreeSelect = TreeSelect;
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const router = useRouter();
  // const route = useRoute();
  const ATooltip = Tooltip;
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef, setLoading }] = useTable({
    api: TroubleListApi,
    columns: tableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:trouble:update',
        'device:trouble:detail',
        'device:trouble:remove',
      ]),
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
        ['Time', ['startTime', 'endTime'], 'YYYY-MM-DD'],
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

  //新增
  function handleAdd() {
    router.push({
      name: 'faultAdd',
    });
  }
  //编辑
  function handleEdit(record) {
    router.push({
      name: 'faultEdit',
      query: {
        id: record.id,
      },
    });
  }
  //详情
  function handleDetails(record) {
    router.push({
      name: 'faultDetails',
      query: {
        id: record.id, //故障id
        workOrderId: record.workOrderId, //维修工单id
        troubleDetermine: record.troubleDetermine, //确认结果--0:自修、1：委外维修 2：列入检修计划
        troubleStatus: record.troubleStatus, //故障状态--0:待确认、1：待处理、2：处理中、3：已解决、4：列入检修计划
        // status: '3', //待确认：1、待处理：2、处理中：3、已解决（委外维修、列入检修）：4
      },
    });
  }
  //删除
  function handleDelete(record) {
    const { id } = record;
    setLoading(true);
    TroubleRemoveApi({ id })
      .then(() => {
        createMessage.success('删除成功');
        reload();
      })
      .finally(() => {
        setLoading(false);
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
    TroubleExportApi(data)
      .then((res) => {
        if (res) {
          const filename = '故障列表.xlsx';
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
