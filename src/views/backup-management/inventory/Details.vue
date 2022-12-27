<template>
  <PageWrapper contentBackground contentClass="pb-4">
    <Description @register="register" />
    <div class="ml-4">
      <a-button @click="getReturn" class="mr-4">返回</a-button>
      <!-- 未下发时显示下发按钮 -->
      <a-button @click="getInventory" class="mr-4" v-if="stockStatus === '0'">下发</a-button>
      <!-- 已完成时显示保存按钮 -->
      <a-button class="mr-4" @click="getSubmit" v-if="stockStatus === '2'">保存</a-button>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { inventoryDescItem } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter, useRoute } from 'vue-router';
  import {
    postTakeStockDetailApi,
    postTakeStockIssueApi,
  } from '/@/api/backup-management/inventory';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { closeCurrent } = useTabs();
  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const id = route.query.id as string;
  const stockStatus = route.query.stockStatus as any;
  const mockData = ref<any>({ dangerName9: '11' });
  const [register] = useDescription({
    title: '盘点信息',
    data: mockData,
    schema: inventoryDescItem,
    size: 'default',
    column: 1,
  });
  function getDetail() {
    id &&
      postTakeStockDetailApi({ id }).then((res) => {
        mockData.value = res;
      });
  }
  onMounted(() => {
    getDetail();
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
  function getInventory() {
    postTakeStockIssueApi({ id }).then(() => {
      createMessage.success('下发成功');
      getRouter();
    });
  }
  function getSubmit() {
    getRouter();
  }
</script>
<style lang="less" scoped></style>
