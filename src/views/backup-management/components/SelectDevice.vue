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
      v-model:target-keys="targetKeys"
      :titles="['设备选择', '已经选择设备']"
      :data-source="dataSource"
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
  import { computed, ref } from 'vue';
  import type { TransferProps, TreeProps } from 'ant-design-vue';
  import { Transfer, Tree } from 'ant-design-vue';
  const emit = defineEmits(['handleOk', 'register']);
  const [registerModal] = useModalInner(async () => {});
  //确认
  const dataList = ref([]);
  function handleOk() {
    emit('handleOk', dataList.value);
  }

  const tData: TransferProps['dataSource'] = [
    { key: '0-0', title: '0-0' },
    {
      key: '0-1',
      title: '0-1',
      children: [
        { key: '0-1-0', title: '0-1-0' },
        { key: '0-1-1', title: '0-1-1' },
      ],
    },
    { key: '0-2', title: '0-3' },
  ];

  const transferDataSource: TransferProps['dataSource'] = [];
  function flatten(list: TransferProps['dataSource'] = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(JSON.parse(JSON.stringify(tData)));

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
    return data as TreeProps['treeData'];
  }

  const targetKeys = ref<string[]>([]);

  const dataSource = ref(transferDataSource);

  const treeData = computed(() => {
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
  }
</style>
