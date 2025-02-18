/**
 * Vite plugin for website theme color switching
 * https://github.com/anncwb/vite-plugin-theme
 */
import type { PluginOption } from 'vite';
import path from 'path';
import {
  viteThemePlugin,
  antdDarkThemePlugin,
  mixLighten,
  mixDarken,
  tinycolor,
} from 'vite-plugin-theme';
import { getThemeColors, generateColors } from '../../config/themeConfig';
import { generateModifyVars } from '../../generate/generateModifyVars';

export function configThemePlugin(isBuild: boolean): PluginOption[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });
  // 抽取出viteThemePlugin插件，下方会根据不同环境设置enforce
  const vite_theme_plugin = viteThemePlugin({
    resolveSelector: (s) => {
      s = s.trim();
      switch (s) {
        case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
          return '.ant-steps-item-icon > .ant-steps-icon';
        case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)':
        case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover':
        case '.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active':
          return s;
        case '.ant-steps-item-icon > .ant-steps-icon':
          return s;
        case '.ant-select-item-option-selected:not(.ant-select-item-option-disabled)':
          return s;
        default:
          if (s.indexOf('.ant-btn') >= -1) {
            // 按钮被重新定制过，需要过滤掉class防止覆盖
            return s;
          }
      }
      return s.startsWith('[data-theme') ? s : `[data-theme] ${s}`;
    },
    colorVariables: [...getThemeColors(), ...colors],
  });
  //console.log('vite_theme_plugin:'+JSON.stringify(vite_theme_plugin));
  vite_theme_plugin.forEach(function (item) {
    //对vite:theme插件特殊配置
    if ('vite:theme' === item.name) {
      //console.log(item);
      // 打包时去除enforce: "post"，vite 2.6.x适配，否则生成app-theme-style为空，因为async transform(code, id) {的code没有正确获取
      if (isBuild) {
        delete item.enforce;
      }
      //console.log(item);
    }
  });
  //console.log('vite_theme_plugin后:'+JSON.stringify(vite_theme_plugin));
  // 蓝湖设计图规定的颜色
  const Title = '#ffffff';
  const Body1 = 'rgba(255, 255, 255, 0.95)';
  const Body2 = 'rgba(255, 255, 255, 0.75)';
  const Body3 = 'rgba(255, 255, 255, 0.65)';
  const Gray1 = 'rgba(255, 255, 255, 0.25)';
  const Gray2 = 'rgba(255, 255, 255, 0.2)';
  const Gray3 = 'rgba(255, 255, 255, 0.15)';
  const Gray4 = 'rgba(255, 255, 255, 0.1)';
  const Gray5 = 'rgba(255, 255, 255, 0.05)';

  const componentBg = '#303030';
  const selectedBg = '#61687c';

  const plugin = [
    vite_theme_plugin,
    // 黑暗模式，颜色层穿透bug较多
    antdDarkThemePlugin({
      preloadFiles: [
        path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'),
        //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
        path.resolve(process.cwd(), 'src/design/index.less'),
      ],
      filter: (id) => (isBuild ? !id.endsWith('antd.less') : true),
      // extractCss: false,
      darkModifyVars: {
        ...generateModifyVars(true),
        'text-color': '#c9d1d9',
        'primary-1': 'rgb(255 255 255 / 8%)',
        'text-color-base': '#c9d1d9',
        'component-background': '#151515',
        'heading-color': 'rgb(255 255 255 / 65%)',
        // black: '#0e1117',
        // #8b949e
        'text-color-secondary': '#8b949e',
        'border-color-base': '#303030',
        // 'border-color-split': '#30363d',
        'item-active-bg': '#111b26',
        'app-content-background': '#1e1e1e',
        'tree-node-selected-bg': '#11263c',

        'alert-success-border-color': '#274916',
        'alert-success-bg-color': '#162312',
        'alert-success-icon-color': '#49aa19',
        'alert-info-border-color': '#153450',
        'alert-info-bg-color': '#111b26',
        'alert-info-icon-color': '#177ddc',
        'alert-warning-border-color': '#594214',
        'alert-warning-bg-color': '#2b2111',
        'alert-warning-icon-color': '#d89614',
        'alert-error-border-color': '#58181c',
        'alert-error-bg-color': '#2a1215',
        'alert-error-icon-color': '#a61d24',
        // 修改系统主题样式，黑暗模式定制
        // 'heading-color': Title, // 标题色 Title
        // 'text-color': Body1, // 主文本色 Body-1
        // 'text-color-secondary': Body2, // 次文本色 Body-2
        'disabled-color': selectedBg, // 失效色 Body-3
        // 'layout-sider-background-light': Gray4, // 左侧菜单栏背景 Gray-4
        'layout-body-background': '#000000', // 页面主体背景色
        'input-bg': componentBg, // input默认背景色
        'input-disabled-bg': selectedBg, // input disabled背景色
        'input-placeholder-color': '#8b949e', // placeholder颜色
        'select-background': componentBg, // 下拉框背景色
        'cascader-bg': componentBg, // 级联选择器
        'select-item-selected-bg': selectedBg, // 下拉框选中背景色
        'cascader-item-selected-bg': selectedBg, // 级联
        'item-hover-bg': selectedBg, // 供其他变量引用的变量
        'radio-button-bg': componentBg,
        // 'radio-button-hover-color': '@primary-color',
        // 'radio-button-active-color': '@primary-color',
        'radio-button-checked-bg': '@primary-2',
        'label-color': '#8b949e', // Form label color
        'table-header-bg': componentBg,
        // 'table-selected-row-hover-bg': darken('@table-selected-row-bg', 0.02),
        'picker-bg': componentBg, // 时间、日期选择器背景色
        'checkbox-check-bg': componentBg, // checkbox背景色
        // UI设计师自定义的颜色
        'custom-title': Title,
        'custom-body1': Body1,
        'custom-body2': Body2,
        'custom-body3': Body3,
        'custom-gray1': Gray1,
        'custom-gray2': Gray2,
        'custom-gray3': Gray3,
        'custom-gray4': Gray4,
        'custom-gray5': Gray5,
      },
    }),
  ];

  return plugin as unknown as PluginOption[];
}
