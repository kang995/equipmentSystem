<template>
  <div :class="`${prefixCls} m-5`">
    <a-row :gutter="16">
      <a-col :span="12">
        <div class="flex flex-col justify-center items-center">
          <div class="text-xl !font-normal text-[#414960] mb-4">1. 先下载Excel模版</div>
          <div
            class="h-183px p-4 text-center bg-[#fafafa] border-1 border-dashed border-[#d9d9d9] rounded-md cursor-pointer"
          >
            <p class="mb-4">
              <SvgIcon name="yewu_qiye" size="43" />
            </p>
            <a-button
              @click="getClick"
              class="mb-4"
              type="primary"
              :loading="loading"
              ghost
              v-if="
                hasPermission([
                  'device:inReceipt:downloadTemplate',
                  'device:outReceipt:downloadTemplate',
                  'device:sparePart:downloadTemplate',
                ])
              "
            >
              下载Excel模版
            </a-button>
            <p class="text-xs !font-normal text-[#9fa3b0]">
              说明：当出现和已有数据不一致时自动覆盖原有数据
            </p>
          </div>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="flex flex-col justify-center items-center">
          <div class="text-xl !font-normal text-[#414960] mb-4">2. 上传填好的文件</div>
          <a-upload-dragger
            :fileList="fileListUpload"
            name="file"
            accept=".xlsx, .xls"
            :multiple="false"
            :beforeUpload="beforeUpload"
          >
            <p class="mb-1">
              <SvgIcon name="gonggong_shangchuan" size="32" />
            </p>
            <p class="text-base !font-normal text-[#61687c]">
              将文件拖到此处，或<span class="text-[#4d79ff]">点击上传</span>
            </p>
            <p class="text-xs !font-normal text-[#9fa3b0]"> 支持扩展名：xlsx、xls </p>
          </a-upload-dragger>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { Upload, Row, Col } from 'ant-design-vue';
  import { ref } from 'vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { downloadByData } from '/@/utils/file/download';
  import { isFunction } from '/@/utils/is';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createMessage } = useMessage();

  const { prefixCls } = useDesign('import-wrapper');
  const ARow = Row;
  const ACol = Col;
  const AUploadDragger = Upload.Dragger;
  const fileListUpload = ref<any>([]);
  const loading = ref<boolean>(false);
  const props = defineProps({
    downloadUrlApi: {
      type: Function,
    },
  });
  function getClick() {
    loading.value = true;
    const { downloadUrlApi } = props;
    if (downloadUrlApi && isFunction(downloadUrlApi)) {
      downloadUrlApi()
        .then((res) => {
          downloadByData(res, '批量导入模板.xlsx');
          loading.value = false;
        })
        .finally(() => {
          loading.value = false;
        });
    }
  }
  // 文件回传
  const emit = defineEmits(['handleFormData']);
  function beforeUpload(file, fileList) {
    // console.log(file);
    if (!file.name.includes('.xlsx') && !file.name.includes('.xls')) {
      createMessage.error('上传文件格式不正确');
    } else {
      fileListUpload.value = fileList;
      emit('handleFormData', file);
      return false;
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-import-wrapper';
  .@{prefix-cls} {
    ::v-deep(.ant-upload-list-item-card-actions) {
      display: none;
    }

    ::v-deep(.ant-upload.ant-upload-drag) {
      height: 181px;
      width: 300px;
      padding-top: 25px;
    }
  }
</style>
