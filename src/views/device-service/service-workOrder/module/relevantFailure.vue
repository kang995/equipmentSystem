<template>
  <div class="px-4">
    <template v-for="(item, index) in dataSource" :key="index">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">故障信息{{ index + 1 }}</div>
      <Description :column="2" :bordered="true" :data="item" :schema="WorkInfoSchema()" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description } from '/@/components/Description';
  import { WorkInfoSchema } from '../data';
  import { useRoute } from 'vue-router';
  import { TroubleDetailsApi } from '/@/api/device-service/service';
  const route = useRoute();
  const id = route.query?.id as string;
  const dataSource = ref<any>([]);

  //关联故障
  id &&
    TroubleDetailsApi({ id }).then((res) => {
      dataSource.value = res;
      console.log('dataSource', dataSource.value);
    });
</script>

<style lang="less" scoped></style>
