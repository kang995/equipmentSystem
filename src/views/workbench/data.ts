import { BasicColumn, FormSchema } from '/@/components/Table';
import { EChartsOption } from 'echarts';
import { getDictionarySelectType } from '/@/api/systemSetting/dictionaryType';

export interface CardParams {
  title: string;
  icon: string;
  num: string;
  unit?: string;
  url?: string;
  queryData?: any;
  bgColor?: string;
}

// 待排查、排查中table配置项
export function getWorkbenchColumns(): BasicColumn[] {
  return [
    {
      title: '任务名称',
      dataIndex: 'taskName',
    },
    {
      title: '排查类型',
      dataIndex: 'checkTypeName',
    },
    {
      title: '排查周期',
      dataIndex: 'checkPeriod',
    },
    {
      title: '排查单位',
      dataIndex: 'dutyUnitName',
    },
    {
      title: '排查人',
      dataIndex: 'dutyUserName',
    },
    {
      title: '计划开始时间',
      width: '400px',
      dataIndex: 'planBeginTime',
    },
  ];
}

// 待治理table配置项
export function getGovernColumns(): BasicColumn[] {
  return [
    {
      title: '治理任务名称',
      dataIndex: 'governName',
    },
    {
      title: '治理级别',
      dataIndex: 'hiddenLevel',
    },
    {
      title: '治理责任单位',
      dataIndex: 'governUnitName',
    },
    {
      title: '责任人',
      dataIndex: 'responsibleName',
    },
    {
      title: '隐患治理期限',
      width: '400px',
      dataIndex: 'endTime',
    },
  ];
}

// 待验收table配置项
export function getAcceptanceColumns(): BasicColumn[] {
  return [
    {
      title: '验收任务名称',
      dataIndex: 'governName',
    },
    {
      title: '治理责任单位',
      dataIndex: 'governUnitName',
    },
    {
      title: '责任人',
      dataIndex: 'responsibleName',
    },
    {
      title: '验收期限',
      width: '400px',
      dataIndex: 'endTime',
    },
  ];
}

export const hiddenDangerSchemas: FormSchema[] = [
  {
    field: 'dateType',
    component: 'RadioButtonGroup',
    label: '',
    defaultValue: '3',
    componentProps: {
      size: 'small',
      options: [
        { label: '今年', value: '0' },
        { label: '今月', value: '1' },
        { label: '本周', value: '2' },
        { label: '本日', value: '3' },
      ],
    },
  },
  {
    field: 'deviceTime',
    component: 'RangePicker',
    label: '',
  },
];

export function getColumns(): BasicColumn[] {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      slots: { customRender: 'titleSlots' },
    },
    {
      title: '接收时间',
      dataIndex: 'createTime',
    },
    {
      title: '消息类型',
      dataIndex: 'messageTypeText',
    },
  ];
}

export const schemasSearch: FormSchema[] = [
  {
    field: 'messageType',
    label: '消息类型',
    component: 'ApiSelect',
    componentProps: {
      api: getDictionarySelectType, //后台路径
      params: {
        type: 'MESSAGE_TYPE',
      },
      resultField: 'data', //后台返回数据字段
      labelField: 'itemName', //设置label字段
      valueField: 'itemValue', //设置value字段
      placeholder: '请选择消息类型',
    },
  },
  {
    field: 'Time',
    component: 'RangePicker',
    label: '接收时间',
    componentProps: {
      showTime: true,
    },
  },
  {
    field: 'title',
    label: '标题/内容',
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题/内容',
    },
  },
];

// 图表配置数据
export function getRiskECharts(titleText, seriesData): EChartsOption {
  return {
    //鼠标移动文字提示
    tooltip: {
      trigger: 'item',
      axisPointer: {
        lineStyle: {
          color: '#019680',
        },
      },
    },
    //右侧文字提示
    // legend: {
    //   orient: 'vertical',
    //   right: 10,
    //   top: 0,
    //   formatter: formatterFun,
    // },
    //图形中间文字
    title: {
      ...titleText,
      left: 'center',
      top: '20%',
      textStyle: {
        //设置主标题的 样式
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#61687C',
        lineHeight: 40,
      },
    },
    //图表数据
    series: [
      {
        colorBy: 'data',
        type: 'pie',
        center: ['50%', '38%'],
        radius: ['50%', '70%'],
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };
}
