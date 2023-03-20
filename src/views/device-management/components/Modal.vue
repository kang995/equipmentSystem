<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="预览模型"
    width="90%"
    :canFullscreen="false"
    :showCancelBtn="true"
    :showOkBtn="false"
    :centered="false"
    :closable="true"
    :maskClosable="false"
    :keyboard="false"
    :destroyOnClose="true"
    @cancel="handleClose"
  >
    <!-- <template #footer> </template>
    <div>预览模型</div> -->
    <ModelBind
      v-if="Object.keys(staticModelDatas).length"
      :loading="true"
      :staticModelData="staticModelDatas"
      :showOkButton="false"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ModelBind } from '/@/components/BindModel';
  const staticModelDatas = ref<any>({});

  const [registerModal] = useModalInner(async (res) => {
    console.log('useModalInner', res);
    const { modelLocationList, modelNameList } = res;
    staticModelDatas.value = {
      modelLocationList,
      modelNameList,
    };
  });
  function handleClose() {
    staticModelDatas.value = {};
  }
</script>
