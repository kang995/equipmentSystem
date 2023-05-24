<template>
  <div class="px-4">
    <div class="absolute right-20 top-22 w-17">
      <img :src="handleStatus(workOrderStatus)" alt="" />
    </div>
    <!-- 工单信息、检修明细 -->
    <workOrder :infoData="infoData" />
    <!-- 检修设备 -->
    <template v-if="deviceList.length">
      <DeviceTable :deviceList="deviceList" />
    </template>
    <!-- 检修结果 -->
    <overhaulDescription :acceptList="acceptList" />
    <!-- 验收结果 -->
    <template v-if="workOrderStatus !== '3'">
      <resultDescriptions :acceptList="acceptList" />
    </template>
    <!-- 验收结果提交 -->
    <template v-if="workOrderStatus === '3'">
      <resultForm ref="submitRef" />
      <div class="my-[12px] ml-[25%]">
        <a-button class="mr-4" type="primary" @click="handleSubmit">提交</a-button>
        <a-button @click="CloseFun">取消</a-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import workOrder from './WorkOrderDescription.vue';
  import DeviceTable from './DeviceTable.vue';
  import overhaulDescription from '/@/views/device-service/components/petitioner/overhaulDescription.vue';
  import resultDescriptions from '/@/views/device-service/components/petitioner/resultDescriptions.vue';
  import resultForm from './resultForm.vue';
  import { SaveAcceptResultApi, UpkeepWorkOrderDetailsApi } from '/@/api/device-service/service';
  // import { useMessage } from '/@/hooks/web/useMessage';
  import tongguo from '/@/assets/images/tongguo@2x.png';
  import weitongguo from '/@/assets/images/weitongguo@2x.png';
  import daiyanshou from '/@/assets/images/daiyanshou@2x.png';

  // const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  // const status = route.query?.status as string;
  const id = route.query?.id as string;
  const submitRef = ref();
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
  const infoData = ref({});
  const deviceList = ref([]);
  const acceptList = ref([]);
  id &&
    UpkeepWorkOrderDetailsApi({ id }).then((res) => {
      infoData.value = { ...res.workOrderInfoVO, ...res.overhaulPlanInfoVO }; //工单信息、检修明细
      deviceList.value = res.overhaulPlanInfoVO.deviceList; //检修设备
      console.log('检修设备', deviceList.value);
      acceptList.value = res.acceptList; //检修结果、验收结果
      workOrderStatus.value = res.workOrderInfoVO.workOrderStatus;
    });

  //提交
  async function handleSubmit() {
    const [res] = await Promise.all([submitRef.value.submitFun()]);
    res['workOrderId'] = id;
    SaveAcceptResultApi(res).then(() => {
      CloseFun();
    });
  }
  //返回
  function CloseFun() {
    router.push({
      name: 'workOrderCheck',
    });
  }
</script>

<style lang="less" scoped></style>
