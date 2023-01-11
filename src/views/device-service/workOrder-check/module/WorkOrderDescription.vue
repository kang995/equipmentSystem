<template>
  <div>
    <!-- <div class="sub-title text-body1 text-14px font-bold mt-6 mb-6">审核信息</div> -->
    <div>
      <Description :column="2" :bordered="false" :data="infoData" :schema="WorkDetail(status)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Description } from '/@/components/Description';
  // import { workOrderlSchema } from '../data';
  import { WorkDetail } from '/@/views/device-service/service-workOrder/data';
  const route = useRoute();
  const status = route.query?.status as string; //待验收：1、已通过：2、未通过：3
  const props = defineProps<{
    infoData?: Object;
  }>();
  // console.log('infoData',props.infoData)
</script>

<style lang="less" scoped></style>
