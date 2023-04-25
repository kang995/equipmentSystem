<template>
  <PageWrapper contentBackground contentClass="p-4">
    <Descriptions size="default" :column="1" :bordered="true" :label-style="{ width: '150px' }">
      <DescriptionsItem label="管理范围">
        <a-radio-group v-model:value="checkBoxValue" :options="options" @change="checkChange" />
      </DescriptionsItem>
      <DescriptionsItem label="部门选择">
        <a-tree-select
          v-model:value="selectValue"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择部门"
          :show-checked-strategy="TreeSelect.SHOW_ALL"
          allow-clear
          multiple
          :disabled="deptSelect"
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
          @check="onCheck"
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
  import { Descriptions, TreeSelect, RadioGroup } from 'ant-design-vue';
  import { BasicTree } from '/@/components/Tree';
  import { PageWrapper } from '/@/components/Page';
  import {
    addPermGroupApi,
    detailPermGroupApi,
    // getUserGroupDetailApi,
  } from '/@/api/systemSetting/userGroupManagement';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import {
    addRoleMenuDetail,
    getRoleMenuDetail,
    // getRoleTreeDetail,
    getDeptTreeApi,
  } from '/@/api/systemSetting/roleManagement';
  import { getDictionarySelectTypeApi } from '/@/api/device-maintenance';
  const ATreeSelect = TreeSelect;
  const ARadioGroup = RadioGroup;
  const DescriptionsItem = Descriptions.Item;
  const route = useRoute();
  const options = ref<any['options']>([]);
  const checkBoxValue = ref('1');
  const deptSelect = ref(true);
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
  // if (route.query.name === 'userGroup') {
  //   // 获取功能权限树
  //   getUserGroupDetailApi(id).then((res) => {
  //     treeData.value = res.trees ? res.trees : [];
  //   });
  // } else {
  //   getRoleTreeDetail(id).then((res) => {
  //     treeData.value = res.trees ? res.trees : [];
  //   });
  // }

  //选中复选框方法
  let halfCheckedKey = [] as string[];
  const onCheck = (_checkedKeys: any, { halfCheckedKeys }) => {
    // console.log(halfCheckedKeys);
    halfCheckedKey = [...halfCheckedKeys];
  };
  // 保存
  function saveClick() {
    const dataScope = Array.from(new Set([...checkedKeys.value, ...halfCheckedKey]));
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
    getDetail();
  });
  function getDetail() {
    if (route.query.name === 'userGroup') {
      detailPermGroupApi(id).then((res) => {
        treeData.value = res.trees ? res.trees : []; // 获取功能权限树
        checkBoxValue.value = res.dataScope;
        selectValue.value = res.deptIds === null ? [] : res.deptIds;
        deptSelect.value = res.dataScope === '2' ? false : true;
        if (res.baseCode) checkedKeys.value = JSON.parse(res.baseCode);
      });
    } else {
      getRoleMenuDetail(id).then((res) => {
        treeData.value = res.trees ? res.trees : []; // 获取功能权限树
        checkBoxValue.value = res.dataScope;
        deptSelect.value = res.dataScope === '2' ? false : true;
        selectValue.value = res.deptIds === null ? [] : res.deptIds;
        const keys = getkey(res.trees);
        const baseCodeList = delParent(keys, res.baseCodeList);
        checkedKeys.value = baseCodeList;
      });
    }
  }
  //获取父级id
  function getkey(trees) {
    const keys = [] as any;
    trees.forEach((v) => {
      if (v.children) {
        keys.push(v.key);
        const chilKey = getkey(v.children);
        if (chilKey) keys.push(...chilKey);
      }
    });
    return keys;
  }
  //删除父级id
  function delParent(keys, res) {
    keys.forEach((k) => {
      res.forEach((v, index) => {
        if (v === k) {
          res.splice(index, 1);
        }
      });
    });
    return res;
  }
  function checkChange() {
    if (checkBoxValue.value !== '2') {
      selectValue.value = [];
      deptSelect.value = true;
    } else {
      deptSelect.value = false;
    }
  }
</script>
