<template>
  <BasicModal
    v-bind="$attrs"
    title="Modal Title"
    width="700px"
    @register="register"
    :useWrapper="true"
    :destroyOnClose="true"
    okText="保存"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';

  const emit = defineEmits(['submitted', 'register']);

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
    // 方式1;
    // setFieldsValue({
    //   field2: data.data,
    //   field1: data.info,
    // });

    // // 方式2
    // modelRef.value = { field2: data.data, field1: data.info };

    // setProps({
    //   model:{ field2: data.data, field1: data.info }
    // })
  }

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          // console.log(e);
        },
      },
    },
  ];

  const { createMessage } = useMessage();
  const [registerForm, { setProps, getFieldsValue }] = useForm({
    schemas,
    showActionButtonGroup: false,
  });

  function handleSubmit() {
    console.log('新增/编辑', getFieldsValue());
    closeModal();
    emit('submitted');
  }
</script>
