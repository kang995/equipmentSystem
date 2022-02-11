<template>
  <div>
    <div>页面2</div>
    <a-input v-model:value="mValue" />
    <a-button @click="myClick">发送事件</a-button>
    <a-button><router-link to="./page1">返回page1</router-link></a-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TestMittPage2',
  });
</script>

<script lang="ts" setup>
  import { Input } from 'ant-design-vue';
  import emitter from '/@/utils/emitter';
  import { ref } from 'vue';

  const AInput = Input;
  const mValue = ref();
  function myClick() {
    console.log('从page2发送event');
    emitter.emit('page2event', mValue.value);
  }
</script>

<style scoped></style>
