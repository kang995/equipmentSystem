<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <Descriptions size="default" :column="1" :bordered="true" :label-style="{ width: '150px' }">
      <DescriptionsItem label="管理范围">
        <RadioGroup v-model:value="checkBoxValue" :options="options" @change="checkChange" />
      </DescriptionsItem>
      <DescriptionsItem label="特定部门">
        <TreeSelect
          v-model:value="selectValue"
          show-search
          class="w-full"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择特定部门"
          allow-clear
          multiple
          :disabled="deptSelect"
          :tree-data="deptData"
          :fieldNames="{
            value: 'id',
          }"
        />
      </DescriptionsItem>
      <DescriptionsItem label="功能权限">
        <BasicTree ref="treeRef" :treeData="treeData" checkable @check="onCheck" />
      </DescriptionsItem>
      <!-- <DescriptionsItem label="手机端权限">
        <BasicTree ref="appTreeRef" :treeData="appTreeData" checkable @check="onAppCheck" />
      </DescriptionsItem> -->
    </Descriptions>
    <div class="flex space-x-4 mt-4">
      <a-button type="primary" @click="saveClick" :loading="saveClickLoading">保存</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref, nextTick, unref } from 'vue';
  import { Descriptions, Radio, TreeSelect } from 'ant-design-vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { addRoleMenuDetail, getRoleTreeDetail } from '/@/api/sys/systemSetting/roleManagement';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';
  import { getDeptTreeApi } from '/@/api/sys/systemSetting/roleManagement';

  const DescriptionsItem = Descriptions.Item;
  const route = useRoute();
  const userId = route.query.id as string;
  const saveClickLoading = ref(false);
  const { createMessage } = useMessage();
  const checkBoxValue = ref('1');
  const options = ref([]);
  const mobileOptions = ref([]);
  const treeData = ref([]);
  // const appTreeData = ref([]);

  const deptData = ref([]);
  const selectValue = ref([]);
  const deptSelect = ref(true);
  const RadioGroup = Radio.Group;
  const treeRef = ref<Nullable<TreeActionType>>(null);
  // const appTreeRef = ref<Nullable<TreeActionType>>(null);

  //循环遍历出子id
  const childrenData = ref<string[]>([]);
  const parentKey = ref<string[]>([]);
  const parentIdData = ref<string[]>([]);
  const handleCheck = ref(false);

  // const childrenAppData = ref<string[]>([]);
  // const appParentKey = ref<string[]>([]);
  // const appParentIdData = ref<string[]>([]);
  // const appHandleCheck = ref(false);
  const workKey = ref(['1501430635188310017', '1501431105273319426', '1517117267017019393']);
  const { closeCurrent } = useTabs();

  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }

  // function getAppTree() {
  //   const tree = unref(appTreeRef);
  //   if (!tree) {
  //     throw new Error('tree is null!');
  //   }
  //   return tree;
  // }

  onMounted(() => {
    getRoleData();
    getDictionarySelect();
    getDeptTree();
    getMobileSelect();
  });

  // 回显
  async function getRoleData() {
    const { trees, baseCodeList, deptIds, dataScope } = await getRoleTreeDetail(userId);

    selectValue.value = deptIds === null ? [] : deptIds;
    checkBoxValue.value = dataScope;
    deptSelect.value = dataScope === '2' ? false : true;

    await getRole(trees, baseCodeList);
    // await getAppRole(appTrees, appBaseCodeList);
  }
  // 获得树
  async function getRole(trees, baseCodeList) {
    workDisabled(trees);
    treeData.value = trees;
    getChildren(trees);
    nextTick(() => {
      getTree().setCheckedKeys([
        ...getParentChildId(baseCodeList, childrenData.value, true),
        ...workKey.value,
      ]);
      parentIdData.value = getParentChildId(baseCodeList, childrenData.value, false);
    });
  }
  // 禁用工作台
  async function workDisabled(trees) {
    console.log('trees: ', trees);
    trees?.map((item: any) => {
      if (workKey.value.includes(item.key)) {
        item.disabled = true;
        workDisabled(item.children);
      }
    });
  }
  // // 获得app树
  // async function getAppRole(appTrees, appBaseCodeList) {
  //   appTreeData.value = appTrees;
  //   getAppChildren(appTrees);
  //   nextTick(() => {
  //     getAppTree().setCheckedKeys(getParentChildId(appBaseCodeList, childrenAppData.value, true));
  //     appParentIdData.value = getParentChildId(appBaseCodeList, childrenAppData.value, false);
  //   });
  // }
  // 加载管理范围
  async function getDictionarySelect() {
    const dataList = await getDictionarySelectType({ type: 'CONTROL_LIMIT' });
    options.value = dataList.map((item) => {
      return {
        label: item.itemName,
        value: item.itemValue,
      };
    });
  }
  // 加载手机端权限
  async function getMobileSelect() {
    const dataList = await getDictionarySelectType({ type: 'mobileJurisdiction' });
    mobileOptions.value = dataList.map((item) => {
      return {
        label: item.itemName,
        value: item.itemValue,
      };
    });
  }
  // 加载部门树
  async function getDeptTree() {
    deptData.value = await getDeptTreeApi();
  }
  // 点击子级获得父级key
  const onCheck = (_checkedKeys: any, { halfCheckedKeys }) => {
    handleCheck.value = true;
    parentKey.value = halfCheckedKeys;
  };
  // 点击子级获得父级key
  // const onAppCheck = (_checkedKeys: any, { halfCheckedKeys }) => {
  //   appHandleCheck.value = true;
  //   appParentKey.value = halfCheckedKeys;
  // };
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
  // 获得每个app树的下级key
  // function getAppChildren(data: any[]) {
  //   data.map((item: any) => {
  //     if (item.children && item.children.length > 0) {
  //       getAppChildren(item.children);
  //     } else {
  //       childrenAppData.value.push(item.key);
  //     }
  //   });
  // }
  // 获得父或子id
  function getParentChildId(treeData: string[], childrenData: string[], parenChild: boolean) {
    if (parenChild) {
      return [...new Set(childrenData)].filter((item: string) => new Set(treeData).has(item));
    } else {
      return [...new Set(treeData)].filter((item: string) => !new Set(childrenData).has(item));
    }
  }

  // 保存
  function saveClick() {
    saveClickLoading.value = true;
    addRoleMenu(getTree().getCheckedKeys());
  }
  // 新增
  function addRoleMenu(checkedKey) {
    let menuIds = Array<string>();
    if (checkedKey.length > 0) {
      if (handleCheck.value) {
        menuIds = [...new Set([...checkedKey, ...parentKey.value])];
      } else {
        menuIds = [...new Set([...checkedKey, ...parentIdData.value])];
      }
    }

    // if (appCheckedKey.length > 0) {
    //   if (appHandleCheck.value) {
    //     menuIds.push(...new Set([...appCheckedKey, ...appParentKey.value]));
    //   } else {
    //     menuIds.push(...new Set([...appCheckedKey, ...appParentIdData.value]));
    //   }
    // }

    const params = {
      roleId: userId,
      menuIds,
      dataScope: checkBoxValue.value,
      deptIds: selectValue.value,
    };
    addRoleMenuDetail(params)
      .then(() => {
        createMessage.success('保存成功');
        router.push({ name: 'RoleManagement' });
      })
      .finally(() => {
        saveClickLoading.value = false;
      });
  }
  // 切换管辖范围
  function checkChange() {
    if (checkBoxValue.value !== '2') {
      selectValue.value = [];
      deptSelect.value = true;
    } else {
      deptSelect.value = false;
    }
  }
  // 取消
  function handleCancel() {
    router.push({ name: 'RoleManagement' });
    closeCurrent();
  }
</script>
