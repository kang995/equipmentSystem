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
      :showSelectAll="false"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <Tree
          v-if="direction === 'left'"
          :fieldNames="{ children: 'children', title: 'label', key: 'id' }"
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
  import { postTreeSelectApi } from '/@/api/backup-management/backup';
  const emit = defineEmits(['handleOk', 'register']);
  const [registerModal] = useModalInner(async () => {});

  const targetKeys = ref<any>([]);

  //确认
  const dataList = ref([]);
  function handleOk() {
    emit('handleOk', [...new Set(targetKeys.value)]);
  }
  onMounted(() => {
    funTreeSelect();
  });
  function funTreeSelect() {
    postTreeSelectApi().then((res) => {
      tData = res;
      flatten(JSON.parse(JSON.stringify(tData)));
    });
  }

  let tData: TreeProps['treeData'] = [];
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
    console.log('onItemSelect: ', onItemSelect);
    const { eventKey } = e.node;
    dataList.value = eventKey;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
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
