<template>
  <PageWrapper>
    <Card>
      <div class="w-full px-85">
        <BasicForm @register="registerFrom" />
      </div>
      <!-- <div class="mt-[20px] flex justify-center items-center">
        <a-button class="mr-4">取消</a-button>
        <a-button type="primary">提交</a-button>
      </div> -->
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
    baseColProps: {
      span: 24,
    },
    labelWidth: 120,
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    actionColOptions: {
      offset: 6,
      span: 10,
      style: {
        textAlign: 'center',
        marginTop: '12px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
    // rowProps: {
    //   gutter: 16,
    // },
    // labelCol: {
    //   span: 8,
    // },
    // wrapperCol: {
    //   span: 10,
    // },
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
