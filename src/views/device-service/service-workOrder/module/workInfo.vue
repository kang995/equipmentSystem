<template>
  <div class="px-4">
    <Description @register="registerOverhaul" />
    <div class="font-black text-[#414960] text-[15px] my-[16px]">检修设备</div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :stopButtonPropagation="true"
          :actions="[
            {
              label: '详情',
              onClick: handleDetails.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- 负责人 -->
    <template v-if="props.identity === '1'">
      <!-- 重新下发 -->
      <reIssueForm v-if="again" />
      <!-- 延期审核 -->
      <postponeForm v-if="postpone" />
      <!-- 检修结果 -->
      <overhaulDescription
        v-if="props.status === '3' || props.status === '4' || props.status === '5'"
      />
      <!-- 验收结果 -->
      <template v-if="props.status === '4' || props.status === '5'">
        <!-- <resultDescription/> -->
        <resultDescriptions />
      </template>
      <div class="mt-[12px] flex">
        <template v-if="props.status === '1' || props.status === '2'">
          <a-button class="mr-4" v-if="again" @click="again = false">取消</a-button>
          <a-button class="mr-4" type="primary" v-if="!again && !postpone" @click="handleAgain"
            >重新下发</a-button
          >
          <a-button type="primary" v-if="again" @click="handleSubmitTask">提交</a-button>
        </template>
        <template v-if="props.status === '2'">
          <a-button type="primary" v-if="!again && !postpone" @click="handlePostpone"
            >延期审核</a-button
          >
          <a-button class="mr-4" v-if="postpone" @click="postpone = false">取消</a-button>
          <a-button type="primary" v-if="postpone" @click="handleSubmitResult">提交</a-button>
        </template>
      </div>
    </template>
    <!-- 执行人 -->
    <template v-if="props.identity === '2'">
      <!-- 申请延期 -->
      <applyForm v-if="apply" />
      <!-- 检修结果 -->
      <acceptForm v-if="accept" />
      <!-- 检修结果反显 -->
      <overhaulDescription
        v-if="props.status === '3' || props.status === '4' || props.status === '5'"
      />
      <!-- 验收结果反显  -->
      <resultDescriptions v-if="props.status === '4' || props.status === '5'" />
      <!-- 检修结果重新提交 -->
      <acceptForm v-if="SubmitAccept" :reSubmit="'1'" />

      <div class="mt-[44px] flex">
        <template v-if="props.status === '1'">
          <a-button class="mr-4" type="primary" v-if="!apply && !accept" @click="handleApply"
            >申请延期</a-button
          >
          <a-button type="primary" v-if="!apply && !accept" @click="handleAccept"
            >提交验收</a-button
          >
          <a-button class="mr-4" v-if="apply" @click="handleClose">取消</a-button>
          <a-button type="primary" v-if="apply" @click="handleSubmitApply">提交</a-button>
          <a-button type="primary" v-if="accept" @click="handleSubmitAccept">提交</a-button>
        </template>
        <template v-if="props.status === '4'">
          <a-button class="mt-[12px]" type="primary" v-if="!SubmitAccept" @click="handleAgainSubmit"
            >重新提交</a-button
          >
          <a-button type="primary" v-if="SubmitAccept" @click="handleSubmitResult">提交</a-button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter, useRoute } from 'vue-router';
  //申请人
  import reIssueForm from '../../components/petitioner/reIssueForm.vue';
  import postponeForm from '../../components/petitioner/postponeForm.vue';
  import overhaulDescription from '../../components/petitioner/overhaulDescription.vue';
  // import resultDescription from '../../components/petitioner/resultDescription.vue'
  import resultDescriptions from '../../components/petitioner/resultDescriptions.vue';
  //执行人
  import applyForm from '../../components/executor/applyForm.vue';
  import acceptForm from '../../components/executor/acceptForm.vue';

  import { WorkDetail, deviceTableColumns } from '../data';
  const props = defineProps({
    status: {
      type: String,
      default: '',
    },
    identity: {
      type: String,
      default: '',
    },
  });
  const router = useRouter();
  const route = useRoute();
  const isShow = route.query?.isShow as string;
  onMounted(() => {
    isShow && (apply.value = true);
  });
  //执行人
  //申请延期
  const apply = ref<boolean>(false);
  function handleApply() {
    apply.value = true;
  }
  //提交验收
  const accept = ref<boolean>(false);
  function handleAccept() {
    accept.value = true;
  }
  //重新提交
  const SubmitAccept = ref<boolean>(false);
  function handleAgainSubmit() {
    SubmitAccept.value = true;
  }
  //取消
  function handleClose() {
    if (isShow) {
      CloseFun();
    } else {
      apply.value = false;
    }
  }
  //提交--申请延期
  function handleSubmitApply() {
    CloseFun();
  }
  //提交--维修结果
  function handleSubmitAccept() {
    CloseFun();
  }

  //负责人
  // 工单信息、检修明细
  let data = ref<any>({});
  const [registerOverhaul] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 3,
    size: 'default',
  });
  //检修设备
  const dataSource = ref([{}, {}]);
  const [registerTable] = useTable({
    dataSource: dataSource,
    // api: thresholdListApi,
    columns: deviceTableColumns(),
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

  //重新下发-提交
  function handleSubmitTask() {
    CloseFun();
  }
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  //延期审核-提交
  function handleSubmitResult() {
    CloseFun();
  }
  //延期审核
  const postpone = ref<boolean>(false);
  function handlePostpone() {
    postpone.value = true;
  }
  //详情
  function handleDetails() {
    router.push({
      // name: 'maintainDetails',
    });
  }
  function CloseFun() {
    router.push({
      name: 'serviceWorkOrder',
    });
  }
</script>

<style lang="less" scoped></style>
