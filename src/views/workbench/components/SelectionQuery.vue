<template>
  <BasicForm @register="registerForm" :submitButtonOptions="submitButtonOptions" size="small">
    <template #StartTimeSlot="{ model, field }">
      <AFormItemRest>
        <a-space direction="vertical" size="small">
          <div class="flex">
            <a-date-picker
              v-model:value="model[field]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              size="small"
            />
            <span class="m-1">～</span>
            <a-date-picker
              v-model:value="model['field']"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              size="small"
            />
          </div>
        </a-space>
      </AFormItemRest>
    </template>
  </BasicForm>
</template>
<script lang="ts" setup>
  import { useForm, BasicForm } from '/@/components/Form';
  import { schemasSearch } from '../props';
  import { ButtonProps } from '/@/components/Button';
  import { DatePicker, Form, Space } from 'ant-design-vue';
  const submitButtonOptions = { preIcon: 'gonggong_sousuo|svg' } as ButtonProps;
  const emit = defineEmits(['submitFunc', 'register']);
  const ASpace = Space;
  const ADatePicker = DatePicker;
  const AFormItemRest = Form.ItemRest;

  const [registerForm, { getFieldsValue }] = useForm({
    schemas: schemasSearch,
    actionColOptions: {
      span: 6,
    },
    rowProps: {
      gutter: 16,
    },
    submitFunc: submitFunc,
    showResetButton: false,
  });
  //自定义查询
  async function submitFunc() {
    const data = getFieldsValue();
    emit('submitFunc', data);
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-btn) {
    padding: 4px 7px;
    height: auto;
  }

  ::v-deep(.ant-form-item) {
    margin-bottom: 0 !important;
  }

  ::v-deep(.ant-row) {
    align-items: center;
  }
</style>
