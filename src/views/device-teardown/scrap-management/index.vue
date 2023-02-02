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
              auth: 'device:scrap:detail',
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: record.scrapStatus !== '2',
              auth: 'device:scrap:update',
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                confirm: handleDelete.bind(null, record),
              },
              auth: 'device:scrap:remove',
            },
          ]"
          :dropDownActions="[
            {
              label: '撤销',
              popConfirm: {
                title: '是否确认撤销?',
                confirm: handleRecall.bind(null, record),
              },
              ifShow: record.scrapStatus !== '2',
              auth: 'device:scrap:undo',
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
            v-if="hasPermission(['device:scrap:save'])"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:scrap:export'])"
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
  import { Tooltip, message } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import {
    deleteListApi,
    exportPlanDataApi,
    getScrapListApi,
    revokeListApi,
  } from '/@/api/device-scrap/data';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();
  const router = useRouter();
  const ATooltip = Tooltip;
  const [register, { reload, getSelectRowKeys, getForm, getPaginationRef, setLoading }] = useTable({
    api: getScrapListApi,
    columns: tableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:scrap:detail',
        'device:scrap:update',
        'device:scrap:remove',
        'device:scrap:undo',
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
      fieldMapToTime: [['time', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss']],
    },
  });
  //详情
  function handleDetails(record) {
    router.push({
      name: 'scrapDetails',
      query: {
        id: record.id,
      },
    });
  }
  // 编辑
  function handleEdit(record) {
    router.push({
      name: 'scrapEdit',
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
      name: 'scrapAdd',
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
          const filename = '设备报废列表.xlsx';
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
