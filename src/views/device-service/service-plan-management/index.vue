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
              auth: 'device:overhaulPlan:detail',
            },
            {
              label: record.approvalStatus === '1' ? '编辑' : '重新编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.approvalStatus === '1' || record.approvalStatus === '4';
              },
              // auth: ['device:overhaulPlan:update', 'device:overhaulPlan:anewUpdate'],
              auth:
                record.approvalStatus === '1'
                  ? 'device:overhaulPlan:update'
                  : 'device:overhaulPlan:anewUpdate',
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: () => {
                return record.approvalStatus === '1';
              },
            },
          ]"
          :dropDownActions="[
            {
              label: '提交',
              onClick: handleSubmit.bind(null, record),
              ifShow: () => {
                return record.approvalStatus === '1' && record.planStatus === '1';
              },
              auth: 'device:overhaulPlan:submit',
            },
            {
              label: '撤回',
              onClick: handleRecall.bind(null, record),
              ifShow: () => {
                return record.approvalStatus === '2' && record.planStatus === '1';
              },
              auth: 'device:overhaulPlan:withdraw',
            },
            {
              label: '停止计划',
              onClick: handleStopPlan.bind(null, record),
              ifShow: () => {
                return (
                  (record.approvalStatus === '3' && record.planStatus === '1') ||
                  (record.approvalStatus === '3' && record.planStatus === '2')
                );
              },
              auth: 'device:overhaulPlan:stop',
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
            v-if="hasPermission(['device:overhaulPlan:save'])"
            >新增</a-button
          >
          <a-tooltip>
            <template #title>不选择即导出全部数据</template>
            <a-button
              @click="exportTable"
              :loading="exportLoading"
              v-if="hasPermission(['device:overhaulPlan:export'])"
              >批量导出</a-button
            >
          </a-tooltip>
          <a-button @click="handleDelete" v-if="hasPermission(['device:overhaulPlan:batchRemove'])"
            >批量删除</a-button
          >
        </div>
      </template>
    </BasicTable>
    <!-- 撤回 -->
    <recallModel @register="RecallModal" @recall-event="handleRecallEvent" />
    <!-- 停止计划 -->
    <planModel @register="planModal" @plan-event="handlePlanEvent" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { ref, h, createVNode } from 'vue';
  import { Tooltip, Modal, message } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import { useModal } from '/@/components/Modal';
  import recallModel from '/@/views/device-maintenance/components/recallModel.vue';
  import planModel from '/@/views/device-maintenance/components/stopPlanModel.vue';
  import {
    OverhaulPlanListApi,
    OverhaulExportApi,
    BatchDeleteApi,
    OverhaulSubmitApi,
    OverhaulWithDrawApi,
    OverhaulStopPlanApi,
  } from '/@/api/device-service/index';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage, createConfirm } = useMessage();
  const router = useRouter();
  const ATooltip = Tooltip;

  const [RecallModal, { openModal: openRecallModal }] = useModal();
  const [planModal, { openModal: openPlanModal }] = useModal();
  const [
    register,
    { reload, getSelectRowKeys, getForm, getPaginationRef, getSelectRows, setLoading },
  ] = useTable({
    api: OverhaulPlanListApi,
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
        'device:overhaulPlan:detail',
        'device:overhaulPlan:update',
        'device:overhaulPlan:anewUpdate',
        'device:overhaulPlan:submit',
        'device:overhaulPlan:withdraw',
        'device:overhaulPlan:stop',
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
    },
  });
  //详情
  function handleDetails(record) {
    router.push({
      name: 'planManagementDetails',
      query: {
        status: record.approvalStatus, //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        // status: '4', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
        mode: '3', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
        id: record.id,
        fullSubmitId: record.fullSubmitId, //审批流程id
      },
    });
  }
  //提交
  function handleSubmit(record) {
    const { id } = record;
    Modal.confirm({
      title: '检修计划提交',
      content: createVNode('span', { style: 'color:black;' }, '确认要提交检修计划？'),
      centered: true,
      async onOk() {
        return await new Promise((resolve, reject) => {
          OverhaulSubmitApi({ id })
            .then(() => {
              message.success('提交成功');
              reload();
              resolve;
            })
            .catch(() => {
              reject();
            });
        });
      },
    });
  }
  //撤回
  function handleRecall(record) {
    openRecallModal(true, {
      id: record.id,
      title: '检修计划撤回',
      isFlag: '1',
    });
  }
  // //撤回-提交
  function handleRecallEvent(data) {
    OverhaulWithDrawApi(data)
      .then(() => {
        // console.log('撤回', data);
        message.success('撤回成功');
      })
      .finally(() => {
        openRecallModal(false);
        reload();
      });
  }
  //停止计划
  function handleStopPlan(record) {
    openPlanModal(true, {
      id: record.id,
      title: '检修计划停止',
      isShow: '1',
    });
  }
  //停止计划-确定
  function handlePlanEvent(data) {
    OverhaulStopPlanApi(data)
      .then(() => {
        // console.log('停止计划', res);
        message.success('停止计划成功');
      })
      .finally(() => {
        openPlanModal(false);
        reload();
      });
  }
  //新增
  function handleAdd() {
    router.push({
      name: 'planManagementAdd',
      query: {
        isEdit: 'false',
      },
    });
  }
  // 编辑
  function handleEdit(record) {
    console.log('planManagementAdd', record);
    router.push({
      name: 'planManagementAdd',
      query: {
        id: record.id,
        approvalStatus: record.approvalStatus, //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        isEdit: 'true',
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
    OverhaulExportApi(data)
      .then((res) => {
        if (res) {
          const filename = '检修计划清单.xlsx';
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
  //删除
  function handleDelete(record) {
    const { id } = record;
    let ids = ref<string[]>([]);
    if (id) {
      //单条删除
      ids.value = [record.id];
      deleteApi(ids.value);
    } else {
      //批量删除
      const data = getSelectRows();
      if (data.length > 0) {
        ids.value = data.map((item) => item.id);
      } else {
        createMessage.warning('请先选择需要删除的数据');
        return;
      }
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '提示'),
        content: () => h('span', `是否要删除${ids.value.length}条数据？`),
        okText: '删除',
        onOk: async () => {
          deleteApi(ids.value);
        },
      });
    }
  }
  //删除api
  function deleteApi(ids: string[]) {
    setLoading(true);
    BatchDeleteApi(ids)
      .then(() => {
        createMessage.success('删除成功');
        reload();
      })
      .finally(() => {
        setLoading(false);
      });
  }
</script>
<style scoped lang="less"></style>
