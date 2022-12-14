<template>
  <PageWrapper>
    <Row :gutter="16">
      <Col :span="6">
        <Card>
          <a-button
            type="primary"
            preIcon="gonggong_tianjia_xianxing|svg"
            class="mb-4"
            size="small"
            :loading="exportLoading"
            @click="getAdd()"
            >添加</a-button
          >
          <a-menu
            :selectedKeys="selectedKeys"
            @click="getMenuClick"
            v-for="item in menuItems"
            :key="item.key"
          >
            <a-menu-item :key="item.key">
              <div class="flex menu-dropdown">
                {{ item.title }}
                <a-dropdown>
                  <Icon icon="gonggong_gengduo|svg" :size="20" />
                  <template #overlay>
                    <a-menu>
                      <a-menu-item class="cursor-pointer pt-1 delColor" @click="getEdit">
                        编辑
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item class="cursor-pointer pt-1 delColor"> 删除 </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </a-menu-item>
          </a-menu>
        </Card>
      </Col>
      <Col :span="18">
        <div class="mb-4">
          <Card>
            <Description @register="registerDescription" />
          </Card>
        </div>
        <BasicTable @register="register">
          <template #action="{ record }">
            <TableAction
              :divider="false"
              :stopButtonPropagation="true"
              :actions="[
                {
                  label: '详情',
                  onClick: handleDetails.bind(null, record),
                  delBtn: true,
                },
              ]"
            />
          </template>
        </BasicTable>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { backupColumns, backupFormSchema } from '../data';
  import { Row, Col, Card, Menu, Dropdown } from 'ant-design-vue';
  import { schemaDescItem } from '../data';
  import { Icon } from '/@/components/Icon';
  const router = useRouter();
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const AMenuDivider = Menu.Divider;

  const ADropdown = Dropdown;
  const selectedKeys = ref([1]);
  const exportLoading = ref(false);
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
  const dataSource = ref([{}]);
  const mockData = ref<any>([]);
  const [registerDescription] = useDescription({
    data: mockData,
    schema: schemaDescItem,
    size: 'default',
    bordered: false,
    labelStyle: { width: '180px' },
  });
  const [register] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: backupColumns,
    useSearchForm: true,
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
    formConfig: {
      schemas: backupFormSchema,
      autoSubmitOnEnter: true,
      resetButtonOptions: {
        preIcon: 'gonggong_zhongzhi|svg',
      },
      submitButtonOptions: {
        preIcon: 'gonggong_sousuo|svg',
      },
      baseColProps: {
        span: 6,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });

  function handleDetails() {
    router.push({
      name: 'BackupDetails',
    });
  }
  function getAdd() {
    router.push({
      name: 'BackupAdd',
    });
  }
  function getEdit() {
    router.push({
      name: 'BackupAdd',
    });
  }
</script>
<style scoped lang="less">
  ::v-deep(.ant-table-title) {
    min-height: 0 !important;
  }

  ::v-deep(.ant-card-body) {
    padding: 16px;
  }

  ::v-deep(.ant-form-item) {
    margin-bottom: 0;
  }

  ::v-deep(.tsit-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
    margin-bottom: 0;
  }

  .menu-dropdown {
    align-items: center;
    justify-content: space-between;
  }
</style>
