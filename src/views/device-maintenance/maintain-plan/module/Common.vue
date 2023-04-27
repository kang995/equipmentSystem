<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <!-- 关联审批流 -->
        <!-- <template #fullIdSlot="{ model, field }">
          <Select
            v-model:value="model[field]"
            :options="optionsCycle"
          >
            <template #addonAfter>
              <div class="">注：如未选择审批流程则直接生成无人员审核</div>
            </template>
          </Select>
        </template> -->
        <!-- 任务周期 -->
        <template #taskSlot="{ model, field }">
          <Input
            v-model:value="model[field]"
            :min="0"
            placeholder="请输入天数"
            style="width: 100%"
            type="number"
          >
            <template #addonAfter>
              <Select
                v-model:value="model['taskCycleUnit']"
                style="min-width: 100px"
                :options="optionsCycle"
              />
            </template>
          </Input>
        </template>
        <!-- 任务执行时长 -->
        <template #ExecuteSlot="{ model, field }">
          <Input
            v-model:value="model[field]"
            :min="0"
            placeholder="请输入任务执行时长"
            style="width: 100%"
            type="number"
          >
            <template #addonAfter>
              <Select
                v-model:value="model['taskExecuteUnit']"
                style="min-width: 100px"
                :options="optionsExecute"
              />
            </template>
          </Input>
        </template>
        <!-- 工单生成及下发 -->
        <!-- <template #RadioGroupSlot="{ model, field }">
          <RadioGroup v-model:value="model[field]" @change="handleRadio">
            <template v-for="item in getOptions" :key="`${item.value}`">
              <Radio :value="item.value" >
                {{ item.label }}
              </Radio>
            </template>
            <template #addonAfter>
              <InputNumber
                :min="0"
                placeholder="请输入"
                v-model:value="model['workOrderNum']"
              />
            </template>
          </RadioGroup>
        </template> -->
        <!-- 临期提醒 -->
        <template #RemindSlot="{ model, field }">
          <Input
            v-model:value="model[field]"
            :min="0"
            placeholder="请输入临期提醒"
            style="width: 100%"
            type="number"
          >
            <template #addonAfter>
              <Select
                v-model:value="model['adventRemindUnit']"
                style="min-width: 100px"
                :options="optionsRemind"
              />
            </template>
          </Input>
        </template>
        <!-- 超时提醒间隔 -->
        <template #timeoutSlot="{ model, field }">
          <Input
            v-model:value="model[field]"
            :min="0"
            placeholder="请输入超时提醒间隔"
            style="width: 100%"
            type="number"
          >
            <template #addonAfter>
              <Select
                v-model:value="model['timeoutRemindUnit']"
                style="min-width: 100px"
                :options="optionsTimeout"
              />
            </template>
          </Input>
        </template>
        <template #tableSlot>
          <AFormItemRest>
            <BasicTable @register="registerTable">
              <template #tableTitle>
                <div class="flex flex-1 space-x-4">
                  <a-button type="primary" @click="handleModal">选择设备</a-button>
                </div>
              </template>
              <template #action="{ record, index }">
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
                        confirm: handleDelete.bind(null, index),
                      },
                    },
                  ]"
                />
              </template>
            </BasicTable>
          </AFormItemRest>
        </template>
      </BasicForm>
    </Card>
    <selectDevice @register="registerDeviceModal" @handleOk="handleEcho" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Select, Input } from 'ant-design-vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Card, Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getCommonFormSchema, planTableColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import selectDevice from '/@/views/backup-management/components/SelectDevice.vue';
  // import { useTabs } from '/@/hooks/web/useTabs';
  import { putPlanListApi } from '/@/api/device-maintenance/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    updatePlanListApi,
    reUpdatePlanListApi,
    getPlanDetailApi,
    getDeviceSelectApi,
    getPeopleSelectApi,
    getStationPeopleSelectApi,
    getDictionarySelectTypeApi,
  } from '/@/api/device-maintenance/index';
  // const RadioGroup =  Radio.Group;
  const { createMessage } = useMessage();
  // const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const isEdit = route.query?.isEdit as string;
  const approvalStatus = route.query?.approvalStatus as string;
  const id = route.query?.id as string;
  const versionVal = ref();
  const optionsCycle = ref([]);
  const optionsExecute = ref([]);
  const optionsRemind = ref([]);
  const optionsTimeout = ref([]);
  // const getOptions = ref<any>([]);
  const [registerDeviceModal, { openModal: openDeviceModal }] = useModal();
  const [registerFrom, { validate, getFieldsValue, setFieldsValue, updateSchema }] = useForm({
    schemas: getCommonFormSchema(), //表单配置
    // showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    // baseColProps: {
    //   span: 24,
    // },
    // labelWidth: 120,
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
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
  const dataSourceList = ref<any>([]);
  const [registerTable, { getDataSource, setTableData }] = useTable({
    dataSource: dataSourceList,
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
  onMounted(() => {
    funUnit();
  });
  //单位
  function funUnit() {
    getDictionarySelectTypeApi({ type: 'TASK_CYCLE_UNIT' }).then((res) => {
      optionsCycle.value = res.map((v) => {
        return {
          value: v.itemValue,
          label: v.itemName,
        };
      });
    });
    getDictionarySelectTypeApi({ type: 'TASK_EXECUTE_UNIT' }).then((res) => {
      optionsExecute.value = res.map((v) => {
        return {
          value: v.itemValue,
          label: v.itemName,
        };
      });
    });
    getDictionarySelectTypeApi({ type: 'ADVENT_REMIND_UNIT' }).then((res) => {
      optionsRemind.value = res.map((v) => {
        return {
          value: v.itemValue,
          label: v.itemName,
        };
      });
    });
    getDictionarySelectTypeApi({ type: 'TIMEOUT_REMIND_UNIT' }).then((res) => {
      optionsTimeout.value = res.map((v) => {
        return {
          value: v.itemValue,
          label: v.itemName,
        };
      });
    });
    //工单生成及下发
    // getDictionarySelectTypeApi({ type: 'WORK_ORDER' }).then((res) => {
    //   getOptions.value = res.map((v) => {
    //     return {
    //       value: v.itemValue,
    //       label: v.itemName,
    //     };
    //   });
    // });
  }

  //保养设备回显
  const DeviceVal = ref([]);
  function handleEcho(val, data) {
    console.log('回显', val, data);
    dataSourceList.value = data;
    DeviceVal.value = val;
    openDeviceModal(false);
  }
  const targetKeys = ref<any>([]);
  //详情
  id &&
    getPlanDetailApi({ id }).then((res) => {
      //按条数生成并下发
      if (res['workOrder'] === '3') {
        updateSchema({ field: 'workOrderNum', ifShow: true });
      }
      //岗位
      res.dealStationId &&
        getStationPeopleSelectApi([res.dealStationId]).then((res2) => {
          updateSchema({ field: 'dealStationId', ifShow: true });
          updateSchema({ field: 'dealDeptId', ifShow: false });
          updateSchema({ field: 'dealUserIdList', componentProps: { options: res2 } });
        });
      //人员
      res.dealDeptId &&
        getPeopleSelectApi([res.dealDeptId]).then((res) => {
          updateSchema({ field: 'dealUserIdList', componentProps: { options: res } });
        });
      res.Time = [res['effectStartDate'], res['effectEndDate']]; //计划生效时间
      setFieldsValue(res);
      //设备保养
      getDeviceSelectApi(res['deviceIdList']).then((res1) => {
        console.log('deviceIdList', res1);
        dataSourceList.value = res1;
      });
      versionVal.value = res.version;
      DeviceVal.value = res.deviceIdList;
    });
  //提交
  async function sumitForm() {
    setFieldsValue({
      deviceIdList: DeviceVal.value.length ? DeviceVal.value : undefined,
    });
    await validate();
    let params = getFieldsValue();
    params['deviceIdList'] = [...DeviceVal.value]; //保养设备idList
    // console.log('params', params);

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
      id && (params['id'] = id);
      params['version'] = versionVal.value;
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
  //删除table
  function handleDelete(index) {
    const data = getDataSource();
    data.splice(index, 1);
    DeviceVal.value.splice(index, 1);
    setTableData(data);
  }

  //选择设备
  function handleModal() {
    const data = getDataSource();
    const ids = [] as any; //deviceId
    data.map((v) => {
      ids.push(v.deviceId);
    });
    targetKeys.value = ids;
    openDeviceModal(true, targetKeys.value);
  }

  //取消
  async function resetSubmitFunc() {
    // closeCurrent();
    router.go(-1);
  }
  //详情
  function handleDetails(data) {
    let name;
    let state;
    const natureType = data.deviceNature; //设备类型 1静0动
    const dataSource = data.dataSource; //数据来源(1:企业综合；2：本系统)
    const id = data.deviceId;
    if (data.specialEquip === 'yes') {
      if (natureType === '1') {
        name = 'specialEquipmentDetails'; //特种设备详情静
        state = '3';
      } else {
        name = 'specialEquipmentDetailsMove'; //特种设备详情静
        state = '4';
      }
    } else {
      if (natureType === '1') {
        name = 'MechanicsDetails'; //机械设备详情静
        state = '2';
      } else {
        name = 'MechanicsDetailsMove'; //机械设备详情动
        state = '1';
      }
    }
    router.push({
      name: name,
      query: {
        id,
        state,
        dataSource,
      },
    });
  }
</script>

<style lang="less" scoped>
  ::v-deep(.ant-pagination .ant-select) {
    width: auto;
  }
</style>
