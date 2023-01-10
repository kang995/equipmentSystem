<template>
  <div class="px-4">
    <!-- 工单信息、检修明细 -->
    <workOrder />
    <!-- 检修设备 -->
    <template v-if="status === '2'">
      <DeviceTable />
    </template>
    <!-- 检修结果 -->
    <overhaulDescription />
    <!-- 验收结果反显 -->
    <template v-if="status === '2'">
      <resultDescriptions />
    </template>
    <!-- 验收结果提交 -->
    <template v-if="status === '1'">
      <resultForm ref="submitRef" />
      <div class="my-[12px]">
        <a-button class="mr-4">取消</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
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
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  const status = route.query?.status as string;
  const id = route.query?.id as string;
  const submitRef = ref();

  //详情
  // const acceptList = ref();
  id &&
    UpkeepWorkOrderDetailsApi({ id }).then((res) => {
      console.log('res', res);
      // infoData.value = { ...res.workOrderInfoVO, ...res.upkeepPlanInfoVO };
      // dataSource.value = res.upkeepPlanInfoVO.deviceList;
      // acceptList.value = res.acceptList; //保养结果
    });

  //提交
  async function handleSubmit() {
    const [res] = await Promise.all([submitRef.value.submitFun()]);
    res['workOrderId'] = id;
    SaveAcceptResultApi(res).then(() => {
      createMessage.success('已提交');
      router.push({
        name: 'workOrderCheck',
      });
    });
  }
</script>

<style lang="less" scoped></style>
