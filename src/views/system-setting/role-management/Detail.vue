<template>
  <PageWrapper contentBackground contentFullHeight>
    <DetailDescriptions :titleList="titleList" />
    <div class="m-4">
      <a-tabs>
        <a-tab-pane key="device" tab="权限管理" force-render>
          <Descriptions
            size="default"
            :column="1"
            :bordered="true"
            :label-style="{ width: '150px' }"
          >
            <!-- <DescriptionsItem label="管理范围"> {{ dataScope }} </DescriptionsItem> -->
            <DescriptionsItem label="功能权限">
              <BasicTree :treeData="treeData" ref="treeRef" checkable disabled />
            </DescriptionsItem>
          </Descriptions>
        </a-tab-pane>
        <a-tab-pane key="equipment" tab="用户管理" force-render>
          <User :dataSource="userData" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { ref, reactive, onMounted, nextTick, unref } from 'vue';
  import { Tabs, Descriptions } from 'ant-design-vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import { PageWrapper } from '/@/components/Page';
  import DetailDescriptions from './DetailDescriptions.vue';
  import { detailRoleApi } from '/@/api/sys/systemSetting/roleManagement';
  import User from './User.vue';

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const DescriptionsItem = Descriptions.Item;
  const route = useRoute();
  const RoleId = route.query.id as string;
  const userData = ref([]);
  const dataScope = ref('');
  const appPermissions = ref('');
  const childrenData = ref<string[]>([]);
  const treeData = ref([]);
  const treeRef = ref<Nullable<TreeActionType>>(null);

  interface CardDataType {
    roleName: string;
    userList: string;
    remark: string;
    createTime: string;
  }
  const titleList = reactive<CardDataType>({
    roleName: '',
    userList: '',
    remark: '',
    createTime: '',
  });

  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }

  onMounted(() => {
    getDetailRole();
  });

  async function getDetailRole() {
    const {
      trees,
      baseCodeList,

      roleName,
      userList,
      remark,
      createTime,
      dataScopeValue,
      appPermissions_text,
    } = await detailRoleApi(RoleId);
    treeData.value = trees;
    getChildren(trees);
    userData.value = userList;
    dataScope.value = dataScopeValue;
    appPermissions.value = appPermissions_text;
    titleList.roleName = roleName;
    titleList.userList = userList.length;
    titleList.remark = remark;
    titleList.createTime = createTime;
    nextTick(() => {
      getTree().setCheckedKeys(getParentChildId(baseCodeList, childrenData.value));
    });
  }

  // 获得每个树的下级key
  function getChildren(data: any[]) {
    data.map((item: any) => {
      if (item.children && item.children.length > 0) {
        getChildren(item.children);
      } else {
        childrenData.value.push(item.key);
      }
    });
  }
  // 获得父或子id
  function getParentChildId(treeData: string[], childrenData: string[]) {
    return [...new Set(childrenData)].filter((item: string) => new Set(treeData).has(item));
  }
</script>
