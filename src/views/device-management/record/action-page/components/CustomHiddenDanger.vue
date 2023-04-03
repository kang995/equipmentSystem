<template>
  <div class="bg-white px-4">
    <List
      :class="`${prefixCls}`"
      :grid="{ gutter: 16, column: 3, xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0, xxxl: 0 }"
      :dataSource="cardListData"
      :pagination="paginationProp"
    >
      <!-- 卡片列表 -->
      <template #renderItem="{ item }">
        <ListItem>
          <Card :hoverable="true">
            <template #title>{{ item.pointName }}</template>
            <!-- 卡片内容 -->
            <Row>
              <Col :span="24" class="font-semibold pb-2">点位名称：{{ item.pointName }}</Col>
              <Col :span="24" class="font-semibold pb-2">隐患名称：{{ item.hiddenName }}</Col>
              <Col :span="24" class="font-semibold pb-2">所属风险点：{{ item.riskName }}</Col>
              <Col :span="24" class="font-semibold pb-2">隐患级别：{{ item.hiddenLevelName }}</Col>
              <Col :span="24" class="font-semibold pb-2">异常描述：{{ item.describeContent }}</Col>
              <Col :span="24" class="font-semibold pb-2">
                是否现场解决：{{ item.sceneSolve === '1' ? '是' : '否' }}
              </Col>
              <Col :span="24" class="font-semibold pb-2">备注：{{ item.describeContent }}</Col>
              <Col :span="24" class="font-semibold pb-2">异常描述：{{ item.describeContent }}</Col>
              <Col :span="24" class="font-semibold pb-2"
                >图片/视频上传：
                <div class="flex-1">
                  <template v-for="(val, _index) in item.hiddenPicList" :key="_index">
                    <Image class="!w-100px" :src="val.url" />
                  </template>
                </div>
              </Col>
            </Row>
          </Card>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, Card, Row, Col, Image } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRoute } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { mechanicalFaultListApi } from '/@/api/device-management/special-equipment';

  const { hasPermission } = usePermission();
  const { prefixCls } = useDesign('custom-card-list');
  const ListItem = List.Item;
  const page = ref(1);
  const pageSize = ref(10);
  const totalNum = ref(0);
  const cardListData = ref([]);
  const route = useRoute();
  const recordCode = route.query.recordCode as string;

  //详情
  recordCode &&
    mechanicalFaultListApi({
      recordCode,
    }).then((res) => {
      cardListData.value = res.records;
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
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-custom-card-list';
  .@{prefix-cls} {
    ::v-deep(.ant-list-header) {
      border-bottom: none;
    }

    ::v-deep(.ant-card-body) {
      padding: 16px;
    }

    ::v-deep(.ant-col-8) {
      max-width: 25.3%;
    }
  }
</style>
