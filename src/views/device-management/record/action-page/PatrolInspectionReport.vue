<template>
  <div>
    <PageWrapper contentBackground contentClass="px-4 pb-4">
      <div class="mb-4 flex items-center">
        <div class="text-base text-[#414960] font-semibold">{{ descriptionsData.planName }}</div>
        <div
          v-if="descriptionsData.taskType === '2'"
          class="text-base text-[#414960] font-semibold mr-4"
          >临时隐患排查</div
        >
        <a-button v-if="descriptionsData.taskType === '2'" class="!p-0 !m-0" type="link"
          >导出</a-button
        >
      </div>
      <Description @register="register" />
    </PageWrapper>
    <PageWrapper contentBackground contentFullHeight>
      <Tabs :tabBarStyle="{ 'padding-left': '10px' }" v-model:activeKey="activeKey">
        <TabPane key="1" v-if="descriptionsData.patrolType !== '3'">
          <template #tab>
            <span>
              发现异常
              <Badge :count="descriptionsData.abnormalNum" />
            </span>
          </template>
          <CustomExceptionFound />
        </TabPane>
        <TabPane key="2" v-if="descriptionsData.patrolType !== '3'">
          <template #tab>
            <span>
              隐患上报
              <Badge :count="descriptionsData.faultNum" />
            </span>
          </template>
          <CustomHiddenDanger />
        </TabPane>
        <TabPane key="3">
          <template #tab>
            <span>
              巡检详情
              <Badge :count="descriptionsData.patrolNum" />
            </span>
          </template>
          <CustomPatrolDetail />
        </TabPane>
      </Tabs>
    </PageWrapper>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, useDescription } from '/@/components/Description';
  import { patrolInspectionReportSchema } from '../data';
  import { Tabs, TabPane, Badge } from 'ant-design-vue';
  import CustomExceptionFound from './components/CustomExceptionFound.vue';
  import CustomHiddenDanger from './components/CustomHiddenDanger.vue';
  import CustomPatrolDetail from './components/CustomPatrolDetail.vue';
  import { useRoute } from 'vue-router';
  import { mechanicalpatrolBaseListApi } from '/@/api/device-management/special-equipment';
  const activeKey = ref('1');
  const route = useRoute();
  const id = route.query.id as string;

  const descriptionsData = ref({
    abnormalNum: '',
    faultNum: '',
    alarmNum: '',
    patrolNum: '',
    planName: '',
    taskType: '',
    recordCode: '',
    patrolType: '',
  });

  onMounted(() => {
    getRecordBaseData();
  });
  //基本信息
  async function getRecordBaseData() {
    mechanicalpatrolBaseListApi({ id }).then((res) => {
      descriptionsData.value = res;
    });
  }

  const [register] = useDescription({
    data: descriptionsData,
    schema: patrolInspectionReportSchema,
    column: 2,
  });
</script>
