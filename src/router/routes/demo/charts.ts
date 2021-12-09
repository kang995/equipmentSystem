import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: 'charts',
  name: 'DemoCharts',
  component: LAYOUT,
  redirect: '/demo/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: t('routes.demo.charts.charts'),
  },
  children: [
    {
      path: 'baiduMap',
      name: 'DemoBaiduMap',
      meta: {
        title: t('routes.demo.charts.baiduMap'),
      },
      component: () => import('/@/views/demo/charts/map/Baidu.vue'),
    },
    // {
    //   path: 'gaode-map',
    //   name: 'DemoGaodeMap',
    //   meta: {
    //     title: t('routes.demo.charts.aMap'),
    //   },
    //   component: () => import('/@/views/demo/charts/map/Gaode.vue'),
    // },
    {
      path: 'gaode-map2',
      name: 'DemoGaodeMap2',
      meta: {
        title: '高德地图2',
      },
      component: () => import('/@/views/demo/charts/map/Gaode2.vue'),
    },
    {
      path: 'googleMap',
      name: 'DemoGoogleMap',
      meta: {
        title: t('routes.demo.charts.googleMap'),
      },
      component: () => import('/@/views/demo/charts/map/Google.vue'),
    },

    {
      path: 'echarts',
      name: 'DemoEcharts',
      component: getParentLayout('Echarts'),
      meta: {
        title: 'Echarts',
      },
      redirect: '/demo/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'DemoMap',
          component: () => import('/@/views/demo/charts/Map.vue'),
          meta: {
            title: t('routes.demo.charts.map'),
          },
        },
        {
          path: 'line',
          name: 'DemoLine',
          component: () => import('/@/views/demo/charts/Line.vue'),
          meta: {
            title: t('routes.demo.charts.line'),
          },
        },
        {
          path: 'pie',
          name: 'DemoPie',
          component: () => import('/@/views/demo/charts/Pie.vue'),
          meta: {
            title: t('routes.demo.charts.pie'),
          },
        },
      ],
    },
  ],
};

export default charts;
