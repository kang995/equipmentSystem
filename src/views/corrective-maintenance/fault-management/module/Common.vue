<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom" />
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getCommonFormSchema } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();
  const [registerFrom] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    // labelWidth: 120,
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    actionColOptions: {
      offset: 5,
      span: 24,
      style: {
        textAlign: 'center',
        marginTop: '24px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
  });

  //提交
  async function handleSubmit() {
    console.log('提交');
  }
  //取消
  async function handleReset() {
    closeCurrent();
  }
</script>

<style lang="less" scoped></style>
