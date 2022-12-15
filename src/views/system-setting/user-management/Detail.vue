<template>
  <PageWrapper contentBackground>
    <DetailDescriptions :titleList="titleList" />
    <div class="m-4">
      <Descriptions size="default" :column="1" :bordered="true" :label-style="{ width: '150px' }">
        <!-- <DescriptionsItem label="管理范围"> {{ dataScopeName }} </DescriptionsItem> -->
        <DescriptionsItem label="功能权限">
          <BasicTree :treeData="treeData" ref="treeRef" checkable disabled />
        </DescriptionsItem>
      </Descriptions>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { getDetailsListApi } from '/@/api/sys/systemSetting/userManagement';
  import { useRoute } from 'vue-router';
  import { ref, reactive, nextTick, unref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Descriptions } from 'ant-design-vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import DetailDescriptions from './DetailDescriptions.vue';

  interface CardLisType {
    userName: string;
    nickName: string;
    department: string;
    userGroup: string;
    createTime: string;
    status: string;
    statusName: string;
  }

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
