<template>
  <ACard>
    <div :class="`${prefixCls}`">
      <Title :titleList="titleList">
        <template #QueryBtn>
          <RadioButtonGroup
            :class="`${prefixCls}-Btn`"
            :options="options"
            v-model:value="Btnvalue"
            buttonStyle="button"
            @change="getChange"
          />
        </template>
      </Title>
      <ARow class="mt-4">
        <template v-if="newCardList.length">
          <ACol
            :span="6"
            :gutter="[16, 16]"
            :class="`${prefixCls}-box`"
            v-for="(item, index) in newCardList"
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
        </template>
      </ARow>
    </div>
  </ACard>
</template>
<script lang="ts" setup>
  import { RadioButtonGroup } from '/@/components/Form';
  import Title from './components/Title.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Row, Card, Col, Popover, Image } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { dataViewApi } from '/@/api/workbench/index';
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const AImage = Image;
  const APopover = Popover;
  const { prefixCls } = useDesign('enterprise-personnel');
  const router = useRouter();
  const Btnvalue = ref<string>('1');
  const options = [
    {
      label: '今日',
      value: '1',
    },
    {
      label: '本周',
      value: '2',
    },
    {
      label: '本月',
      value: '3',
    },
    {
      label: '本年',
      value: '5',
    },
  ];
  const CardList = ref<any[]>([
    {
      id: 1,
      title: '待确认故障',
      num: 0,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_jianshexiangmu.png',
      bgColor: 'rgba(0, 127, 255, 0.1)',
    },
    {
      id: 2,
      title: '保养工单',
      num: 0,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/workbench_img.png',
      bgColor: 'rgba(77, 121, 255, 0.1)',
    },
    {
      id: 3,
      title: '维修工单',
      num: 0,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_gongyongpeitaosheshi.png',
      bgColor: 'rgba(68, 191, 243, 0.1)',
    },
    {
      id: 4,
      title: '检修工单',
      num: 0,
      icon: 'https://tsit-argus.oss-cn-beijing.aliyuncs.com/integrated-management-system/icon_important_weixianhuaxuepin.png',
      bgColor: 'rgba(255, 91, 86, 0.1)',
    },
  ]);
  const toRoute = (id) =>
    ({
      //待确认故障
      1: {
        name: 'faultManagement',
        query: {
          Btnvalue: Btnvalue.value,
          // alarmTime: dateTime,//故障状态：待确认
        },
      },

      2: {
        name: 'maintainWorkOrder', //保养工单
        query: {
          Btnvalue: Btnvalue.value,
        },
      },
      3: {
        name: 'repairWorkOrder', //维修工单
        query: {
          Btnvalue: Btnvalue.value,
        },
      },
      4: {
        name: 'serviceWorkOrder', //检修工单
        query: {
          Btnvalue: Btnvalue.value,
        },
      },
    }[id]);

  function getRouterDate(id) {
    router.push(toRoute(id));
  }
  onMounted(() => {
    funView();
  });
  //
  const newCardList = ref<any>([]);
  function funView() {
    newCardList.value = CardList.value;
    dataViewApi({ timeFlag: Btnvalue.value }).then((res) => {
      newCardList.value[0].num = res.troubleCount; //待确认故障
      newCardList.value[1].num = res.maintainCount; //保养工单
      newCardList.value[2].num = res.serviceCount; //维修工单
      newCardList.value[3].num = res.overhaulCount; //检修工单
      // console.log('newCardList',newCardList.value)
    });
  }

  function getChange(val) {
    Btnvalue.value = val;
    funView();
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

    &-Btn {
      padding-right: 16px;
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
