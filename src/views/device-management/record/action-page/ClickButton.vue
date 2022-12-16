<template>
  <a-button type="primary" @click="getRouter">查看动设备</a-button>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const props = defineProps<{
    name: string;
    state: string;
  }>();
  const router = useRouter();
  function getRouter() {
    router.push({
      name: props.name,
      query: {
        state: props.state,
      },
    });
  }
</script>
