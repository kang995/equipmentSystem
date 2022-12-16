<template>
  <div class="bg-white p-4">
    <div class="flex space-x-4 mb-4">
      <label class="mt-2 ml-4">点位</label>
      <Select
        class="!w-80"
        :options="pointSelectOptions"
        placeholder="请选择点位"
        @change="pointSelectChange"
        :allowClear="true"
      />
    </div>
    <List
      :class="`${prefixCls}`"
      :grid="{ gutter: 16, column: 1, xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 }"
      :dataSource="cardListData"
      :pagination="paginationProp"
    >
      <!-- 卡片列表 -->
      <template #renderItem="{ item }">
        <ListItem>
          <BadgeRibbon
            :text="item.patrolState === '1' ? '已巡检' : '未巡检'"
            :color="item.patrolState !== '1' ? 'red' : 'blue'"
          >
            <Card :hoverable="true">
              <!-- 	卡片封面 -->
              <!-- <template #cover>
              <Image :src="item.img" />
            </template>-->
              <!-- 卡片名称 -->
              <template #title>{{ item.pointName }}</template>
              <!-- 卡片内容 -->
              <Row>
                <Col :span="12" class="font-semibold">驻留时间：{{ item.stayDate }}</Col>
                <Col :span="12" class="font-semibold">巡检路线：{{ item.routeName }}</Col>
              </Row>
              <Row>
                <Col :span="24" class="font-semibold">关联摄像头：{{ item.cameraName }}</Col>
              </Row>
              <Collapse expandIconPosition="right" class="!my-4" v-if="item.patrolType !== '3'">
                <CollapsePanel header="巡检内容和结果">
                  <div class="p-2">
                    <Row>
                      <Col :span="24" class="text-base font-medium text-[#171b25] mb-2"
                        >巡检内容</Col
                      >
                    </Row>
                    <Row>
                      <Col :span="24" class="!flex">
                        <div class="font-normal">检查项：</div>
                        <div class="flex flex-col">
                          <Row
                            class="!flex-col"
                            v-for="(val, _index) in item.checkList"
                            :key="_index"
                          >
                            <Col>
                              {{ _index + 1 + '.' + val.check }}
                              {{ val.standard !== '' ? `(标准项：${val.standard})` : '' }}
                            </Col>
                            <Col class="!mb-4">
                              <template
                                v-for="(valList, _indexList) in val.valueList"
                                :key="_indexList"
                              >
                                {{ valList }}
                                <CheckCircleOutlined
                                  v-if="val.values.indexOf(valList) !== -1"
                                  class="!text-[#52c41a] text-lx ml-1 mr-2"
                                />
                                <MinusCircleOutlined
                                  v-else
                                  class="!text-[#f50] text-lx ml-1 mr-2"
                                />
                              </template>
                              <template v-if="val.unit === '3'">{{
                                val.values !== null || val.values !== '' ? val.values : ''
                              }}</template>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="24" class="!flex">
                        <div class="font-normal">抄表项：</div>
                        <div class="flex flex-col">
                          <Row
                            class="!flex-col"
                            v-for="(val, _index) in item.meterReadList"
                            :key="_index"
                          >
                            <Col>
                              {{ _index + 1 + '.' + val.meterRead }}
                              {{
                                val.standard !== null || val.standard !== ''
                                  ? `(标准项：${val.standard})`
                                  : ''
                              }}
                            </Col>
                            <Col class="!mb-2">
                              {{
                                val.value !== null || val.value !== '' ? val.value : '' + val.unit
                              }}
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div class="p-2">
                    <Row>
                      <Col :span="24" class="text-base font-medium text-[#171b25] mb-2"
                        >巡检结果</Col
                      >
                    </Row>
                    <Row>
                      <Col :span="12" class="font-normal"
                        >设备状况：{{ item.abnormalState === '1' ? '正常' : '异常' }}</Col
                      >
                      <Col :span="12" class="font-normal">备注：{{ item.remark }}</Col>
                    </Row>
                    <Row>
                      <Col :span="24" class="font-normal !flex">
                        <div>图片上传：</div>
                        <div class="flex-1">
                          <template v-for="(val, _index) in item.fileList" :key="_index">
                            <Image class="!w-100px" :src="val.url" />
                          </template>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CollapsePanel>
              </Collapse>
              <!-- 卡片底部 -->
              <!-- <template #actions>              
            </template>-->
            </Card>
          </BadgeRibbon>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, Card, Row, Col, Select, Badge, Collapse, Image } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRoute } from 'vue-router';
  import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';

  const { prefixCls } = useDesign('custom-card-list');
  const BadgeRibbon = Badge.Ribbon;
  const pointSelectOptions = ref([]);
  const ListItem = List.Item;
  const CollapsePanel = Collapse.Panel;
  const route = useRoute();
  const recordCode = route.query.recordCode as string;
  const cardListData = ref([{}]);
  const page = ref(1);
  const pageSize = ref(10);
  const paginationProp = ref({});
  const pointIdVal = ref('');

  async function getProblemReportData(pointId) {
    paginationProp.value = {
      showQuickJumper: true,
      pageSize,
      current: page,
      total: 10,
      showTotal: (total) => `总 ${total} 条`,
      onChange: pageChange,
      onShowSizeChange: pageSizeChange,
    };
  }

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
    getProblemReportData(pointIdVal.value);
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    getProblemReportData(pointIdVal.value);
  }

  function pointSelectChange(val) {
    pointIdVal.value = val;
    getProblemReportData(val);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-custom-card-list';
  .@{prefix-cls} {
    ::v-deep(.ant-card-body) {
      padding: 16px;
    }
  }
</style>
