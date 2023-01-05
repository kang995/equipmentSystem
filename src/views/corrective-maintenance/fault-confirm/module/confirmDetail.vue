<template>
  <PageWrapper contentBackground>
    <div class="w-full px-10">
      <!-- 待确认 status==='0'-->
      <template v-if="flag === '1'">
        <!-- 故障信息 -->
        <Description @register="register" />
        <div class="font-black text-[#414960] text-[15px] mt-[12px] mb-[16px]">故障确认</div>
        <BasicForm @register="registerFrom" />
      </template>
      <!-- 已确认 status!=='0'-->
      <template v-if="flag === '2'">
        <!-- <Description @register="registers" /> -->
        <!-- 故障信息 -->
        <Description @register="register" />
        <!-- 故障确认 -->
        <Description
          :bordered="false"
          :column="2"
          :data="faultData"
          :schema="confirmdingDetail(troubleDetermine)"
        />
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
  import { useRoute, useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TroubleDetailApi, TroubleDeterMineApi } from '/@/api/corrective-maintenance/fault';
  const { createMessage } = useMessage();
  const route = useRoute();
  const router = useRouter();
  // const status = route.query?.status as string;
  const flag = route.query?.flag as string; //待确认1 已确认2
  const id = route.query?.id as string;
  const troubleDetermine = route.query.troubleDetermine as string;
  const faultData = ref<any>(); //故障确认

  //详情
  id &&
    TroubleDetailApi({ id }).then((res) => {
      //待确认-故障信息
      data.value = res;
      // //已确认-故障信息
      // datas.value = res;
      //故障确认 0:自修、1：委外维修 2：列入检修计划
      faultData.value =
        troubleDetermine === '0'
          ? res.deviceTroubleOneselfVO
          : troubleDetermine === '1'
          ? res.deviceTroubleOutsourceVO
          : res.deviceTroubleOverhaulVO;
    });

  //提交
  async function handleSubmit() {
    await validate();
    const obj = getFieldsValue();
    obj['troubleId'] = id;
    //处理部门、处理岗位一个字段
    if (obj['dealStationId'] && obj.hasOwnProperty('dealStationId')) {
      obj['disposeUnitId'] = obj['dealStationId'];
      delete obj['dealStationId'];
    }
    // console.log('obj',obj)
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
  const [register] = useDescription({
    data,
    schema: confirmdedDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  // let datas = ref<any>({});
  // const [registers] = useDescription({
  //   data: datas,
  //   schema: confirmdingDetail(status),
  //   bordered: false,
  //   column: 2,
  //   size: 'default',
  // });

  const [registerFrom, { validate, getFieldsValue }] = useForm({
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
    fieldMapToTime: [
      //更改RangePicker的返回字段
      ['Time', ['jobStartTime', 'jobEndTime'], 'YYYY-MM-DD HH:mm:ss'],
    ],
  });
</script>

<style lang="less" scoped></style>
