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
    title="选择用户组"
    :canFullscreen="false"
    :showCancelBtn="true"
    :showOkBtn="true"
    :centered="false"
    :closable="true"
    :header="null"
    :maskClosable="false"
    :keyboard="false"
    @register="registerModal"
    @ok="handleOk"
  >
    <Transfer
      v-if="isNotShow"
      v-model:target-keys="handleOkData.targetKeys"
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
  import { getModalListApi } from '/@/api/systemSetting/userManagement';

  interface MockData {
    key: string;
    title: string;
  }

  interface handleOkDataType {
    id: string[];
    targetKeys: string[];
  }

  const isNotShow = ref<Boolean>(false);
  const mockData = ref<MockData[]>([]);
  const handleOkData = reactive<handleOkDataType>({
    id: [],
    targetKeys: [],
  });
  const emit = defineEmits(['handleOk', 'register']);

  const [registerModal, { closeModal }] = useModalInner((data) => {
    const { id } = data;
    handleOkData.id = id;
    getModalListApi(id).then((res) => {
      const { checkIds, userGroupList } = res;
      if (userGroupList.length > 0) {
        mockData.value = userGroupList.map((item) => {
          return {
            key: item.id,
            title: item.name,
          };
        });
      }

      isNotShow.value = true;
      if (id.length == 1) {
        handleOkData.targetKeys = checkIds;
      }
    });
  });

  //确认
  function handleOk() {
    emit('handleOk', handleOkData);
    closeModal();
  }
</script>
