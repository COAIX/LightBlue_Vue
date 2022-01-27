<template>
  <div class="charts-overview">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">YOU ARE HERE</li>
      <li class="breadcrumb-item active">Charts</li>
    </ol>
    <h1 class="page-title">
      黑龙江大学
      <span class="fw-semi-bold">人流管理</span>
    </h1>
    <div>
      <b-row>
        <b-col xs="12" lg="7">
          <Widget title="<h5>HLJU Week Statistics <span class='fw-semi-bold'>每周流量统计</span></h5>" close collapse
                  customHeader>
            <apexchart type="bar" height="442" :series="cd.apex.column.series"
                       :options="cd.apex.column.options"/>
          </Widget>

        </b-col>

        <b-col xs='12' lg='5'>
          <Widget title="<h5>HLJU TimePeriod Statistics <span class='fw-semi-bold'>时段统计</span></h5>" close collapse
                  customHeader>
            <highcharts :options="cd.highcharts.mixed"></highcharts>
            <h5 class="mt">Interactive <span class="fw-semi-bold">Sparklines</span></h5>
            <b-row class="mt">
              <b-col md='6' xs='12'>
                <div class="stats-row">
                  <div class="stat-item">
                    <p class="value5 fw-thin">34 567</p>
                    <h6 class="name text-muted m-0 fs-mini">Overall Values</h6>
                  </div>
                  <div class="stat-item stat-item-mini-chart">
                    <Sparklines :data="sparklineData.series" :options="sparklineData.options1"
                                :width="80" :height="25"></Sparklines>
                  </div>
                </div>
              </b-col>
              <b-col md='6' xs='12'>
                <div class="stats-row">
                  <div class="stat-item">
                    <p class="value5 fw-thin">34 567</p>
                    <h6 class="name text-muted m-0 fs-mini">Overall Values</h6>
                  </div>
                  <div class="stat-item stat-item-mini-chart">
                    <Sparklines :data="sparklineData.series" :options="sparklineData.options2"
                                :width="80" :height="25"></Sparklines>
                  </div>
                </div>
              </b-col>
            </b-row>
          </Widget>
        </b-col>
        <b-col xs='12' lg='12'>
          <b-row>
            <b-col xs="12" lg="6">
              <Widget title="<h5>HLJU Week Statistics <span class='fw-semi-bold'>每周流量分布</span></h5>" close
                      collapse customHeader>
                <apexchart type="pie" height="200" :series="cd.apex.pie.series"
                           :options="cd.apex.pie.options"/>
              </Widget>
            </b-col>
            <b-col xs="12" lg="6">
              <Widget title="<h5>HLJU Distribution Statistics <span class='fw-semi-bold'>人员分布</span></h5>" close collapse
                      customHeader>
                <echart :options="cd.echarts.donut" :init-options="initEchartsOptions"
                        style="height: 175px"></echart>
              </Widget>
            </b-col>
            <b-col xs="12" lg="12">
              <Widget title="<h5>HLJU <span class='fw-semi-bold'>实时出入数据</span></h5>" close
                      collapse customHeader>
                <highcharts :options="ld" ref="highchart"></highcharts>
              </Widget>
            </b-col>
          </b-row>
        </b-col>

        <b-col xs="12" md="12">
          <EntryinformationTable></EntryinformationTable>
        </b-col>
        <b-col xs="12" md="12">
          <ExportinformationTable></ExportinformationTable>
        </b-col>

      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Widget from "@/components/Widget/Widget";
import EntryinformationTable from './EntryinformationTable.vue';
import ExportinformationTable from './ExportinformationTable.vue';

import {
  chartData,
  liveChart,
  liveChartInterval
} from './mock';

import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

import {
  Chart
} from 'highcharts-vue';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: "ExCharts",
  components: {
    Widget,
    echart: ECharts,
    highcharts: Chart,
    Sparklines,
    EntryinformationTable,
    ExportinformationTable
  },
  data() {
    return {
      cd: chartData,
      ld: liveChart,
      initEchartsOptions: {
        renderer: 'canvas'
      },
      weekdata: [],
    };
  },
  computed: {
    sparklineData() {
      return {
        series: [{
          data: [1, 7, 3, 5, 7, 8]
        }],
        options1: {
          colors: [this.appConfig.colors.green],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        },
        options2: {
          colors: [this.appConfig.colors.red],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    }
  },
  methods: {
    getWeekData() {
      axios.get('http://127.0.0.1:8086/flowOfPeople/getWeekMap').then(
          res => {
            this.cd.apex.pie.series = res.data;
            this.cd.apex.column.series = [{data:res.data}];
          },
          err => {
            console.log(err.data);
          }
      )
    },
    getPercentData() {
      axios.get('http://127.0.0.1:8086/flowOfPeople/getPercentMsg').then(
          res => {
            this.cd.echarts.donut.series[0].data=res.data;
          },
          err => {
            console.log(err.data);
          }
      )
    },
    /**********************************************************************************/
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket('ws://127.0.0.1:8086/websocket/test');
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
    },
    websocketonerror: function () {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage: function (e) {
      console.log('收到推动消息——状态信息:'+e.data);                // console.log(e);
      this.ld.series[0].data.push({
        x: (new Date()).getTime(),
        y: 1
      })
    },
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    }
    /**********************************************************************************/
  },
  beforeDestroy() {
    clearInterval(liveChartInterval);
  },
  mounted() {
    this.getWeekData();
    this.getPercentData();

  },
  created() {
    this.initWebSocket();
  },
  destroyed: function () { // 离开页面生命周期函数
    this.websocketclose();
  }
};
</script>

<style src="./Charts.scss" lang="scss"/>