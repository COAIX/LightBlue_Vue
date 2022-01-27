// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Toasted from 'vue-toasted';
import VCalendar from 'v-calendar';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import './elementUI/theme/index.css'
import ElementUI from 'element-ui'

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(VCalendar, {
    firstDayOfWeek: 2
});
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
    },
});

Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {
    duration: 10000
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线
    },
});