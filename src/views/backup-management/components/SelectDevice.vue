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

  const props = defineProps<{
    targetval?: Array<any>;
  }>();
  const targetKeys = ref<any>([]);
  let tData: any = [];

  //确认
  const dataSourceList = ref<any>([]);
  function handleOk() {
    emit('handleOk', [...new Set(targetKeys.value)], dataSourceList.value);
  }
  onMounted(() => {
    funTreeSelect();
    targetKeys.value = props.targetval;
  });
  function funTreeSelect() {
    postTreeSelectApi().then((res) => {
      tData = getData(res);
      flatten(JSON.parse(JSON.stringify(tData)));
    });
  }
  function getData(res) {
    const data = res.map((v) => {
      if (v.children) {
        let bb = getData(v.children);
        v.children = bb;
      }
      return {
        key: v.id,
        title: v.label,
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
    });
    return data;
  }
  // 数据源
  let dataSource = ref<any>(transferDataSource);
  // 树结构
  let treeData = computed<TreeProps['treeData']>(() => {
    return handleTreeData(tData, targetKeys.value);
  });
  const onChecked = (e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  };
  const onChange = (keys: string[]) => {
    dataSourceList.value = [];
    postTreeSelectIdsApi(keys).then((res) => {
      dataSourceList.value = res;
    });
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
