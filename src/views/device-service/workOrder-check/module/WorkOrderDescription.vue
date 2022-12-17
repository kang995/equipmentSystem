<template>
  <div>
    <Description @register="registerWorkOrder" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Description, useDescription } from '/@/components/Description';
  import { workOrderlSchema } from '../data';
  import { WorkDetail } from '/@/views/device-service/service-workOrder/data';
  const route = useRoute();
  const status = route.query?.status as string;
  //待验收：1、已通过：2、未通过：3
  let data = ref<any>({});
  const [registerWorkOrder] = useDescription({
    data,
    schema: status === '1' ? workOrderlSchema() : WorkDetail(),
    bordered: false,
    column: 3,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
