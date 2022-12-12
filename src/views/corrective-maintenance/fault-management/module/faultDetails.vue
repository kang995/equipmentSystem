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
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
  });

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: faultDetail(props.status),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
