<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <template #tableSlot>
          <AFormItemRest>
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
          </AFormItemRest>
        </template>
      </BasicForm>
      <div class="mt-[20px] flex justify-center items-center">
        <a-button class="mr-4" @click="handleSave">保存</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </div>
    </Card>
    <selectDevice @register="registerDeviceModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Card, Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getCommonFormSchema, planTableColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import selectDevice from '/@/views/backup-management/components/SelectDevice.vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const [registerFrom, { validate, getFieldsValue, setFieldsValue }] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    // labelWidth: 120,
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
  });
  const [registerDeviceModal, { openModal: openDeviceModal }] = useModal();
  const AFormItemRest = Form.ItemRest;
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
  //保存
  function handleSave() {
    closeCurrent();
  }
  //提交
  function handleSubmit() {
    closeCurrent();
  }
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
