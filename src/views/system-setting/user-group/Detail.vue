<template>
  <PageWrapper contentBackground>
    <Description :titleList="titleList" />
    <div class="m-4">
      <a-tabs class="bg-white">
        <a-tab-pane key="device" tab="权限管理" force-render>
          <a-button type="primary" class="my-4" @click="editClick">编辑</a-button>
          <Descriptions
            size="default"
            :column="1"
            :bordered="true"
            :label-style="{ width: '150px' }"
          >
            <!-- <DescriptionsItem label="管理范围"> {{ dataScope }} </DescriptionsItem> -->
            <DescriptionsItem label="功能权限">
              <BasicTree :treeData="treeData" v-model:checkedKeys="menuIds" checkable disabled />
            </DescriptionsItem>
          </Descriptions>
        </a-tab-pane>
        <a-tab-pane key="equipment" tab="用户管理" force-render><User /></a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { Descriptions } from 'ant-design-vue';
  import { BasicTree } from '/@/components/Tree';
  import User from './User.vue';
  import { PageWrapper } from '/@/components/Page';
  import Description from './Descriptions.vue';
  import { getUserGroupDetailApi } from '/@/api/systemSetting/userGroupManagement';
  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const DescriptionsItem = Descriptions.Item;
  const router = useRouter();

  const route = useRoute();
  const id = route.query.id as any;
  console.log('id: ', id);
  // const mockData = ref({});
  interface CardListType {
    text: string;
    title: string;
  }
  const titleList = ref<CardListType[]>([]);

  const treeData = ref([]);
  const menuIds = ref([]);
  const dataScope = ref();
  getUserGroupDetailApi(id).then((res) => {
    treeData.value = res.trees;
    menuIds.value = res.baseCodeList;
    dataScope.value = res.dataScopeName;
    console.log(treeData.value);

    const a = {
      title: '用户组名称',
      text: res.name,
    };
    const b = {
      title: '用户数量',
      text: res.peopleNum,
    };
    const c = {
      title: '备注',
      text: res.remark,
    };

    const d = {
      title: '创建时间',
      text: res.createTime,
    };

    //userGroup
    titleList.value.push(a, b, c, d);
  });
  function editClick() {
    router.push({
      name: 'UserGroupEdit',
      query: {
        id: id,
      },
    });
  }
</script>
