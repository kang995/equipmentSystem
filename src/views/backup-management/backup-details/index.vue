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
            v-if="hasPermission(['device:warehouse:save'])"
            >添加</a-button
          >
          <div v-if="menuItems.length > 0">
            <a-menu
              :selectedKeys="selectedKeys"
              @click="getMenuClick"
              v-for="item in menuItems"
              :key="item.id"
            >
              <a-menu-item :key="item.id">
                <div class="flex menu-dropdown">
                  <div>
                    <a-typography-paragraph
                      style="width: 200px; margin-bottom: 0 !important"
                      :style="{ cursor: 'pointer' }"
                      :ellipsis="{ tooltip: true }"
                      :content="`${item.name}`"
                    />
                  </div>
                  <a-dropdown>
                    <Icon icon="gonggong_gengduo|svg" :size="20" />
                    <template #overlay>
                      <a-menu>
                        <a-menu-item
                          class="cursor-pointer pt-1 delColor"
                          @click="getEdit(item.id)"
                          v-if="hasPermission(['device:warehouse:update'])"
                        >
                          编辑
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item
                          class="cursor-pointer pt-1 delColor"
                          @click="getDel(item.id)"
                          v-if="hasPermission(['device:warehouse:remove'])"
                        >
                          删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </a-menu-item>
            </a-menu>
          </div>
          <div class="my-6" v-else><EmptyState /></div>
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
                  auth: 'device:warehouse:detail',
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
  import EmptyState from '/@/views/workbench/components/EmptyState.vue';
  import { Description, useDescription } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { detailsListColumns, backupFormSchema } from '../data';
  import { Row, Col, Card, Menu, Dropdown, TypographyParagraph } from 'ant-design-vue';
  import { schemaDescItem } from '../data';
  import { Icon } from '/@/components/Icon';
  import {
    postWarehouseDetailApi,
    postWarehouseListApi,
    posWarehouseRemoveApi,
    posWarehouseSpareApi,
  } from '/@/api/backup-management/backup-details';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const router = useRouter();
  const AMenu = Menu;
  const AMenuItem = Menu.Item;
  const AMenuDivider = Menu.Divider;
  const ATypographyParagraph = TypographyParagraph;
  const { createMessage } = useMessage();

  const searchInfoList = ref<any>({});
  const ADropdown = Dropdown;
  const selectedKeys = ref([1]);
  const exportLoading = ref(false);
  function getMenuClick(item) {
    selectedKeys.value = item.keyPath;
    const id = item.key;
    getDetail(id);
    // warehouseId = id;
    searchInfoList.value.warehouseId = id;
    reload();
  }
  onMounted(() => {
    getWarehouseSpare();
  });
  const menuItems = ref<any>([]);
  const mockData = ref<any>([]);
  const [registerDescription] = useDescription({
    data: mockData,
    schema: schemaDescItem,
    size: 'default',
    bordered: false,
    column: 2,
  });
  const [register, { reload }] = useTable({
    api: posWarehouseSpareApi,
    columns: detailsListColumns,
    useSearchForm: true,
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
      defaultHidden: !hasPermission(['device:warehouse:detail']),
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
        span: 8,
      },
      rowProps: {
        gutter: 16,
      },
    },
  });
  function getWarehouseSpare() {
    postWarehouseListApi().then((res) => {
      menuItems.value = res.records.map((v) => {
        return {
          id: v.warehouseId,
          name: v.warehouseName,
        };
      });
      const idFirst = menuItems.value[0].id;
      selectedKeys.value = [idFirst];
      searchInfoList.value.warehouseId = idFirst;
      reload();
      getDetail(idFirst);
    });
  }
  function getDetail(id) {
    postWarehouseDetailApi({ id: id }).then((res) => {
      mockData.value = res;
    });
  }
  function getDel(id) {
    posWarehouseRemoveApi({ id }).then(() => {
      getWarehouseSpare();
      createMessage.success('删除成功');
    });
  }
  function handleDetails(data) {
    const id = data.spareId;
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
      name: 'BackupAdd',
    });
  }
  function getEdit(id) {
    router.push({
      name: 'BackupEdit',
      query: {
        id,
      },
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
