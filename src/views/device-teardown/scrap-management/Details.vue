<template>
  <div class="bg-white p-4 a">
    <Description @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { ref } from 'vue';
  import { informationDescItem } from './data';
  import { useRoute } from 'vue-router';
  import { getDetailsApi } from '/@/api/device-scrap/data';
  const route = useRoute();
  const id = route.query.id as string;

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: informationDescItem,
    size: 'default',
    column: 2,
    labelStyle: { width: '180px' },
  });
  id &&
    getDetailsApi({ id }).then((res) => {
      mockData.value = res;
    });
</script>
<style lang="less" scoped>
  .a {
    border: 1px solid @custom-gray4;
    border-top: none;
  }
</style>
