import { generateAntColors, primaryColor } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

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
    'heading-color': '#171b25', // 标题色 Title
    'text-color': '#414960', // 主文本色 Body-1
    'text-color-secondary': '#61687C', // 次文本色 Body-2
    'disabled-color': '#9FA3B0', // 失效色 Body-3
    'layout-sider-background-light': '#F1F2F5', // 左侧菜单栏背景 Gray-4
    'layout-body-background': '#FAFAFB', // 页面主体背景色 Gray-5
  };
}
