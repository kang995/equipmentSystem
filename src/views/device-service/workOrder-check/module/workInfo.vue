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
      <resultForm />
      <div class="my-[12px]">
        <a-button class="mr-4">取消</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import workOrder from './WorkOrderDescription.vue';
  import DeviceTable from './DeviceTable.vue';
  import overhaulDescription from '/@/views/device-service/components/petitioner/overhaulDescription.vue';
  import resultDescriptions from '/@/views/device-service/components/petitioner/resultDescriptions.vue';
  import resultForm from './resultForm.vue';
  const route = useRoute();
  const status = route.query?.status as string;

  function handleSubmit() {}
</script>

<style lang="less" scoped></style>
