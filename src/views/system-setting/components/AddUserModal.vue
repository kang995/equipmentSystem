<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :canFullscreen="false"
    :maskClosable="false"
    title="选择用户"
    width="700px"
    @ok="handleOk"
  >
    <a-transfer
      v-if="isNotShow"
      v-model:target-keys="targetKeys"
      :data-source="mockData"
      :list-style="{
        width: '100%',
        height: '400px',
      }"
      show-search
      :render="(item) => item.title"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Transfer } from 'ant-design-vue';
  import { getSelectUserListApi, getRoleUserApi } from '/@/api/systemSetting/roleManagement';
  import { getUserGroupTree } from '/@/api/systemSetting/userGroupManagement';
  const ATransfer = Transfer;
  interface LabelItem {
    children: string;
  }
  interface Item {
    value: string;
    label: LabelItem;
    key: string;
  }
  interface MockData {
    key: string;
    title: string;
  }
  const id = ref('');
  const selectValue = ref<Item[]>([]);
  const isNotShow = ref<Boolean>(false);
  const mockData = ref<MockData[]>([]);
  const targetKeys = ref<string[]>([]);
  const [register, { closeModal }] = useModalInner(async (data) => {
    id.value = data.id;
    const keys = [];
    getSelectUserListApi().then((res) => {
      const list = [] as any;
      res.map((item) => {
        list.push({
          key: item.id,
          title: item.name,
        });
      });
      mockData.value = list;
    });
    targetKeys.value = keys;
    selectValue.value = [];
    // 回显
    if (data.type === 'userGroup') {
      getUserGroupTree(data.id).then((res) => {
        targetKeys.value = res;
        console.log('回显回显回显回显', targetKeys.value);
        isNotShow.value = true;
      });
    } else {
      getRoleUserApi(data.id).then((res) => {
        targetKeys.value = res;
        console.log('回显回显回显回显9', targetKeys.value);
        console.log(targetKeys.value);
        isNotShow.value = true;
      });
    }
  });
  // 确认
  const emit = defineEmits(['handleOk', 'register']);
  function handleOk() {
    const data = { id: id.value, targetKeys: targetKeys.value };
    emit('handleOk', data);
    closeModal();
  }
</script>
