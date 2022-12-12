<template>
  <PageWrapper contentBackground>
    <div class="px-10">
      <Description @register="register" />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { faultDetail } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const status = route.query.status as string;
  // const props = defineProps({
  //   status: {
  //     type: String,
  //     default:'',
  //   },
  // });

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: faultDetail(status),
    bordered: false,
    column: 2,
    size: 'default',
    // labelStyle: { width: '180px' },
  });
</script>

<style lang="less" scoped></style>
