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
  import { onUnmounted, ref } from 'vue';
  const AInput = Input;
  const mValue = ref();
  function receiveData(data) {
    console.log('接收到的page2event', data);
    mValue.value = data;
  }
  emitter.on('page2event', receiveData);

  onUnmounted(() => {
    emitter.off('page2event', receiveData); // <--关键代码，第二个参数要传入订阅时的回调函数
  });
</script>

<style scoped></style>
