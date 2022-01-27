import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
// import Typography from '@/pages/Typography/Typography';
// import Tables from '@/pages/Tables/Tables';
// import Notifications from '@/pages/Notifications/Notifications';
// import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Dashboard2 from '@/pages/Visits/Visits2';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import Extable from '@/pages/Entryexitmanagement/Extable';
import ExCharts from '@/pages/Entryexitmanagement/ExCharts';
import Fymaterials from '@/pages/Fy/Materials/Fymaterials';
import Fymember from '@/pages/Fy/Member/Fymember';
import InvokeTable from '@/pages/Fy/Mtinvoke/InvokeTable';
import Quarantine from '@/pages/Fy/Quarantine/Quarantine';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },        
        {
          path: 'dashboard2',
          name: 'Dashboard2',
          component: Dashboard2,
        },
        // {
        //   path: 'typography',
        //   name: 'Typography',
        //   component: Typography,
        // },
        // {
        //   path: 'tables',
        //   name: 'Typography',
        //   component: Tables,
        // },
        // {
        //   path: 'notifications',
        //   name: 'Notifications',
        //   component: Notifications,
        // },
        // {
        //   path: 'ex/icons',
        //   name: 'Icons',
        //   component: Icons,
        // },
        {
          path: 'ex/maps',
          name: 'Maps',
          component: Maps,
        },
        {
          path: 'ex/charts',
          name: 'Charts',
          component: Charts,
        },        
        {
          path: 'ex/extable',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
          name: 'Extable',
          component: Extable,
        },
        {
            path: 'ex/excharts',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
            name: 'ExCharts',
            component: ExCharts,
        },
        {
            path: 'fy/fymaterials',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
            name: 'Fymaterials',
            component: Fymaterials,
        },
        {
            path: 'fy/invokeTable',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
            name: 'InvokeTable',
            component: InvokeTable,
        },
        {
            path: 'fy/fymember',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
            name: 'Fymember',
            component: Fymember,
        },
        {
            path: 'fy/quarantine',/* 此处的path是指的是router访问哪个路径可以访问到Extable component组件 */
            name: 'Quarantine',
            component: Quarantine,
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: ErrorPage,
    }
  ],
});
