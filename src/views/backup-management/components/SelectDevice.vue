<template>
  <BasicModal
    v-bind="$attrs"
    width="50%"
    title="选择设备"
    :canFullscreen="false"
    :showCancelBtn="true"
    :showOkBtn="true"
    :centered="false"
    :closable="true"
    :header="null"
    :maskClosable="false"
    :keyboard="false"
    :destroyOnClose="true"
    @register="registerModal"
    @ok="handleOk"
  >
    <Transfer
      :data-source="dataSource"
      v-model:target-keys="targetKeys"
      :titles="['设备选择', '已经选择设备']"
      :list-style="{
        width: '100%',
        height: '400px',
      }"
      :render="(item) => item.title"
      :show-select-all="true"
      :show-search="true"
      @change="onChange"
      @search="handleSearch"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <Tree
          v-if="direction === 'left' && isNotShow"
          checkable
          default-expand-all
          :checked-keys="[...selectedKeys, ...targetKeys]"
          :tree-data="treeData"
          @check="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
          @select="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
        />
      </template> </Transfer
  ></BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, ref, onMounted } from 'vue';
  import type { TransferProps, TreeProps } from 'ant-design-vue';
  import { Transfer, Tree } from 'ant-design-vue';
  import { postTreeSelectApi, postTreeSelectIdsApi } from '/@/api/backup-management/backup';
  const emit = defineEmits(['handleOk', 'register']);
  const [registerModal] = useModalInner(async (data) => {
    targetKeys.value = data;
    isNotShow.value = true;
  });

  const targetKeys = ref<any>([]);
  let isNotShow = ref<boolean>(true);
  let tData: any = ref([]);

  //确认
  const dataSourceList = ref<any>([]);
  function handleOk() {
    postTreeSelectIdsApi(targetKeys.value).then((res) => {
      dataSourceList.value = res;
      emit('handleOk', [...new Set(targetKeys.value)], dataSourceList.value);
    });
  }
  onMounted(() => {
    funTreeSelect();
  });
  function funTreeSelect() {
    postTreeSelectApi().then((res) => {
      tData.value = getData(res);
      flatten(JSON.parse(JSON.stringify(tData.value)));
    });
  }
  //拼接label
  function initFun(lable, scrapOrRemove) {
    const labelName = scrapOrRemove === '1' ? '报废' : '拆除';
    return scrapOrRemove ? `${lable}（${labelName}）` : `${lable}`;
  }
  function getData(res) {
    const data = res.map((v) => {
      if (v.children) {
        let bb = getData(v.children);
        v.children = bb;
      }
      return {
        key: v.id,
        // title: v.label,
        title: initFun(v.label, v.scrapOrRemove),
        children: v?.children,
        type: v.type,
        scrapOrRemove: v.scrapOrRemove, //scrapOrRemove:"1：报废  2：拆除"
      };
    });
    return data;
  }
  const transferDataSource: any = [];
  function flatten(list: TransferProps['dataSource'] = []) {
    list.forEach((item) => {
      //type：1、区域 2、装置设施 3、设备(数据源:添加禁用)
      if (item.type !== 3) {
        item.disabled = false;
      } else {
        item.scrapOrRemove ? (item.disabled = true) : (item.disabled = false);
      }
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
    return selectedKeys.indexOf(eventKey) !== -1;
  }
  function handleTreeData(data, targetKeys: string[] = []) {
    data.forEach((item) => {
      item['disabled'] = targetKeys.includes(item.key as any);
      if (item.children) {
        handleTreeData(item.children, targetKeys);
      }
      //type：1、区域 2、装置设施 3、设备(树结构:初始化时添加禁用)
      if (item.type && item.type !== 3) {
        item.disabled = false;
      } else {
        item.scrapOrRemove ? (item.disabled = true) : (item.disabled = false);
      }
    });
    return data;
  }
  // 数据源
  let dataSource = ref<any>(transferDataSource);
  // 树结构
  let treeData = computed<TreeProps['treeData']>(() => {
    return handleTreeData(tData.value, targetKeys.value);
  });
  // 左侧树结构复选框选择
  const peopleKey = ref<any>([]);
  const arr = [] as any;
  const onChecked = (e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) => {
    // const { eventKey } = e.node;
    // onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    console.log('onChecked', checkedKeys, e);
    peopleKey.value = [];
    e.checkedNodes?.map((item) => {
      if (item.type === 3) {
        peopleKey.value.push(item.key);
      }
    });
    const eventKey = [] as any;
    const array = [];
    e.checkedNodes?.map((item) => {
      array.push(item.key);
    });
    if (!isChecked(array, e.node.eventKey)) {
      arr.length = 0;
      recursion([e.node.dataRef]);
      console.log('arr', arr);
      arr.map((item) => {
        onItemSelect(item, false);
      });
      onItemSelect(arr, false);
    } else {
      let peoArr = [] as any;
      peoArr = e.checkedNodes?.filter((item) => item.type === 3);
      peoArr.map((item) => {
        onItemSelect(item.key, !isChecked(checkedKeys, eventKey));
      });
    }
  };
  function recursion(res) {
    res.forEach((item) => {
      const { key, type } = item;
      if (type === 3) {
        arr.push(key);
      }
      if (item.children && item.children.length !== 0) {
        recursion(item.children);
      }
    });
    // return arr;
  }
  const onChange = (keys: string[], direction, moveKeys) => {
    targetKeys.value = keys;
    console.log(keys, direction, moveKeys);
  };
  //搜索
  const handleSearch = (dir: string, value: string) => {
    console.log(dir, value);
    isNotShow.value = false;
    if (dir === 'left' && !value) {
      isNotShow.value = true;
    } else if (dir === 'right') {
      isNotShow.value = true;
    }
  };
</script>
<style lang="less" scoped>
  ::v-deep(.ant-transfer-list-body) {
    padding-top: 16px;
    overflow-y: auto;
    box-sizing: border-box;
    height: 500px;
  }

  ::v-deep(.ant-transfer-list-header) {
    background: #e2e4ea;
    color: #414960;
  }

  ::v-deep(*:not(:last-child) .ant-transfer-list-header > *:not(:last-child)) {
    display: none;
  }
  // ::v-deep(.ant-transfer-list:nth-of-type(1) .ant-transfer-list-header .ant-transfer-list-checkbox) {
  //   display: none;
  // }
</style>
