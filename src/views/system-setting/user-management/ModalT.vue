<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :canFullscreen="false"
    :maskClosable="false"
    title="选择用户组"
    width="900px"
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
  import { getModalListApi } from '/@/api/systemSetting/userManagement';
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
    getModalListApi(data.id).then((res) => {
      const list = [] as any;
      res.userGroupList?.map((item) => {
        list.push({
          key: item.id,
          title: item.name,
        });
      });
      isNotShow.value = true;
      mockData.value = list;
      if (data.id.length == 1) {
        targetKeys.value = res.checkIds;
      }
      console.log(list);
    });
    targetKeys.value = keys;
    selectValue.value = [];
  });
  // 确认
  const emit = defineEmits(['handleOk', 'register']);
  function handleOk() {
    const data = { id: id.value, targetKeys: targetKeys.value };
    emit('handleOk', data);
    closeModal();
  }
</script>
