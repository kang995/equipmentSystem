<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Descriptions size="default" :column="1" :bordered="true" :label-style="{ width: '150px' }">
      <!-- <DescriptionsItem label="管理范围"> -->
      <!-- <a-radio-group v-model:value="checkBoxValue" :options="options" @change="checkChange" /> -->
      <!-- </DescriptionsItem> -->
      <DescriptionsItem label="部门选择" v-if="checkBoxValue === '4'">
        <a-tree-select
          v-model:value="selectValue"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          :show-checked-strategy="TreeSelect.SHOW_ALL"
          allow-clear
          multiple
          tree-default-expand-all
          :tree-data="deptData"
          :filterTreeNode="onSearch"
          :fieldNames="{
            value: 'id',
          }"
        />
      </DescriptionsItem>
      <DescriptionsItem label="功能权限">
        <BasicTree
          :treeData="treeData"
          checkable
          defaultExpandAll
          v-model:checkedKeys="checkedKeys"
        />
      </DescriptionsItem>
    </Descriptions>
    <a-button type="primary" class="mt-16px mr-16px" @click="saveClick">保存</a-button>
    <a-button class="mt-16px mr-16px" @click="handleCancel">取消</a-button>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { Descriptions, TreeSelect } from 'ant-design-vue';
  import { BasicTree } from '/@/components/Tree';
  import { PageWrapper } from '/@/components/Page';
  import {
    addPermGroupApi,
    detailPermGroupApi,
    getUserGroupDetailApi,
  } from '/@/api/systemSetting/userGroupManagement';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import {
    addRoleMenuDetail,
    getRoleMenuDetail,
    getRoleTreeDetail,
    getDeptTreeApi,
  } from '/@/api/systemSetting/roleManagement';
  import { getDictionarySelectTypeApi } from '/@/api/device-maintenance';
  const ATreeSelect = TreeSelect;
  // const ARadioGroup = RadioGroup;
  const DescriptionsItem = Descriptions.Item;
  const route = useRoute();
  const options = ref<any['options']>([]);
  const checkBoxValue = ref('1');
  const checkedKeys = ref([]);
  const selectValue = ref([]);
  const { createMessage } = useMessage();
  const id = route.query.id as string;
  const deptData = ref<any>([]);
  // 部门选择
  getDeptTreeApi().then((res) => {
    deptData.value = res;
  });
  // selectTree 查询问题
  function onSearch(search, treeNode) {
    return treeNode.label.includes(search);
  }
  // 获取管理范围
  getDictionarySelectTypeApi({ type: 'CONTROL_LIMIT' }).then((res) => {
    res.map((item) => {
      options.value.push({
        label: item.itemName,
        value: item.itemValue,
      });
    });
  });
  const treeData = ref([]);
  if (route.query.name === 'userGroup') {
    // 获取功能权限树
    getUserGroupDetailApi(id).then((res) => {
      treeData.value = res.trees ? res.trees : [];
    });
  } else {
    getRoleTreeDetail(id).then((res) => {
      treeData.value = res.trees ? res.trees : [];
    });
  }

  //选中复选框方法
  // let halfCheckedKey = [] as string[];
  // const onCheck = (_checkedKeys: any, { halfCheckedKeys }) => {
  //   // console.log(halfCheckedKeys);
  //   halfCheckedKey = [...halfCheckedKeys];
  // };
  // 保存
  function saveClick() {
    const dataScope = Array.from(new Set([...checkedKeys.value]));
    if (route.query.name === 'userGroup') {
      addUserGroup(dataScope);
    } else {
      addRoleMenu(dataScope);
    }
  }
  function addUserGroup(dataScope) {
    const params = {
      id: route.query.id,
      menuIds: dataScope,
      baseCode: JSON.stringify(checkedKeys.value),
      dataScope: checkBoxValue.value,
      deptIds: selectValue.value,
    };
    addPermGroupApi(params)
      .then(() => {
        createMessage.success('修改成功');
        router.go(-1);
      })
      .finally(() => {});
  }
  function addRoleMenu(dataScope) {
    const params = {
      roleId: route.query.id,
      menuIds: dataScope,
      baseCode: JSON.stringify(checkedKeys.value),
      dataScope: checkBoxValue.value,
      deptIds: selectValue.value,
    };
    addRoleMenuDetail(params)
      .then(() => {
        createMessage.success('修改成功');
        router.go(-1);
      })
      .finally(() => {});
  }
  // 取消
  function handleCancel() {
    router.go(-1);
  }
  // 回显
  onMounted(() => {
    if (route.query.name === 'userGroup') {
      detailPermGroupApi(id).then((res) => {
        checkBoxValue.value = res.dataScope;
        selectValue.value = res.deptIds === null ? [] : res.deptIds;
        if (res.baseCode) checkedKeys.value = JSON.parse(res.baseCode);
      });
    } else {
      getRoleMenuDetail(id).then((res) => {
        checkBoxValue.value = res.dataScope;
        selectValue.value = res.deptIds === null ? [] : res.deptIds;
        checkedKeys.value = res.baseCodeList;
      });
    }
  });
  // function checkChange() {
  //   if (checkBoxValue.value !== '4') {
  //     selectValue.value = [];
  //   }
  // }
</script>
