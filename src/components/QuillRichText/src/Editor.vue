<template>
  <div :class="prefixCls" :style="{ width: containerWidth }">
    <Upload
      name="file"
      @change="handleChange"
      :action="uploadUrl"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      <a-button ref="uploadBtn">图片上传</a-button>
    </Upload>
    <QuillEditor
      v-bind="$attrs"
      ref="compEdit"
      :style="{ height: compHeight }"
      :contentType="contentType"
      :content="value"
      @update:content="updateContent"
      @ready="onReady"
      :placeholder="placeholder"
      :readOnly="readOnly"
      :options="options"
    />
  </div>
</template>
<script lang="ts" setup>
  /**
   *   Quill api https://vueup.github.io/vue-quill/api/methods.html#sethtml-html
   */
  import { QuillEditor, Quill, Delta } from '@vueup/vue-quill';
  import { Upload } from 'ant-design-vue';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { computed, nextTick, reactive, ref, toRaw } from 'vue';
  import { isNumber } from '/@/utils/is';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = defineProps({
    height: {
      type: [Number, String] as PropType<string | number>,
      required: false,
      default: 200,
    },
    width: {
      type: [Number, String] as PropType<string | number>,
      required: false,
      default: 'auto',
    },
    contentType: {
      type: String as PropType<'delta' | 'html' | 'text'>,
      default: 'html',
      validator: (value: string) => {
        return ['delta', 'html', 'text'].includes(value);
      },
    },
    value: {
      type: [String, Object] as PropType<string | Delta>,
      default: null,
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请输入',
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  });

  const emit = defineEmits<{
    (e: 'update:value', value: string | Delta): void;
    (e: 'change', value: string | Delta): void;
  }>();

  const { prefixCls } = useDesign('quill-container');
  const { uploadUrl } = useGlobSetting();
  const compEdit = ref<any>(null);
  const uploadBtn = ref<any>(null);

  const containerWidth = computed(() => {
    const width = props.width;
    if (isNumber(width)) {
      return `${width}px`;
    }
    return width;
  });

  const compHeight = computed(() => {
    const height = props.height;
    if (isNumber(height)) {
      return `${height}px`;
    }
    return height;
  });

  function onReady(_quill: Quill) {
    console.log('props.value', props.value);
    // 在Form表单中使用时，回显formModel值
    nextTick(() => {
      if (props.contentType === 'html') {
        compEdit.value.setHTML(props.value);
      } else if (props.contentType === 'text') {
        compEdit.value.setText(props.value);
      } else {
        compEdit.value.setContents(props.value);
      }
    });
  }

  // Embedded in the form, just use the hook binding to perform form verification
  // const [state] = useRuleFormItem(props);

  function updateContent(content: string | Delta) {
    // console.log('emit update:value', content);
    emit('update:value', content);
    emit('change', content);
  }

  function handleChange(info: Recordable) {
    console.log('info', info);
    const file = info.file;
    const status = file?.status;
    if (status === 'done') {
      console.log('图片上传完成');
      const url = file?.response?.data;
      //获取实例
      const quill = toRaw(compEdit.value).getQuill();
      //获取光标
      const length = quill.selection.savedRange.index;
      //插入图片
      quill.insertEmbed(length, 'image', url);
      //调整光标到图片后边
      quill.setSelection(length + 1);
    } else if (status === 'error') {
      console.log('图片上传失败');
    } else if (status === 'uploading') {
      console.log('图片上传中...');
    }
  }

  const options = reactive({
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['image'],
          ['clean'], // remove formatting button
        ],
        handlers: {
          image: function (value: Boolean) {
            console.log('uploadBtn.value.$el', uploadBtn.value.$el);
            if (value) {
              uploadBtn.value.$el.click();
            } else {
              Quill.format('image', true);
            }
          },
        },
      },
    },
  });
</script>
<script lang="ts">
  export default { inheritAttrs: false };
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{name-space}-quill-container';
  .@{prefix-cls} {
    ::v-deep(.ant-upload) {
      display: none;
    }

    ::v-deep(.ql-toolbar) {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    ::v-deep(.ql-container) {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    ::v-deep(.ql-snow) {
      .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0;
        content: '保存';
        padding-right: 0;
      }

      .ql-tooltip[data-mode='link']::before {
        content: '链接地址:';
      }

      .ql-tooltip[data-mode='video']::before {
        content: '视频地址:';
      }

      .ql-picker.ql-size .ql-picker-label::before,
      .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
      }

      .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
      .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        content: '10px';
      }

      .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
      .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        content: '18px';
      }

      .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
      .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        content: '32px';
      }

      .ql-picker.ql-header .ql-picker-label::before,
      .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        content: '标题1';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        content: '标题2';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        content: '标题3';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        content: '标题4';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        content: '标题5';
      }

      .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
      .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        content: '标题6';
      }

      .ql-picker.ql-font .ql-picker-label::before,
      .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
      }

      .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
      .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        content: '衬线字体';
      }

      .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
      .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        content: '等宽字体';
      }
    }
  }
</style>
