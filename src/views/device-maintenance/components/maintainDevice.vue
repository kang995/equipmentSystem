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
  import { ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  import { tableDeviceColumns } from './fileld';
  import { selectListDeviceApi } from '/@/api/device-maintenance/index';
  import { OverhaulPlanDevicelsApi } from '/@/api/device-service';
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const mode = route.query?.mode as string;
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

  onMounted(() => {
    id && (mode === '1' || mode === '2') && getMaintaindEevice();
    id && (mode === '3' || mode === '4') && getServiceEevice();
  });

  //查询保养设备
  function getMaintaindEevice() {
    selectListDeviceApi({ id }).then((res) => {
      dataSource.value = res;
    });
  }
  //查询检修设备
  function getServiceEevice() {
    OverhaulPlanDevicelsApi({ id }).then((res) => {
      dataSource.value = res;
    });
  }

  //详情
  function handleDetails() {
    router.push({
      name: 'specialEquipmentDetails',
    });
  }
</script>

<style lang="less" scoped></style>
