<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <!-- <template #treeSlot="{ model, field }">
          <ATreeSelect
            v-model:value="model[field]"
            style="width: 100%"
            placeholder="请输入关联设备"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            :fieldNames="{ children: 'children', label: 'label', value: 'id' }"
            @change="handleChange"
          />
        </template> -->
      </BasicForm>
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
  // import { onMounted, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getCommonFormSchema } from '../data';
  import { useTabs } from '/@/hooks/web/useTabs';
  // import { TreeSelect } from 'ant-design-vue';
  // import { deviceTreeSelectApi } from "/@/api/corrective-maintenance/fault"
  // const ATreeSelect = TreeSelect;
  const { closeCurrent } = useTabs();

  // const treeData = ref<any[]>([]);
  // async function treeQuery() {
  //   deviceTreeSelectApi().then((res) => {
  //     // console.log('res:', res);
  //     treeData.value = res;
  //   });
  // }
  // onMounted(() => {
  //   treeQuery();
  // });
  //

  const [registerFrom] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    // labelWidth: 120,
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    actionColOptions: {
      offset: 5,
      span: 24,
      style: {
        textAlign: 'center',
        marginTop: '24px',
      },
    },
    resetFunc: handleReset,
    submitFunc: handleSubmit,
  });

  //提交
  async function handleSubmit() {
    console.log('提交');
  }
  //取消
  async function handleReset() {
    closeCurrent();
  }
</script>

<style lang="less" scoped></style>
