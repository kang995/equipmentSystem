<template>
  <div>
    <div class="font-black text-[#414960] text-[15px] my-[16px]">检修设备</div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { deviceTableColumns } from '../data';
  const router = useRouter();

  const dataSource = ref([{}, {}]);
  const [registerTable] = useTable({
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

  //详情
  function handleDetails() {
    router.push({
      // name: 'maintainDetails',
    });
  }
</script>

<style lang="less" scoped></style>
