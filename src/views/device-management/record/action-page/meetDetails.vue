<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { meetSchema } from '../../data';
  import { useRoute } from 'vue-router';
  import { contingencyDetailApi } from '/@/api/device-management/special-equipment';
  const route = useRoute();
  const id = route.query.id as string;
  // const dataSource = route.query.dataSource as string;

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: meetSchema,
    size: 'default',
    column: 1,
    labelStyle: { width: '180px' },
  });
  id &&
    contingencyDetailApi({ id }).then((res) => {
      mockData.value = res;
    });
</script>
