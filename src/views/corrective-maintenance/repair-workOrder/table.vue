<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '重新下发',
            onClick: handleAgain.bind(null, record),
            ifShow: () => {
              return (
                props.ifIssue && (record.maintainStatus === '0' || record.maintainStatus === '1')
              ); // 根据业务控制是否显示
            },
            auth: 'device:troubleWorkOrder:again',
          },
          {
            label: '重新提交',
            onClick: handleReSubmit.bind(null, record),
            ifShow: () => {
              return !props.ifIssue && record.maintainStatus === '3'; // 根据业务控制是否显示
            },
          },
          {
            label: '申请延期',
            onClick: handlePostpone.bind(null, record),
            ifShow: () => {
              return !props.ifIssue && record.maintainStatus === '1'; // 根据业务控制是否显示
            },
            auth: 'device:troubleWorkOrder:delay',
          },
          {
            label: '详情',
            onClick: handleDetails.bind(null, record),
            auth: 'device:troubleWorkOrder:detail',
          },
        ]"
      />
    </template>
    <template #tableTitle>
      <div class="flex flex-1 space-x-4">
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button
            @click="exportTable"
            :loading="exportLoading"
            v-if="hasPermission(['device:troubleWorkOrder:export'])"
            >批量导出</a-button
          >
        </a-tooltip>
      </div>
    </template>
  </BasicTable>
  <!-- 重新下发 -->
  <basicModel @register="IssuedModal" @event="handleIssue" />
</template>
<script setup lang="ts">
  import { useModal } from '/@/components/Modal';
  import basicModel from './module/IssuedModal.vue';
  import { BasicTable, useTable, TableAction, PaginationProps } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';
  import {
    maintainListApi,
    MaintainExportApi,
    maintainAgainApi,
  } from '/@/api/corrective-maintenance/repair';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { getTimeByType } from '/@/utils/public';
  const { hasPermission } = usePermission();
  const [IssuedModal, { openModal: openIssuedModal }] = useModal();
  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const Btnvalue = route.query.Btnvalue as string;
  const ATooltip = Tooltip;
  const props = defineProps<{
    ifIssue?: any;
  }>();
  const [register, { getSelectRowKeys, getForm, getPaginationRef, reload }] = useTable({
    api: maintainListApi,
    searchInfo: {
      type: props.ifIssue ? '0' : '1',
    },
    columns: tableColumns(),
    rowKey: 'id',
    useSearchForm: true, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    inTabs: true,
    rowSelection: {
      type: 'checkbox',
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission([
        'device:troubleWorkOrder:again',
        'device:troubleWorkOrder:delay',
        'device:troubleWorkOrder:detail',
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
      fieldMapToTime: [
        //更改RangePicker的返回字段
        ['Time', ['jobStartTime', 'jobEndTime'], 'YYYY-MM-DD HH:mm:ss'],
        ['Time1', ['overStartTime', 'overEndTime'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
  });
  onMounted(() => {
    Btnvalue &&
      getForm().setFieldsValue({
        Time: handleFun(Btnvalue),
        // Time1: handleFun(Btnvalue),
      });
  });
  //日期
  function handleFun(num) {
    return {
      '1': getTimeByType('day'),
      '2': getTimeByType('week'),
      '3': getTimeByType('month'),
      '5': getTimeByType('year'),
    }[num];
  }
  //详情
  function handleDetails(record) {
    router.push({
      name: 'repairDetail',
      query: {
        id: record.id, //维修工单id
        status: record.maintainStatus, //0:待处理、 1：待处理(延期申请)、2：待验收、3：验收未通过、4：完成
        identity: props.ifIssue ? '1' : '2', //负责人：1、执行人：2
        // status: '2', //待处理：1、延期申请：2、待验收：3、验收未通过：4、验收通过：5
      },
    });
  }
  //重新下发
  function handleAgain(record) {
    openIssuedModal(true, {
      id: record.id, //维修工单id
    });
  }
  //重新下发-确认
  function handleIssue(data) {
    //更换key
    data['workOrderId'] = data['id']; //维修工单id
    delete data['id'];
    maintainAgainApi(data)
      .then(() => {
        createMessage.success('已重新下发');
      })
      .finally(() => {
        openIssuedModal(false);
        reload();
      });
  }
  //申请延期
  function handlePostpone(record) {
    router.push({
      name: 'repairDetail',
      query: {
        id: record.id,
        identity: props.ifIssue ? '1' : '2', //负责人：1、执行人：2
        status: record.maintainStatus, //0:待处理、 1：待处理(延期申请)、2：待验收、3：验收未通过、4：完成
        // status: '1', //待处理：1、延期申请：2、待验收：3、验收未通过：4、验收通过：5
        isShow: 'true',
      },
    });
  }

  //重新提交
  function handleReSubmit(record) {
    router.push({
      name: 'repairDetail',
      query: {
        id: record.id,
        identity: props.ifIssue ? '1' : '2', //负责人：1、执行人：2
        status: record.maintainStatus, //0:待处理、 1：待处理(延期申请)、2：待验收、3：验收未通过、4：完成
        // status: '4', //待处理：1、延期申请：2、待验收：3、验收未通过：4、验收通过：5
        isSbumit: 'true',
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
    MaintainExportApi(data)
      .then((res) => {
        if (res) {
          const filename = props.ifIssue ? '负责工单列表.xlsx' : '执行工单列表.xlsx';
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
