<template>
  <PageWrapper contentBackground contentFullHeight>
    <div class="mx-auto w-100 mt-10 font-bold text-size-[16px]">
      <span class="mr-5">选择模式:</span>
      <a-radio-group v-model:value="state" :options="options" button-style="solid" />
      <!-- optionType="button" size="large" -->
      <div class="py-3">
        <span class="text-[#ccc] text-xs" v-if="state === '0'">备注：除了黑名单之外的都可访问</span>
        <span class="text-[#ccc] text-xs" v-else>备注：只有白名单的可以访问</span>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import { message, RadioGroup } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getIpControlApi, postEditIpControlApi } from '/@/api/systemSetting/ip-list';
  const ARadioGroup = RadioGroup;

  onMounted(() => {
    getIpControlApi().then((res) => {
      state.value = res.identity;
      id.value = res.id;
      watch(
        () => state.value,
        (val) => {
          postEditIpControlApi({ identity: val, id: id.value }).then(() => {
            message.success('修改成功');
          });
        },
      );
    });
  });
  const id = ref();
  const state = ref();
  const options = ref([
    {
      label: '普黑',
      value: '0',
    },
    {
      label: '普白',
      value: '1',
    },
  ]);
</script>
