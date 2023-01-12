<template>
  <BasicTable @register="register">
    <template #action="{ record }">
      <TableAction
        :divider="false"
        :stopButtonPropagation="true"
        :actions="[
          {
            label: '去确认',
            onClick: handleConfirm.bind(null, record),
            ifShow: () => {
              return props.ifIssue; // 根据业务控制是否显示
            },
          },
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
            ifShow: () => {
              return !props.ifIssue; // 根据业务控制是否显示
            },
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getFormSchema } from './data';
  import { useRouter } from 'vue-router';
  // import { ref } from 'vue';
  import { TroubleListApi } from '/@/api/corrective-maintenance/fault';
  const router = useRouter();
  // const props = defineProps({
  //   activeKey: { type: String, default: '' },
  // });
  const props = defineProps<{
    ifIssue?: any;
  }>();
  const [register] = useTable({
    api: TroubleListApi,
    // 额外的请求参数
    searchInfo: {
      type: props.ifIssue ? '0' : '1', //0待确认，1已确认
    },
    columns: tableColumns(props.ifIssue),
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
    },
    formConfig: {
      schemas: getFormSchema(props.ifIssue),
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
        ['Time', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    },
  });
  //详情
  function handleDetail(record) {
    router.push({
      name: 'confirmDetail',
      query: {
        // flag: '2', //待确认：1、已确认：2
        id: record.id,
        troubleStatus: record.troubleStatus, //故障状态--0:待确认、1：待处理、2：处理中、3：已解决、4：列入检修计划
        troubleDetermine: record.troubleDetermine, //确认结果--0:自修、1：委外维修 2：列入检修计划
        // status: '4', //待确认：1、待处理：2、处理中：3、已解决（委外维修、列入检修）：4
      },
    });
  }
  //去确认
  function handleConfirm(record) {
    router.push({
      name: 'confirmDetail',
      query: {
        // flag: '1', //待确认：1、已确认：2
        id: record.id,
        troubleStatus: record.troubleStatus, //故障状态--0:待确认、1：待处理、2：处理中、3：已解决、4：列入检修计划
        troubleDetermine: record.troubleDetermine, //0:自修、1：委外维修 2：列入检修计划 （确认结果）
        // status: '3', //待确认：1、待处理：2、处理中：3、已解决（委外维修、列入检修）：4
      },
    });
  }
</script>
<style scoped lang="less"></style>
