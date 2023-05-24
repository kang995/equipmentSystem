<template>
  <Card v-bind="$attrs" class="!mt-4">
    <template #title>
      <div class="flex items-center">
        <SvgIcon name="yewu_xiaoxi" size="24" />
        <span class="ml-1 text-body1 font-600 flex-1 text-sm">消息通知</span>
        <span v-if="false" class="text-body2 cursor-pointer text-sm" @click="getMessageList"
          >更多</span
        >
        <SvgIcon
          v-if="false"
          class="text-body2 cursor-pointer"
          name="gonggong_youjiantou_xianxing"
          size="24"
          @click="getMessageList"
        />
      </div>
    </template>

    <div :class="`${prefixCls}`">
      <List item-layout="horizontal" :data-source="dynamicInfoItems" :split="false">
        <template #renderItem="{ item }">
          <ListItem :class="`${prefixCls}-ListItem`" @click="clickMessages(item)">
            <template #extra>
              <div :class="`${prefixCls}-SvgIcon-border`">
                <a-badge :dot="item.state === '2'">
                  <SvgIcon name="gonggong_youjiantou_xianxing" size="16" />
                </a-badge>
              </div>
            </template>

            <ListItemMeta :class="`${prefixCls}-ListItemMeta`">
              <template #description>
                <div
                  :class="{
                    box: item.messageType,
                    boxUpdate: ['5', '6', '7', '8'].includes(item.messageType),
                    boxRed: ['4'].includes(item.messageType),
                  }"
                >
                  <span class="text-xs leading-[20px] text-center m-0">{{
                    item.messageTypeText
                  }}</span>
                </div>
              </template>
              <template #title>
                <a-typography-paragraph
                  class="text-body1"
                  :class="item.state === '2' ? 'font-semibold' : 'font-normal'"
                  style="width: 100%; margin-bottom: 0 !important"
                  :style="{ cursor: 'pointer' }"
                  :ellipsis="{ tooltip: true }"
                  :content="`${item.title}`"
                />
              </template>
              <template #avatar>
                <div :class="`${prefixCls}-data`">
                  <span :class="`${prefixCls}-data-date`">{{ item.day }}</span>
                  <span class="text-body2 text-xs">{{ item.month }}月</span>
                </div>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, List, Badge, TypographyParagraph } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { notificationApi, notificationUpdateStateApi } from '/@/api/workbench/index';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';

  const userStore: any = useUserStore();
  const { prefixCls } = useDesign('workbench-wrapper');
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
  const router = useRouter();
  const ABadge = Badge;
  // const AAvatar = Avatar;
  const ATypographyParagraph = TypographyParagraph;
  const dynamicInfoItems = ref<any>([]);

  onMounted(() => {
    getNotificationData();
  });
  async function getNotificationData() {
    const { records } = await notificationApi({
      organId: userStore.userInfo.comId, //企业ID(必填)
      userId: userStore.userInfo.userId, //用户ID(必填)
      page: 1,
      pageSize: 5,
      state: '2',
    });
    // dynamicInfoItems.value = records.map((item) => {
    //   return {
    //     id: item.id, //主键id
    //     state: item.readOrNo, //是否已读，1（已读）/2（未读）
    //     day: item.createTime.split('-')[2].split(' ')[0], //接收时间
    //     month: item.createTime.split('-')[1], //接收时间
    //     title: item.title, //标题
    //     messageType: item.messageType, //消息类型
    //     messageTypeText: item.messageTypeText,
    //   };
    // });
  }
  function getMessageList() {
    router.push({
      name: 'Message',
      params: {
        tabActiveKey: '',
      },
    });
  }

  function clickMessages(item) {
    const ids = [item.id];
    notificationUpdateStateApi({ ids, userId: userStore.userInfo.userId });
    router.push({
      name: 'Message',
      params: {
        id: item.id,
        state: item.state,
        tabActiveKey: '-1', // 查看单条消息
      },
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-card-body) {
    padding: 0 16px 8px;
  }

  ::v-deep(.ant-card-head) {
    border-bottom: none;
    padding: 0 16px;
  }

  ::v-deep(.ant-list-item-meta) {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .SvgIconBorder {
    position: relative;
    right: -1px;
    bottom: -1px;
  }

  .box {
    width: 68px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  @prefix-cls: ~'@{name-space}-workbench-wrapper';
  .@{prefix-cls} {
    border-radius: 6px;

    &-SvgIcon-border {
      width: 24px;
      height: 24px;
      background: @custom-gray4;
      border-radius: 12px;
      margin-right: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ::v-deep(.ant-list-item) {
      padding: 0;
    }

    ::v-deep(.boxUpdate) {
      background: rgba(77, 121, 255, 0.1);
      color: #4d79ff;
    }

    ::v-deep(.boxRed) {
      background: rgba(255, 91, 86, 0.1);
      color: #ff5b56;
    }

    ::v-deep(.yellowColor) {
      background: rgba(255, 170, 0, 0.1);
      color: #fa0;
    }

    ::v-deep(.box-warning) {
      background: rgba(255, 91, 86, 0.1);
    }

    ::v-deep(.warning) {
      color: #ff5b56;
    }

    ::v-deep(.box-remind) {
      background: rgba(255, 170, 0, 0.1);
    }

    ::v-deep(.remind) {
      color: #fa0;
    }

    &-more {
      position: absolute;
      top: 14px;
      right: 50px;
      text-align: center;
    }

    &-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 42px;
      height: 54px;
      background: @custom-gray4;
      border-radius: 4px;
      justify-content: center;
    }

    &-data-date {
      font-size: 16px;
      font-weight: bold;
      color: @custom-body2;
      font-family: AltinnDINExp, sans-serif;
    }

    &-ListItem {
      background: @custom-gray5;
      border-radius: 6px;
      margin-bottom: 8px;
      transition: all 0.3s;

      &:hover {
        background: @custom-gray4;
        cursor: pointer;
      }
    }

    &-ListItemMeta {
      padding: 8px;
    }

    //::v-deep(.ant-list-item-meta-title) {
    //  overflow: hidden;
    //  white-space: nowrap;
    //  text-overflow: ellipsis;
    //  -o-text-overflow: ellipsis;
    //}
  }
</style>
