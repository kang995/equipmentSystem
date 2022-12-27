<template>
  <ACard>
    <div :class="`${prefixCls}`">
      <Title :titleList="titleList" />
      <ARow>
        <ACol
          :span="6"
          :gutter="[16, 16]"
          :class="`${prefixCls}-box `"
          v-for="(item, index) in CardList"
          :key="index"
        >
          <ACard
            :class="`${prefixCls}-box-card`"
            :bordered="false"
            :id="index"
            @mouseover="changeActive(index)"
            @click="getRouterDate(item.id)"
          >
            <a-image :preview="false" :src="item.icon" :class="`${prefixCls}-SvgIcon`" />

            <div :class="`${prefixCls}-text`">
              <APopover trigger="hover">
                <template #content>
                  <span>{{ item.title }}</span>
                </template>
                <span :class="`${prefixCls}-text-title`">{{ item.title }}</span>
              </APopover>
              <div :class="`${prefixCls}-num-title`">
                <div>
                  <span :class="`${prefixCls}-num`">{{ item.num }}</span>
                </div>
              </div>
            </div>
          </ACard>
        </ACol>
      </ARow>
    </div>
  </ACard>
</template>
<script lang="ts" setup>
  import Title from './components/Title.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Row, Card, Col, Popover, Image } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const AImage = Image;
  const APopover = Popover;
  const { prefixCls } = useDesign('enterprise-personnel');
  const router = useRouter();
  const CardList = ref<any[]>([
    {
      id: 1,
      title: '待确认故障',
      num: 34,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_jianshexiangmu.png',
      bgColor: 'rgba(0, 127, 255, 0.1)',
    },
    {
      id: 2,

      title: '保养工单',
      num: 22,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/workbench_img.png',
      bgColor: 'rgba(77, 121, 255, 0.1)',
    },
    {
      id: 3,

      title: '维修工单',
      num: 3,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_gongyongpeitaosheshi.png',
      bgColor: 'rgba(68, 191, 243, 0.1)',
    },
    {
      id: 4,
      title: '检修工单',
      num: 2,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_important_weixianhuaxuepin.png',
      bgColor: 'rgba(255, 91, 86, 0.1)',
    },
  ]);
  const toRoute = {
    //待确认故障
    1: {
      name: 'faultManagement',
      // query: {
      //   // alarmTime: dateTime,//故障状态：待确认
      // },
    },

    2: {
      name: 'maintainWorkOrder', //保养工单
    },
    3: {
      name: 'repairWorkOrder', //维修工单
    },
    4: {
      name: 'serviceWorkOrder', //检修工单
    },
  };

  function getRouterDate(id) {
    router.push(toRoute[id]);
  }

  const titleList = [
    {
      title: '数据概览',
      icon: 'yewu_tongji',
    },
  ];

  function changeActive(index) {
    let color = document.getElementById(index) as any;
    color.classList.add('hoverColor' + index);
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-card-body) {
    padding: 16px 0 16px 16px;
  }

  [data-theme='dark'] {
    .enterprise-personnel-box-card {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .hoverColor0:hover {
    background: rgba(0, 127, 255, 0.1);
  }

  .hoverColor1:hover {
    background: rgba(77, 121, 255, 0.1);
  }

  .hoverColor2:hover {
    background: rgba(68, 191, 243, 0.1);
  }

  .hoverColor3:hover {
    background: rgba(255, 91, 86, 0.1);
  }

  .hoverColor4:hover {
    background: rgba(0, 186, 124, 0.1);
  }

  .hoverColor5:hover {
    background: rgba(255, 170, 0, 0.1);
  }
  @prefix-cls: ~'@{name-space}-enterprise-personnel';
  .@{prefix-cls} {
    ::v-deep(.ant-card-body) {
      padding: 0;
      display: flex;
      width: 100%;
    }

    &-box {
      align-items: center;
      padding: 0 0 16px 0;
      border-radius: 6px;
      cursor: pointer;
    }

    &-box-card {
      padding: 16px;
      background: @custom-gray5;
      display: flex;
      margin-right: 16px;
      transition: all 0.3s;
    }

    &-SvgIcon {
      position: relative;
      top: 10px;
      width: 40px;
      height: 40px;
    }

    ::v-deep(.ant-image-img) {
      position: relative;
      top: 5px;
      width: 40px;
      margin: 0 auto;
    }

    &-text {
      max-width: calc(100% - 56px);
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }

    &-text-title {
      line-height: 20px;
      color: #61687c;
      margin-bottom: 4px;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }

    &-num-title {
      font-weight: bold;
    }

    &-num {
      font-size: 24px;
      color: #414960;
      line-height: 26px;
    }
  }
</style>
