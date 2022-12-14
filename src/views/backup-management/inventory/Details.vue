<template>
  <PageWrapper contentBackground contentClass="pb-4">
    <Description @register="register" />
    <div class="ml-4">
      <a-button @click="getReturn" class="mr-4">返回</a-button>
      <!-- 未下发时显示下发按钮 -->
      <a-button @click="getInventory" class="mr-4">下发</a-button>
      <!-- 已完成时显示保存按钮 -->
      <a-button @click="getSubmit">保存</a-button>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { inventoryDescItem } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter } from 'vue-router';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const mockData = ref<any>({ dangerName9: '11' });
  const [register] = useDescription({
    title: '盘点信息',
    data: mockData,
    schema: inventoryDescItem,
    size: 'default',
    column: 2,
  });

  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'Inventory',
    });
  }
  function getReturn() {
    getRouter();
  }
  function getInventory() {}
  function getSubmit() {
    getRouter();
  }
</script>
<style lang="less" scoped></style>
