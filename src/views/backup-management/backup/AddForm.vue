<template>
  <PageWrapper contentFullHeight contentBackground>
    <Tabs
      v-model:activeKey="activeKey"
      class="basic-data-tab"
      :tabBarStyle="{ margin: 0, paddingLeft: '16px' }"
    >
      <a-tab-pane tab="备件信息" key="1">
        <div class="m-4">
          <BasicForm @register="register">
            <template #combination1="{ model, field }">
              <Input
                v-model:value="model[field]"
                :min="0"
                placeholder="请输入更换周期"
                style="width: 100%"
                @change="handleChange"
              >
                <template #addonAfter>
                  <Select
                    v-model:value="model['replacementPeriodUnit']"
                    style="min-width: 100px"
                    :options="optionsAfter"
                  />
                </template>
              </Input>
            </template>
            <template #tableSlot>
              <AFormItemRest>
                <div>
                  <BasicTable @register="registerTable" @edit-end="handleEdit">
                    <template #action="{ index }">
                      <TableAction
                        :divider="false"
                        :actions="[
                          {
                            label: '删除',
                            popConfirm: {
                              title: '是否删除？',
                              confirm: handleDelEdit.bind(null, index),
                            },
                          },
                        ]"
                      />
                    </template>
                    <template #WarehouseSlot="{ record }">
                      <Select
                        ref="select"
                        placeholder="请选择仓库"
                        :options="options"
                        v-model:value="record.warehouseId"
                        :disabled="Disabled"
                    /></template>

                    <template #NumSlot="{ record }">
                      <InputNumber
                        :min="0"
                        :disabled="Disabled"
                        placeholder="请输入数量"
                        v-model:value="record.spareNum"
                      />
                    </template>
                  </BasicTable>
                  <div class="add" @click="clickFirstAdd" v-if="!Disabled">
                    <SvgIcon name="gonggong_tianjia_xianxing" size="20" class="ml-4px" />
                    <span>添加</span>
                  </div>
                </div>
              </AFormItemRest></template
            >
          </BasicForm>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="关联设备" key="2">
        <div class="mx-4">
          <BasicTable @register="registerDevice">
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
                    onClick: handleDel.bind(null, index),
                    delBtn: true,
                  },
                ]"
              />
            </template>
            <template #tableTitle>
              <a-button type="primary" class="mr-4" :loading="exportLoading" @click="getModal()"
                >选择设备</a-button
              >
            </template>
          </BasicTable>
        </div>
      </a-tab-pane>
    </Tabs>

    <SelectDevice v-if="ifShow" @register="registerModal" :minHeight="400" @handle-ok="handleOk" />
    <div class="btn mb-4">
      <a-button @click="resetFunc" class="mr-4">取消</a-button>
      <a-button type="primary" @click="submitFunc()">保存</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import SelectDevice from '../components/SelectDevice.vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { InputNumber, Form, Select, Input, message } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { onMounted, ref, computed } from 'vue';
  import { sparePartAdd, columnsTable, devicesColumns } from '../data';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';
  import {
    postBackupAddApi,
    postBackupDetailApi,
    postBackupEditApi,
    postBackupInventorylApi,
    postBackupListlApi,
  } from '/@/api/backup-management/backup';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { postWarehouseListApi } from '/@/api/backup-management/backup-details';
  const { closeCurrent } = useTabs();
  const ATabPane = Tabs.TabPane;
  const AFormItemRest = Form.ItemRest;
  const router = useRouter();
  const route = useRoute();
  const { createMessage } = useMessage();
  const exportLoading = ref(false);
  const activeKey = ref('1');
  const id = route.query?.id as string;
  const options = ref([]);
  const optionsAfter = ref([]);
  const versionVal = ref();
  const ifShow = ref(id ? false : true);
  //更换周期
  function handleChange(e) {
    const value = e.target.value;
    if (!value) {
      // return Promise.resolve();
    } else {
      if (value.length > 8) {
        // return Promise.reject('参考价为最大8位数');
        message.warn('更换周期为最大8位数');
      }
      const IsNumber = /(^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$)/;
      if (!IsNumber.test(value)) {
        // return Promise.reject('参考价只能为数字,且只能保留两位小数');
        message.warn('更换周期只能为数字');
      }
      // return Promise.resolve();
    }
  }
  //编辑时物品清单不可编辑、删除
  const Disabled = computed(() => {
    if (id) {
      return true;
    } else {
      return false;
    }
  });
  onMounted(() => {
    funSelect();
    funDetail();
    // setFieldsValue({ spareName: '1', spareClassify: '1', measureUnit: '2', storageLow: 1 });
  });
  const targetKeys = ref<any>([]);
  const dataSourceList = ref<any>([]);
  function funDetail() {
    id &&
      postBackupDetailApi({ id }).then((res) => {
        setFieldsValue(res);
        versionVal.value = res.version;
        dataSource.value = res.inventoryList; //物品清单
        dataSourceList.value = res?.relevanceList;
      });
    id &&
      postBackupListlApi({ id }).then((res) => {
        //关联设备
        if (res) {
          dataSourceDevice.value = res;
        }
        ifShow.value = true;
      });
    id &&
      postBackupInventorylApi({ id }).then((res) => {
        //物品清单
        dataSource.value = res.inventoryVOList;
      });
  }

  function funSelect() {
    postWarehouseListApi().then((res) => {
      options.value = res.records.map((v) => {
        return {
          value: v.warehouseId,
          label: v.warehouseName,
        };
      });
    });
    getDictionarySelectType({ type: 'REPLACEMENT_PERIOD_UNIT' }).then((res) => {
      optionsAfter.value = res.map((v) => {
        return {
          value: v.itemValue,
          label: v.itemName,
        };
      });
    });
  }

  //表单
  const [register, { setFieldsValue, validateFields }] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: sparePartAdd,
    actionColOptions: {
      offset: 5,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    showSubmitButton: false,
    showResetButton: false,
  });
  //弹框
  const [registerModal, { openModal: openModal, closeModal }] = useModal();
  //关联设备
  const dataSourceDevice = ref([]);
  const [registerDevice, { getDataSource: getDataSourceDevice, setTableData: setTableDataDevice }] =
    useTable({
      dataSource: dataSourceDevice,
      columns: devicesColumns,
      rowKey: 'id',

      actionColumn: {
        width: 280,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });
  //物品清单
  const dataSource = ref([{}]);
  const [registerTable, { setTableData, getDataSource }] = useTable({
    dataSource: dataSource,
    columns: columnsTable, //表单列信息
    showIndexColumn: false, //是否显示序号列
    useSearchForm: false, //是否表单
    clickToRowSelect: false, //是否开启点击行选中
    pagination: false, //不显示分页
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      ifShow: Disabled.value ? false : true,
      slots: { customRender: 'action' },
    },
  });
  //表格操作
  function clickFirstAdd() {
    const data = getDataSource();
    data.push({});
    setTableData(data);
  }
  function handleDelEdit(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }
  function handleEdit({ record, index, key, value }) {
    console.log('record, index, key, value: ', record, index, key, value);
  }
  // 关联设备操作
  function handleDetails(record) {
    const { id } = record;
    router.push({
      name: 'specialEquipmentDetails',
      query: {
        id,
      },
    });
  }
  function handleDel(index) {
    const data = getDataSourceDevice();
    data.splice(index, 1);
    setTableDataDevice(data);
    const arr = data.map((item) => item.deviceId);
    DeviceVal.value = arr;
  }
  function getModal() {
    const data = getDataSourceDevice();
    const ids = [] as any; //deviceId
    data.map((v) => {
      ids.push(v.deviceId);
    });
    targetKeys.value = ids;
    openModal(true, targetKeys.value);
  }
  //关闭弹框获取到选择的值
  const DeviceVal = ref<any>([]);
  function handleOk(val, data) {
    DeviceVal.value = val;
    dataSourceDevice.value = data;
    closeModal();
  }

  //取消
  function resetFunc() {
    getRouter();
  }

  //新增
  async function submitFunc() {
    const data = await validateFields();
    const list = getDataSource();
    const spareAddVOList = getDataSource();
    let index1 = [] as any;
    for (let i = 0; i < list.length; i++) {
      list[i];
      if (list[i].spareNum && !list[i].warehouseId) {
        createMessage.error('请选择仓库');
        return;
      }
      // if (list[i].warehouseId && !list[i].spareNum) {
      //   createMessage.error('请输入数量');
      //   return;
      // }
      if (!list[i].spareNum && !list[i].warehouseId) {
        index1.push(i);
      }
    }

    const warehouseSpareAddVOList = spareAddVOList.map((v) => {
      return {
        spareNum: v.spareNum,
        warehouseId: v.warehouseId,
      };
    });
    index1.map((v) => {
      warehouseSpareAddVOList.splice(v, 1);
    });

    data['warehouseSpareAddVOList'] = warehouseSpareAddVOList;
    data['deviceIdList'] = DeviceVal.value; //关联设备
    if (id) {
      data['id'] = id;
      data['version'] = versionVal.value;
      funAdd(postBackupEditApi, data, '编辑成功');
    } else {
      funAdd(postBackupAddApi, data, '新增成功');
    }
  }
  function funAdd(api, data, test) {
    api(data)
      .then(() => {
        createMessage.success(test);
        getRouter();
      })
      .finally(() => {});
  }
  async function getRouter() {
    await closeCurrent();
    router.push({
      name: 'Backup',
    });
  }
</script>

<style scoped lang="less">
  ::v-deep(.ant-table-wrapper) {
    border: none;
  }

  .basic-data-tab {
    border: 1px solid @border-color-base;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: @component-background;
  }

  .add {
    height: 36px;
    background: #fafafb;
    border-radius: 6px;
    border: 1px solid #f1f2f5;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #4d79ff;
    cursor: pointer;
  }

  .btn {
    display: flex;
    justify-content: center;
  }
</style>
