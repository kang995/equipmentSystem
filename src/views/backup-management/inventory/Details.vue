<template>
  <PageWrapper contentBackground contentClass="px-4">
    <div class="absolute right-12 top-4 w-17">
      <img :src="handleStatus(stockStatus)" alt="" />
    </div>
    <!-- 盘点信息  -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">盘点信息</div>
    <Description @register="register" />
    <!-- 物品清单 -->
    <div class="font-black text-[#414960] text-[15px] py-[16px]">物品清单</div>
    <DescItemTable
      v-if="mockData.spareList?.length"
      :dataSource="mockData.spareList"
      :columns="mockData.stockStatus === '2' ? inventoryTableColumns : inventoryTableColumns1"
    >
      <template #ImgListSlot="{ text }">
        <TableImg :size="60" :simpleShow="true" :imgList="text" />
      </template>
    </DescItemTable>
    <!-- 备注 -->
    <template v-if="mockData?.remark">
      <div class="font-black text-[#414960] text-[15px] py-[16px]">备注</div>
      <span>{{ mockData.remark }}</span>
    </template>
    <div class="ml-4 py-4">
      <!-- 未下发时显示下发按钮 -->
      <a-button type="primary" @click="getInventory" class="mr-4" v-if="stockStatus === '0'"
        >下发</a-button
      >
      <!-- 已完成时显示保存按钮 -->
      <!-- <a-button class="mr-4" @click="getSubmit" v-if="stockStatus === '2'">保存</a-button> -->
      <a-button @click="getReturn" class="mr-4">返回</a-button>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { TableImg } from '/@/components/Table';
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { inventoryDescItem, inventoryTableColumns, inventoryTableColumns1 } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter, useRoute } from 'vue-router';
  import {
    postTakeStockDetailApi,
    postTakeStockIssueApi,
  } from '/@/api/backup-management/inventory';
  import { useMessage } from '/@/hooks/web/useMessage';
  import DescItemTable from './DescItemTable.vue';
  import weixiafa from '/@/assets/images/weixiafa.png';
  import yixiafa from '/@/assets/images/yixiafa.png';
  import complete from '/@/assets/images/complete.png';
  import yizuofei from '/@/assets/images/yizuofei.png';
  import daizhixing from '/@/assets/images/daizhixing.png';

  const { closeCurrent } = useTabs();
  const { createMessage } = useMessage();
  const router = useRouter();
  const route = useRoute();
  const id = route.query.id as string;
  const stockStatus = route.query.stockStatus as any;
  const mockData = ref<any>({ dangerName9: '11' });
  const [register] = useDescription({
    // title: '盘点信息',
    data: mockData,
    schema: inventoryDescItem,
    size: 'default',
    column: 3,
    bordered: false,
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
  //审核icon
  function handleStatus(status) {
    switch (status) {
      case '0':
        return weixiafa;
      case '1':
        return yixiafa;
      case '2':
        return complete;
      case '3':
        return yizuofei;
      case '4':
        return daizhixing;
    }
  }
  // function getSubmit() {
  //   getRouter();
  // }
</script>
<style lang="less" scoped></style>
