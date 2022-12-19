<template>
  <ACard>
    <div :class="`${prefixCls}`" class="mt-4">
      <Title :titleList="titleList" />
      <ARow>
        <ACol
          :span="6"
          :gutter="[16, 16]"
          :class="`${prefixCls}-box `"
          v-for="(item, index) in buttonList"
          :key="index"
        >
          <ACard :class="`${prefixCls}-box-card`" :bordered="false" @click="getClick(item.name)">
            <div :class="`${prefixCls}-box-data`">
              <SvgIcon :name="item.icon" size="20" :class="`${prefixCls}-SvgIcon`" />
              <div :class="`${prefixCls}-text`"> {{ item.title }} </div>
            </div>
          </ACard>
        </ACol>
      </ARow>
    </div>
  </ACard>
</template>
<script lang="ts" setup>
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import Title from './components/Title.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Row, Card, Col } from 'ant-design-vue';
  import { ref } from 'vue';
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const { prefixCls } = useDesign('enterprise-personnel1');
  const titleList = [
    {
      title: '快捷入口',
      icon: 'yewu_danyuan',
    },
  ];

  const buttonList = ref([
    {
      title: '故障确认',
      icon: 'yewu_danyuan',
      name: 'string',
    },
    {
      title: '维修计划审核',
      icon: 'yewu_danyuan',
      name: 'string',
    },
    {
      title: '保养计划审核',
      icon: 'yewu_danyuan',
      name: 'string',
    },
    {
      title: '检修计划审核',
      icon: 'yewu_danyuan',
      name: 'string',
    },
  ]);

  function getClick(data) {
    console.log('data: ', data);
    // router.push({
    //   name: data,
    // });
  }
</script>
<style lang="less" scoped>
  [data-theme='dark'] {
    .tsit-enterprise-personnel1-box-card {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  ::v-deep(.ant-card-body) {
    padding: 0 0 16px 16px;
  }
  @prefix-cls: ~'@{name-space}-enterprise-personnel1';
  .@{prefix-cls} {
    ::v-deep(.ant-card-body) {
      padding: 0;
      display: flex;
      width: 100%;
    }

    &-box {
      border-radius: 6px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    &-box-card {
      padding: 16px;
      background: @custom-gray5;

      margin-right: 16px;
      transition: all 0.3s;
    }

    &-box-data {
      display: flex;
      align-items: center;
      margin: 0 auto;
    }

    &-SvgIcon {
      width: 20px;
      height: 20px;
    }

    &-text {
      display: flex;
      flex-direction: column;
      margin-left: 4px;
      font-size: 14px;
      font-weight: 400;
      color: #414960;
      line-height: 22px;
    }

    &-text-title {
      line-height: 20px;
      color: #61687c;
      margin-bottom: 4px;
      text-align: left;
    }

    &-num-title {
      font-size: 14px;
      font-weight: bold;
      color: #414960;
      line-height: 22px;
    }
  }
</style>
