<template>
  <div>
    <div class="bg-white">
      <div class="form-box">
        <BasicForm @register="registerForm" />
      </div>
    </div>

    <div class="mt-4 p-4 bg-white">
      <a-button class="mb-4" type="primary" preIcon="gonggong_tianjia_xianxing|svg" @click="addTap">
        关联应急预案
      </a-button>
      <a-row :gutter="16" :class="[itemList.length ? '' : 'flex justify-center']">
        <template v-if="itemList.length">
          <a-col :span="12" v-for="(item, index) in itemList" :key="index">
            <a-card style="margin-bottom: 16px" hoverable>
              <div class="card_title">{{ item.planName }}</div>
              <div class="mb-10px">
                <span class="card_left">预案编号：</span>
                <span class="card_right">{{ item.planNum }}</span>
              </div>
              <!-- <div class="mb-10px">
                <span class="card_left">事件类别：</span>
                <span class="card_right">{{ item.accidentTypeValue }}</span>
              </div> -->
              <div class="mb-10px">
                <span class="card_left">预案类型：</span>
                <span class="card_right">{{ item.planTypeValue }}</span>
              </div>
              <div class="mb-10px">
                <span class="card_left">预案响应等级</span>
                <span class="card_right">{{ item.gradeValue }}</span>
              </div>
              <div class="mb-10px">
                <span class="card_left">适用事件类型：</span>
                <span class="card_right">{{ item.accidentTypeValue }}</span>
              </div>
              <div class="mb-10px">
                <span class="card_left">相关危化品：</span>
                <span class="card_right">{{ item.chemsValue }}</span>
              </div>
              <div>
                <span class="card_left">更新时间：</span>
                <span class="card_right">{{ item.updateTime ? item.updateTime : '--' }}</span>
              </div>
              <template #actions>
                <!-- 特种设备时显示启用 -->
                <!-- <a-button type="link">启用</a-button> -->
                <a-button type="link" @click="detailTap(item)">详情</a-button>
              </template>
            </a-card>
          </a-col>
        </template>
        <template v-else>
          <Empty :image="simpleImage" />
        </template>
      </a-row>
      <div style="display: flex; flex-direction: row-reverse">
        <a-pagination
          v-model:current="pageNum"
          v-model:page-size="pageSize"
          showQuickJumper
          showSizeChanger
          :total="total"
          size="small"
          @change="onChange"
          :show-total="(total) => `共 ${total} 条`"
        />
      </div>
    </div>
    <!-- 关联应急预案 -->
    <PartModel ref="DeviceRef" @register="registerPartModal" @event-open="handleEcho" />
    <!-- <ImportModal @register="registerModal" @handle-ok="handleOk" @handle-import="handleModal" /> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { installationFormSchemas } from '../data';
  import { Card, Row, Col, Pagination, Empty } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import PartModel from './meetModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter, useRoute } from 'vue-router';
  import {
    contingencySaveApi,
    contingencyDeviceIdListApi,
  } from '/@/api/device-management/special-equipment';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  // const [registerModal, { openModal: openModal }] = useModal();
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const APagination = Pagination;
  const router = useRouter();
  const route = useRoute();
  const deviceId = route.query.id as string;
  const DeviceRef = ref();
  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

  const itemList = ref<any>([
    // { planName: '2' },
    // { planName: '2' },
    // { planName: '2' },
    // { planName: '2' },
  ]);
  const total = ref<number>(1);
  const pageNum = ref<number>(1);
  const pageSize = ref<number>(10);
  const [registerPartModal, { openModal: openPartModal }] = useModal();
  const onChange = async (pageNumber: number) => {
    console.log('pageNumber: ', pageNumber);
  };
  const [registerForm, { getFieldsValue }] = useForm({
    autoSubmitOnEnter: true,
    baseColProps: {
      span: 6,
      //设置子项的样式
    },
    rowProps: {
      gutter: 16,
    },
    resetButtonOptions: {
      preIcon: 'gonggong_zhongzhi|svg',
    },
    submitButtonOptions: {
      preIcon: 'gonggong_sousuo|svg',
    },
    schemas: installationFormSchemas,
    submitFunc: submitFunc,
    resetFunc: resetSubmitFunc,
  });

  //自定义重置
  async function resetSubmitFunc() {
    handleList({});
  }
  //自定义查询
  async function submitFunc() {
    const res = getFieldsValue();
    handleList(res);
    console.log('res: ', res);
  }
  onMounted(() => {
    handleList({});
  });
  //列表
  function handleList(res?) {
    if (deviceId) {
      res['deviceId'] = deviceId;
      contingencyDeviceIdListApi(res).then((res) => {
        itemList.value = res;
        total.value = itemList.value.length;
        // console.log('itemList.value', itemList.value)
      });
    }
  }
  //打开应急预案
  function addTap() {
    openPartModal(true);
  }
  async function handleEcho(data) {
    const contingencyIdList = data.map((item) => item.id);
    await contingencySaveApi({ contingencyIdList, deviceId }).then(() => {
      createMessage.success('已保存');
      openPartModal(false);
    });
    await handleList({});
  }
  // 详情
  function detailTap(item) {
    router.push({
      name: 'meetDetails',
      query: {
        id: item.id,
      },
    });
  }

  // 打开导入弹框
  // function handleModal() {
  //   openModal(true, { importUrlApi: importPlanApi, uploadUrlApi: uploadPlanExcelApi });
  // }
</script>
<style lang="less" scoped>
  .card_title {
    font-size: 20px;
    margin-bottom: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #414960;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-all;
    text-overflow: ellipsis;
  }

  .card_left {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #61687c;
  }

  .card_right {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #61687c;
  }

  .nodata {
    width: 240px;
    margin: 0 auto;

    &-img {
      width: 220px;
      height: 140px;
      //margin: 0 auto;
      margin: 120px 0 8px 0;
    }

    &-text {
      font-size: 14px;
      font-weight: 400;
      color: #61687c;
      text-align: center;
    }
  }

  .form-box {
    padding: 16px;
    border: 1px solid @border-color-base;
    border-radius: 0 0 6px 6px;
    border-top: none;
  }
</style>
