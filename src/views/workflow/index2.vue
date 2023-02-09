<template>
  <div class="w-full h-full">
    <iframe
      src="https://codesign.qq.com/app/design/RMdGZQabe7ZXk8x/board"
      frameborder="0"
      class="w-full h-full"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    isShow?: any;
  }>();
  console.log('isShow', props.isShow);
</script>
