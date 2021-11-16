<template>
  <Map @register="register" />
</template>
<script lang="ts" setup>
  import { Map } from '/@/components/Map';
  import { useMap } from '/@/components/Map/src/useMap';
  import { nextTick, onMounted } from 'vue';

  const [register, { addMarker }] = useMap();
  onMounted(async () => {
    await nextTick();
    await addMarker();
  });
</script>
<style lang="less" scoped></style>
