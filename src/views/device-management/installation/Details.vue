<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { installationSchema } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: installationSchema,
    size: 'default',
    labelStyle: { width: '180px' },
  });
  //
</script>
