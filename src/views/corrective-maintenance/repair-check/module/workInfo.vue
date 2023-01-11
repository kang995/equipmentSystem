<template>
  <div class="px-4">
    <!-- 工单信息 -->
    <Description @register="register" />
    <!-- 维修结果 -->
    <div class="mt-[12px]" v-if="status === '2' || status === '3' || status === '4'">
      <template v-for="(item, index) in repair" :key="item.id">
        <Description :bordered="false" :column="2" :data="item" :schema="maintainDetail(index)" />
      </template>
    </div>
    <!-- 验收结果 -->
    <div v-if="status === '3' || status === '4'">
      <template v-for="(item, index) in repair" :key="item.id">
        <Description :bordered="false" :column="2" :data="item" :schema="maintainDetails(index)" />
      </template>
    </div>
    <!-- 提交验收 -->
    <div class="mt-[12px]" v-if="status === '2'">
      <div class="font-black text-[#414960] text-[15px] my-[16px]">验收结果</div>
      <BasicForm @register="registerResult" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { WorkDetail, getResultFormSchema, maintainDetails, maintainDetail } from '../data';
  import { useRoute, useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    maintainDetailApi,
    DetermineMaintainAcceptApi,
  } from '/@/api/corrective-maintenance/repair';
  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  const status = route.query?.status as string;
  const id = route.query?.id as string;
  // const determineId = route.query?.determineId as string;
  const repair = ref<any>([]); //维修结果
  const result = ref<any>([]); //验收结果
  //详情
  id &&
    maintainDetailApi({ id }).then((res) => {
      infoData.value = res; //工单信息
      repair.value = res.acceptList; //维修结果
      result.value = res.acceptList; //验收结果
    });

  // 工单信息
  let infoData = ref<any>([]);
  const [register] = useDescription({
    data: infoData,
    schema: WorkDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });

  //提交验收结果
  const [registerResult, { validate, getFieldsValue }] = useForm({
    schemas: getResultFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 12,
    },
    submitButtonOptions: {
      text: '提交',
    },

    showResetButton: false,
    submitFunc: handleSubmitResult,
  });
  //提交验收
  async function handleSubmitResult() {
    await validate();
    const obj = getFieldsValue();
    obj['workOrderId'] = id;
    // console.log('obj',obj);
    DetermineMaintainAcceptApi(obj).then(() => {
      createMessage.success('已提交');
      router.push({
        name: 'repairCheck',
      });
    });
  }
</script>

<style lang="less" scoped></style>
