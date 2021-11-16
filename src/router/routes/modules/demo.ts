import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import charts from '/@/router/routes/demo/charts';
import about from '/@/router/routes/demo/about';
import comp from '/@/router/routes/demo/comp';
import dashboard from '/@/router/routes/demo/dashboard';
import feat from '/@/router/routes/demo/feat';
import flow from '/@/router/routes/demo/flow';
import iframe from '/@/router/routes/demo/iframe';
import level from '/@/router/routes/demo/level';
import page from '/@/router/routes/demo/page';
import permission from '/@/router/routes/demo/permission';
import setup from '/@/router/routes/demo/setup';
import system from '/@/router/routes/demo/system';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  meta: {
    icon: 'fa-solid:democrat',
    title: '官方示例',
    orderNo: 1000000,
    hideMenu: !import.meta.env.DEV,
  },
  children: [
    dashboard,
    permission,
    feat,
    page,
    comp,
    charts,
    iframe,
    level,
    system,
    flow,
    setup,
    about,
  ],
};

export default demo;
