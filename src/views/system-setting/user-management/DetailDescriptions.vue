<template>
  <div class="p-4">
    <a-descriptions :column="2">
      <template #title>
        <span>基本信息</span>
      </template>
      <a-descriptions-item label="登入账号">{{ titleList.userName }}</a-descriptions-item>
      <a-descriptions-item label="姓名">{{ titleList.nickName }}</a-descriptions-item>
      <a-descriptions-item label="部门">{{ titleList.department }}</a-descriptions-item>
      <!-- <a-descriptions-item label="所属用户组">{{ titleList.userGroup }}</a-descriptions-item> -->
      <a-descriptions-item label="创建时间">{{ titleList.createTime }}</a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ titleList.statusName }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script lang="ts" setup>
  import { Descriptions } from 'ant-design-vue';
  const ADescriptions = Descriptions;
  const ADescriptionsItem = Descriptions.Item;
  interface TitleParams {
    userName: string;
    nickName: string;
    department: string;
    userGroup: string;
    createTime: string;
    statusName: string;
  }
  defineProps<{
    titleList: TitleParams;
  }>();
</script>
