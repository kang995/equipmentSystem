<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" style="transform: scale(1.2, 1.2)" />
      <slot v-bind="data || {}"></slot>
      <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" style="transform: scale(1.2, 1.2)" />
    </template>
  </Button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  export default defineComponent({
    name: 'AButton',
    extends: Button,
    inheritAttrs: false,
  });
</script>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import Icon from '/@/components/Icon/src/Icon.vue';
  import { buttonProps } from './props';
  import { useAttrs } from '/@/hooks/core/useAttrs';

  const props = defineProps(buttonProps);
  // get component class
  const attrs = useAttrs({ excludeDefaultKeys: false });
  const getButtonClass = computed(() => {
    const { color, disabled } = props;
    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`is-disabled`]: disabled,
      },
    ];
  });

  // get inherit binding value
  const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>
