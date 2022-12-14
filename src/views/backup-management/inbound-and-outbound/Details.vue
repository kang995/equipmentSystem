<template>
  <PageWrapper contentBackground>
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { inboundDescItem, OutboundDescItem } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);
  const props = defineProps<{
    name: string; //出库
  }>();
  const mockData = ref<any>([]);
  const [register] = useDescription({
    title: props.name + '详情',
    data: mockData,
    schema: props.name === '出库' ? inboundDescItem : OutboundDescItem,
    size: 'default',
    // labelStyle: { width: '120px' },
    column: 1,
  });
  //
</script>
