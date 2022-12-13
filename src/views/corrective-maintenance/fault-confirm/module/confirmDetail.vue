<template>
  <PageWrapper contentBackground>
    <div class="w-full px-10">
      <!-- 待确认 -->
      <template v-if="flag === '1'">
        <Description @register="register" />
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[16px]">故障确认</div>
        <BasicForm @register="registerFrom" />
      </template>
      <!-- 已确认 -->
      <template v-if="flag === '2'">
        <Description @register="registers" />
      </template>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Description, useDescription } from '/@/components/Description';
  import { confirmdedDetail, confirmdingDetail, confirmFormSchema } from '../data';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const status = route.query?.status as string;
  const flag = route.query?.flag as string; //待确认1 已确认2
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: confirmdedDetail(),
    bordered: false,
    column: 2,
    size: 'default',
    // labelStyle: { width: '180px' },
  });
  let datas = ref<any>({});
  const [registers] = useDescription({
    data: datas,
    schema: confirmdingDetail(status),
    bordered: false,
    column: 2,
    size: 'default',
  });

  const [registerFrom, {}] = useForm({
    schemas: confirmFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
    labelWidth: 140,
    // rowProps: {
    //   gutter: 20,
    // },
    submitButtonOptions: {
      text: '确认故障',
    },
    resetButtonOptions: {
      text: '取消',
    },
    actionColOptions: {
      offset: 10,
      span: 10,
      style: {
        textAlign: 'left',
        marginTop: '24px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
  });

  //提交
  function handleSubmit(): any {
    console.log('提交');
  }
  //取消
  function handleReset(): any {
    console.log('取消');
  }
</script>

<style lang="less" scoped></style>
