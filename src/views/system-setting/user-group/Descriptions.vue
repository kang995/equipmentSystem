<template>
  <div class="p-4">
    <a-descriptions :column="2">
      <template #title>
        <span>基本信息</span>
        <a-button type="link" @click="toEdit()">编辑</a-button>
      </template>
      <a-descriptions-item
        v-for="(item, index) in titleList"
        :key="index"
        :label="item.title"
        value="userName"
        >{{ item.text }}</a-descriptions-item
      >
    </a-descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions } from 'ant-design-vue';
  import { toRefs } from '@vueuse/core';
  import { useRouter, useRoute } from 'vue-router';
  // import { PageWrapper } from '/@/components/Page';
  const router = useRouter();
  const route = useRoute();
  const ADescriptions = Descriptions;
  const ADescriptionsItem = Descriptions.Item;
  const id = route.query.id;
  function toEdit() {
    router.push({
      name: 'UserGroupEdit',
      query: {
        id: id,
      },
    });
  }
  interface TitleParams {
    title: string;
    text: string;
  }
  const props = defineProps<{
    titleList: Array<TitleParams>;
  }>();
  const { titleList } = toRefs(props);
</script>
<style scoped lang="less">
  ::v-deep(.ant-descriptions-item-label) {
    font-size: 14px;
    font-weight: 600;
    color: #61687c;
  }

  ::v-deep(.ant-descriptions-item-content) {
    font-size: 14px;
    font-weight: 400;
    color: #61687c;
  }

  ::v-deep(.tsit-collapse-container__header) {
    border: none;
  }
</style>
