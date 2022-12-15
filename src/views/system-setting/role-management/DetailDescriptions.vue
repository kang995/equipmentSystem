<template>
  <div class="m-4">
    <a-descriptions :column="2">
      <template #title>
        <span>基本信息</span>
        <a-button type="link" @click="toEdit()" v-if="roleFlag === '1'">编辑</a-button>
      </template>
      <a-descriptions-item label="角色名称"> {{ titleList.roleName }} </a-descriptions-item>
      <a-descriptions-item label="用户数量"> {{ titleList.userList }} </a-descriptions-item>
      <a-descriptions-item label="备注"> {{ titleList.remark }} </a-descriptions-item>
      <a-descriptions-item label="创建时间"> {{ titleList.createTime }} </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions } from 'ant-design-vue';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const roleFlag = route.query.roleFlag as string;
  const ADescriptions = Descriptions;
  const ADescriptionsItem = Descriptions.Item;
  function toEdit() {
    router.push({
      name: 'roleManagementEdit',
      query: {
        id: route.query.id,
      },
    });
  }
  interface TitleParams {
    roleName: string;
    userList: string;
    remark: string;
    createTime: string;
  }
  defineProps<{
    titleList: TitleParams;
  }>();
</script>
