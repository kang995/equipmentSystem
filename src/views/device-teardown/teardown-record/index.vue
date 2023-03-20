<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
              auth: 'device:demolishRecord:detail',
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'device:demolishRecord:update',
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                confirm: handleDelete.bind(null, record),
              },
              auth: 'device:demolishRecord:remove',
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
            v-if="hasPermission(['device:demolishRecord:save'])"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:demolishRecord:export'])"
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
  import { Tooltip } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import { deleteListApi, getRecordListApi, exportPlanDataApi } from '/@/api/device-removal/data';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const router = useRouter();
  const ATooltip = Tooltip;
  const handleClick = (res) => {
    router.push({
      name: 'teardownDetails',
      query: {
        id: res.demolishId,
      },
    });
  };
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef, setLoading }] = useTable({
    api: getRecordListApi,
    columns: tableColumns(handleClick),
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
        'device:demolishRecord:detail',
        'device:demolishRecord:update',
        'device:demolishRecord:remove',
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
        preIcon: 'gonggong_sousuo|svg',
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
      fieldMapToTime: [['time', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
    },
  });
  //详情
  function handleDetails(record) {
    router.push({
      name: 'recordDetails',
      query: {
        id: record.id,
      },
    });
  }
  // 编辑
  function handleEdit(record) {
    router.push({
      name: 'recordEdit',
      query: {
        id: record.id,
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

  //新增
  function handleAdd() {
    router.push({
      name: 'recordAdd',
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
          const filename = '设备拆除记录.xlsx';
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
