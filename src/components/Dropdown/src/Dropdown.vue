<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys" style="padding: 4px">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(item.event)"
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
            style="border-radius: 4px"
            :class="item.delBtn ? 'delBtn' : null"
          >
            <a-popconfirm
              v-if="popconfirm && item.popConfirm"
              v-bind="getPopConfirmAttrs(item.popConfirm)"
            >
              <template #icon v-if="item.popConfirm.icon">
                <Icon :icon="item.popConfirm.icon" />
              </template>
              <div>
                <Icon :icon="item.icon" v-if="item.icon" />
                <span class="ml-1">{{ item.text }}</span>
              </div>
            </a-popconfirm>
            <template v-else>
              <Icon :icon="item.icon" v-if="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </template>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" style="margin: 2px" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { computed, PropType } from 'vue';
  import type { DropMenu } from './typing';
  import { Dropdown, Menu, Popconfirm } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { omit } from 'lodash-es';
  import { isFunction } from '/@/utils/is';

  const ADropdown = Dropdown;
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const AMenuDivider = Menu.Divider;
  const APopconfirm = Popconfirm;

  const props = defineProps({
    popconfirm: Boolean,
    /**
     * the trigger mode which executes the drop-down action
     * @default ['hover']
     * @type string[]
     */
    trigger: {
      type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
      default: () => {
        return ['contextmenu'];
      },
    },
    dropMenuList: {
      type: Array as PropType<(DropMenu & Recordable)[]>,
      default: () => [],
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['menuEvent']);

  function handleClickMenu(item: DropMenu) {
    const { event } = item;
    const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
    emit('menuEvent', menu);
    item.onClick?.();
  }

  const getPopConfirmAttrs = computed(() => {
    return (attrs) => {
      const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon']);
      if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
        originAttrs['onConfirm'] = attrs.confirm;
      if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
        originAttrs['onCancel'] = attrs.cancel;
      return originAttrs;
    };
  });

  const getAttr = (key: string | number) => ({ key });
</script>
<style lang="less" scoped>
  ::v-deep(.delBtn) {
    background-color: rgba(255, 91, 86, 0.1);
    color: rgba(255, 91, 86, 1);
  }

  ::v-deep(.delBtn):hover {
    background-color: rgba(255, 91, 86, 0.1);
  }
</style>
