<!--绑定模型-->
<template>
  <PageWrapper contentBackground contentClass="px-16px">
    <a-button
      v-if="isNotShow && showOkButton"
      class="float-right absolute top-[50px] right-[10px]"
      type="primary"
      @click="setInfo"
    >
      确认
    </a-button>
    <iframe :src="iframeUrl" class="w-full h-[600px]" ref="iframeId"></iframe>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref, watch } from 'vue';
  // import { useRoute } from 'vue-router';
  // import { useGlobSetting } from '/@/hooks/setting';
  import {
    getInitialMap,
    // getRiskPointMap,
    // getSourceMap,
    getBindModelUrl,
  } from '/@/api/risk/riskPoint';
  import { useMessage } from '/@/hooks/web/useMessage';

  // const route = useRoute();
  const iframeId = ref<any>(null);
  const iframeUrl = ref<string>('');
  // const listId = route.query.id as string;
  // const { modelUrl } = useGlobSetting();
  const modelData = ref<any>([]);
  const loading = ref<boolean>(false);
  const isNotShow = ref<boolean>(false);
  const { createMessage } = useMessage();
  let idCode = '' as any;
  const status = ref<boolean>(false);
  // const bindingModel = route.query.bindingModel as string;
  // const isHazard = route.query.isHazard as string;

  interface ModelType {
    modelLocationList: Array<any>;
    modelNameList: Array<string>;
  }

  // 加载地图模型、获取3D模型
  async function getInfo() {
    // 从组件获取数据模型数据
    if (props.staticModelData) {
      modelData.value = props.staticModelData.modelNameList;
    }

    // 根据状态调接口获取模型回显数据
    // // 获取危险源详细信息
    // if (bindingModel === '1' && isHazard === 'hazard') {
    //   await getSourceMap(listId).then((res) => {
    //     modelData.value = res.modelNameList;
    //   });
    //   // 获取风险点详细信息
    // } else if (bindingModel === '1' && isHazard !== 'hazard') {
    //   await getRiskPointMap(listId).then((res) => {
    //     modelData.value = res.modelNameList;
    //   });
    // }

    // 获取当前模型的唯一标识
    idCode = await getIdCode();
    if (idCode) {
      isNotShow.value = true;
    } else {
      isNotShow.value = false;
    }

    // 传输回显数据
    let obj = {
      // 当前模型的唯一标识
      id: idCode,
      // 回显数据
      selected: modelData.value,
      // selected:['GQ01','GQ02','GQ06']
    };
    console.log('obj', obj);
    let jsonObj = JSON.stringify(obj);
    jsonObj = encodeURI(jsonObj);
    const getUrl = await new Promise(function (resolve) {
      getBindModelUrl().then((res) => {
        resolve(res);
      });
    });
    iframeUrl.value = getUrl + '?token=23&sign=1&plugsCode=CJ_00015&params=' + jsonObj;
    //监听模型改变
    window.addEventListener('message', function (event) {
      modelData.value = {
        params: event.data.params,
        pos: event.data.pos,
      };
      status.value = true;
    });
  }

  // 地图模型唯一标识
  function getIdCode() {
    return new Promise(function (resolve) {
      getInitialMap().then((res) => {
        resolve(res);
      });
    });
  }
  // 回传保存函数
  const emit = defineEmits(['handleSave']);
  // 确认
  function setInfo() {
    if (!props.isStatic) {
      if (status.value) {
        loading.value = true;
        emit('handleSave', modelData.value);
      } else {
        createMessage.warn('未更改模型绑定');
      }
    } else {
      createMessage.warn('此模型位置为企业综合装置设施位置，不可在此修改');
    }
  }

  //   // loading
  const props = defineProps({
    loading: {
      type: Boolean,
    },
    staticModelData: {
      type: Object as PropType<ModelType>,
    },
    isStatic: {
      type: Boolean,
    },
    showOkButton: {
      type: Boolean,
    },
  });
  // 监听loading状态
  watch(
    () => props.loading,
    (newValues) => {
      loading.value = newValues;
    },
  );
  onMounted(() => {
    getInfo();
    console.log('ddd,', props.staticModelData);
  });
</script>
