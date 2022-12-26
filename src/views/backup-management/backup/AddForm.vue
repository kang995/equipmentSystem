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
                            //  color: 'error',
                            popConfirm: {
                              title: '是否删除？',
                              confirm: handleDelEdit.bind(null, index),
                            },
                          },
                        ]"
                      />
                    </template>
                    <template #WarehouseSlot="{ record }">
                      {{ record.warehouseId }}
                      <Select
                        ref="select"
                        placeholder="请选择仓库"
                        :options="options"
                        v-model:value="record.warehouseId"
                    /></template>

                    <template #NumSlot="{ record }">
                      <Input placeholder="请输入数量" v-model:value="record.spareNum" />
                    </template>
                  </BasicTable>
                  <div class="add" @click="clickFirstAdd">
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
    <SelectDevice @register="registerModal" :minHeight="400" @handle-ok="handleOk" />
    <div class="btn mb-4">
      <a-button @click="resetFunc" class="mr-4">取消</a-button>
      <a-button type="primary" @click="submitFunc()">保存</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import SelectDevice from '../components/SelectDevice.vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { Input, Form, Select } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { sparePartAdd, columnsTable, devicesColumns } from '../data';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';
  import {
    postBackupAddApi,
    postBackupDetailApi,
    postBackupEditApi,
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
  onMounted(() => {
    funSelect();
  });
  id &&
    postBackupDetailApi({ id }).then((res) => {
      console.log('res: ', res);
      setFieldsValue(res);
      versionVal.value = res.version;
      console.log('res.version: ', res.version);
    });

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
  const [register, { getFieldsValue, setFieldsValue }] = useForm({
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
      rowSelection: {
        type: 'checkbox',
      },
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
      slots: { customRender: 'action' },
    },
  });
  //表格操作
  function clickFirstAdd() {
    const data = getDataSource();
    data.push({
      warehouseId: '',
      spareNum: '',
    });
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
  }
  function getModal() {
    openModal(true);
  }
  //关闭弹框获取到选择的值
  const DeviceVal = ref([]);
  function handleOk(data) {
    DeviceVal.value = data;
    closeModal();
  }

  //取消
  function resetFunc() {
    getRouter();
  }
  //新增
  function submitFunc() {
    const data = getFieldsValue();
    const warehouseSpareAddVOList = getDataSource();
    data['deviceIdList'] = DeviceVal.value; //关联设备
    data['warehouseSpareAddVOList'] = warehouseSpareAddVOList; //物品清单
    if (id) {
      data['id'] = id;
      data['version'] = versionVal.value;
      funAdd(postBackupEditApi, data, '编辑成功');
    } else {
      funAdd(postBackupAddApi, data, '新增成功');
    }
  }
  function funAdd(api, data, test) {
    api(data).then(() => {
      createMessage.success(test);
      getRouter();
    });
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
