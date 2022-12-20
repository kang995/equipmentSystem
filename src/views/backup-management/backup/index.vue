<template>
  <PageWrapper>
    <div class="mb-4">
      <Card>
        <BasicForm @register="registerForm" />
      </Card>
    </div>
    <Row :gutter="16">
      <Col :span="6">
        <Card>
          <a-menu
            :selectedKeys="selectedKeys"
            @click="getMenuClick"
            v-for="item in menuItems"
            :key="item.key"
          >
            <a-menu-item :key="item.key"> {{ item.title }} </a-menu-item>
          </a-menu>
        </Card>
      </Col>
      <Col :span="18">
        <BasicTable @register="register">
          <template #action="{ record }">
            <TableAction
              :divider="false"
              :stopButtonPropagation="true"
              :actions="[
                {
                  label: '编辑',
                  onClick: handleEdit.bind(null, record),
                  delBtn: true,
                },
                {
                  label: '详情',
                  onClick: handleDetails.bind(null, record),
                  delBtn: true,
                },
                {
                  label: '删除',
                  onClick: handleDel.bind(null, record),
                  delBtn: true,
                },
              ]"
            />
          </template>
          <template #tableTitle>
            <a-button
              type="primary"
              preIcon="gonggong_tianjia_xianxing|svg"
              class="mr-4"
              :loading="exportLoading"
              @click="getAdd()"
              >添加备件</a-button
            >
            <a-button class="mr-4">批量导入</a-button>
            <a-tooltip>
              <template #title>不选择即导出全部数据</template>
              <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
            </a-tooltip>
          </template>
        </BasicTable>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { backupColumns, backupFormSchema } from '../data';
  import { Tooltip, Row, Col, Card, Menu } from 'ant-design-vue';
  import { postBackupListApi, postBackupRemoveApi } from '/@/api/backup-management/backup';
  import { useMessage } from '/@/hooks/web/useMessage';
  const router = useRouter();
  const ATooltip = Tooltip;
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const selectedKeys = ref([1]);
  const exportLoading = ref(false);
  const { createMessage } = useMessage();
  function getMenuClick(item) {
    selectedKeys.value = item.keyPath;
  }
  const menuItems = ref([
    {
      title: '全部',
      key: 1,
    },
    {
      title: '仪表',
      key: 2,
    },
    {
      title: '罐',
      key: 3,
    },
    {
      title: '阀门',
      key: 4,
    },
    {
      title: '其他',
      key: 5,
    },
  ]);
  const [registerForm, { getFieldsValue }] = useForm({
    schemas: backupFormSchema,
    baseColProps: {
      span: 6,
    },
    rowProps: {
      gutter: 16,
    },
    submitButtonOptions: {
      text: '查询',
    },
    resetButtonOptions: {
      text: '重置',
    },
    resetFunc: resetFun,
    submitFunc: queryFun,
  });
  const searchInfoList = ref<any>({
    spareName: '',
    spareClassify: '',
    deviceType: '',
  });
  async function queryFun() {
    const { spareName, spareClassify } = getFieldsValue();
    searchInfoList.value.spareName = spareName;
    searchInfoList.value.spareClassify = spareClassify;
    reload();
  }
  async function resetFun() {
    searchInfoList.value = [];
    reload();
  }
  const dataSource = ref([{ id: '1' }]);

  const [register, { reload }] = useTable({
    dataSource: dataSource,
    // api: postBackupListApi,
    columns: backupColumns,
    rowKey: 'id',
    searchInfo: searchInfoList,
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

  function handleDel(data) {
    const id = data.id;
    postBackupRemoveApi({ id: id }).then(() => {
      createMessage.success('删除成功');
      reload();
    });
  }
  function handleDetails(data) {
    const id = data.id;
    router.push({
      name: 'BackupDetails',
      query: {
        id,
        type: '详情',
      },
    });
  }
  function getAdd() {
    router.push({
      name: 'AddBackup',
    });
  }
  function handleEdit() {
    router.push({
      name: 'EditBackup',
    });
  }

  function exportTable() {}
</script>
<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 16px;
  }

  ::v-deep(.ant-form-item) {
    margin-bottom: 0;
  }

  ::v-deep(.tsit-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
    margin-bottom: 0;
  }
</style>
