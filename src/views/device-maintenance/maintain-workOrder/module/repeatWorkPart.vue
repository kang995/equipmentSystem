<template>
  <div class="px-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex flex-1 space-x-4">
          <a-button type="primary" @click="handleOpen">选择备件</a-button>
        </div>
      </template>
      <template #useNumSlot="{ record }">
        <a-input-number placeholder="请输入数量" v-model:value="record.name6" />
      </template>
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
            {
              label: '删除',
            },
          ]"
        />
      </template>
    </BasicTable>
    <PartModel @register="registerPartModal" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import PartModel from '/@/views/device-maintenance/components/changePartModel.vue';
  import { useRouter } from 'vue-router';
  import { deviceTableColumns } from '../data';
  const AInputNumber = InputNumber;
  const router = useRouter();
  const dataSource = ref([{}, {}]);
  const [registerPartModal, { openModal: openPartModal }] = useModal();
  const [registerTable, { getDataSource }] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: deviceTableColumns(),
    rowKey: 'id',
    useSearchForm: false, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  //选择备件
  function handleOpen() {
    // console.log('表格数据',getDataSource())
    openPartModal(true, {});
  }

  //详情
  function handleDetails() {
    router.push({
      // name: 'maintainDetails',
    });
  }
</script>

<style lang="less" scoped></style>
