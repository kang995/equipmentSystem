<template>
  <PageWrapper>
    <Row :gutter="16">
      <Col :span="6">
        <Card>
          <CustomTree
            :showSlot="true"
            :treeData="treeData"
            :fieldNames="{ children: 'children', title: 'title', key: 'key' }"
          >
            <template #CreadTitle="{ scoped }">{{ scoped.title }} </template>
          </CustomTree>
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
              :loading="exportLoading"
              @click="getAdd()"
              >新增</a-button
            >
            <a-tooltip>
              <template #title>不选择即导出全部数据</template>
              <a-button @click="exportTable" :loading="exportLoading">批量导出</a-button>
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
  import CustomTree from '/@/components/modules/CustomTree.vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { ref, toRefs } from 'vue';
  import { Tooltip, Row, Col, Card } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  const router = useRouter();
  const ATooltip = Tooltip;
  const exportLoading = ref(false);
  const props = defineProps<{
    // dataSource: any;
    columns: any;
    formSchema: any;
    ifButton?: Boolean;
    ifMechanics?: any;
  }>();
  const { ifButton } = toRefs(props);
  const dataSource = ref([{}]);
  const dataSource1 = ref([{}]);

  const treeData = [
    {
      title: '生产区1号',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
        },
      ],
    },
    {
      title: '生产区2号',
      key: '0-06',
      children: [
        {
          title: 'parent 1-1',
          key: '0-0-17',
        },
      ],
    },
    {
      title: '生产区3号',
      key: '0-7',
    },
    {
      title: '生产区4号',
      key: '0-70',
    },
  ];
  const [registerModal, { openModal: openModal }] = useModal();

  const [register] = useTable({
    dataSource: props.ifMechanics ? dataSource : dataSource1,
    // api: thresholdListApi,
    columns: props.columns,
    rowKey: 'id',
    useSearchForm: true,
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
      baseColProps: {
        span: 8,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });

  function handleDetails() {
    let name;
    let id;
    let state;
    if (props.ifButton) {
      name = 'specialEquipmentDetails'; //特种设备详情静
      state = '3';
    } else {
      name = 'MechanicsDetails'; //机械设备详情静
      state = '2';
    }
    router.push({
      name: name,
      query: {
        id,
        state,
      },
    });
  }
  function getAdd() {
    router.push({
      name: 'specialEquipmentAdd',
    });
  }
  function handleEdit() {
    router.push({
      name: 'specialEquipmentEdit',
    });
  }
  function handleTestingAdd() {
    router.push({
      name: 'TestingAdd',
    });
  }
  function handleModal() {
    openModal(true);
  }
  function exportTable() {}
</script>
<style scoped lang="less">
  ::v-deep(.ant-card-body) {
    padding: 16px;
  }

  // ::v-deep(.tsit-basic-table .ant-table-wrapper) {
  //   border-left: none;
  // }
</style>
