<template>
  <div>
    <BasicTable @register="register">
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
  import { useRouter, useRoute } from 'vue-router';
  import { tableDeviceColumns } from './fileld';
  import { selectListDeviceApi } from '/@/api/device-maintenance/index';
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const dataSource = ref([{}, {}]);
  const [register] = useTable({
    dataSource: dataSource,
    // api: selectListDeviceApi,
    columns: tableDeviceColumns(),
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
  id &&
    selectListDeviceApi({ id }).then((res) => {
      dataSource.value = res;
    });
  //详情
  function handleDetails() {
    router.push({
      // name: 'maintainDetails',
    });
  }
</script>

<style lang="less" scoped></style>
