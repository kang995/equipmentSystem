<template>
  <PageWrapper>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
              auth: 'device:unitFacility:detail',
              delBtn: true,
            },
          ]"
        />
      </template>
      <template #tableTitle>
        <a-tooltip>
          <template #title>不选择即导出全部数据</template>
          <a-button
            @click="exportTable"
            :loading="loading"
            v-if="hasPermission(['device:unitFacility:export'])"
            >批量导出</a-button
          >
        </a-tooltip>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { installationColumns, installationFormSchema } from '../data';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import {
    postFacilityExportApi,
    postUnitFacilityListApi,
  } from '/@/api/device-management/installation';
  import { downloadByData } from '/@/utils/file/download';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const router = useRouter();
  const ATooltip = Tooltip;
  const loading = ref(false);
  const [register, { getSelectRowKeys }] = useTable({
    api: postUnitFacilityListApi,
    columns: installationColumns,
    rowKey: 'id',
    useSearchForm: true,
    rowSelection: {
      type: 'checkbox',
      columnWidth: 60,
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      defaultHidden: !hasPermission(['device:unitFacility:detail']),
    },
    formConfig: {
      schemas: installationFormSchema,
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

  function handleDetails(data) {
    const id = data.id;
    router.push({
      name: 'InstallationDetails',
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
    postFacilityExportApi(data)
      .then((res) => {
        downloadByData(res, '装置设置列表.xlsx');
        loading.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>
<style scoped lang="less"></style>
