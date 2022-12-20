<template>
  <div class="bg-white p-4 a">
    <Description @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { ref } from 'vue';
  import { informationDescItem } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: informationDescItem,
    size: 'default',
    column: 1,
    labelStyle: { width: '180px' },
  });
</script>
<style lang="less" scoped>
  .a {
    border: 1px solid @custom-gray4;
    border-top: none;
  }
</style>
