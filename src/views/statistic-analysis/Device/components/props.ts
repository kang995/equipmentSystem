import { PropType } from 'vue';
import { EChartsOption } from 'echarts';

export interface BasicProps {
  width: string;
  height: string;
}
export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '280px',
  },
};

type EChartsFuncParam = {
  titleText: object;
  seriesData: object[];
  radius?: string;
  formatter?: (name: string) => string;
  centerTitle?: string;
};

type formatParams = {
  name: string;
  value: string;
  percent: string;
};

// export function getAlarmECharts({
//   titleText,
//   seriesData,
//   radius = '',
//   formatter,
//   centerTitle = '',
// }: EChartsFuncParam): EChartsOption {
//   return {
//     //鼠标移动文字提示
//     tooltip: {
//       trigger: 'item',
//       axisPointer: {
//         lineStyle: {
//           color: '#019680',
//         },
//       },
//     },
//     //图形中间文字
//     title: {
//       ...titleText,
//       left: '20',
//       top: '5px',
//       textStyle: {
//         //设置主标题的 样式
//         fontSize: '14px',
//         fontWeight: 600,
//         color: '#61687C',
//       },
//     },
//     legend: {
//       top: 'center',
//       right: '40',
//       itemGap: 10,
//       orient: 'vertical',
//       formatter: formatter
//         ? formatter
//         : function (name) {
//             const params = seriesData.find((item: formatParams) => item.name == name);
//             if (params) {
//               return name + '{value|' + params['value'] + '}';
//             } else {
//               return '';
//             }
//           },
//       textStyle: {
//         rich: {
//           title: {
//             fontSize: 14,
//             lineHeight: 22,
//             width: 200,
//             height: 20,
//           },
//           value: {
//             fontSize: 14,
//             width: 130,
//             height: 20,
//             align: 'center',
//           },
//         },
//       },
//     },
//     //图表数据
//     series: [
//       {
//         colorBy: 'data',
//         type: 'pie',
//         center: ['25%', '55%'],
//         radius: radius ? radius : ['50%', '70%'],
//         data: seriesData,
//         label: radius
//           ? { show: false }
//           : {
//               show: true,
//               position: 'center',
//               formatter: centerTitle,
//               fontWeight: 600,
//               lineHeight: 25,
//               fontSize: 16,
//               color: '#61687C',
//               rich: {
//                 value: {
//                   fontSize: 20,
//                   fontWeight: 600,
//                 },
//               },
//             },
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: 'rgba(0, 0, 0, 0.5)',
//           },
//         },
//       },
//     ],
//   };
// }

// 饼图配置
export function getPieECharts({
  titleText,
  seriesData,
  radius = '',
  formatter,
  centerTitle = '',
}: EChartsFuncParam): EChartsOption {
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
    //图形中间文字
    title: {
      ...titleText,
      left: '20',
      top: '5px',
      textStyle: {
        //设置主标题的 样式
        fontSize: '14px',
        fontWeight: 600,
        color: '#61687C',
      },
    },
    legend: {
      top: 'center',
      right: '40',
      orient: 'vertical',
      formatter: formatter
        ? formatter
        : function (name) {
            const params = seriesData.find((item: formatParams) => item['name'] == name);
            if (params)
              return (
                name +
                params['value'] +
                '件' +
                (params['percent'] ? '（' + params['percent'] + '）' : '')
              );
            else return '';
          },
    },
    //图表数据
    series: [
      {
        colorBy: 'data',
        type: 'pie',
        center: ['25%', '55%'],
        radius: radius ? radius : ['50%', '70%'],
        data: seriesData,
        label: radius // 指示线
          ? {}
          : {
              show: true,
              position: 'center',
              formatter: centerTitle,
              fontWeight: 600,
              lineHeight: 25,
              fontSize: 16,
              color: '#61687C',
              rich: {
                value: {
                  fontSize: 20,
                  fontWeight: 600,
                },
              },
            },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
}
