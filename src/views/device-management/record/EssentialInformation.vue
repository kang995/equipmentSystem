<template>
  <div class="p-4 bg-white">
    基本信息
    <Description @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { ref } from 'vue';
  import { schemaDescItem } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: schemaDescItem,
    size: 'default',
    labelStyle: { width: '180px' },
  });
  //
</script>
