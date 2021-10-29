import { defineComponent, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer';
import { Divider } from 'ant-design-vue';
import { TypePicker, ThemeColorPicker, SettingFooter } from './components';

import { AppDarkModeToggle } from '/@/components/Application';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useI18n } from '/@/hooks/web/useI18n';

import { baseHandler } from './handler';

import { HandlerEnum, menuTypeList } from './enum';

import {
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
} from '/@/settings/designSetting';

const { t } = useI18n();

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { getShowDarkModeToggle, getThemeColor } = useRootSetting();

    const { getIsHorizontal, getMenuType, getMenuBgColor } = useMenuSetting();

    const { getHeaderBgColor } = useHeaderSetting();

    function renderSidebar() {
      return (
        <>
          <TypePicker
            menuTypeList={menuTypeList}
            handler={(item: typeof menuTypeList[0]) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false : undefined,
              });
            }}
            def={unref(getMenuType)}
          />
        </>
      );
    }

    function renderHeaderTheme() {
      return (
        <ThemeColorPicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    function renderSiderTheme() {
      return (
        <ThemeColorPicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }

    function renderMainTheme() {
      return (
        <ThemeColorPicker
          colorList={APP_PRESET_COLOR_LIST}
          def={unref(getThemeColor)}
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      );
    }

    /**
     * @description: 此处移除三个未使用的函数
     */

    return () => (
      <BasicDrawer
        {...attrs}
        title={t('layout.setting.drawerTitle')}
        width={330}
        class="setting-drawer"
      >
        {unref(getShowDarkModeToggle) && <Divider>{() => t('layout.setting.darkMode')}</Divider>}
        {unref(getShowDarkModeToggle) && <AppDarkModeToggle class="mx-auto" />}
        <Divider>{() => t('layout.setting.navMode')}</Divider>
        {renderSidebar()}
        <Divider>{() => t('layout.setting.sysTheme')}</Divider>
        {renderMainTheme()}
        <Divider>{() => t('layout.setting.headerTheme')}</Divider>
        {renderHeaderTheme()}
        <Divider>{() => t('layout.setting.sidebarTheme')}</Divider>
        {renderSiderTheme()}
        {/*<Divider>{() => t('layout.setting.interfaceFunction')}</Divider>*/}
        {/*{renderFeatures()}*/}
        {/*<Divider>{() => t('layout.setting.interfaceDisplay')}</Divider>*/}
        {/*{renderContent()}*/}
        {/*<Divider>{() => t('layout.setting.animation')}</Divider>*/}
        {/*{renderTransition()}*/}
        {/*<Divider />*/}
        <SettingFooter />
      </BasicDrawer>
    );
  },
});
