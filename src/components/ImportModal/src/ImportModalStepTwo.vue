<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerImport"
      :canFullscreen="false"
      :useWrapper="false"
      title="批量导入"
      width="680px"
      @ok="handleOk"
      okText="继续导入"
      :bodyStyle="{ height: '235px' }"
      destroyOnClose
    >
      <div>
        <div class="my-1 text-base !font-semibold">
          导入文件：
          <span class="text-[#4d79ff]">{{ name }}</span>
        </div>
        <a-divider />
        <div style="text-align: center">
          <SvgIcon name="gonggong_chenggong_mianxing" color="#5ACC9B" />
          <span class="text-base !font-semibold text-[#414960] ml-2">导入成功</span>
        </div>
        <div class="text-center mt-4">{{ message }}</div>
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Divider } from 'ant-design-vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { ref } from 'vue';
  const emit = defineEmits(['handleImport', 'register']);
  const ADivider = Divider;
  const name = ref<any>('');
  const message = ref<any>('');
  const [registerImport, { closeModal }] = useModalInner((data) => {
    name.value = data.fileName;
    message.value = data.messageSuccess;
  });
  // 确认
  function handleOk() {
    emit('handleImport');
    closeModal();
  }
</script>
