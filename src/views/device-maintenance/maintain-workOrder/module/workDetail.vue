<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="tabBarStyle">
      <a-tab-pane key="1" tab="工单信息">
        <work-info ref="infoRef" @eventChange="handleChange" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="使用备件">
        <work-part v-if="partFlag" />
        <repeat-work-part ref="spareRef" v-else />
      </a-tab-pane>
      <a-tab-pane key="3" tab="流转记录">
        <flow-doc />
      </a-tab-pane>
    </a-tabs>
    <!-- 提交结果 -->
    <template v-if="!partFlag && (activeKey === '1' || activeKey === '2')">
      <div class="absolute bottom-4 left-8 z-10">
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </div>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import workInfo from './workInfo.vue';
  import workPart from './workPart.vue';
  import repeatWorkPart from './repeatWorkPart.vue';
  import flowDoc from './flowDoc.vue';
  import { upkeepDealResultApi } from '/@/api/device-maintenance/work';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const infoRef = ref();
  const spareRef = ref();
  // const route = useRoute();
  // const status = route.query?.status as string;
  // const identity = route.query?.identity as string;
  const ATabs = Tabs,
    ATabPane = Tabs.TabPane;
  const tabBarStyle = {
    padding: '0 16px',
  };
  const router = useRouter();
  const activeKey = ref('1');
  //使用备件
  const partFlag = ref(true);
  function handleChange(val) {
    console.log(val);
    partFlag.value = val;
  }
  //提交处理结果
  async function handleSubmit() {
    let [res1, res2] = await Promise.all([
      infoRef.value.handleSubmitAccept(),
      spareRef.value.handleSubmitSpare(),
    ]);
    const orderSpareNumDTOList = res2.map((item) => {
      let obj = new Object();
      obj['spareId'] = item.id;
      obj['useNum'] = item.useNum;
      return obj;
    });
    let objs = { ...res1, orderSpareNumDTOList };
    // console.log('数据',objs)
    upkeepDealResultApi(objs)
      .then(() => {
        createMessage.success('已提交');
      })
      .finally(() => {
        router.push({
          name: 'maintainWorkOrder',
        });
      });
  }
</script>

<style lang="less" scoped></style>
