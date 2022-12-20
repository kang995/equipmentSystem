<template>
  <div :class="`${prefixCls}`">
    <FormItemRest>
      <div v-for="(item, index) in positionData" :key="index">
        <a-input-group class="!mb-2" compact>
          <div
            class="w-36px h-36px bg-[#fafafb] !rounded-md border-1 border-[#d5d7dc] border-solid text-center leading-8 text-sm !font-normal !mr-8px"
          >
            {{ index + 1 }}
          </div>
          <a-select class="!w-[38%]" v-model:value="item.longAndLatiType">
            <a-select-option
              v-for="types in locationTypeList"
              :value="types.itemValue"
              :key="types.itemValue"
              :disabled="testState"
            >
              {{ types.itemName }}
            </a-select-option>
          </a-select>
          <a-input
            v-model:value="item.longitude"
            class="!w-[25%] !text-center !border-l-0"
            placeholder="请输入经度"
            @change="longitude"
            :disabled="testState"
          />
          <a-input
            class="!w-4px !border-l-0 !pointer-events-none !bg-[#fafafb] !px-0"
            placeholder=","
            disabled
          />
          <a-input
            v-model:value="item.latitude"
            class="!w-[25%] !text-center !border-l-0 !rounded-r-md`"
            placeholder="请输入纬度"
            @change="latitude"
            :disabled="testState"
          />
          <SvgIcon
            name="gonggong_lajitong"
            class="ml-2 mt-1 border-none cursor-pointer"
            size="24"
            v-show="index > 0"
            @click="deleteList(index)"
          />
        </a-input-group>
      </div>
      <div v-if="longitudeLongitude">
        <span class="text-red-400">{{ longitudeLongitudeText }}</span>
      </div>
      <div v-if="longitudeLatitude">
        <span class="text-red-400">{{ longitudeLatitudeText }}</span>
      </div>
      <a-button
        preIcon="gonggong_tianjia_xianxing|svg"
        class="mt-3 w-full"
        @click="addAddress()"
        :disabled="testState"
      >
        添加新位置
      </a-button>
      <div class="text-[#4d79ff] cursor-pointer" @click="viewMap">预览位置</div>
      <div class="text-sm text-[#9fa3b0]">
        备注：当输入多个经纬度时，将按照输入顺序顺时针自动连接
      </div>
    </FormItemRest>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, toRefs } from 'vue';
  import { Select, Input, InputGroup, Form } from 'ant-design-vue';
  import { SvgIcon } from '/@/components/Icon';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getDictionarySelectType } from '/@/api/sys/systemSetting/dictionaryType';

  const { prefixCls } = useDesign('geographical-position');
  const ASelect = Select;
  const ASelectOption = Select.Option;
  const AInput = Input;
  const AInputGroup = InputGroup;
  const FormItemRest = Form.ItemRest;
  //经度
  const longitudeLongitude = ref(false);
  const longitudeLongitudeText = ref('');
  //纬度
  const longitudeLatitude = ref(false);
  const longitudeLatitudeText = ref('');

  interface dataListType {
    longAndLatiType: string;
    longitude: string;
    latitude: string;
  }

  interface locationType {
    itemValue: string;
    itemName: string;
  }
  onMounted(() => {
    getLocationType();
  });
  const locationTypeList = ref<locationType[]>();
  const getLocationType = async () => {
    locationTypeList.value = await getDictionarySelectType({ type: 'LOCATION_TYPE' });
  };

  //父级参数
  const props = defineProps<{
    positionData: Array<dataListType>;
    testState?: boolean;
  }>();

  // 预览位置弹窗
  const emits = defineEmits(['viewMap']);
  const viewMap = () => {
    emits('viewMap');
  };

  //新增位置
  const addAddress = () => {
    const { positionData } = toRefs(props);
    positionData.value.push({
      longAndLatiType: 'EARTH_SYSTEM',
      longitude: '',
      latitude: '',
    });
  };
  //删除位置
  const deleteList = (index: number) => {
    const { positionData } = toRefs(props);
    positionData.value.splice(index, 1);
  };
  //经度校验
  const longitude = (e: any) => {
    const val = e.target.value;
    if (!val) {
      longitudeLongitude.value = false;
      return false;
    }
    if (/[^\d^\.]/g.test(val)) {
      longitudeLongitude.value = true;
      longitudeLongitudeText.value = '经度只能输入数字和小数点';
      return false;
    }
    const lng =
      /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    if (!lng.test(val)) {
      longitudeLongitude.value = true;
      longitudeLongitudeText.value = '经度范围为-180到180,小数点后六位';
      return false;
    } else {
      longitudeLongitude.value = false;
    }
  };
  //纬度校验
  const latitude = (e: any) => {
    const val = e.target.value;
    if (!val) {
      longitudeLatitude.value = false;
      return false;
    }
    if (/[^\d^\.]/g.test(val)) {
      longitudeLatitude.value = true;
      longitudeLatitudeText.value = '纬度只能输入数字和小数点';
      return false;
    }
    const lat = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    if (!lat.test(val)) {
      longitudeLatitude.value = true;
      longitudeLatitudeText.value = '纬度范围-90到90,小数点后六位';
      return false;
    } else {
      longitudeLatitude.value = false;
    }
  };
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-geographical-position';
  .@{prefix-cls} {
    ::v-deep(.ant-select:not(.ant-select-customize-input) .ant-select-selector) {
      border-radius: 6px 0 0 6px;
    }
  }
</style>
