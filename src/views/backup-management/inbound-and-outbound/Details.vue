<template>
  <PageWrapper contentBackground>
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { inboundDescItem, OutboundDescItem } from '../data';
  import { useRoute } from 'vue-router';
  import { posInDetailApi, posOUTDetailApi } from '/@/api/backup-management/inbound-and-outbound';
  const route = useRoute();
  const id = route.query.id as string;
  const props = defineProps<{
    name: string; //出库
  }>();
  const mockData = ref<any>([]);
  const [register] = useDescription({
    title: props.name + '详情',
    data: mockData,
    schema: props.name === '出库' ? inboundDescItem : OutboundDescItem,
    size: 'default',
    column: 1,
  });
  function getDetail(api) {
    id &&
      api({ id }).then((res) => {
        mockData.value = res;
      });
  }
  onMounted(() => {
    if (props.name === '出库') {
      getDetail(posOUTDetailApi);
    } else {
      getDetail(posInDetailApi);
    }
  });
</script>
