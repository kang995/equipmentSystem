<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { installationSchema } from '../../data';
  import { useRoute } from 'vue-router';
  import { DeviceDrillAffixApi } from '/@/api/device-management/special-equipment';

  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);

  id &&
    DeviceDrillAffixApi({ id }).then((res) => {
      mockData.value = res;
    });

  const mockData = ref<any>([]);
  const [register] = useDescription({
    data: mockData,
    schema: installationSchema,
    size: 'default',
    labelStyle: { width: '180px' },
  });
  //
</script>
