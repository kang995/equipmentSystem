import { generateAntColors, primaryColor } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];
  // 蓝湖设计图规定的颜色
  const Title = '#171b25';
  const Body1 = '#414960';
  const Body2 = '#61687c';
  const Body3 = '#9fa3b0';
  // const Gray1 = '#b5b5be';
  // const Gray2 = '#d5d5dc';
  // const Gray3 = '#e2e2ea';
  const Gray4 = '#f1f2f5';
  const Gray5 = '#fafafb';

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': '#007fff',
    'processing-color': primary,
    'success-color': '#00ba7c', //  Success color
    'error-color': '#ed6f6f', //  False color
    'warning-color': '#ffaa00', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '6px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
    'heading-color': Title, // 标题色 Title
    'text-color': Body1, // 主文本色 Body-1
    'text-color-secondary': Body2, // 次文本色 Body-2
    'disabled-color': Body3, // 失效色 Body-3
    'layout-sider-background-light': Gray4, // 左侧菜单栏背景 Gray-4
    'layout-body-background': Gray5, // 页面主体背景色 Gray-5
    'input-bg': Gray5, // input默认背景色
    'input-disabled-bg': Gray4, // input disabled背景色
    'input-placeholder-color': Body3, // placeholder颜色
    'input-padding-vertical-base': '6px', // 正常input框高度
    'input-padding-vertical-sm': '4px', // small input高度
    'input-height-base': '36px', // 实际整个input框高度，用于表单label对齐
    'input-height-sm': '32px', // 实际整个input框高度，用于表单label对齐
  };
}
