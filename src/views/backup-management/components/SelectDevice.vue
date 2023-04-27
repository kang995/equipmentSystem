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
      :target-keys="targetKeys"
      :titles="['设备选择', '已经选择设备']"
      :list-style="{
        width: '100%',
        height: '400px',
      }"
      :render="(item) => item.title"
      :showSelectAll="false"
      @change="onChange"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <Tree
          v-if="direction === 'left'"
          block-node
          checkable
          check-strictly
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
  });

  const targetKeys = ref<any>([]);
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
      //type：1、区域 2、装置设施 3、设备
      if (item.type && item.type !== 3) {
        item.disabled = true;
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
  const onChecked = (e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  };
  const onChange = (keys: string[]) => {
    targetKeys.value = keys;
  };
</script>
<style lang="less" scoped>
  ::v-deep(.ant-transfer-list-body) {
    padding-top: 16px;
    overflow-y: auto;
    box-sizing: border-box;
    height: 500px;
  }
</style>
