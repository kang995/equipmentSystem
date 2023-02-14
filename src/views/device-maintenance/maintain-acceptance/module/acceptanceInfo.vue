<template>
  <div class="px-4">
    <div class="absolute right-20 top-22 w-17">
      <img :src="handleStatus(workOrderStatus)" alt="" />
    </div>
    <!-- 工单信息 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">基本信息</div>
    <Description @register="register" />
    <!-- 保养明细 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">保养明细</div>
    <Description @register="registers" />
    <!-- 保养设备 -->
    <div class="font-black text-[#414960] text-[15px] my-[16px]">保养设备</div>
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
    <!-- 保养结果 -->
    <maintainDescription :acceptList="acceptList" />
    <!-- 验收结果 -->
    <template v-if="status === '2'">
      <receiveDescription :acceptList="acceptList" />
    </template>
    <div class="mt-[24px]" v-if="status === '1'">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">验收结果</div>
      <BasicForm @register="registerFrom" />
    </div>
    <div class="pb-[12px] w-40 w-40 ml-[25%]" v-if="status === '1'">
      <a-button class="mr-4" type="primary" @click="handleSubmit">提交</a-button>
      <a-button @click="CloseFun">取消</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { WorkDetails, WorkDetail, MaintenanceFormSchema } from '../data';
  import { keepDeviceColumns } from '/@/views/device-maintenance/maintain-workOrder/data';
  import { upkeepDetailsApi, getSaveAcceptResultApi } from '/@/api/device-maintenance/work';
  import maintainDescription from '/@/views/device-maintenance/components/petitioner/maintainDescription.vue';
  import receiveDescription from '/@/views/device-maintenance/components/petitioner/receiveDescription.vue';
  import tongguo from '/@/assets/images/tongguo@2x.png';
  import weitongguo from '/@/assets/images/weitongguo@2x.png';
  import daiyanshou from '/@/assets/images/daiyanshou@2x.png';

  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  const id = route.query?.id as string;
  const status = route.query?.status as string;
  const workOrderStatus = ref<string>('');
  //审核icon
  function handleStatus(status) {
    switch (status) {
      case '5':
        return weitongguo;
      case '4':
        return tongguo;
      case '3':
        return daiyanshou;
    }
  }
  //详情
  const acceptList = ref();
  id &&
    upkeepDetailsApi({ id }).then((res) => {
      infoData.value = { ...res.workOrderInfoVO, ...res.upkeepPlanInfoVO };
      dataSource.value = res.upkeepPlanInfoVO.deviceList;
      acceptList.value = res.acceptList; //保养结果
      workOrderStatus.value = res.workOrderInfoVO.workOrderStatus;
    });

  //提交
  async function handleSubmit() {
    await validate();
    const obj = getFieldsValue();
    obj['workOrderId'] = id;
    getSaveAcceptResultApi(obj)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        CloseFun();
      });
  }

  //详情跳转
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

  //返回
  function CloseFun() {
    router.push({
      name: 'maintainAcceptance',
    });
  }
  //保养设备
  const dataSource = ref([{}]);
  const [registerTable] = useTable({
    dataSource,
    // api: thresholdListApi,
    columns: keepDeviceColumns(),
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
  const handleRouteDetails = () => {
    router.push({
      name: 'planDetails',
      query: {
        status: infoData.value.approvalStatus, //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        mode: '1', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
        id: infoData.value.upkeepPlanId,
      },
    });
  };
  let infoData = ref<any>({});
  const [register] = useDescription({
    data: infoData,
    schema: WorkDetail(handleRouteDetails),
    bordered: false,
    column: 3,
    size: 'default',
  });
  const [registers] = useDescription({
    data: infoData,
    schema: WorkDetails(),
    bordered: true,
    column: 2,
    size: 'default',
  });
  const [registerFrom, { validate, getFieldsValue }] = useForm({
    schemas: MaintenanceFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 12,
    // },
    // labelWidth: 120,
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  });
</script>

<style lang="less" scoped></style>
