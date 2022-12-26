<template>
  <PageWrapper>
    <Card>
      <BasicForm @register="registerFrom">
        <template #tableSlot>
          <AFormItemRest>
            <BasicTable @register="registerTable">
              <template #action="{ record }">
                <TableAction
                  :divider="false"
                  :stopButtonPropagation="true"
                  :actions="[
                    {
                      label: '删除',
                      onClick: handleDel.bind(null, record),
                    },
                    {
                      label: '查看图片',
                      onClick: handleLook.bind(null, record),
                    },
                  ]"
                />
              </template>
              <template #relevanceSlot="{ record }">
                <a-select
                  v-model:value="record.relevance"
                  :options="faultList"
                  style="width: 120px"
                />
              </template>
            </BasicTable>
            <div class="AddBtn" @click="handleAdd">
              <SvgIcon name="gonggong_tianjia_xianxing" size="20" />
              <span>添加</span>
            </div>
          </AFormItemRest>
        </template>
      </BasicForm>
      <div class="flex justify-center items-center">
        <a-button class="mr-4" @click="handleSave">保存</a-button>
        <a-button type="primary" @click="sumitForm">提交</a-button>
      </div>
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // import { useRouter } from 'vue-router';
  import { Card, Select, Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getCommonFormSchema, planTableColumns } from '../data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SvgIcon } from '/@/components/Icon/index';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { closeCurrent } = useTabs();
  const AFormItemRest = Form.ItemRest;
  // const router = useRouter();
  const ASelect = Select;
  const [registerFrom] = useForm({
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
  const faultList = ref<any>([
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
  ]);
  const dataSource = ref([]);
  const [registerTable, { getDataSource, setTableData }] = useTable({
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
  //提交
  async function sumitForm() {
    closeCurrent();
  }
  //保存
  async function handleSave() {
    closeCurrent();
  }
  //添加
  function handleAdd() {
    const data = getDataSource();
    data.push({
      relevance: '',
      device: '',
      Delocation: '',
      Gelocation: '',
      Grade: '',
      Types: '',
      Description: '',
    });
    console.log('数据', data);
    setTableData(data);
  }
  //删除
  function handleDel(index) {
    const data = getDataSource();
    data.splice(index, 1);
    setTableData(data);
  }
  //查看图片
  function handleLook() {}
</script>

<style lang="less" scoped>
  .AddBtn {
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

  :deep.tsit-basic-table {
    height: auto;
  }
</style>
