<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
    <nav :class="{sidebar: true}">
      <header class="logo">
        <router-link to="/app">HLJU <span class="fw-bold"
                                          style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">防疫系统</span>
        </router-link>
      </header>

      <a class="generator-link navTitle" target="_blank" href=""><br>{{ nowdate }}</a>

      <ul class="nav">
        <h5 class="navTitle">全局总览</h5>
        <NavLink :activeItem="activeItem" header="国内" link="/app/dashboard" iconName="flaticon-home-3"
                 index="dashboard" isHeader/>
        <NavLink :activeItem="activeItem" header="哈尔滨" link="/app/dashboard2" iconName="flaticon-home-3"
                 index="dashboard" isHeader/>
        <h5 class="navTitle">功能</h5>
        <!-- <NavLink
header="Typography"
link="/app/typography"
iconName="flaticon-list-3"
index="typography"
isHeader
/>
<NavLink
header="Tables Basic"
link="/app/tables"
iconName="flaticon-equal-3"
index="tables"
isHeader
/>
<NavLink
header="Notifications"
link="/app/notifications"
iconName="flaticon-bell"
index="notifications"
isHeader
/> -->
        <NavLink :activeItem="activeItem" header="出入口管理" link="/app/ex" iconName="flaticon-network-1" index="ex"
                 :childrenLinks="[
          { header: '校园出入口', link: '/app/ex/extable' },
          { header: '人流监控', link: '/app/ex/excharts' },
          { header: '实时柱状地图', link: '/app/ex/maps' }
        ]"/>
        <NavLink :activeItem="activeItem" header="防疫管理" link="/app/fy" iconName="flaticon-network-1" index="fy"
                 :childrenLinks="[
          { header: '防疫物资管理', link: '/app/fy/fymaterials' },
          { header: '防疫物资流动管理', link: '/app/fy/invokeTable' },
          { header: '防疫人员管理', link: '/app/fy/fymember' },
          { header: '隔离管理', link: '/app/fy/quarantine' }
        ]"/>
      </ul>
      <h5 class="navTitle d-sm-down-none">
        LABELS
      </h5>
      <ul class="sidebarLabels d-sm-down-none">
        <li>
          <a href="#">
            <i class="fa fa-circle text-success mr-3"/>
            <span class="labelName">normal</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-primary mr-3"/>
            <span class="labelName">warn</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-danger mr-3"/>
            <span class="labelName">exception</span>
          </a>
        </li>
      </ul>

      <h5 class="navTitle d-sm-down-none mb-3">
        NOW
      </h5>
      <div class="sidebarAlerts d-sm-down-none">
        <b-alert v-for="alert in alerts" :key="alert.id" class="sidebarAlert" variant="transparent" show
                 dismissible>
          <span>{{ alert.title }}</span><br/>
          <b-progress class="sidebarProgress progress-xs mt-1" :variant="alert.color" :value="alert.value"
                      :max="100"/>
          <span>{{ alert.footer }}</span>
        </b-alert>
      </div>
    </nav>
  </b-collapse>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: {
    NavLink
  },
  data() {
    return {
      nowdate: '2021.12.30 17:30:43',
      alerts: [{
        id: 0,
        title: 'Percentage of positive',
        value: 88,
        footer: '当前阴性比例',
        //   color: 'primary',//蓝色
        color: 'success', //绿色
      },
        {
          id: 1,
          title: 'Percentage of positive',
          value: 12,
          footer: '当前阳性比例',
          color: 'danger', //红色
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    currentTime() {
      setInterval(this.getCurrentTime, 500);
    },
    getCurrentTime() {
      //获取当前时间并打印
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      this.nowdate = yy + '.' + mm + '.' + dd + '\ ' + hh + ':' + mf + ':' + ss;
    }
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
  mounted() {
    this.currentTime();
    this.$bus.$on('sendpositivepercent', (postivepercent) => {
      this.alerts[0].value=100-postivepercent;
      this.alerts[1].value=postivepercent;
    })
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.getCurrentTime) {
      console.log("销毁this.getCurrentTime计时器");
      clearInterval(this.getCurrentTime); // 在Vue实例销毁前，清除时间定时器
    }
  }
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>