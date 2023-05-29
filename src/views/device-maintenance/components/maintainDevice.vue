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
  let mode = route.query?.mode as string;
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
  //三方跳转时判断mode
  if (!mode) {
    //mode--保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
    let url = window.location.href;
    if (url.includes('plan-details')) {
      //保养计划管理详情
      mode = '1';
    } else if (url.includes('maintain-details')) {
      //保养计划审核详情
      mode = '2';
    } else if (url.includes('planManagement-details')) {
      //检修计划管理详情
      mode = '3';
    } else if (url.includes('planAudit-details')) {
      //检修计划审核详情
      mode = '4';
    }
  }

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
  function handleDetails(data) {
    let name;
    let state;
    const natureType = data.deviceNature; //设备类型 1静0动
    const dataSource = data.dataSource; //数据来源(1:企业综合；2：本系统)
    const id = data.deviceId;
    if (data.specialEquip === 'yes') {
      if (natureType === '1') {
        name = 'specialEquipmentDetails'; //特种设备详情静
        state = '3';
      } else {
        name = 'specialEquipmentDetailsMove'; //特种设备详情静
        state = '4';
      }
    } else {
      if (natureType === '1') {
        name = 'MechanicsDetails'; //机械设备详情静
        state = '2';
      } else {
        name = 'MechanicsDetailsMove'; //机械设备详情动
        state = '1';
      }
    }
    router.push({
      name: name,
      query: {
        id,
        state,
        dataSource,
      },
    });
  }
</script>

<style lang="less" scoped></style>
