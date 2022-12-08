<template>
  <div class="px-4">
    <Description @register="register" />
    <div class="mt-[12px]" v-if="again">
      <div class="font-black text-[#414960] text-[15px] mb-[16px]">重新下发</div>
      <BasicForm @register="registerFrom" />
    </div>
    <div class="mt-[12px]">
      <a-button class="mr-4" v-if="props.status === '1'">取消</a-button>
      <a-button class="mr-4" type="primary" v-if="props.status === '2'">延期审核</a-button>
      <a-button
        type="primary"
        v-if="props.status === '1' || props.status === '2'"
        @click="handleAgain"
        >重新下发</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { WorkDetail, getAgainFormSchema } from './fileld';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
  });
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(props.status),
    bordered: false,
    column: 3,
    size: 'default',
  });
  const [registerFrom, {}] = useForm({
    schemas: getAgainFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
</script>

<style lang="less" scoped></style>
