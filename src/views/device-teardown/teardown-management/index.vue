<template>
  <PageWrapper>
    <BasicTable @register="register">
      <!-- 所属装置设施 -->
      <template #form-deviceSlot="{ model, field }">
        <a-tree-select
          v-model:value="model[field]"
          :tree-data="gasList"
          :dropdownMatchSelectWidth="false"
          placeholder="请选择所属装置设施"
          show-search
          allow-clear
          treeNodeFilterProp="label"
          tree-default-expand-all
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
              onClick: handleDetails.bind(null, record),
              auth: 'device:demolish:detail',
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: record.demolishStatus !== '2',
              auth: 'device:demolish:update',
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                confirm: handleDelete.bind(null, record),
              },
              auth: 'device:demolish:remove',
            },
          ]"
          :dropDownActions="[
            {
              label: '撤销',
              popConfirm: {
                title: '是否确认撤销?',
                confirm: handleRecall.bind(null, record),
              },
              ifShow: record.demolishStatus !== '2',
              auth: 'device:demolish:undo',
            },
            {
              label: '添加拆除记录',
              onClick: handleAddDismantle.bind(null, record),
              ifShow: record.demolishStatus !== '2',
              auth: 'device:demolishRecord:save',
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
            v-if="hasPermission(['device:demolish:save'])"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:demolish:export'])"
              >批量导出</a-button
            >
          </a-tooltip>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { Tooltip, message, TreeSelect } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import {
    getDemolishiListApi,
    deleteListApi,
    revokeListApi,
    exportPlanDataApi,
  } from '/@/api/device-demolishi/data';
  import { UnitFacilityApi } from '/@/api/corrective-maintenance/fault';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const router = useRouter();
  const ATooltip = Tooltip;
  const ATreeSelect = TreeSelect;
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef, setLoading }] = useTable({
    api: getDemolishiListApi,
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
      width: 200,
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:demolish:detail',
        'device:demolish:update',
        'device:demolish:remove',
        'device:demolish:undo',
        'device:demolishRecord:save',
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
      fieldMapToTime: [['time', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    },
  });
  // 添加disabled
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
  function handleDetails(record) {
    router.push({
      name: 'teardownDetails',
      query: {
        id: record.id,
      },
    });
  }
  // 编辑
  function handleEdit(record) {
    router.push({
      name: 'teardownEdit',
      query: {
        id: record.id,
        location: record.location,
      },
    });
  }
  // 删除
  function handleDelete(record) {
    const { id } = record;
    deleteApi({
      id: id,
    });
  }
  //删除api
  function deleteApi(ids) {
    setLoading(true);
    deleteListApi(ids)
      .then(() => {
        createMessage.success('删除成功');
        reload();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //撤回
  function handleRecall(data) {
    revokeListApi({
      id: data.id,
    })
      .then(() => {
        message.success('撤销成功');
        reload();
      })
      .catch(() => {
        message.success('撤销失败');
      });
  }

  //新增
  function handleAdd() {
    router.push({
      name: 'teardownAdd',
    });
  }
  function handleAddDismantle(record) {
    router.push({
      name: 'recordAdd',
      query: {
        codeId: record.id,
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
    exportPlanDataApi(data)
      .then((res) => {
        if (res) {
          const filename = '设备拆除列表.xlsx';
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
