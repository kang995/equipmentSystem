<template>
  <div class="bg-white px-4">
    <List
      :class="`${prefixCls}`"
      :grid="{ gutter: 16, column: 1, xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 }"
      :dataSource="cardListData"
      :pagination="paginationProp"
    >
      <!-- 卡片列表 -->
      <template #renderItem="{ item }">
        <ListItem>
          <Card :hoverable="true" class="!cursor-default">
            <!-- 卡片名称 -->
            <template #title>{{ item.pointName }}</template>
            <!-- 卡片内容 -->
            <Row>
              <Col :span="12" class="font-semibold">点位：{{ item.pointName }}</Col>
              <Col :span="12" class="font-semibold">驻留时间：{{ item.stayDate }}</Col>
              <Col :span="12" class="font-semibold">路线：{{ item.routeName }}</Col>
              <Col :span="12" class="font-semibold">关联摄像头：{{ item.cameraName }}</Col>
            </Row>
            <Collapse expandIconPosition="right" class="!my-4">
              <CollapsePanel header="巡检内容和结果">
                <div class="p-2">
                  <Row>
                    <Col :span="24" class="text-base font-medium text-[#171b25] mb-2">
                      巡检内容
                    </Col>
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
                              <MinusCircleOutlined v-else class="!text-[#f50] text-lx ml-1 mr-2" />
                            </template>
                            <template v-if="val.unit === '3'">
                              {{ val.values !== null || val.values !== '' ? val.values : '' }}
                            </template>
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
                            {{ val.value !== null || val.value !== '' ? val.value : '' + val.unit }}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div class="p-2">
                  <Row>
                    <Col :span="24" class="text-base font-medium text-[#171b25] mb-2">
                      巡检结果
                    </Col>
                  </Row>
                  <Row>
                    <Col :span="12" class="font-normal">
                      设备状况：{{ item.abnormalState === '1' ? '正常' : '异常' }}
                    </Col>
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
            <Row>
              <Col class="font-semibold">
                处理状态：
                <Tag v-if="item.dealState === '1'" color="error" class="!text-sm">
                  {{ item.dealStateText }}
                </Tag>
                <Tag v-if="['2', '3'].includes(item.dealState)" color="warning">
                  {{ item.dealStateText }}
                </Tag>
                <Tag v-if="item.dealState === '4'" color="success">
                  {{ item.dealStateText }}
                </Tag>
                <Tag v-if="item.dealState === '5'" color="default">
                  {{ item.dealStateText }}
                </Tag>
              </Col>
            </Row>
            <!-- 卡片底部 -->
            <!-- <template #actions>              
            </template> -->
          </Card>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, Card, Row, Col, Collapse, Tag, Image } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
  import { mechanicalAbnormalListApi } from '/@/api/device-management/special-equipment';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  // const pointId = route.query.id as string;
  const recordCode = route.query.recordCode as string;

  const CollapsePanel = Collapse.Panel;
  const { prefixCls } = useDesign('custom-card-list');
  const ListItem = List.Item;
  const page = ref(1);
  const pageSize = ref(10);
  const totalNum = ref(0);
  const cardListData = ref([]);
  // const recordCode = route.query.recordCode as string;

  //详情
  recordCode &&
    mechanicalAbnormalListApi({
      recordCode,
      abnormalState: '2', //（巡检详情：1 发现异常：2）
    }).then((res) => {
      cardListData.value = res.records;
      totalNum.value = res.total;
    });

  const paginationProp = ref({
    showQuickJumper: true,
    pageSize,
    current: page,
    total: totalNum,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
  }

  function handleDetail(id) {
    console.log('id: ', id);
    // router.push({
    //   name: 'PatrolProblemManagementIndexDetail',
    //   query: {
    //     id,
    //   },
    // });
  }

  function handlePatrolProblem() {
    // router.push({
    //   name: 'PatrolProblemManagementIndex',
    // });
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
