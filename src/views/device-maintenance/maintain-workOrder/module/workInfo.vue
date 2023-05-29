<template>
  <div class="px-4">
    <div class="absolute right-20 top-22 w-17">
      <img :src="handleStatus(identity, status, delayFlag)" alt="" />
    </div>
    <!-- 延期申请  -->
    <div v-if="identity === '1' && delayFlag === '2'">
      <applyDescription v-if="delayData" :delayData="delayData" />
    </div>
    <!-- 工单信息 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">基本信息</div>
    <Description @register="register" />
    <!-- 保养明细 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">保养明细</div>
    <Description @register="registers" />
    <!-- 保养设备 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">保养设备</div>
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
    <!-- 负责人 -->
    <template v-if="identity === '1'">
      <!-- 重新下发 -->
      <reIssueForm ref="reIssueRef" v-if="again" />
      <!-- 延期审核 -->
      <template v-if="delayFlag === '2'">
        <!-- <applyDescription :delayData="delayData" /> -->
        <postponeForm ref="postponeRef" v-if="postpone" />
      </template>
      <!-- 保养结果、验收结果 -->
      <template v-if="status === '3' || status === '4' || status === '5'">
        <maintainDescription :acceptList="acceptList" />
        <receiveDescription :acceptList="acceptList" v-if="status === '4' || status === '5'" />
      </template>
      <div class="my-[24px]">
        <template v-if="status === '2'">
          <div class="w-40 ml-[25%]">
            <a-button class="mr-4" v-if="again" @click="again = false">取消</a-button>
            <a-button type="primary" v-if="again" @click="handleSubmitTask">提交</a-button>
          </div>
          <a-button class="mr-4" type="primary" v-if="!again && !postpone" @click="handleAgain"
            >重新下发</a-button
          >
        </template>
        <template v-if="status === '2' && delayFlag === '2'">
          <a-button class="mr-4" type="primary" v-if="!again && !postpone" @click="handlePostpone"
            >延期审核</a-button
          >
          <div class="w-40 ml-[25%]">
            <a-button class="mr-4" v-if="postpone" @click="postpone = false">取消</a-button>
            <a-button type="primary" v-if="postpone" @click="handleSubmitResult">提交</a-button>
          </div>
        </template>
      </div>
    </template>
    <!-- 执行人 -->
    <template v-if="identity === '2'">
      <!-- 申请延期 -->
      <div class="mt-[22px]" v-if="Postpone">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">申请延期</div>
        <BasicForm @register="registerPostponeFrom" />
      </div>
      <!-- 提交验收 -->
      <div class="mt-[22px]" v-if="Result">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">处理结果</div>
        <BasicForm @register="registerResultFrom" />
      </div>
      <!-- 保养结果、验收结果 -->
      <template v-if="status === '3' || status === '4' || status === '5'">
        <maintainDescription :acceptList="acceptList" />
        <receiveDescription :acceptList="acceptList" v-if="status === '4' || status === '5'" />
      </template>

      <!-- 保养结果重新提交 -->
      <div class="mt-[22px]" v-if="Refuse">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">保养结果</div>
        <BasicForm @register="registerResultFrom" />
      </div>
      <div class="my-[24px]">
        <template v-if="status === '2'">
          <a-button class="mr-4" type="primary" v-if="!Postpone && !Result" @click="handlePostpones"
            >申请延期</a-button
          >
          <a-button type="primary" v-if="!Postpone && !Result" @click="handleResult"
            >提交验收</a-button
          >
          <div class="w-40 ml-[25%]">
            <a-button class="mr-4" type="primary" v-if="Postpone" @click="handleSubmitApply"
              >提交</a-button
            >
            <a-button v-if="Postpone" @click="handleClose">取消</a-button>
            <!-- <a-button type="primary" v-if="Result" @click="handleSubmitAccept">提交</a-button> -->
          </div>
        </template>
        <template v-if="status === '5'">
          <a-button type="primary" v-if="!Refuse" @click="handleRefuse">重新提交</a-button>
          <!-- <a-button class="mr-4" v-if="Refuse" @click="Refuse = false">取消</a-button> -->
          <!-- <a-button type="primary" v-if="Refuse" @click="handleSubmitAccept">提交</a-button> -->
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  // 申请人
  import reIssueForm from '/@/views/device-service/components/petitioner/reIssueForm.vue';
  import postponeForm from '/@/views/device-service/components/petitioner/postponeForm.vue';
  import applyDescription from '../../components/petitioner/applyDescription.vue';
  //执行人
  // import applyForm from '/@/views/device-service/components/executor/applyForm.vue';
  import maintainDescription from '../../components/petitioner/maintainDescription.vue';
  import receiveDescription from '../../components/petitioner/receiveDescription.vue';
  import {
    WorkDetails,
    WorkDetail,
    postponeFormSchema,
    ResultFormSchema,
    // RefuseFormSchema,
    keepDeviceColumns,
  } from '../data';
  import {
    upkeepDetailsApi,
    upkeepAnewIssueApi,
    upkeepDelayAuditApi,
    upkeepApplyDelayApi,
    // upkeepDealResultApi,
  } from '/@/api/device-maintenance/work';
  // import daixiafa from '/@/assets/images/daixiafa@2x.png';
  import shenqingyanqi from '/@/assets/images/shenqingyanqi@2x.png';
  import weikaishi from '/@/assets/images/weikaishi.png';
  import daizhixing from '/@/assets/images/daizhixing.png';
  import daiyanshou from '/@/assets/images/daiyanshou@2x.png';
  import tongguo from '/@/assets/images/tongguo@2x.png';
  import weitongguo from '/@/assets/images/weitongguo@2x.png';
  import zhongzhi from '/@/assets/images/zhongzhi.png';

  const workOrderStatus: any = ref<any>('');
  const delayFlags: any = ref<any>('');
  const postponeRef = ref();
  const reIssueRef = ref();
  const { createMessage } = useMessage();
  const emit = defineEmits(['eventChange']);
  const router = useRouter();
  const route = useRoute();
  const id = route.query?.id as string;
  const status = route.query?.status || (workOrderStatus as string);
  const identity = ref(route.query?.identity as string);
  const delayFlag = route.query?.delayFlag || (delayFlags as string);

  const props = defineProps<{
    partFlag: Boolean;
  }>();
  //监听partFlag
  watch(
    () => props.partFlag,
    (newVal) => {
      if (newVal) {
        status === '2' ? (Result.value = false) : (Refuse.value = false);
        // Refuse.value = false;
      }
    },
  );

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
  const handleRouteDetails = (record) => {
    console.log('record', record);
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
  //审核icon
  function handleStatus(identity, status, delayFlag) {
    if (identity === '1' && status === '2' && delayFlag === '2') {
      return shenqingyanqi;
    }
    if (status === '1') {
      return weikaishi;
    } else if (status === '2') {
      return daizhixing;
    } else if (status === '3') {
      return daiyanshou;
    } else if (status === '4') {
      return tongguo;
    } else if (status === '5') {
      return weitongguo;
    } else if (status === '6') {
      return zhongzhi;
    }
  }
  //详情
  const delayData = ref();
  const acceptList = ref();
  id &&
    upkeepDetailsApi({ id }).then((res) => {
      console.log('res', res);
      infoData.value = { ...res.workOrderInfoVO, ...res.upkeepPlanInfoVO };
      dataSource.value = res.upkeepPlanInfoVO.deviceList;
      delayData.value = res.delay;
      acceptList.value = res.acceptList;
      workOrderStatus.value = res.workOrderInfoVO.workOrderStatus;
      delayFlags.value = res.workOrderInfoVO.delayFlag;
      //第三方跳转判断identity
      if (!identity.value) {
        if (workOrderStatus.value === '2') {
          //待执行
          identity.value = '2';
        } else {
          identity.value = '1';
        }
        // console.log('identity.value',identity.value)
      }
    });

  // 负责人
  //重新下发-提交
  async function handleSubmitTask() {
    const [res] = await Promise.all([reIssueRef.value.submitFun()]);
    res['id'] = id;
    upkeepAnewIssueApi(res).then(() => {
      createMessage.success('已重新下发');
      CloseFun();
    });
  }
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  //延期审核
  const postpone = ref<boolean>(false);
  function handlePostpone() {
    postpone.value = true;
  }
  //延期审核-提交
  async function handleSubmitResult() {
    const [res] = await Promise.all([postponeRef.value.submitFun()]);
    res['id'] = id;
    upkeepDelayAuditApi(res).then(() => {
      createMessage.success('已提交');
      CloseFun();
    });
  }

  //执行人
  // 申请延期
  const Postpone = ref<boolean>(false);
  function handlePostpones() {
    Postpone.value = true;
    setTimeout(() => {
      setFieldsValuePostpone({
        oldEndTime: infoData.value.executeEndTime,
      });
    });
  }
  //申请延期--提交
  async function handleSubmitApply() {
    await validatePostpone();
    const obj = getFieldsValuePostpone();
    obj['workOrderId'] = id;
    upkeepApplyDelayApi(obj)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        CloseFun();
      });
  }
  const [
    registerPostponeFrom,
    {
      validate: validatePostpone,
      getFieldsValue: getFieldsValuePostpone,
      setFieldsValue: setFieldsValuePostpone,
    },
  ] = useForm({
    schemas: postponeFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  });
  //取消
  function handleClose() {
    // if (isShow) {
    //   CloseFun();
    // } else {
    Postpone.value = false;
    // }
  }

  // 提交验收
  const Result = ref<boolean>(false);
  function handleResult() {
    Result.value = true;
    emit('eventChange', false);
  }
  //提交验收-提交处理结果、提交保养结果
  function handleSubmitAccept() {
    return new Promise(async (resolve) => {
      await validateResult();
      const obj = getFieldsValueResult();
      obj['workOrderId'] = id;
      resolve(obj);
    });
  }
  const [registerResultFrom, { validate: validateResult, getFieldsValue: getFieldsValueResult }] =
    useForm({
      schemas: ResultFormSchema(), //表单配置
      showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    });
  //重新提交
  const Refuse = ref<boolean>(false);
  function handleRefuse() {
    Refuse.value = true;
    emit('eventChange', false);
  }
  //保养结果-提交
  // function handleSubmitMaintain() {
  //   CloseFun();
  // }
  // const [registerRefuseFrom, {}] = useForm({
  //   schemas: RefuseFormSchema(), //表单配置
  //   showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
  //   labelCol: {
  //     span: 3,
  //   },
  //   wrapperCol: {
  //     span: 12,
  //   },
  // });
  //详情
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
      name: 'maintainWorkOrder',
    });
  }
  defineExpose({
    handleSubmitAccept,
  });
</script>

<style lang="less" scoped></style>
