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
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDel.bind(null, record),
                  },
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
              :loading="loading"
              @click="getAdd()"
              >添加备件</a-button
            >
            <a-button @click="handleModal">批量导入</a-button>
            <a-tooltip>
              <template #title>不选择即导出全部数据</template>
              <a-button class="ml-4" @click="exportTable" :loading="loading">批量导出</a-button>
            </a-tooltip>
          </template>
        </BasicTable>
      </Col>
    </Row>
    <ImportModal
      @register="registerImportModal"
      @handle-ok="handleOk"
      @handle-err="handleErr"
      @handle-import="handleModal"
  /></PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { backupColumns, backupFormSchema } from '../data';
  import { Tooltip, Row, Col, Card, Menu } from 'ant-design-vue';
  import { downloadByData } from '/@/utils/file/download';
  import {
    exportBackupApi,
    importData,
    importTemplate,
    postBackupListApi,
    postBackupRemoveApi,
  } from '/@/api/backup-management/backup';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';
  import { ImportModal } from '/@/components/ImportModal';
  import { useModal } from '/@/components/Modal';
  const [registerImportModal, { openModal: openImportModal }] = useModal();
  const router = useRouter();
  const ATooltip = Tooltip;
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const loading = ref<boolean>(false);
  const selectedKeys = ref<any>([1]);
  const { createMessage } = useMessage();
  function getMenuClick(item) {
    selectedKeys.value = item.keyPath;
    searchInfoList.value.deviceType = item.key;
    reload();
  }
  onMounted(() => {
    getSelect();
  });
  const menuItems = ref<any>([]); //DEVICE_TYPE  getDictionarySelectType
  function getSelect() {
    getDictionarySelectType({ type: 'DEVICE_TYPE' }).then((res) => {
      menuItems.value = res.map((v) => {
        return {
          key: v.itemValue,
          title: v.itemName,
        };
      });
      menuItems.value.unshift({ key: ' ', title: '全部' });
      selectedKeys.value = [menuItems.value[0].key];
    });
  }
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

  const [register, { reload, getSelectRowKeys }] = useTable({
    api: postBackupListApi,
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
  function handleOk() {
    reload();
  }
  const visible = ref<boolean>(false);
  const msg = ref('');
  function handleErr(err) {
    console.log(err);
    // msg.value = err.split('<br/>');
    msg.value = err;
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 3000);
  }
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
  function handleEdit(record) {
    const { id } = record;
    router.push({
      name: 'EditBackup',
      query: {
        id,
      },
    });
  }

  function exportTable() {
    const ids = getSelectRowKeys();
    loading.value = true;
    let data = {
      ids: ids,
    };
    Object.assign(data);
    exportBackupApi(data)
      .then((res) => {
        downloadByData(res, '备件列表.xlsx');
        loading.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  // 打开导入弹框
  function handleModal() {
    openImportModal(true, {
      updateSupport: 'true',
      uploadUrlApi: importData,
      downloadUrlApi: importTemplate,
    });
  }
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
