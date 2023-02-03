<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { installationSchemas } from '../../data';
  import { useRoute } from 'vue-router';
  import { postSpecialRDetailApi } from '/@/api/device-management/special-equipment';
  const route = useRoute();
  const id = route.query.id as string;
  const dataSource = route.query.dataSource as string;

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: installationSchemas,
    size: 'default',
    column: 1,
    labelStyle: { width: '180px' },
  });
  id &&
    postSpecialRDetailApi({ id, dataSource }).then((res) => {
      mockData.value = res;
    });
</script>
