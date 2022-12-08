<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :canFullscreen="false"
    title="预览模型"
    width="680px"
    :maskClosable="false"
  >
    <template #footer> </template>
    <div>预览模型</div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';

  const [registerModal] = useModalInner(async () => {});
</script>
