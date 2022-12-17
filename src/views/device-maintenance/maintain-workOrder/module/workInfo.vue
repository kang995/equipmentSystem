<template>
  <div class="px-4">
    <Description @register="register" />
    <div class="font-black text-[#414960] text-[15px] my-[16px]">保养设备</div>
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
      <!-- 保养结果 -->
      <maintainDescription
        v-if="props.status === '3' || props.status === '4' || props.status === '5'"
      />
      <!-- 验收结果 -->
      <receiveDescription v-if="props.status === '3' || props.status === '4'" />
      <div class="mt-[12px]">
        <template v-if="props.status === '1' || props.status === '2'">
          <a-button class="mr-4" v-if="again" @click="again = false">取消</a-button>
          <a-button type="primary" v-if="again" @click="handleSubmitTask">提交</a-button>
          <a-button class="mt-5 mr-4" type="primary" v-if="!again && !postpone" @click="handleAgain"
            >重新下发</a-button
          >
        </template>
        <template v-if="props.status === '2'">
          <a-button class="mr-4" type="primary" v-if="!again && !postpone" @click="handlePostpone"
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
      <div class="mt-[12px]" v-if="Postpone">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">申请延期</div>
        <div class="w-screen-sm">
          <BasicForm @register="registerPostponeFrom" />
        </div>
      </div>
      <!-- <applyForm v-if="Postpone" /> -->
      <!-- 提交验收 -->
      <div class="mt-[12px]" v-if="Result">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">处理结果</div>
        <BasicForm @register="registerResultFrom" />
      </div>
      <!-- 保养结果 -->
      <maintainDescription
        v-if="props.status === '3' || props.status === '4' || props.status === '5'"
      />
      <!-- 验收结果 -->
      <receiveDescription v-if="props.status === '4' || props.status === '5'" />
      <!-- 保养结果重新提交 -->
      <div class="mt-[12px]" v-if="Refuse">
        <div class="font-black text-[#414960] text-[15px] mb-[16px]">保养结果</div>
        <BasicForm @register="registerRefuseFrom" />
      </div>
      <div class="my-[12px]">
        <template v-if="props.status === '1'">
          <a-button
            class="mr-4 mt-10"
            type="primary"
            v-if="!Postpone && !Result"
            @click="handlePostpones"
            >申请延期</a-button
          >
          <a-button class="mt-10" type="primary" v-if="!Postpone && !Result" @click="handleResult"
            >提交验收</a-button
          >
          <a-button class="mr-4" v-if="Postpone" @click="handleClose">取消</a-button>
          <a-button type="primary" v-if="Postpone" @click="handleSubmitApply">提交</a-button>
          <a-button type="primary" v-if="Result" @click="handleSubmitAccept">提交</a-button>
        </template>
        <template v-if="props.status === '4'">
          <a-button type="primary" v-if="!Refuse" @click="handleRefuse">重新提交</a-button>
          <a-button class="mr-4" v-if="Refuse" @click="Refuse = false">取消</a-button>
          <a-button type="primary" v-if="Refuse" @click="handleSubmitMaintain">提交</a-button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // 申请人
  import reIssueForm from '/@/views/device-service/components/petitioner/reIssueForm.vue';
  import postponeForm from '/@/views/device-service/components/petitioner/postponeForm.vue';
  //执行人
  // import applyForm from '/@/views/device-service/components/executor/applyForm.vue';
  import maintainDescription from '../../components/petitioner/maintainDescription.vue';
  import receiveDescription from '../../components/petitioner/receiveDescription.vue';

  import {
    WorkDetail,
    postponeFormSchema,
    ResultFormSchema,
    RefuseFormSchema,
    keepDeviceColumns,
  } from '../data';
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
  const emit = defineEmits(['eventChange']);
  const router = useRouter();
  //保养设备
  const dataSource = ref([{}, {}]);
  const [registerTable] = useTable({
    dataSource,
    // api: thresholdListApi,
    columns: keepDeviceColumns(),
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
  let data = ref<any>({});
  const [register] = useDescription({
    data,
    schema: WorkDetail(),
    bordered: false,
    column: 3,
    size: 'default',
  });
  // 负责人
  //重新下发-提交
  function handleSubmitTask() {
    CloseFun();
  }
  //重新下发
  const again = ref<boolean>(false);
  function handleAgain() {
    again.value = true;
  }
  //延期审核
  const postpone = ref<boolean>(false);
  function handlePostpone() {
    postpone.value = true;
  }
  //延期审核-提交
  function handleSubmitResult() {
    CloseFun();
  }

  //执行人
  // 申请延期
  const Postpone = ref<boolean>(false);
  function handlePostpones() {
    Postpone.value = true;
  }
  //取消
  function handleClose() {
    // if (isShow) {
    //   CloseFun();
    // } else {
    Postpone.value = false;
    // }
  }
  //提交--申请延期
  function handleSubmitApply() {
    CloseFun();
  }
  //提交--处理结果
  function handleSubmitAccept() {
    CloseFun();
  }

  const [registerPostponeFrom, {}] = useForm({
    schemas: postponeFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  // 提交验收
  const Result = ref<boolean>(false);
  function handleResult() {
    Result.value = true;
  }
  const [registerResultFrom, {}] = useForm({
    schemas: ResultFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
  });
  //重新提交
  const Refuse = ref<boolean>(false);
  function handleRefuse() {
    Refuse.value = true;
    emit('eventChange', false);
  }
  //保养结果-提交
  function handleSubmitMaintain() {
    CloseFun();
  }
  const [registerRefuseFrom, {}] = useForm({
    schemas: RefuseFormSchema(), //表单配置
    showActionButtonGroup: false, //是否显示操作按钮(重置/提交)
    baseColProps: {
      span: 24,
    },
    labelWidth: 120,
  });
  //详情
  function handleDetails() {
    router.push({
      // name: 'maintainDetails',
    });
  }

  function CloseFun() {
    router.push({
      name: 'maintainWorkOrder',
    });
  }
</script>

<style lang="less" scoped></style>
