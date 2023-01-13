<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerImport"
      :canFullscreen="false"
      :useWrapper="false"
      destroyOnClose
      title="批量导入"
      width="45%"
      @ok="handleOk"
      @visible-change="closeFunc"
    >
      <ImportModalContent @handle-form-data="handleFormData" :downloadUrlApi="downloadUrl" />
      <!-- <slot name="pop"></slot> -->
    </BasicModal>
    <ImportModalStepTwo @register="registerModal" @handle-import="handleImport" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import ImportModalContent from '/@/components/ImportModal/src/ImportModalContent.vue';
  import ImportModalStepTwo from './ImportModalStepTwo.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  const paramsId = ref();
  const [registerModal, { openModal: openModalTwo }] = useModal();
  const emit = defineEmits(['handleOk', 'handleErr', 'register', 'handleImport']);
  const affixes = ref<any>();
  const fileName = ref<string>('');
  const { createMessage } = useMessage();
  const downloadUrl = ref<Function>();
  let uploadUrl: Function;
  const updateSupportVal = ref();
  const [registerImport, { closeModal, changeOkLoading }] = useModalInner((data) => {
    const { uploadUrlApi, downloadUrlApi, id, updateSupport } = data;
    uploadUrl = uploadUrlApi;
    downloadUrl.value = downloadUrlApi;
    if (id) {
      paramsId.value = id;
    }
    if (updateSupport) {
      updateSupportVal.value = updateSupport;
    }
  });
  // 上传文件
  function handleOk() {
    changeOkLoading(true);
    if (affixes.value) {
      // 转换成formData格式的数据流
      const formData = new FormData();
      formData.append('file', affixes.value);
      if (updateSupportVal.value) {
        formData.append('updateSupport', updateSupportVal.value);
      }
      //上传
      uploadUrl(formData, paramsId.value)
        .then((res) => {
          console.log(res, 'res');
          emit('handleOk', res);
          // 关闭当前弹窗
          closeModal();
          // 打开第二步骤弹框
          if (res) {
            openModalTwo(true, { fileName: fileName.value, messageSuccess: res.result });
          }
        })
        .catch((err) => {
          if (err.includes('<br/>')) {
            emit('handleErr', err);
          }
        })
        .finally(() => {
          changeOkLoading(false);
        });
    } else {
      createMessage.error('请上传文件');
      changeOkLoading(false);
    }
  }
  // 获取上传文件
  function handleFormData(file) {
    affixes.value = file;
    fileName.value = file.name;
  }
  // 继续导入
  function handleImport() {
    emit('handleImport');
  }
  function closeFunc() {
    affixes.value = null;
    return true;
  }
</script>
