import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Spin } from 'ant-design-vue';

import { h } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
// 全局配置自定义loading指示符
// Spin.setDefaultIndicator(<PageLoading />);
Spin.setDefaultIndicator({
  indicator: h(LoadingOutlined, {
    style: {
      fontSize: '24px',
    },
    spin: true,
  }),
});
export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout);
}
