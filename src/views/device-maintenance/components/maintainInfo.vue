<template>
  <div class="px-15">
    <Description @register="register" />
    <div class="absolute bottom-0 left-0">
      <!-- 保养计划管理 -->
      <template v-if="mode === '1'">
        <a-button v-if="status !== '3'" class="m-4">取消</a-button>
        <a-button v-if="status === '1'" type="primary">提交</a-button>
        <a-button v-if="status === '2'" type="primary">撤回</a-button>
        <a-button v-if="status === '4'" type="primary">停止计划</a-button>
      </template>
      <!-- 保养计划审核 -->
      <template v-if="mode === '2'">
        <a-button class="m-4">拒绝</a-button>
        <a-button type="primary">同意</a-button>
      </template>
      <!-- 检修计划管理 -->
      <template v-if="mode === '3'">
        <a-button v-if="status !== '3'" class="m-4">取消</a-button>
        <a-button v-if="status === '1'" type="primary">提交</a-button>
        <a-button v-if="status === '2'" type="primary">撤回</a-button>
        <a-button v-if="status === '4'" type="primary">停止计划</a-button>
      </template>
      <!-- 检修计划审核 -->
      <template v-if="mode === '4'">
        <a-button class="m-4">拒绝</a-button>
        <a-button type="primary">同意</a-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { MaintainDetail } from './fileld';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const status = route.query?.status as string;
  const mode = route.query?.mode as string;
  // const props = defineProps({
  //   info: {
  //     type: Object as any,
  //     default: () => {},
  //   },
  // });
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: MaintainDetail(status, mode),
    bordered: false,
    column: 2,
    size: 'default',
  });
</script>

<style lang="less" scoped></style>
