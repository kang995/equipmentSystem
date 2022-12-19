<template>
  <div class="bg-white p-4">
    <BasicForm @register="register">
      <template #tableSlot>
        <AFormItemRest>
          <div>
            <BasicTable @register="registerTable">
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
                <Select
                  ref="select"
                  placeholder="请选择仓库"
                  :options="options"
                  v-model:value="record.placeName1"
              /></template>

              <template #NumSlot="{ record }">
                <Input placeholder="请输入数量" v-model:value="record.personNum" :maxlength="30" />
              </template>
            </BasicTable>
            <div :class="`${prefixCls}-add`" @click="clickFirstAdd">
              <SvgIcon name="gonggong_tianjia_xianxing" size="20" class="ml-4px" />
              <span>添加</span>
            </div>
          </div>
        </AFormItemRest></template
      >
    </BasicForm>
  </div>
</template>
<script lang="ts" setup>
  import { Input, Form, Select } from 'ant-design-vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { inboundAdd, columnsTable } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ref } from 'vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();
  const { prefixCls } = useDesign('project-construction');
  const AFormItemRest = Form.ItemRest;
  const options = ref([
    {
      value: 'jack',
      label: '1号',
    },
    {
      value: 'lucy',
      label: '2号',
    },
  ]);
  const dataSource = ref([{}]);
  const [registerTable, { setTableData, getDataSource }] = useTable({
    dataSource: dataSource,
    columns: columnsTable, //表单列信息
    showIndexColumn: false, //是否显示序号列
    useSearchForm: false, //是否表单
    clickToRowSelect: false, //是否开启点击行选中
    pagination: false, //不显示分页
    // tableSetting: { fullScreen: true },
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const [register, {}] = useForm({
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: inboundAdd,
    actionColOptions: {
      offset: 5,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
  });

  //添加一条
  function clickFirstAdd() {
    const data = getDataSource();
    data.push({
      tankNumber: '',
      fireHazardLevel: '',
    });
    setTableData(data);
  }
  function handleDelEdit(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }
  async function resetSubmitFunc() {
    await closeCurrent();
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }

  async function sumitForm() {
    await closeCurrent();
    // router.push({
    //   name: 'InboundAndOutbound',
    // });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.tsit-basic-table .ant-table-wrapper) {
    padding: 6px;
  }

  ::v-deep(.tsit-basic-table) {
    height: calc(100% - 40px);
  }

  ::v-deep(.ant-input-number) {
    width: 100%;
  }

  ::v-deep(.ant-col-offset-3) {
    margin-left: 12%;
  }

  ::v-deep(.ant-btn-primary) {
    margin-right: 16px;
  }
  @prefix-cls: ~'@{name-space}-project-construction';
  .@{prefix-cls} {
    padding: 16px;

    &-table-span {
      width: 105px;
      color: #61687c;
    }

    .row-flex {
      display: flex;
      justify-content: space-between;
    }

    &-text-size {
      font-size: 14px;
      font-weight: 600;
      color: #414960;
      line-height: 20px;
    }

    .space-center {
      align-items: center;
    }

    &-title-center {
      font-weight: 400;
      color: #61687c;
    }

    &-input {
      display: flex;
    }

    &-tableSlot {
      display: flex;
      flex-direction: row;
    }

    &-BasicTableFirst {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &-BasicTableFirst-span {
      width: 105px;
      margin-right: 24px;
      font-size: 14px;
      font-weight: 400;
      color: #61687c;
    }

    &-add {
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
  }
</style>
