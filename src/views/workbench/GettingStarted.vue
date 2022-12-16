<template>
  <Card v-bind="$attrs" class="!mt-4">
    <div class="mt-4">
      <Title :titleList="titleList" />
    </div>

    <div :class="`${prefixCls}`">
      <div :class="dynamicInfoItems?.length == 0 ? '' : colorBg">
        <List item-layout="horizontal" :data-source="dynamicInfoItems" :split="false">
          <template #renderItem="{ item }">
            <div :class="`${prefixCls}-ListParent`">
              <ListItem :class="`${prefixCls}-ListItem`">
                <ListItemMeta :class="`${prefixCls}-ListItemMeta`">
                  <template #title>
                    <p :class="`${prefixCls}-data-text`">
                      {{ item.itemName }}
                    </p>
                  </template>
                </ListItemMeta>
              </ListItem>
            </div>
          </template>
        </List>
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, List } from 'ant-design-vue';
  import { ref } from 'vue';
  import Title from './components/Title.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('workbench-wrapper');
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
  const titleList = [
    {
      title: '新手入门',
      icon: 'yewu_xiangmu',
    },
  ];
  const dynamicInfoItems = ref<any>([]);
  const colorBg = ref('colorBg');
</script>
<style lang="less" scoped>
  ::v-deep(.ant-card-head) {
    border-bottom: none;
    padding: 0 16px;
  }

  ::v-deep(.ant-card-body) {
    padding: 0;
    margin: 0 16px 16px;
  }

  .colorBg {
    background: #fafafb;
  }

  @prefix-cls: ~'@{name-space}-workbench-wrapper';
  .@{prefix-cls} {
    border-radius: 6px;
    // margin: 16px;
    margin-bottom: 16px;
    padding: 4px 8px;

    ::v-deep(.ant-divider) {
      background: #f1f2f5;
    }

    ::v-deep(.ant-list-item) {
      padding: 0;
    }

    ::v-deep(.ant-divider-horizontal) {
      margin: 0 0 0 0;
    }

    ::v-deep(.ant-list-item-meta-title) {
      margin: 0;
    }

    &-ListParent {
      background: #fafafb;
      padding: 0 0 0 8px;
      transition: all 0.3s;
      margin-bottom: 5px;
      border-bottom: 1px solid #f1f2f5;

      &:hover {
        background: #f1f2f5;
        cursor: pointer;
        border-radius: 6px;
        // border-bottom: none;
      }
    }

    &-ListParent:last-child {
      border-bottom: none;
    }

    &-SvgIcon {
      position: relative;
    }

    &-Information {
      position: absolute;
      top: 16px;
      left: 43px;
      font-size: 14px;
      color: #414960;
    }

    &-more {
      position: absolute;
      top: 14px;
      right: 40px;
      text-align: center;
    }

    &-ListItemMeta {
      // padding: 12px 12px 0;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-data-text {
      font-size: 14px;
      font-weight: 400;
      color: #414960;
      margin: 12px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
</style>
