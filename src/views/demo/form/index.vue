<template>
  <PageWrapper title="表单基础示例" contentFullHeight>
    <CollapseContainer title="基础示例">
      <BasicForm
        :autoFocusFirstItem="false"
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #combination1="{ model, field }">
          <a-input-number
            v-model:value="model[field]"
            :min="0"
            addonBefore="总阅读时间超过"
            placeholder="请输入答题总时间"
            style="width: 100%"
          >
            <template #addonAfter>
              <a-select v-model:value="model['select1']" style="min-width: 100px">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </template>
          </a-input-number>
        </template>
        <template #combination2="{ model, field }">
          <a-input-group compact>
            <a-input-number
              v-model:value="model[field]"
              :min="0"
              placeholder="请输入答题总时间"
              addonBefore="总阅读时间超过"
              style="width: calc(100% - 120px)"
              class="border_radius_0"
            />
            <a-form-item-rest>
              <a-select
                v-model:value="model['select2']"
                style="width: 120px; border-right-width: 0"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-form-item-rest>
          </a-input-group>
        </template>
        <template #selectA="{ model, field }">
          <a-select
            :options="optionsA"
            mode="multiple"
            v-model:value="model[field]"
            @change="valueSelectA = model[field]"
            allowClear
          />
        </template>
        <template #selectB="{ model, field }">
          <a-select
            :options="optionsB"
            mode="multiple"
            v-model:value="model[field]"
            @change="valueSelectB = model[field]"
            allowClear
          />
        </template>
        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            :filterOption="false"
            resultField="list"
            labelField="name"
            valueField="id"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { BasicForm, FormSchema, ApiSelect } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { optionsListApi } from '/@/api/demo/select';
  import { useDebounceFn } from '@vueuse/core';
  import { treeOptionsListApi } from '/@/api/demo/tree';
  import { Select, InputNumber, InputGroup, Form } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` });

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });

  const provincesOptions = [
    {
      id: 'guangdong',
      label: '广东省',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '珠海市',
        value: '1',
        key: '1',
      },
      {
        label: '深圳市',
        value: '2',
        key: '2',
      },
      {
        label: '广州市',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1',
      },
      {
        label: '无锡市',
        value: '2',
        key: '2',
      },
      {
        label: '苏州市',
        value: '3',
        key: '3',
      },
    ],
  };

  const schemas: FormSchema[] = [
    {
      field: 'combination1',
      label: '组合样式1',
      component: 'Input',
      required: true,
      slot: 'combination1',
      defaultValue: '',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'select1',
      label: '',
      component: 'Input',
      required: true,
      defaultValue: 'jack',
      show: false,
    },
    {
      field: 'combination2',
      label: '组合样式2',
      component: 'Input',
      required: true,
      slot: 'combination2',
      defaultValue: '',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'select2',
      label: '',
      component: 'Input',
      required: true,
      defaultValue: 'jack',
      show: false,
    },
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',

      colProps: {
        span: 8,
      },
      // componentProps:{},
      // can func
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
      renderComponentContent: () => {
        return {
          prefix: () => 'pSlot',
          suffix: () => 'sSlot',
        };
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      colProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      suffix: '天',
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
          {
            label: '选项3',
            value: '3',
            key: '3',
          },
          {
            label: '选项4',
            value: '4',
            key: '4',
          },
          {
            label: '选项5',
            value: '5',
            key: '5',
          },
          {
            label: '选项6',
            value: '6',
            key: '6',
          },
          {
            label: '选项7',
            value: '7',
            key: '7',
          },
          {
            label: '选项8',
            value: '8',
            key: '8',
          },
          {
            label: '选项9',
            value: '9',
            key: '9',
          },
          {
            label: '选项10',
            value: '10',
            key: '10',
          },
          {
            label: '选项11',
            value: '11',
            key: '11',
          },
          {
            label: '选项12',
            value: '12',
            key: '12',
          },
          {
            label: '选项13',
            value: '13',
            key: '13',
          },
          {
            label: '选项14',
            value: '14',
            key: '14',
          },
          {
            label: '选项15',
            value: '15',
            key: '15',
          },
          {
            label: '选项16',
            value: '16',
            key: '16',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field8',
      component: 'Checkbox',
      label: '字段8',
      colProps: {
        span: 8,
      },
      renderComponentContent: 'Check',
    },
    {
      field: 'field9',
      component: 'Switch',
      label: '字段9',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field10',
      component: 'RadioButtonGroup',
      label: '字段10',
      colProps: {
        span: 12,
      },
      defaultValue: '1',
      componentProps: {
        buttonStyle: 'button',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
          {
            label: '选项3',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'field10_outline',
      component: 'RadioButtonGroup',
      label: '字段10_outline',
      colProps: {
        span: 12,
      },
      defaultValue: '2',
      componentProps: {
        buttonStyle: 'outline',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
          {
            label: '选项3',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'field10_text',
      component: 'RadioButtonGroup',
      label: '字段10_text',
      colProps: {
        span: 12,
      },
      defaultValue: '3',
      componentProps: {
        buttonStyle: 'text',
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
          {
            label: '选项3',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '字段11',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      field: 'divider-api-select',
      component: 'Divider',
      label: '远程下拉演示',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field30',
      component: 'ApiSelect',
      label: '懒加载远程下拉',
      required: true,
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,
        params: {
          id: 1,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: false,
        onChange: (e) => {
          console.log('selected:', e);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field31',
      component: 'Input',
      label: '下拉本地搜索',
      helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
      required: true,
      slot: 'localSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field32',
      component: 'Input',
      label: '下拉远程搜索',
      helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
      required: true,
      slot: 'remoteSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field33',
      component: 'ApiTreeSelect',
      label: '远程下拉树',
      helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: treeOptionsListApi,
        resultField: 'list',
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field34',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
      },
      defaultValue: '1',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field35',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        buttonStyle: 'outline',
        api: optionsListApi,
        params: {
          count: 4,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        isBtn: true,
      },
      colProps: {
        span: 16,
      },
    },
    {
      field: 'field36',
      component: 'ApiTree',
      label: '远程Tree',
      helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: treeOptionsListApi,
        params: {
          count: 2,
        },
        afterFetch: (v) => {
          //do something
          return v;
        },
        resultField: 'list',
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'divider-linked',
      component: 'Divider',
      label: '字段联动',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'province',
      component: 'Select',
      label: '省份',
      colProps: {
        span: 8,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动',
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [], // defalut []
        placeholder: '省份与城市联动',
      },
    },
    {
      field: 'divider-selects',
      component: 'Divider',
      label: '互斥多选',
      helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
      colProps: {
        span: 24,
      },
    },
    {
      field: 'selectA',
      component: 'Select',
      label: '互斥SelectA',
      slot: 'selectA',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'selectB',
      component: 'Select',
      label: '互斥SelectB',
      slot: 'selectB',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'divider-deconstruct',
      component: 'Divider',
      label: '字段解构',
      helpMessage: ['如果组件的值是 array 或者 object', '可以根据 ES6 的解构语法分别取值'],
      colProps: {
        span: 24,
      },
    },
    {
      field: '[startTime, endTime]',
      label: '时间范围',
      component: 'RangePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: { format: 'HH:mm:ss' },
      },
    },
    {
      field: 'divider-others',
      component: 'Divider',
      label: '其它',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field20',
      component: 'InputNumber',
      label: '字段20',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field21',
      component: 'Slider',
      label: '字段21',
      componentProps: {
        min: 0,
        max: 100,
        range: true,
        marks: {
          20: '20°C',
          60: '60°C',
        },
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field22',
      component: 'Rate',
      label: '字段22',
      defaultValue: 3,
      colProps: {
        span: 8,
      },
      componentProps: {
        disabled: false,
        allowHalf: true,
      },
    },
  ];

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      PageWrapper,
      ApiSelect,
      ASelect: Select,
      ASelectOption: Select.Option,
      AInputNumber: InputNumber,
      AInputGroup: InputGroup,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }

      return {
        schemas,
        optionsListApi,
        optionsA,
        optionsB,
        valueSelectA,
        valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: (values: any) => {
          console.log('values', values);
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        check,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.border_radius_0) {
    border-radius: 0 !important;
  }
</style>
