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
  import { postUnitFacilityDetailApi } from '/@/api/device-management/installation';
  const route = useRoute();
  const id = route.query.id as string;

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: installationSchema,
    size: 'default',
    column: 2,
    labelStyle: { width: '180px' },
  });
  id &&
    postUnitFacilityDetailApi({ id }).then((res) => {
      mockData.value = res;
    });
  //
</script>
