<template>
  <div :class="`${prefixCls}`">
    <div class="basic-form">
      <BasicForm
        v-if="tabActiveKey !== '-1'"
        @register="registerForm"
        :resetButtonOptions="resetButtonOptions"
        :submitButtonOptions="submitButtonOptions"
      />
    </div>
    <Card>
      <div class="grid-box">
        <div class="box-flex">
          <BasicTable
            :row-class-name="(record: any) => record.className"
            style="padding: 0; margin: 0"
            @register="registerTable"
            @row-click="rowClick"
            ref="tableRef"
          >
            <!--按钮-->
            <template #tableTitle>
              <a-button class="mr-4" @click="handleDelEdit">批量删除</a-button>
              <a-button
                class="mr-4"
                @click="handleState"
                v-if="tabActiveKey === '' || tabActiveKey === '2'"
              >
                选择已读
              </a-button>
              <!-- <a-button class="mr-4" @click="handleSign('3', '标记')" v-if="tabActiveKey !== '3'">
                选择标记
              </a-button>
              <a-button class="mr-4" @click="handleSign('4', '取消标记')">取消标记 </a-button> -->
            </template>
            <template #titleSlots="{ record }">
              <Badge
                v-if="record.readOrNo === '2'"
                :text="record.title"
                color="#ff5b56"
                class="font-bold text-body1"
              />
              <span v-if="record.readOrNo == '1'" :class="`${prefixCls}-titleSlots-read`">
                {{ record.title }}
              </span>
              <!-- <span v-if="record.state == '3'" :class="`${prefixCls}-titleSlots-sign`">
                {{ record.title }}
              </span> -->
            </template>
          </BasicTable>
        </div>

        <div :class="`${prefixCls}-descriptions`">
          <Descriptions :column="1" v-for="item in descriptionsList" :key="item">
            <template #title>
              <span :class="`${prefixCls}-title`">{{ item?.title }}</span>
            </template>
            <DescriptionsItem value="userName" :class="`${prefixCls}-detail`">
              <span class="cursor-pointer"> {{ item?.content }}</span>
            </DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, createVNode, withDefaults } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getColumns, schemasSearch } from './data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { ButtonProps } from '/@/components/Button';
  import { Modal, Card } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import {
    notificationApi,
    notificationDetailApi,
    notificationRemoveApi,
    notificationUpdateStateApi,
  } from '/@/api/workbench/index';
  import { Badge } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Descriptions } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';

  const { prefixCls } = useDesign('custom-messages');
  const DescriptionsItem = Descriptions.Item;
  const resetButtonOptions = { preIcon: 'gonggong_zhongzhi|svg' } as ButtonProps;
  const submitButtonOptions = { preIcon: 'sousuo|svg' } as ButtonProps;

  const { createMessage } = useMessage();
  const descriptionsList = ref<any>([]);
  const props = withDefaults(
    defineProps<{
      tabActiveKey: string;
      paramId?: string;
      paramState?: string;
    }>(),
    {
      tabActiveKey: '',
    },
  );

  const userStore: any = useUserStore();

  const [registerForm, { getFieldsValue }] = useForm({
    fieldMapToTime: [
      //更改RangePicker的返回字段
      ['Time', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
    ],
    rowProps: {
      gutter: 16,
    },
    baseColProps: {
      span: 6,
    },
    schemas: schemasSearch,
    submitFunc: submitFunc,
    resetFunc: resetSubmitFunc,
  });

  //自定义重置
  async function resetSubmitFunc() {
    projectQuery();
    reload();
  }
  //自定义查询
  async function submitFunc() {
    const { topicContent, serviceMessageType, startTime, endTime } = getFieldsValue();
    searchInfoList.value.topicContent = topicContent;
    searchInfoList.value.serviceMessageType = serviceMessageType;
    searchInfoList.value.startTime = startTime;
    searchInfoList.value.endTime = endTime;
    reload();
  }
  //查询接口
  async function projectQuery() {
    searchInfoList.value.topicContent = '';
    searchInfoList.value.serviceMessageType = '';
    searchInfoList.value.startTime = '';
    searchInfoList.value.endTime = '';
    searchInfoList.value.page = 1;
  }

  const searchInfoList = ref<any>({
    // title: '',
    // messageType: '',
    // startTime: '',
    // endTime: '',
    // state: props.paramId ? '2' : props.tabActiveKey,
    // id: props.paramId ? props.paramId : '',

    organId: userStore.userInfo.comId, //企业ID(必填)
    userId: userStore.userInfo.userId, //用户ID(必填)
    readOrNo: props.paramId ? '1' : props.tabActiveKey,
    id: props.paramId ? props.paramId : '',
    topicContent: '', //内容/标题（选填）
    serviceMessageType: '', //消息类型
    startTime: '',
    endTime: '',
  });
  // function messageTableDetail() {
  //   //单条跳转查询
  //   const ids = [props.paramId];
  //   if (props.paramState == '1') {
  //     try {
  //       // 更新为已读
  //       notificationUpdateStateApi({ ids, state: '2' });
  //       // 更新未读消息数量
  //       userStore.refreshMessageCount();
  //     } catch (error) {}
  //   }
  // }

  //显示详情
  function detailData(dataSource) {
    if (dataSource.length == 0) {
      descriptionsList.value = [{}];
    } else {
      Detail(dataSource[0]);
    }
  }

  const [
    registerTable,
    {
      getSelectRowKeys,
      deleteTableDataRecord,
      clearSelectedRowKeys,
      getRawDataSource,
      getDataSource,
      reload,
    },
  ] = useTable({
    api: notificationApi,
    columns: getColumns(),
    rowKey: 'id', //唯一值
    pagination: {
      showQuickJumper: false,
    },
    rowSelection: { type: 'checkbox', columnWidth: 60 },
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: false, //是否开启form搜索表单
    searchInfo: searchInfoList,
    // beforeFetch: (data) => {
    //   if (props.paramId) {
    //     messageTableDetail();
    //     data.id = props.paramId;
    //   } else {
    //     data.state = props.tabActiveKey;
    //   }
    // },
    afterFetch: (data) => {
      const { records } = getRawDataSource();
      detailData(records);
      //消息类型
      let arr = data.map((item) => {
        item['messageTypeText'] = item.title.split(']')[1];
        return item;
      });
      return arr;
    },
  });

  //点击显示详情
  function rowClick(val) {
    const tableData = getDataSource();
    tableData.forEach((item) => (item.className = ''));
    val.className = 'current-row';
    const id = val.id;
    //详情
    console.log('详情', val);
    Detail(val);
    //已读
    if (val.readOrNo === '2') {
      //1（已读）/2（未读）
      notiState([id], '1', val);
    }
  }

  //详情
  function Detail(item: any) {
    // notificationDetailApi(id).then((res) => {
    //   descriptionsList.value = [res];
    // });
    descriptionsList.value = [item];
  }
  //改变状态：已读，标记
  async function notiState(ids = [] as any, state = '', ifShow?) {
    console.log('ids: ', ids);
    try {
      await notificationUpdateStateApi({ ids, userId: userStore.userInfo.userId });
      if (state == '1') {
        createMessage.success('已读');
        // 更新未读消息数量
        await userStore.refreshMessageCount();
        reload();
      }
      // else if (state == '3') {
      //   createMessage.success('标记成功');
      //   reload();
      // } else if (state == '4') {
      //   createMessage.success('取消标记成功');
      //   reload();
      // }
    } catch (error) {
      console.log(error);
    }
    clearSelectedRowKeys();
    if (props.tabActiveKey == '2') {
      //未读
    } else {
      if (ifShow) {
        const tableData = getDataSource();
        tableData.forEach((item) => {
          if (item.id == ifShow.id) {
            // item.readOrNo = '1';
          }
        });
      }
    }
  }

  //批量已读
  function handleState() {
    handle('1', '已读');
  }

  //批量标记
  // function handleSign(val, text) {
  //   handle(val, text);
  // }

  //批量删除
  function handleDelEdit() {
    handle('', '删除');
  }
  async function handle(state?, sign?) {
    const ids = getSelectRowKeys();
    if (ids.length == 0) {
      createMessage.warning('至少选择一个' + sign);
      return;
    }
    Modal.confirm({
      title: '您确定要' + sign + '记录吗？',
      icon: createVNode(ExclamationCircleOutlined),
      autoFocusButton: null,
      onOk() {
        if (state) {
          notiState(ids, state);
        } else {
          notificationRemoveApi({ ids: ids }).then(() => {
            deleteTableDataRecord(ids);
            createMessage.success('删除成功');
            // 更新未读消息数量
            userStore.refreshMessageCount();
            reload();
          });
        }
      },
      class: 'test',
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-wrapper) {
    padding: 16px 0 16px 16px !important;
    border: none !important;
  }

  ::v-deep(.ant-card-body) {
    padding: 0 16px 0 0;
  }

  ::v-deep(.current-row) {
    background: #f1f2f5;

    td {
      background: #f1f2f5 !important;

      &.ant-table-cell-row-hover {
        background: #f1f2f5 !important;
      }
    }
  }

  ::v-deep(.current-row:hover) {
    background: #f1f2f5 !important;
  }

  ::v-deep(.tsit-basic-form .ant-form-item:not(.ant-form-item-with-help)) {
    margin-bottom: 0;
  }

  .basic-form {
    background: @component-background;
    padding: 16px;
    border: 1px solid @custom-gray4;
    border-top: none;
    border-radius: 0 6px 0 6px;
    margin-bottom: 16px;
  }

  @prefix-cls: ~'@{name-space}-custom-messages';
  .@{prefix-cls} {
    ::v-deep(.ant-table-tbody) {
      cursor: pointer;
    }

    &-descriptions {
      background: @custom-gray5;
      border: 1px solid @custom-gray4;
      margin: 69px 16px 52px 0;
      padding: 16px 10px 16px 16px;
      border-radius: 6px;
      height: 605px !important; //详情高度
    }

    &-title {
      font-size: 20px;
      font-weight: 500;
      color: @custom-body1;
    }

    &-detail {
      font-weight: 400;
      color: @custom-body2;
    }

    &-titleSlots-read {
      color: @custom-body2;
    }

    &-titleSlots-sign {
      font-weight: 500;
      color: #fa0;
    }
  }

  .grid-box {
    display: grid;
    grid-template-columns: 52% 48%;
    gap: 16px;
  }

  .box-flex {
    display: flex;
    flex-direction: column;
  }

  .pagination {
    margin: 0 0 16px 16px;
    display: flex;
    justify-content: flex-end;
  }

  ::v-deep(.ant-descriptions-item-content) {
    padding-right: 14px;
  }

  ::v-deep(.ant-descriptions) {
    overflow-y: auto;
    box-sizing: border-box;
  }

  ::v-deep(div.ant-table-body) {
    height: 550px !important;
    max-height: 550px !important;
    padding-bottom: 16px;
  }

  ::v-deep(.ant-descriptions-header) {
    margin-bottom: 16px;
  }
  // //分页
  ::v-deep(.ant-spin-container > ul) {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-top: 16px;
  }

  ::v-deep(.ant-spin-container) {
    display: flex;
    flex-direction: column;
    padding: 0 0 48px 0;
  }

  ::v-deep(.ant-table-title + .ant-table-container) {
    overflow-y: auto;
    box-sizing: border-box;
    padding-right: 10px;
    height: 605px; //更新table后
  }
</style>
