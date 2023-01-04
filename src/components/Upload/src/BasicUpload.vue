<template>
  <div>
    <!-- 图片上视频格式展示方式 -->
    {{ fileLists }}
    <div v-if="type === 'picture-card'">
      <div class="flex justify-start items-center flex-wrap">
        <div class="file-list flex justify-start items-center flex-wrap" style="margin-top: -14px">
          <div
            class="item border border-inherit border-dashed mr-2 object-cover relative rounded-md overflow-hidden my-7px"
            v-for="item in fileLists"
            :key="item.url"
          >
            <close-circle-outlined
              class="absolute top-0 right-0 z-10"
              @click="() => delFile(item.url)"
              style="color: #f55; font-size: 16px"
              v-if="!disabled"
            />
            <video
              :src="item.url"
              v-if="viedoType.includes(item?.type || '')"
              style="width: 204px"
              :controls="true"
            ></video>
            <Image
              v-else
              :src="item.url"
              alt="avatar"
              :width="104"
              :height="104"
              class="object-cover"
            />
          </div>
        </div>
        <div>
          <Upload
            name="file"
            :before-upload="beforeUpload"
            @change="handleChange"
            :headers="headersObj"
            list-type="picture-card"
            :action="uploadUrl"
            :accept="accept"
            :disabled="disabled"
            :show-upload-list="false"
            v-if="fileLists.length < maxNumber"
          >
            <div>
              <PlusOutlined />
              <div class="ant-upload-text cursor-pointer">{{ helpText }}</div>
            </div>
          </Upload>
        </div>
      </div>

      <p class="ant-upload-text text-[#] text-12px">
        {{
          `不超过${props.maxSize}M,支持${
            props.accept === 'image/*' ? 'jpg, jpeg, png' : props.accept
          }格式`
        }}
      </p>
    </div>
    <!-- 文件格式展示方式 -->
    <div v-else>
      <a-upload-dragger
        name="file"
        :multiple="true"
        :action="uploadUrl"
        @change="handleChange"
        :headers="headersObj"
        :before-upload="beforeUpload"
        :disabled="disabled"
        :accept="accept"
        :show-upload-list="false"
        v-if="fileLists.length < maxNumber"
      >
        <p class="ant-upload-drag-icon">
          <SvgIcon name="gonggong_shangchuan" size="32" />
        </p>
        <p class="ant-upload-text">
          将文件拖到此处，或<span style="color: #4d79ff">点击上传</span>
        </p>
        <div class="ant-upload-hint">
          {{
            helpText.includes('视频')
              ? '支持扩展名：mp4、ogg等视频格式'
              : `支持扩展名：${
                  accept
                    ? accept
                    : 'doc(.docx)、.ppt(.pptx)、.xls(.xlsx)、.pdf、pot、.pps、.vsd、.wps、.et、.dps、.txt'
                }`
          }}

          <div
            >{{ props.maxSize ? `不超过${props.maxSize}M，` : '' }}允许最多上传{{ maxNumber
            }}{{ accept.includes('mp4') ? '段' : '张' }}</div
          >
        </div>
      </a-upload-dragger>
      <Progress :percent="defaultPercent" v-if="isShow" />
      <div class="file-list flex justify-between items-center flex-wrap mt-10px">
        <div
          class="item w-full flex justify-between items-center flex-wrap border-dashed mr-2 object-cover relative rounded-md overflow-hidden px-2 py-2"
          v-for="item in fileLists"
          :key="item.url"
        >
          <div class="pr-5"> {{ item.name }} </div>
          <div class="div">
            <eye-outlined
              @click="() => handlePreview(item, '1')"
              class="cursor-pointer"
              style="color: #f55; font-size: 16px"
            />
            <cloud-download-outlined
              @click="() => handlePreview(item, '2')"
              class="pl-2 cursor-pointer"
              style="color: #f55; font-size: 16px"
            />
            <close-circle-outlined
              class="pl-2"
              @click="() => delFile(item.url)"
              style="color: #f55; font-size: 16px"
              v-if="!disabled"
            />
          </div>
        </div>
      </div>
      <!--      <div class="file-list">-->
      <!--        <div-->
      <!--          class="item flex justify-between items-start border border-inherit border-dashed py-2 mb-2 px-2 object-cover rounded-md overflow-hidden"-->
      <!--          v-for="item in fileLists"-->
      <!--          :key="item.url"-->
      <!--        >-->
      <!--          <div class="title">{{ item.name }}</div>-->
      <!--          <close-circle-outlined-->
      <!--            @click="() => delFile(item.url)"-->
      <!--            v-if="!disabled"-->
      <!--            style="color: #f55; font-size: 16px"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <Upload-->
      <!--        name="file"-->
      <!--        :before-upload="beforeUpload"-->
      <!--        @change="handleChange"-->
      <!--        list-type="text"-->
      <!--        :action="uploadUrl"-->
      <!--        :accept="accept"-->
      <!--        :show-upload-list="false"-->
      <!--        :disabled="disabled"-->
      <!--        v-if="fileLists.length < maxNumber"-->
      <!--      >-->
      <!--        <Button>-->
      <!--          <template #icon><upload-outlined /></template>-->
      <!--          {{ helpText }}-->
      <!--        </Button>-->
      <!--      </Upload>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { SvgIcon } from '/@/components/Icon';
  import { Upload, UploadProps, Image, Progress } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CloseCircleOutlined, EyeOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
  import { isArray } from '/@/utils/is';
  import { downloadByOssUrl } from '/@/utils/file/download';
  import { getToken } from '/@/utils/auth';
  import { HttpRequestHeader } from 'ant-design-vue/lib/upload/interface';

  const AUploadDragger = Upload.Dragger;
  const viedoType = ref(['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/rmvb']);
  const { createMessage } = useMessage();
  // interface FileListProps {
  //   name: string;
  //   url: string;
  //   type?: string;
  //   uid?: string;
  // }
  // const accessoryName = ref('');
  const props = defineProps({
    // 上传图片还是文件
    type: {
      default: 'picture-card',
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
      default: '上传文件',
    },
    value: {
      type: Array || String,
      default: () => [] || '',
    },
    // 文件限制
    accept: {
      type: String,
      default: '.pdf,.doc,.docx,application/msword,image/*',
    },
    // 图片数量
    maxNumber: {
      type: Number,
      default: 100,
    },
    // 图片大小
    maxSize: {
      type: Number,
      default: 5,
    },
    // 文件数量
    // maxFileNumber: {
    //   type: Number,
    //   default: 10,
    // },
    // 文件大小
    maxFileSize: {
      type: Number,
      default: 50,
    },
  });
  const token = getToken() as string;
  const headersObj = ref<HttpRequestHeader>({ Authorization: token });

  const { uploadUrl } = useGlobSetting();
  const emit = defineEmits(['change', 'update:value']);
  // const imageUrl = ref('');
  const fileLists = ref<any[]>([]);
  const defaultPercent = ref<number>(0);
  let timer: any = null;
  const statusInfo = ref<String>();
  const isShow = ref<Boolean>(false);
  watch(
    () => props.value,
    (value = []) => {
      // console.log(value, 'watch');
      // clearInterval(timer);
      // timer = null;
      // defaultPercent.value = 0;
      fileLists.value = isArray(value) ? value : [];
    },
    { immediate: true },
  );
  watch(
    () => statusInfo.value,
    (value) => {
      if (value === 'uploading') {
        isShow.value = true;
        timer = setInterval(() => {
          if (defaultPercent.value < 99) {
            increase();
          }
        }, 200);
      } else {
        defaultPercent.value = 100;
        clearInterval(timer);
        timer = null;
        isShow.value = false;
        defaultPercent.value = 0;
      }
    },
    { immediate: true },
  );

  function handleChange(info: Recordable) {
    // console.log(info, '54564564564654654564');
    const file = info.file;
    const status = file?.status;
    statusInfo.value = status;
    // console.log(status, !status, 'status');
    if (!status || (status === 'uploading' && status !== 'done')) {
      return true;
    }

    if (status === 'done') {
      // console.log(status, !status, 'done');
      let files = {
        name: file.name,
        type: file.type,
        url: file.response.data.url,
      };
      let data = [...fileLists.value, files];
      let obj = {};
      fileLists.value = data.reduce((cur, next) => {
        obj[next.url] ? '' : (obj[next.url] = true && cur.push(next));
        return cur;
      }, []);

      emit('change', fileLists.value);
      emit('update:value', fileLists.value);
    }
    if (status === 'error') {
      defaultPercent.value = 100;
      clearInterval(timer);
      timer = null;
      isShow.value = false;
      // console.log('上传失败');
    }
    // 删除 重置校验
    if (status == 'removed') {
      // console.log(fileLists.value);
      const data = fileLists.value;
      emit('change', data);
      emit('update:value', data);
    }
  }
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    let typeList: Array<string> = props.accept.replaceAll('.', '').split(',');
    // console.log(props.accept);
    if (props.accept.includes('jpg')) {
      typeList.push('JPG');
    }
    if (props.accept.includes('jpeg')) {
      typeList.push('PNG');
    }
    if (props.accept.includes('jpg')) {
      typeList.push('JPEG');
    }
    if (props.accept === 'image/*') {
      typeList.push(...['jpg', 'jpeg', 'png', 'GIF', 'JPG', 'PNG']);
    }
    const fileType: string = file.name.split('.').pop() as string;
    const fileSize: number = file.size / 1024 / 1024;
    const isLt50M = file.size / 1024 / 1024 < props.maxFileSize;
    if (typeList.includes(fileType)) {
      if (fileSize < props.maxSize) {
        return true;
      } else if (!isLt50M) {
        createMessage.error(`文件不可超过${props.maxFileSize}M`);
        return Upload.LIST_IGNORE;
      } else {
        createMessage.error(`图片大小超过${props.maxSize}M`);
        return false;
      }
    } else {
      createMessage.error(`${fileType}格式不允许上传`);
      return false;
    }
  };
  function delFile(url) {
    // console.log(url, fileLists.value);
    let index = fileLists.value.findIndex((item) => item.url === url);
    // console.log(index);
    if (index > -1) {
      fileLists.value.splice(index, 1);
      // console.log(url, fileLists.value);
      emit('change', fileLists.value);
      emit('update:value', fileLists.value);
    }
  }
  function handlePreview(record, type) {
    // console.log(record);
    // console.log(/\.(jpg|jpeg|png|GIF|JPG|PNG|pdf)$/.test(record.url));
    if (type === '1') {
      if (/\.(jpg|jpeg|png|GIF|JPG|PNG|pdf|mp4)$/.test(record.url)) {
        console.log(record.url);
        window.open(record.url);
      }
    } else {
      downloadByOssUrl({ url: record.url, fileName: record.name || 'download' });
    }
  }

  const increase = () => {
    const percent = (defaultPercent.value + parseFloat(Math.random().toFixed(2))) as number;
    const num = Number(percent.toFixed(2));
    defaultPercent.value = percent > 100 ? 100 : num;
  };
</script>
<style lang="less">
  .file-list {
    .ant-image-img {
      height: 100% !important;
    }
  }

  // .ant-upload.ant-upload-select-picture-card {
  //   width: 90px;
  //   height: 90px;
  // }
</style>
