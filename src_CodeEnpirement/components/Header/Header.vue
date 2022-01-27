<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
        <!-- <b-nav-text class="mr-3">
          <b-alert class="header-alert animate__animated animate__bounceIn animate__delay-2s" dismissible v-model="showNavbarAlert">
            <i class="fa fa-info-circle mr-1"></i> Check out Light Blue Settings on the right!
          </b-alert>
        </b-nav-text> -->
        <!-- <b-nav-form class="d-sm-down-none mr-3">
          <b-input-group class="input-group-transparent search-group">
            <b-input-group-text slot="prepend"><i class="fi flaticon-search-2"></i></b-input-group-text>
            <b-input class="input-transparent" id="search-input" placeholder="Search Dashboard" />
          </b-input-group>
        </b-nav-form> -->
        <b-nav-item-dropdown right class="avatar-toggle" menu-class="py-0">
          <template slot="button-content">
            <span class="avatar rounded-circle thumb-sm-1 float-left mr-2">
              <img class="rounded-circle" src="../../assets/people/Lw_coaix.png" alt="..." />
            </span>
            <span class="text-white">Liao Wei</span>
            <!-- <span class="mx-2 circle bg-danger text-dark fs-sm fw-bold">9</span>
            <i class="fi flaticon-arrow-down" /> -->
          </template>
          <!-- <notifications /> -->
        </b-nav-item-dropdown>


        <b-nav-item class="d-md-down-none" @click="logout">
          <i class="fi flaticon-power-1 px-2" />
        </b-nav-item>
        <!-- <b-nav-item class="d-md-none" @click="switchSidebarMethod" >
          <i class="la la-navicon px-2" />
        </b-nav-item> -->
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Notifications from '@/components/Notifications/Notifications';

export default {
  name: 'Header',
  components: {  },
  data() {
    return {
      showNavbarAlert: true
    }
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
  },
  methods: {
    ...mapActions('layout', ['switchSidebar', 'changeSidebarActive']),
    // switchSidebarMethod() {
    //   if (!this.sidebarClose) {
    //     this.switchSidebar(true);
    //     this.changeSidebarActive(null);
    //   } else {
    //     this.switchSidebar(false);
    //     const paths = this.$route.fullPath.split('/');
    //     paths.pop();
    //     this.changeSidebarActive(paths.join('/'));
    //   }
    // },
    logout() {
      window.localStorage.setItem('authenticated', false);
      this.$router.push('/login');
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" />
