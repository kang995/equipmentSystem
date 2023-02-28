<template>
  <div :class="`${prefixCls}`" class="PageWrapper m-4">
    <DetailDescriptions :titleList="titleList" />
    <div class="m-4">
      <Descriptions size="default" :column="1" :bordered="true" :label-style="{ width: '150px' }">
        <!-- <DescriptionsItem label="管理范围"> {{ dataScopeName }} </DescriptionsItem> -->
        <DescriptionsItem label="功能权限">
          <BasicTree :treeData="treeData" ref="treeRef" checkable disabled />
        </DescriptionsItem>
      </Descriptions>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getDetailsListApi } from '/@/api/systemSetting/userManagement';
  import { useRoute } from 'vue-router';
  import { ref, reactive, nextTick, unref, onMounted } from 'vue';
  import { Descriptions } from 'ant-design-vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import DetailDescriptions from './DetailDescriptions.vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  interface CardLisType {
    userName: string;
    nickName: string;
    department: string;
    userGroup: string;
    createTime: string;
    status: string;
    statusName: string;
  }

  const { prefixCls } = useDesign('user-detail');
  const DescriptionsItem = Descriptions.Item;
  const route = useRoute();
  const userId = route.query.userId as string;
  const dataScopeName = ref('');
  const childrenData = ref<string[]>([]);

  const titleList = reactive<CardLisType>({
    userName: '',
    nickName: '',
    department: '',
    userGroup: '',
    createTime: '',
    status: '',
    statusName: '',
  });
  const treeRef = ref<Nullable<TreeActionType>>(null);
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }

  const treeData = ref([]);
  onMounted(() => {
    getDetailsList();
  });

  async function getDetailsList() {
    const {
      trees,
      baseCodeList,
      userName,
      nickName,
      department,
      userGroup,
      createTime,
      status,
      statusName,
      dataScope,
    } = await getDetailsListApi(userId);

    treeData.value = trees;
    getChildren(trees);
    dataScopeName.value = dataScope;
    titleList.userName = userName;
    titleList.nickName = nickName;
    titleList.department = department;
    titleList.userGroup = userGroup;
    titleList.createTime = createTime;
    titleList.status = status;
    titleList.statusName = statusName;
    nextTick(() => {
      getTree().setCheckedKeys(getParentChildId(baseCodeList, childrenData.value));
      getTree().expandAll(true);
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
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-user-detail';
  .@{prefix-cls} {
    background: @component-background;
  }

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background: #151515 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;

      ::v-deep(.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after) {
        background-color: #4d79ff;
      }

      ::v-deep(.ant-tree-checkbox-disabled.ant-tree-checkbox-checked
          .ant-tree-checkbox-inner::after) {
        background-color: #61687c;
        border-color: #4d79ff;
      }
    }
  }

  .PageWrapper {
    border-radius: 6px 6px 6px 6px;
    border: 1px solid @custom-gray4;
  }
</style>
