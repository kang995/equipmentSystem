<template>
  <div :class="prefixCls">
    <!--    <a-button type="primary" block @click="handleCopy">-->
    <!--      <CopyOutlined class="mr-2" />-->
    <!--      {{ t('layout.setting.copyBtn') }}-->
    <!--    </a-button>-->

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </a-button>

    <!-- <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </a-button> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';

  import { RedoOutlined } from '@ant-design/icons-vue';

  import { useAppStore } from '/@/store/modules/app';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { useUserStore } from '/@/store/modules/user';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';

  import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
  import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
  import defaultSetting from '/@/settings/projectSetting';
  import { changeTheme } from '/@/logics/theme';
  import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
  import { ThemeEnum } from '/@/enums/appEnum';
  import { updateDarkTheme } from '/@/logics/theme/dark';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  //用户中心登录
  import { getLogoutUrlApi } from '/@/api/sys/user';
  import Cookies from 'js-cookie';
  import { useGlobSetting } from '/@/hooks/setting';

  export default defineComponent({
    name: 'SettingFooter',
    components: { RedoOutlined },
    setup() {
      const permissionStore = usePermissionStore();
      const { prefixCls } = useDesign('setting-footer');
      const { t } = useI18n();
      const { createSuccessModal, createMessage } = useMessage();
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const { useUserCenterLogin, loginToken } = useGlobSetting();

      function handleCopy() {
        const { isSuccessRef } = useCopyToClipboard(
          JSON.stringify(unref(appStore.getProjectConfig), null, 2),
        );
        unref(isSuccessRef) &&
          createSuccessModal({
            title: t('layout.setting.operatingTitle'),
            content: t('layout.setting.operatingContent'),
          });
      }
      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultSetting);
          const { themeColor, colorWeak, grayMode } = defaultSetting;
          const { bgColor } = defaultSetting.menuSetting;
          const { setDarkMode } = useRootSetting();
          // 重置主题色
          changeTheme(themeColor);
          updateSidebarBgColor(bgColor);
          updateColorWeak(colorWeak);
          updateGrayMode(grayMode);
          // 重置黑夜模式
          const darkMode = ThemeEnum.LIGHT;
          setDarkMode(darkMode);
          updateDarkTheme(darkMode);
          updateHeaderBgColor();
          updateSidebarBgColor();
          createMessage.success(t('layout.setting.resetSuccess'));
        } catch (error: any) {
          createMessage.error(error);
        }
      }

      function handleClearAndRedo() {
        console.log('handleClearAndRedo 重置并退出登录');
        localStorage.clear();
        appStore.resetAllState();
        permissionStore.resetState();
        tabStore.resetState();
        userStore.resetState();
        location.reload();
        if (useUserCenterLogin) {
          Cookies.remove(loginToken);
          getLogoutUrlApi().then((res) => {
            window.location.href = res;
          });
        } else {
          location.reload();
        }
      }
      return {
        prefixCls,
        t,
        handleCopy,
        handleResetSetting,
        handleClearAndRedo,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
