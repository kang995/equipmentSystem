<template>
  <PageWrapper>
    <Row :gutter="16">
      <Col :span="6">
        <Card>
          <Tree
            class="treeData"
            v-model:selectedKeys="selectedKeys"
            :tree-data="treeData"
            :defaultExpandAll="true"
            :replaceFields="{ children: 'children', title: 'label', key: 'id' }"
            @select="getSelect"
        /></Card>
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
                  ifShow: props?.ifButton ? true : false,
                },
                {
                  label: '预览模型',
                  onClick: handleModal.bind(null, record),
                  delBtn: true,
                },
                {
                  label: '新增检测记录',
                  onClick: handleTestingAdd.bind(null, record),
                  delBtn: true,
                  ifShow: props?.ifButton ? true : false,
                },
                {
                  label: '详情',
                  onClick: handleDetails.bind(null, record),
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
              v-if="ifButton"
              @click="getAdd()"
              >新增</a-button
            >
            <a-tooltip>
              <template #title>不选择即导出全部数据</template>
              <a-button @click="exportTable" :loading="loading">批量导出</a-button>
            </a-tooltip>
          </template>
        </BasicTable>
      </Col>
    </Row>
    <Modal @register="registerModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import Modal from './Modal.vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { onMounted, ref, toRefs } from 'vue';
  import { Tooltip, Row, Col, Card, Tree } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { postUnitFacilityTreeApi } from '/@/api/device-management/installation';
  import {
    postMechanicalExportApi,
    postMechanicalListApi,
  } from '/@/api/device-management/mechanics';
  import {
    postSpecialExportApi,
    postSpecialListApi,
  } from '/@/api/device-management/special-equipment';
  import { downloadByData } from '/@/utils/file/download';
  const router = useRouter();
  const ATooltip = Tooltip;
  const loading = ref(false);
  const props = defineProps<{
    columns: any;
    formSchema: any;
    ifButton?: Boolean;
    ifMechanics?: any;
  }>();
  const { ifButton } = toRefs(props);
  const searchInfoList = ref<any>({});

  const treeData = ref([]);
  const selectedKeys = ref();
  onMounted(() => {
    getTree();
  });
  function getTree() {
    postUnitFacilityTreeApi().then((res) => {
      treeData.value = res;
    });
  }
  //点击左侧树列表时
  function getSelect(keys) {
    searchInfoList.value.parentId = keys[0];
    reload();
  }
  const [registerModal, { openModal: openModal }] = useModal();

  const [register, { reload, getSelectRowKeys }] = useTable({
    api: props.ifMechanics ? postMechanicalListApi : postSpecialListApi,
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: true,
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
    formConfig: {
      schemas: props.formSchema,
      autoSubmitOnEnter: true,
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'gonggong_sousuo|svg',
      },
      resetFunc: resetFunc,
      baseColProps: {
        span: 8,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });
  //重置
  async function resetFunc() {
    searchInfoList.value.parentId = ' ';
    selectedKeys.value = [];
    reload();
  }
  function handleDetails(data) {
    let name;
    let state;
    const natureName = data.deviceNatureName; //设备类型
    const dataSource = data.dataSource; //数据来源(1:企业综合；2：本系统)
    const id = data.id;
    if (props.ifButton) {
      if (natureName === '静设备') {
        name = 'specialEquipmentDetails'; //特种设备详情静
        state = '3';
      } else {
        name = 'specialEquipmentDetailsMove'; //特种设备详情静
        state = '4';
      }
    } else {
      if (natureName === '静设备') {
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
  function getAdd() {
    router.push({
      name: 'specialEquipmentAdd',
    });
  }
  function handleEdit(data) {
    const id = data.id;
    const dataSource = data.dataSource;
    router.push({
      name: 'specialEquipmentEdit',
      query: {
        id,
        dataSource,
      },
    });
  }
  function handleTestingAdd(data) {
    const name = data.name;
    const id = data.id;
    router.push({
      name: 'TestingAdd',
      query: {
        name,
        id,
      },
    });
  }
  function handleModal() {
    openModal(true);
  }

  function exportTable() {
    const ids = getSelectRowKeys();
    loading.value = true;
    let data = {
      ids: ids,
    };
    Object.assign(data);
    if (props.ifMechanics) {
      getExport(postMechanicalExportApi, data, '机械设备');
    } else {
      getExport(postSpecialExportApi, data, '特种设备');
    }
  }
  function getExport(api, data, text) {
    api(data)
      .then((res) => {
        downloadByData(res, text + '列表.xlsx');
        loading.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>
<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 16px;
  }
</style>
