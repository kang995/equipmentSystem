<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <RadioGroup
    v-bind="attrs"
    v-model:value="state"
    class="radio_group_button_style"
    @change="handleChange"
  >
    <RadioButton value="chart">
      <Tooltip title="图表" color="rgba(65, 73, 96, 0.8)" placement="bottom">
        <SvgIcon
          name="gonggong_tubiao"
          size="20"
          style="vertical-align: middle; margin-bottom: 2px"
        />
      </Tooltip>
    </RadioButton>
    <RadioButton value="table">
      <Tooltip title="表格" color="rgba(65, 73, 96, 0.8)" placement="bottom">
        <SvgIcon
          name="gonggong_biaoge"
          size="20"
          style="vertical-align: middle; margin-bottom: 2px"
        />
      </Tooltip>
    </RadioButton>
  </RadioGroup>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Radio, Tooltip } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';

  export default defineComponent({
    name: 'SwitchChartTable',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      SvgIcon,
      Tooltip,
    },
    props: {
      value: {
        type: String as PropType<string>,
      },
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const attrs = useAttrs();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      function handleChange() {
        emit('update:value', state.value);
      }

      return { state, attrs, handleChange };
    },
  });
</script>
<style lang="less" scoped src="./radio-group-button.less"></style>
