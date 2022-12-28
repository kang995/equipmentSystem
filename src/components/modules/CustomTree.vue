<template>
  <a-tree
    class="treeData"
    :tree-data="treeData"
    :defaultExpandAll="true"
    :replaceFields="replaceFields"
    v-if="treeData.length > 0"
  >
    <template #title="scoped">
      <slot name="CreadTitle" v-if="showSlot" :scoped="scoped"> </slot>
    </template>
  </a-tree>
</template>
<script lang="ts" setup>
  import { Tree } from 'ant-design-vue';

  const ATree = Tree;
  interface props {
    treeData?: any;
    showSlot?: Boolean;
    replaceFields?: any;
  }
  withDefaults(defineProps<props>(), {
    showSlot: false || undefined,
  });
</script>
<style lang="less">
  .treeData {
    padding-top: 8px !important;
    padding-bottom: 4px !important;
  }
</style>
