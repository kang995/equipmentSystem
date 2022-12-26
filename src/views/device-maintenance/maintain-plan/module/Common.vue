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
                      color: 'error',
                      popConfirm: {
                        title: '是否确认删除?',
                        confirm: handleDelete.bind(null, record),
                      },
                    },
                  ]"
                />
              </template>
            </BasicTable>
          </AFormItemRest>
        </template>
      </BasicForm>
      <!-- <div class="mt-[20px] flex justify-center items-center">
        <a-button class="mr-4">取消</a-button>
        <a-button type="primary">确定</a-button>
      </div> -->
    </Card>
    <selectDevice @register="registerDeviceModal" @handleOk="handleEcho" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Card, Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getCommonFormSchema, planTableColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import selectDevice from '/@/views/backup-management/components/SelectDevice.vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { putPlanListApi } from '/@/api/device-maintenance/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    updatePlanListApi,
    reUpdatePlanListApi,
    getPlanDetailApi,
    getDeviceSelectApi,
  } from '/@/api/device-maintenance/index';
  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const isEdit = route.query?.isEdit as string;
  const approvalStatus = route.query?.approvalStatus as string;
  const id = route.query?.id as string;
  const [registerDeviceModal, { openModal: openDeviceModal }] = useModal();
  const [registerFrom, { validate, getFieldsValue, setFieldsValue }] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
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
    submitButtonOptions: {
      text: '保存',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
    fieldMapToTime: [
      //更改RangePicker的返回字段
      ['Time', ['effectStartDate', 'effectEndDate'], 'YYYY-MM-DD HH:mm:ss'],
    ],
  });
  const AFormItemRest = Form.ItemRest;
  const dataSource = ref<any>([]);
  const [registerTable, { getDataSource }] = useTable({
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
  //保养设备回显
  function handleEcho(val) {
    // console.log('val',val);
    // dataSource.value = val;
    dataSource.value = [
      {
        id: '1522462896151433218',
        label: '设备名称',
        area: '中心',
        unit: '装置名称',
        specialEquipment: '是',
        type: '1',
      },
      {
        id: '1549948622740246529',
        label: '设备名称1',
        area: '中心1',
        unit: '装置名称1',
        specialEquipment: '否',
        type: '1',
      },
    ];
    openDeviceModal(false);
  }
  //详情
  id &&
    getPlanDetailApi({ id }).then((res) => {
      setFieldsValue(res);
      getDeviceSelectApi([res['deviceIdList']]).then((res1) => {
        dataSource.value = res1;
      });
    });
  //提交
  async function sumitForm() {
    await validate();
    let params = getFieldsValue();
    //保养设备idList
    let arrId = getDataSource().map((item) => item.id);
    console.log('arrId', arrId);
    params.deviceIdList = arrId;

    console.log('params', params);
    //判断新增、编辑、重新编辑
    if (isEdit === 'false') {
      putPlanListApi(params)
        .then(() => {
          router.go(-1);
          createMessage.success('新增成功');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (approvalStatus === '1') {
        //待提交
        updatePlanListApi(params)
          .then(() => {
            router.go(-1);
            createMessage.success('编辑成功');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //拒绝
        reUpdatePlanListApi(params)
          .then(() => {
            router.go(-1);
            createMessage.success('编辑成功');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  //取消
  async function resetSubmitFunc() {
    closeCurrent();
  }
  //选择设备
  function handleModal() {
    openDeviceModal(true);
  }
  //详情
  function handleDetails() {
    router.push({
      name: '',
    });
  }
  //删除
  function handleDelete(record) {
    dataSource.value = dataSource.value.filter((item) => item.id !== record.id);
    // console.log(dataSource.value)
  }
</script>

<style lang="less" scoped></style>
