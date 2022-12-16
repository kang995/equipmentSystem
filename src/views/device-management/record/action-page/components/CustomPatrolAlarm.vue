<template>
  <div class="bg-white p-4">
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
            <!-- 	卡片封面 -->
            <!-- <template #cover>
              <Image :src="item.img" />
            </template>-->
            <!-- 卡片名称 -->
            <template #title>{{ item.alarmTypeText }}</template>
            <!-- 卡片内容 -->
            <Row>
              <Col class="font-semibold">报警内容：{{ item.alarmTypeText }}</Col>
            </Row>
            <Row>
              <Col class="font-semibold">报警时间：{{ item.alarmDate }}</Col>
            </Row>
            <Row>
              <Col class="font-semibold">报警地点：{{ item.alarmPlace }}</Col>
            </Row>
            <Row>
              <Col class="font-semibold">实际巡检时间：{{ item.recordDate }}</Col>
            </Row>
            <Row>
              <Col class="font-semibold">巡检人员：{{ item.patrolPersonName }}</Col>
            </Row>
            <!-- 卡片底部 -->
            <!-- <template #actions>              
            </template>-->
          </Card>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, Card, Row, Col } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const { prefixCls } = useDesign('custom-card-list');
  const ListItem = List.Item;
  const page = ref(1);
  const pageSize = ref(10);
  const totalNum = ref(0);
  const cardListData = ref([{}]);

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
