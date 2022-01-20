<template>
  <PageWrapper title="富文本嵌入表单示例">
    <CollapseContainer title="富文本表单">
      <BasicForm
        :labelWidth="100"
        ref="formElRef"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
      />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, FormActionType, FormSchema } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: 'title',
      defaultValue: 'defaultValue',
      rules: [{ required: true }],
    },
    {
      field: 'tinymce',
      component: 'Tinymce',
      label: 'tinymce',
      defaultValue: null,
      rules: [{ required: true }],
      // render: ({ model, field }) => {
      //   return h(Tinymce, {
      //     value: model[field],
      //     onChange: (value: string) => {
      //       model[field] = value;
      //     },
      //     height: 400,
      //     width: '100%',
      //   });
      // },
    },
  ];
  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const formElRef = ref<Nullable<FormActionType>>(null);
      return {
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        formElRef,
      };
    },
  });
</script>
