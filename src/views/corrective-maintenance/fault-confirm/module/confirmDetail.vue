<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <div class="w-full">
      <div class="absolute right-20 top-10 w-17">
        <img :src="handleStatus(troubleStatus)" alt="" />
      </div>
      <!-- 基本信息 -->
      <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">基本信息</div>
      <!-- <Description @register="register" /> -->
      <Description :bordered="false" :column="3" :data="data" :schema="confirmdedDetail()" />
      <!-- 故障明细 -->
      <div class="font-black text-[#414960] text-[15px] py-[16px]">故障明细</div>
      <Description :bordered="true" :column="2" :data="data" :schema="confirmdedDetails()" />
      <!-- 确认故障提交 -->
      <template v-if="troubleStatus === '0'">
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">故障确认</div>
        <BasicForm @register="registerFrom" />
      </template>
      <!-- 故障确认 -->
      <template v-if="troubleStatus !== '0' && Object.keys(faultData).length">
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[12px]">故障确认</div>
        <Description
          :bordered="true"
          :column="2"
          :data="faultData"
          :schema="confirmdingDetail(troubleDetermine, troubleStatus)"
        />
      </template>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Description } from '/@/components/Description';
  import {
    confirmdedDetails,
    confirmdedDetail,
    confirmdingDetail,
    confirmFormSchema,
  } from '../data';
  import { useRoute, useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TroubleDetailApi, TroubleDeterMineApi } from '/@/api/corrective-maintenance/fault';
  import daiqueren from '/@/assets/images/daiqueren@2x.png';
  import daichuli from '/@/assets/images/daichuli@2x.png';
  import chulizhong from '/@/assets/images/chulizhong@2x.png';
  import yijiejue from '/@/assets/images/yijiejue@2x.png';
  import jianxiu from '/@/assets/images/jianxiu@2x.png';

  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  const troubleStatus = route.query?.troubleStatus as string; //故障状态
  // const flag = route.query?.flag as string; //待确认1 已确认2
  const id = route.query?.id as string;
  const troubleDetermine = route.query.troubleDetermine as string; //确认结果
  const faultData = ref<any>({}); //故障确认

  //审核icon
  function handleStatus(status) {
    switch (status) {
      case '0':
        return daiqueren;
      case '1':
        return daichuli;
      case '2':
        return chulizhong;
      case '3':
        return yijiejue;
      case '4':
        return jianxiu;
    }
  }

  //详情
  id &&
    TroubleDetailApi({ id }).then((res) => {
      //待确认-故障信息
      data.value = res;
      // //已确认-故障信息
      // datas.value = res;
      //故障确认 0:自修、1：委外维修 2：列入检修计划
      troubleDetermine &&
        (faultData.value =
          troubleDetermine === '0'
            ? res.deviceTroubleOneselfVO
            : troubleDetermine === '1'
            ? res.deviceTroubleOutsourceVO
            : res.deviceTroubleOverhaulVO);
      faultData.value['troubleDetermineText'] = res['troubleDetermineText']; //确认结果
    });

  //提交
  async function handleSubmit() {
    await validate();
    const obj = getFieldsValue();
    obj['troubleId'] = id;
    TroubleDeterMineApi(obj).then(() => {
      createMessage.success('确认成功！');
      handleBack();
    });
  }
  //取消
  async function handleReset() {
    handleBack();
  }
  //返回
  function handleBack() {
    router.push({
      name: 'faultConfirm',
    });
  }

  let data = ref<any>({});
  // const [register] = useDescription({
  //   data,
  //   schema: confirmdedDetail(),
  //   bordered: true,
  //   column: 2,
  //   size: 'default',
  // });

  const [registerFrom, { validate, getFieldsValue }] = useForm({
    schemas: confirmFormSchema(), //表单配置
    submitButtonOptions: {
      text: '确认故障',
    },
    resetButtonOptions: {
      text: '取消',
    },
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
    actionColOptions: {
      offset: 6,
      span: 10,
      style: {
        textAlign: 'left',
        marginTop: '24px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
    fieldMapToTime: [
      //更改RangePicker的返回字段
      ['Time', ['jobStartTime', 'jobEndTime'], 'YYYY-MM-DD HH:mm:ss'],
    ],
  });
</script>

<style lang="less" scoped></style>
