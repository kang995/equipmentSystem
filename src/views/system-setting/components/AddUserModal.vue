<template>
  <!-- 
     v-bind="$attrs":用于将弹窗组件的 attribute 传入 BasicModal 组件
     title:modal标题
     canFullscreen:是否全屏
     showCancelBtn:是否显示关闭按钮
     showOkBtn:是否显示确认按钮
     centered:是否居中
     closable:是否显示右上角的关闭按钮
     footer:是否显示页脚
     header:是否显示页眉
     maskClosable:点击蒙层是否关闭   
     keyboard:是否esc关闭
 -->
  <BasicModal
    v-bind="$attrs"
    width="50%"
    title="选择用户"
    :canFullscreen="false"
    :showCancelBtn="true"
    :showOkBtn="true"
    :centered="false"
    :closable="true"
    :header="null"
    :maskClosable="false"
    :keyboard="false"
    :destroyOnClose="true"
    @register="registerModal"
    @ok="handleOk"
  >
    <Transfer
      v-model:target-keys="handleOkData.targetKeys"
      :titles="['用户列表', '已选用户列表']"
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
  import { ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Transfer } from 'ant-design-vue';
  import { getSelectUserListApi, getRoleUserApi } from '/@/api/sys/systemSetting/roleManagement';

  interface MockData {
    key: string;
    title: string;
    disabled: boolean;
  }

  interface handleOkDataType {
    id: string;
    targetKeys: string[];
  }

  const mockData = ref<MockData[]>([]);
  const handleOkData = reactive<handleOkDataType>({
    id: '',
    targetKeys: [],
  });
  const emit = defineEmits(['handleOk', 'register']);

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    const { id } = data;
    handleOkData.id = id;
    await getSelectUserList();
    await getRoleUser(id);
  });

  async function getSelectUserList() {
    const selectUserData = await getSelectUserListApi();
    mockData.value = selectUserData.map((item) => {
      return {
        key: item.id,
        title: item.name,
        disabled: item.disabled,
      };
    });
  }

  async function getRoleUser(id) {
    const roleUserData = await getRoleUserApi(id);
    handleOkData.targetKeys = roleUserData;
  }

  //确认
  function handleOk() {
    emit('handleOk', handleOkData);
    closeModal();
  }
</script>
