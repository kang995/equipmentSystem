<template>
  <PageWrapper>
    <Card>
      <div class="w-full px-75 container mx-auto">
        <BasicForm @register="registerFrom" />
        <BasicTable @register="registerTable">
          <template #tableTitle>
            <div class="flex flex-1 space-x-4">
              <a-button type="primary" @click="handleModal">选择设备</a-button>
            </div>
          </template>
          <template #action="{ record }">
            <TableAction
              :divider="false"
              :stopButtonPropagation="true"
              :actions="[
                {
                  label: '详情',
                  onClick: handleDetails.bind(null, record),
                },
                {
                  label: '删除',
                },
              ]"
            />
          </template>
        </BasicTable>
        <div class="mt-[20px] flex justify-center items-center">
          <a-button class="mr-4">取消</a-button>
          <a-button type="primary">确定</a-button>
        </div>
      </div>
    </Card>
    <selectDevice @register="registerDeviceModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getCommonFormSchema, planTableColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import selectDevice from '/@/views/backup-management/components/SelectDevice.vue';
  const router = useRouter();
  const [registerDeviceModal, { openModal: openDeviceModal }] = useModal();
  const [registerFrom, { validate, getFieldsValue, setFieldsValue }] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
    labelWidth: 120,
    // rowProps: {
    //   gutter: 16,
    // },
    // labelCol: {
    //   span: 3,
    // },
    // wrapperCol: {
    //   span: 6,
    // },
  });
  const dataSource = ref([{}]);
  const [registerTable] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: planTableColumns(),
    rowKey: 'id',
    useSearchForm: false, //开启搜索表单
    showTableSetting: false, //开启表格设置工具
    clickToRowSelect: false, //是否开启点击行选中
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  //选择设备
  function handleModal() {
    openDeviceModal(true, {});
  }
  //详情
  function handleDetails() {
    router.push({
      name: '',
    });
  }
</script>

<style lang="less" scoped></style>
