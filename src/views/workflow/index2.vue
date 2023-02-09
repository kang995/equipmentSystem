<template>
  <div class="w-full h-full">
    <iframe
      src="https://workflow-plat-test.ts-it.cn/api/free/login/getUserInfo?info=da062f292e684a46889063ddef7fe72eda4fac6478e98010678b5fccbb076043c920bef166290194fdcb06deba08941d03712c41f54d88fde571369ca58a27be38130d7140298358b03ae7880f4e33ffde57b832f6586ca2c810fd705bdaa0c656199846501e8df82a05e3ac87114a56971523ad9ec6c1066f7828f88c3556d7&pathCode=1&url=https://workflow-plat-test.ts-it.cn"
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
