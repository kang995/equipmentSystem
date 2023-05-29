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
          <template v-if="descriptionsList.length">
            <Descriptions :column="1" v-for="item in descriptionsList" :key="item">
              <template #title>
                <span :class="`${prefixCls}-title`">{{ item?.title }}</span>
              </template>
              <DescriptionsItem value="userName" :class="`${prefixCls}-detail`">
                <div class="flex flex-col items-start">
                  <span class="cursor-pointer"> {{ item?.content }}</span>
                  <Button class="mt-2" type="primary" @click="handCheck(item)">查看详情</Button>
                </div>
              </DescriptionsItem>
            </Descriptions>
          </template>
          <div class="flex justify-center mt-50" v-else>
            <Empty :image="simpleImage" />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref, createVNode, withDefaults } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getColumns, schemasSearch } from './data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { ButtonProps } from '/@/components/Button';
  import { Modal, Card, Button } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import {
    notificationApi,
    notificatMsgDetailApi,
    // notificationDetailApi,
    notificationRemoveApi,
    notificationUpdateStateApi,
  } from '/@/api/workbench/index';
  import { Badge, Empty } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Descriptions } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  import { upkeepDetailsApi } from '/@/api/device-maintenance/work';
  import { getPlanDetailApi } from '/@/api/device-maintenance/index';
  import { UpkeepWorkOrderDetailsApi } from '/@/api/device-service/service';
  import { OverhaulPlanDetailsApi } from '/@/api/device-service/index';
  import { TroubleDetailApi } from '/@/api/corrective-maintenance/fault';
  import { postSpecialDetailApi } from '/@/api/device-management/special-equipment';

  const router = useRouter();
  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
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
    const { topicContent, messageType, startTime, endTime } = getFieldsValue();
    searchInfoList.value.topicContent = topicContent;
    searchInfoList.value.messageType = messageType;
    searchInfoList.value.startTime = startTime;
    searchInfoList.value.endTime = endTime;
    reload();
  }
  //查询接口
  async function projectQuery() {
    searchInfoList.value.topicContent = '';
    searchInfoList.value.messageType = '';
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
    messageType: '', //消息类型
    startTime: '',
    endTime: '',
  });
  //显示详情
  function detailData(dataSource) {
    if (dataSource.length == 0) {
      descriptionsList.value = [];
    } else {
      Detail(dataSource[0].id);
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
      setTableData,
    },
  ] = useTable({
    api: props.paramId ? notificatMsgDetailApi : notificationApi,
    columns: getColumns(),
    rowKey: 'id', //唯一值
    pagination: {
      showQuickJumper: false,
    },
    rowSelection: { type: 'checkbox', columnWidth: 60 },
    clickToRowSelect: false, //是否开启点击行选中
    useSearchForm: false, //是否开启form搜索表单
    searchInfo: searchInfoList,
    afterFetch: () => {
      const { records } = getRawDataSource();
      detailData(records);
      //消息类型
      // let arr = data.map((item) => {
      //   item['messageTypeText'] = item.title.split(']')[1];
      //   return item;
      // });
      // return arr;
    },
  });

  function RouterJump(routerName: string, queryObj: any) {
    router.push({
      name: routerName,
      query: queryObj,
    });
  }
  function handleJump(id: string, code: string, dataSource?: string) {
    //1、设备保养、检修
    //工单状态-- 1:未开始 2：待执行 3：待验收 4：已完成 5：验收未通过 6：计划终止
    //审批状态--1：待提交 2：审批中 3：审批通过 4：审批拒绝 5：其他
    //2、故障维修
    //故障状态-- 0：待确认 2：处理中 3：已解决 4：已转计划
    //工单状态-- 0：待处理 1：待处理(延期申请) 2：待验收 3：验收未通过 4：完成
    //3、区分计划，工单类型：BYGD-保养工单 BY-保养计划 JX-检修计划 JXGD-检修工单  TZSB-特种设备 CG-故障确认 WX-维修工单 WXYS-维修验收
    let workOrderStatus; //工单状态
    let approvalStatus; //审批状态
    let troubleStatus; //故障状态
    if (code === 'BYGD') {
      //保养工单
      upkeepDetailsApi({ id }).then((res) => {
        workOrderStatus = res.workOrderInfoVO.workOrderStatus;
        if (workOrderStatus === '1' || workOrderStatus === '2' || workOrderStatus === '6') {
          RouterJump('workOrderDetail', { id }); //保养工单详情
        } else {
          RouterJump('acceptanceDetail', { id }); //保养验收详情
        }
      });
    } else if (code === 'BY') {
      //保养计划
      getPlanDetailApi({ id }).then((res) => {
        approvalStatus = res.approvalStatus;
        if (approvalStatus === '1' || approvalStatus === '5') {
          RouterJump('planDetails', { id }); //保养计划详情
        } else {
          RouterJump('maintainDetails', { id }); //保养计划审批详情
        }
      });
    } else if (code === 'JXGD') {
      //检修工单
      UpkeepWorkOrderDetailsApi({ id }).then((res) => {
        workOrderStatus = res.workOrderInfoVO.workOrderStatus;
        if (workOrderStatus === '1' || workOrderStatus === '2' || workOrderStatus === '6') {
          RouterJump('overhaulDetail', { id }); //检修工单详情
        } else {
          RouterJump('checkDetail', { id }); //检修验收详情
        }
      });
    } else if (code === 'JX') {
      //检修计划
      OverhaulPlanDetailsApi({ id }).then((res) => {
        approvalStatus = res.approvalStatus;
        if (approvalStatus === '1' || approvalStatus === '5') {
          RouterJump('planManagementDetails', { id }); //检修计划详情
        } else {
          RouterJump('planAuditDetails', { id }); //检修计划审批详情
        }
      });
    } else if (code === 'CG') {
      //故障确认
      TroubleDetailApi({ id }).then((res) => {
        troubleStatus = res.troubleStatus;
        if (troubleStatus) {
          RouterJump('confirmDetail', { id }); //故障确认详情
        }
      });
    } else if (code === 'WX') {
      //维修工单
      RouterJump('repairDetail', { id }); //维修工单详情
    } else if (code === 'WXYS') {
      //维修验收
      RouterJump('checkDetails', { id }); //维修验收详情
    } else if (code === 'TZSB') {
      //特种设备
      postSpecialDetailApi({ id, dataSource }).then((res) => {
        const natureType = res.deviceNature; //设备类型 1静0动
        if (res.specialEquip === 'yes') {
          if (natureType === '1') {
            RouterJump('specialEquipmentDetails', { id, state: '3', dataSource }); //特种设备详情静
          } else {
            RouterJump('specialEquipmentDetailsMove', { id, state: '4', dataSource }); //特种设备详情动
          }
        }
      });
    }
  }
  //详情跳转
  function handCheck(item) {
    try {
      // let webNotifyUrl = location.origin + '/device/#/device-maintenance/maintain-workOrder/workOrder-details?id=1651144002901430273&code=TZSB&dataSource=2';
      let webNotifyUrl = item.webNotifyUrl;
      let urlStr = webNotifyUrl.split('?')[1];
      let valArr = urlStr.split('&');
      let id = valArr[0].split('=')[1];
      let code = valArr[1].split('=')[1];
      if (valArr[2]) {
        let dataSource = valArr[2].split('=')[1];
        handleJump(id, code, dataSource);
      } else {
        handleJump(id, code);
      }
      // console.log('urlStr', urlStr);
      // console.log('参数', id, code, dataSource);
    } catch (e) {
      console.error('查看详情错误');
    }
  }
  //点击显示详情
  function rowClick(val) {
    const tableData = getDataSource();
    tableData.forEach((item) => (item.className = ''));
    val.className = 'current-row';
    const id = val.id;
    //详情
    console.log('详情', val);
    Detail(id);
    //已读
    if (val.readOrNo === '2') {
      //1（已读）/2（未读）
      notiState([id], '1', val);
    }
  }

  //详情
  function Detail(id: string) {
    notificatMsgDetailApi({ id }).then((res) => {
      descriptionsList.value = [res];
    });
    // descriptionsList.value = [item];
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
    if (props.tabActiveKey == '1') {
      //已读
    } else {
      console.log('ifShow', ifShow);
      if (ifShow) {
        const tableData = getDataSource();
        tableData.forEach((item) => {
          if (item.id == ifShow.id) {
            item.readOrNo = '1'; //置为已读
          }
        });
        setTableData(tableData);
      } else {
        reload();
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
          notificationRemoveApi({ idList: ids }).then(() => {
            deleteTableDataRecord(ids);
            createMessage.success('删除成功');
            // 更新未读消息数量
            userStore.refreshMessageCount();
            if (props.paramId) {
              descriptionsList.value = [];
              clearSelectedRowKeys();
            } else {
              reload();
            }
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
