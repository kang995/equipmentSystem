<template>
  <a-card title="流转记录" :bordered="false">
    <a-steps :current="listData.length" progress-dot direction="vertical" size="default">
      <template v-for="item in listData" :key="item.type">
        <a-step :title="item.recordTime">
          <template #description>
            <div>
              <span>{{ item.content }}</span>
            </div>
          </template>
        </a-step>
      </template>
      <!-- <a-step title="创建项目">
        <template #description>
          <div>Vben</div>
          <p>2016-12-12 12:32</p>
        </template>
      </a-step>
      <a-step title="部门初审">
        <template #description>
          <p>Chad</p>
        </template>
      </a-step>
      <a-step title="财务复核" />
      <a-step title="完成" /> -->
    </a-steps>
  </a-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Card, Steps } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { getTransferListApi } from '/@/api/device-maintenance/work';
  const ACard = Card,
    ASteps = Steps,
    AStep = Steps.Step;
  const route = useRoute();
  const id = route.query?.id as string;
  // const type = route.query?.type as string;
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
  });
  //流转记录
  const listData = ref<Array<any>>([]);
  id &&
    getTransferListApi({ id, type: props.type }).then((res) => {
      listData.value = res;
      // console.log('流转记录',res)
    });
</script>

<style lang="less" scoped></style>
