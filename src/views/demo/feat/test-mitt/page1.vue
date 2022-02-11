<template>
  <div>
    <div>页面1</div>
    <a-input v-model:value="mValue" />
    <a-button><router-link to="./page2">跳转page2</router-link></a-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TestMittPage1',
  });
</script>

<script lang="ts" setup>
  import { Input } from 'ant-design-vue';
  import emitter from '/@/utils/emitter';
  import { ref } from 'vue';
  const AInput = Input;
  const mValue = ref();
  emitter.on('page2event', (e) => {
    console.log('接收到的page2event', e);
    mValue.value = e;
  });
</script>

<style scoped></style>
