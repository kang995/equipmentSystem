<template>
  <div class="px-4">
    <Description @register="register" />
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
    <div class="mt-[12px]" v-if="status === '1'">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">验收结果</div>
      <BasicForm @register="registerFrom" />
    </div>
    <div class="mt-[12px]" v-if="status === '1'">
      <a-button class="mr-4">取消</a-button>
      <a-button type="primary" @click="handleSubmit">提交</a-button>
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
  import { WorkDetail, MaintenanceFormSchema } from '../data';
  import { keepDeviceColumns } from '/@/views/device-maintenance/maintain-workOrder/data';
  import { upkeepDetailsApi, getSaveAcceptResultApi } from '/@/api/device-maintenance/work';
  import maintainDescription from '/@/views/device-maintenance/components/petitioner/maintainDescription.vue';
  import receiveDescription from '/@/views/device-maintenance/components/petitioner/receiveDescription.vue';
  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  const id = route.query?.id as string;
  const status = route.query?.status as string;

  //详情
  const acceptList = ref();
  id &&
    upkeepDetailsApi({ id }).then((res) => {
      console.log('res', res);
      infoData.value = { ...res.workOrderInfoVO, ...res.upkeepPlanInfoVO };
      dataSource.value = res.upkeepPlanInfoVO.deviceList;
      acceptList.value = res.acceptList; //保养结果
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
  function handleDetails() {
    router.push({
      name: 'specialEquipmentDetails',
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

  let infoData = ref<any>({});
  const [register] = useDescription({
    data: infoData,
    schema: WorkDetail(),
    bordered: false,
    column: 3,
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
      span: 3,
    },
    wrapperCol: {
      span: 12,
    },
  });
</script>

<style lang="less" scoped></style>
