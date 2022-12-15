<template>
  <div class="px-4">
    <Description @register="register" />
    <BasicTable @register="registerTable" />
    <div class="mt-[150px] flex justify-center items-center">
      <a-button type="primary" @click="sumitForm" v-if="props.status === '1'">提交</a-button>
      <a-button @click="handleReback" v-if="props.status === '2'">撤回</a-button>
      <a-button @click="handleEdit" v-if="props.status === '3'">重新编辑</a-button>
      <a-button class="mr-4" v-if="props.status === '5'">拒绝</a-button>
      <a-button type="primary" v-if="props.status === '5'">同意</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { planInfoDetail, planDetailsColumns } from '../data';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
  });
  const Router = useRouter();

  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: planInfoDetail(),
    bordered: false,
    column: 2,
    size: 'default',
  });
  const dataSource = ref([]);
  const [registerTable, { getDataSource, setTableData }] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: planDetailsColumns(),
    rowKey: 'id',
    useSearchForm: false, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
  });

  //提交
  function sumitForm() {
    handleBack();
  }
  //撤回
  function handleReback() {
    handleBack();
  }
  //重新编辑
  function handleEdit() {
    Router.push({
      name: 'repairAdd',
    });
  }
  function handleBack() {
    Router.push({
      name: 'repairPlan',
    });
  }
</script>

<style lang="less" scoped></style>
