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
    <div class="font-black text-[#414960] text-[15px] py-[16px]">工单信息</div>
    <Description @register="registerOverhaul" />
    <!-- 检修明细 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">检修明细</div>
    <Description @register="registerOverhauls" />
    <!-- 检修设备 -->
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
    <!-- 负责人 -->
    <template v-if="identity === '1'">
      <!-- 重新下发 -->
      <reIssueForm ref="reIssueRef" v-if="again" />
      <!-- 延期审核 -->
      <template v-if="delayFlag === '2'">
        <!-- <applyDescription :delayData="delayData" /> -->
        <postponeForm ref="postponeRef" v-if="postpone" />
      </template>
      <!-- 检修结果 -->
      <template v-if="status === '3' || status === '4' || status === '5'">
        <overhaulDescription :acceptList="acceptList" />
      </template>
      <!-- 验收结果 -->
      <template v-if="status === '4' || status === '5'">
        <resultDescriptions :acceptList="acceptList" />
      </template>
      <div :class="['my-[24px]', 'flex', !again && !postpone ? 'w-15' : 'w-full']">
        <template v-if="status === '2'">
          <a-button type="primary" v-if="!again && !postpone" @click="handleAgain"
            >重新下发</a-button
          >
          <div class="ml-[25%]">
            <a-button class="mr-4" v-if="again" @click="again = false">取消</a-button>
            <a-button type="primary" v-if="again" @click="handleSubmitTask">提交</a-button>
          </div>
        </template>
        <template v-if="status === '2' && delayFlag === '2'">
          <a-button type="primary" v-if="!again && !postpone" @click="handlePostpone"
            >延期审核</a-button
          >
          <div class="ml-[0%]">
            <a-button class="mr-4" v-if="postpone" @click="postpone = false">取消</a-button>
            <a-button type="primary" v-if="postpone" @click="handleSubmitResult">提交</a-button>
          </div>
        </template>
      </div>
    </template>
    <!-- 执行人 -->
    <template v-if="identity === '2'">
      <!-- 申请延期 -->
      <applyForm v-if="apply" ref="appplyRef" />
      <!-- 提交检修结果 -->
      <!-- <acceptForm v-if="accept" ref="overhaulRef"/> -->
      <template v-if="accept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">检修结果</div>
        <BasicForm @register="registerAccept" />
      </template>
      <!-- 检修结果 -->
      <template v-if="status === '3' || status === '4' || status === '5'">
        <overhaulDescription :acceptList="acceptList" />
      </template>
      <!-- 验收结果  -->
      <template v-if="status === '4' || status === '5'">
        <resultDescriptions :acceptList="acceptList" />
      </template>
      <!-- 重新提交检修结果 -->
      <!-- <acceptForm v-if="SubmitAccept" /> -->
      <template v-if="SubmitAccept">
        <div class="font-black text-[#414960] text-[15px] my-[16px]">检修结果</div>
        <BasicForm @register="registerAccept" />
      </template>

      <div class="my-[24px] flex">
        <template v-if="status === '2'">
          <a-button class="mr-4" type="primary" v-if="!apply && !accept" @click="handleApply"
            >申请延期</a-button
          >
          <a-button type="primary" v-if="!apply && !accept" @click="handleAccept"
            >提交验收</a-button
          >
          <div class="ml-[25%]">
            <a-button class="mr-4" type="primary" v-if="apply" @click="handleSubmitApply"
              >提交</a-button
            >
            <a-button v-if="apply" @click="handleClose">取消</a-button>
            <!-- <a-button type="primary" v-if="accept" @click="handleSubmitAccept">提交</a-button> -->
          </div>
        </template>
        <template v-if="status === '5'">
          <a-button class="mt-[12px]" type="primary" v-if="!SubmitAccept" @click="handleAgainSubmit"
            >重新提交</a-button
          >
          <!-- <a-button type="primary" v-if="SubmitAccept" @click="handleSubmitResult">提交</a-button> -->
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useRouter, useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  //申请人
  import reIssueForm from '../../components/petitioner/reIssueForm.vue';
  import postponeForm from '../../components/petitioner/postponeForm.vue';
  import applyDescription from '/@/views/device-maintenance/components/petitioner/applyDescription.vue';

  import overhaulDescription from '../../components/petitioner/overhaulDescription.vue';
  import resultDescriptions from '../../components/petitioner/resultDescriptions.vue';
  //执行人
  import applyForm from '../../components/executor/applyForm.vue';
  // import acceptForm from '../../components/executor/acceptForm.vue';
  import { WorkDetails, WorkDetail, deviceTableColumns, getAcceptFormSchema } from '../data';
  import {
    UpkeepWorkOrderDetailsApi,
    UpkeepWorkOrderAnewIssueApi,
    UpkeepWorkOrderDelayAuditApi,
    UpkeepWorkOrderApplyDelayApi,
  } from '/@/api/device-service/service';
  // import daixiafa from '/@/assets/images/daixiafa@2x.png';
  import shenqingyanqi from '/@/assets/images/shenqingyanqi@2x.png';
  import weikaishi from '/@/assets/images/weikaishi.png';
  import daizhixing from '/@/assets/images/daizhixing.png';
  import daiyanshou from '/@/assets/images/daiyanshou@2x.png';
  import tongguo from '/@/assets/images/tongguo@2x.png';
  import weitongguo from '/@/assets/images/weitongguo@2x.png';
  import zhongzhi from '/@/assets/images/zhongzhi.png';

  const postponeRef = ref();
  const reIssueRef = ref();
  const appplyRef = ref();
  // const overhaulRef = ref();
  const { createMessage } = useMessage();
  const emit = defineEmits(['eventChange']);
  const router = useRouter();
  const route = useRoute();
  const isShow = route.query?.isShow as string;
  const id = route.query?.id as string;
  const status = route.query?.status as string;
  const identity = route.query?.identity as string;
  const delayFlag = route.query?.delayFlag as string;

  onMounted(() => {
    isShow && (apply.value = true);
  });
  const props = defineProps<{
    partFlag: Boolean;
  }>();
  //监听partFlag
  watch(
    () => props.partFlag,
    (newVal) => {
      if (newVal) {
        status === '2' ? (accept.value = false) : (SubmitAccept.value = false);
        // SubmitAccept.value = false;
      }
    },
  );

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
  // 详情
  const delayData = ref();
  const acceptList = ref();
  id &&
    UpkeepWorkOrderDetailsApi({ id }).then((res) => {
      infoData.value = { ...res.workOrderInfoVO, ...res.overhaulPlanInfoVO }; // 工单信息、检修明细
      dataSource.value = res.overhaulPlanInfoVO.deviceList; //检修设备
      delayData.value = res.delay; //延期申请
      acceptList.value = res.acceptList; //检修结果和验收结果
    });

  //执行人
  //申请延期
  const apply = ref<boolean>(false);
  function handleApply() {
    apply.value = true;
    setTimeout(() => {
      appplyRef.value.setFieldsValue({
        oldEndTime: infoData.value.executeEndTime,
      });
    });
  }
  //申请延期--提交
  async function handleSubmitApply() {
    let [res] = await Promise.all([appplyRef.value.handleSubmitApply()]);
    res['workOrderId'] = id;
    UpkeepWorkOrderApplyDelayApi(res).then(() => {
      createMessage.success('已提交');
      CloseFun();
    });
  }
  //提交验收（检修结果）
  const accept = ref<boolean>(false);
  function handleAccept() {
    accept.value = true;
    emit('eventChange', false);
  }
  //重新提交（检修结果）
  const SubmitAccept = ref<boolean>(false);
  function handleAgainSubmit() {
    SubmitAccept.value = true;
    emit('eventChange', false);
  }
  //检修结果--提交
  function handleSubmitAccept() {
    return new Promise(async (resolve) => {
      await validateResult();
      const obj = getFieldsValueResult();
      obj['workOrderId'] = id;
      resolve(obj);
    });
  }

  //取消
  function handleClose() {
    if (isShow) {
      CloseFun();
    } else {
      apply.value = false;
    }
  }

  const [registerAccept, { validate: validateResult, getFieldsValue: getFieldsValueResult }] =
    useForm({
      schemas: getAcceptFormSchema(), //表单配置
      showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    });
  const handleRouteDetails = () => {
    console.log(infoData.value);
    router.push({
      name: 'planManagementDetails',
      query: {
        status: infoData.value.approvalStatus, //1：待提交；2：审核中；3：审核通过；4：审核拒绝
        // status: '4', //待提交：1、审核中：2、审核拒绝：3、审核通过：4、待审核：5
        mode: '3', //保养计划管理：1、保养计划审核：2、检修计划管理：3、检修计划审核：4
        id: infoData.value.overhaulPlanId,
      },
    });
  };
  //负责人
  // 工单信息
  let infoData = ref<any>({});
  const [registerOverhaul] = useDescription({
    data: infoData,
    schema: WorkDetail(handleRouteDetails),
    bordered: false,
    column: 3,
    size: 'default',
  });
  //检修明细
  const [registerOverhauls] = useDescription({
    data: infoData,
    schema: WorkDetails(),
    bordered: true,
    column: 2,
    size: 'default',
  });

  //检修设备
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

  //重新下发-提交
  async function handleSubmitTask() {
    const [res] = await Promise.all([reIssueRef.value.submitFun()]);
    res['id'] = id;
    UpkeepWorkOrderAnewIssueApi(res).then(() => {
      createMessage.success('已重新下发');
      CloseFun();
    });
  }
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  //延期审核-提交
  async function handleSubmitResult() {
    const [res] = await Promise.all([postponeRef.value.submitFun()]);
    res['id'] = id;
    UpkeepWorkOrderDelayAuditApi(res).then(() => {
      createMessage.success('已提交');
      CloseFun();
    });
  }
  //延期审核
  const postpone = ref<boolean>(false);
  function handlePostpone() {
    postpone.value = true;
  }
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
  function CloseFun() {
    router.push({
      name: 'serviceWorkOrder',
    });
  }
  defineExpose({
    handleSubmitAccept,
  });
</script>

<style lang="less" scoped></style>
