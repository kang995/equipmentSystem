<template>
  <a-card title="流转记录" :bordered="false">
    <a-steps :current="1" progress-dot direction="vertical" size="default">
      <template v-for="item in listData" :key="item.type">
        <a-step :title="item.time">
          <template #description>
            <div>
              <span class="mr-4">{{ item.name }}</span>
              <span>{{ item.content }}</span>
            </div>
            <div v-if="item.type === '3'">延期原因：{{ item.reason }}</div>
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

  const ACard = Card,
    ASteps = Steps,
    AStep = Steps.Step;

  const listData = ref<Array<any>>([
    { type: '1', time: '2022-01-07 12:00:00', name: '李四', content: '验收通过' },
    { type: '2', time: '2022-01-07 12:00:00', name: '钱七', content: '重新提交验收' },
    {
      type: '3',
      time: '2022-01-07 12:00:00',
      name: '张三',
      content: '延期',
      reason: '工单时间过紧',
    },
  ]);
</script>

<style lang="less" scoped></style>
