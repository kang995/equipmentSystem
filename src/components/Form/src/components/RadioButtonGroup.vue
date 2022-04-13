<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <RadioGroup v-bind="attrs" v-model:value="state" :class="radioGroupStyle" @change="handleChange">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </RadioButton>
    </template>
  </RadioGroup>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { isString } from '/@/utils/is';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
  type RadioItem = string | OptionsItem;

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      options: {
        type: Array as PropType<RadioItem[]>,
        default: () => [],
      },
      buttonStyle: {
        type: String as PropType<'button' | 'outline' | 'text'>,
        default: 'button',
      },
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const attrs = useAttrs();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      // Processing options value
      const getOptions = computed((): OptionsItem[] => {
        const { options } = props;
        if (!options || options?.length === 0) return [];

        const isStringArr = options.some((item) => isString(item));
        if (!isStringArr) return options as OptionsItem[];

        return options.map((item) => ({ label: item, value: item })) as OptionsItem[];
      });
      const radioGroupStyle = computed(() => {
        const { buttonStyle } = props;
        return buttonStyle === 'button'
          ? 'radio_group_button_style'
          : buttonStyle === 'outline'
          ? 'radio_group_outline_style'
          : buttonStyle === 'text'
          ? 'radio_group_text_style'
          : 'radio_group_button_style';
      });

      function handleChange() {
        emit('update:value', state.value);
      }

      return { state, getOptions, attrs, radioGroupStyle, handleChange };
    },
  });
</script>
<style lang="less" scoped src="./radio-group-button.less"></style>
