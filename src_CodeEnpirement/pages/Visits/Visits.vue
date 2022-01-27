<template>
  <div class="visits-page">
    <h1 class="page-title">国内疫情 &nbsp;
      <small>
        <small>新冠疫情防疫系统</small>
      </small>
    </h1>
    <b-row>
      <b-col lg="8">
        <Widget class="" style="background-color: rgba(255,255,255,0.02)">
          <Map :nowconfirm="epidemicData.nowconfirm"/>
        </Widget>
      </b-col>

      <b-col lg="4" offset-lg="">
        <Widget
            class="" style="background-color: rgba(255,255,255,0.02)"
            title="<h5>Current<span class='fw-semi-bold'>&nbsp;Epidemic</span></h5>"
            settings refresh close customHeader
        >
          <p>Status: <strong>Live</strong></p>
          <p>
            <span class="circle bg-primary text-white"><i class="la la-map-marker"/></span> &nbsp;
            现有 31 省, {{ this.epidemicData.localConfirm }} 例
          </p>
          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">现有确诊</h6>
              <p class="description deemphasize mb-xs">较昨日 +{{ epidemicData.nowconfirmadd }}</p>
            </div>
            <div class="col-3 text-center">
              <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3.2em">
                <span><AnimatedNumber :value="epidemicData.nowconfirm"
                                      v-bind="animateNumberOptions"></AnimatedNumber></span>
              </span>
            </div>
          </div>

          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">无症状</h6>
              <p class="description deemphasize mb-xs">较昨日 +{{ epidemicData.noInfectadd }}</p>
            </div>
            <div class="col-3 text-center">
              <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3.2em">
                <span><AnimatedNumber :value="epidemicData.noInfect"
                                      v-bind="animateNumberOptions"></AnimatedNumber></span>
              </span>
            </div>
          </div>

          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">本土确诊</h6>
              <p class="description deemphasize mb-xs">较昨日 +{{ epidemicData.localConfirmadd }}</p>
            </div>
            <div class="col-3 text-center">
              <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3.2em">
                <span><AnimatedNumber :value="epidemicData.localConfirm" v-bind="animateNumberOptions"></AnimatedNumber></span>
              </span>
            </div>
          </div>

          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">境外输入</h6>
              <p class="description deemphasize mb-xs">较昨日 +{{ epidemicData.importedCaseadd }}</p>
            </div>
            <div class="col-3 text-center">
              <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3.2em">
                <span><AnimatedNumber :value="epidemicData.importedCase" v-bind="animateNumberOptions"></AnimatedNumber></span>
              </span>
            </div>
          </div>


        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col xl="4" xs="12"><!--治愈率-->
        <Widget
            title="<h6> CURE RATE </h6>"
            close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Total Cure</h6><!--总治愈人数-->
              <p class="value">{{ percentageTableData.heal }}%</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Added Cure Today</h6><!--今日新增-->
              <p class="value">{{ percentageTableData.addedcuretoday }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Cure Percent</h6><!--总治愈比例-->
              <p class="value">{{ Math.floor(percentageTableData.curepecentage * 100) }}%</p>
            </div>
          </div>
          <b-progress variant="success" :value="percentageTableData.curepecentage"
                      :max="1" class="progress-xs"/>
          <!--          <p>-->
          <!--            <small>-->
          <!--              <span class="circle bg-primary text-white mr-2">-->
          <!--                <i class="la la-angle-up" />-->
          <!--              </span>-->
          <!--            </small>-->
          <!--            <span class="fw-semi-bold">&nbsp;17% higher</span>-->
          <!--            &nbsp;than last month-->
          <!--          </p>-->
        </Widget>
      </b-col>
      <b-col xl="4" xs="12"><!--确诊分布-->
        <Widget
            title="<h6> DIAGNOSE DISTRIBUTION </h6>"
            close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Total Diagnosis</h6><!--总确诊-->
              <p class="value">{{ percentageTableData.totaldiagnosis }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Locally Diagnosed</h6><!--本土确诊-->
              <p class="value">{{ percentageTableData.locallydiagnosed }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Locally Percent</h6><!--本土比例-->
              <p class="value">
                {{ Math.floor((percentageTableData.locallydiagnosed / percentageTableData.totaldiagnosis) * 100) }}%</p>
            </div>
          </div>
          <b-progress variant="danger"
                      :value="percentageTableData.locallydiagnosed/percentageTableData.totaldiagnosis" :max="1"
                      class="progress-xs"/>
        </Widget>
      </b-col>

      <b-col xl="4" xs="12">
        <Widget
            title="<h6> ASYMPTOMATIC PERCENTAGE </h6>"
            close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name fs-sm">Asymptomatic Total</h6>
              <p class="value">{{ percentageTableData.asymptomatictotal }}</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">Asymptomatic Percent</h6>
              <p class="value">
                {{ Math.floor((percentageTableData.asymptomatictotal / epidemicData.nowconfirm) * 100) }}%</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">Newly Add</h6>
              <p class="value">{{ percentageTableData.newlyaddedasymptomatic }}</p>
            </div>
          </div>
          <b-progress variant="primary" :value="percentageTableData.asymptomatictotal/epidemicData.nowconfirm"
                      :max="1" class="progress-xs"/>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4" xs="12">
        <Widget
            title="<h6>Messages</h6>"
            refresh close customHeader
        >
          <div class="widget-body p-0">
            <div class="list-group list-group-lg">
              <!--      v-for Message消息队列        -->
              <a class="list-group-item" :href="item.msgurl" v-for="item in messageTableDate" :key="item.msgcontent"
                 target="_blank">
                <span class="thumb-sm float-left mr">
                  <img class="rounded-circle" :src="require('../../assets/materis/'+item.srcpath+'.png')"/>
                  <i class="status status-bottom bg-success"/>
                </span>
                <div>
                  <h6 class="m-0">{{ item.msgtitle }}</h6>
                  <p class="help-block text-ellipsis m-0">
                    {{ item.msgcontent }}
                  </p>
                </div>
              </a>
              <!--              个人消息队列，只出现在visit2中-->
              <!--              <a class="list-group-item" href="#">-->
              <!--                <span class="thumb-sm float-left mr">-->
              <!--                  <img class="rounded-circle" src="../../assets/materis/个人.png" alt="..."/>-->
              <!--                  <i class="status status-bottom bg-danger"/>-->
              <!--                </span>-->
              <!--                <div>-->
              <!--                  <h6 class="m-0">Jaron Fitzroy</h6>-->
              <!--                  <p class="help-block text-ellipsis m-0">What about summer break?</p>-->
              <!--                </div>-->
              <!--              </a>-->
            </div>
          </div>
        </Widget>
      </b-col>

      <b-col lg="8" xs="12">
        <Widget
            title="<h6>事件日历</h6" bodyClass="p-0"
            settings close customHeader>
          <Calendar/>
        </Widget>
      </b-col>

      <b-col lg="12" xs="12">
        <Widget
            title="<h6> Trend <span class='fw-semi-bold'>Stats</span></h6>"
            close customHeader
        >
          <div class="widget-body">
            <h3>全国&黑龙江疫情走势图</h3>
            <p class="fs-mini text-muted mb mt-sm">
              统计近期内全国和黑龙江疫情走势
            </p>
          </div>
          <div class="widget-body mt-xlg chart-overflow-bottom">
            <area-chart class="area-chart" height="100px"
                        :options="{legend: false, scales: {yAxes: [{display: false}], xAxes: [{display: false}]}}"
                        :chart-data="dataCollection"></area-chart>
          </div>
        </Widget>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Map from './components/Map/Map';
import Calendar from './components/Calendar/Calendar';
import AreaChart from './components/AreaChart/AreaChart';
import AnimatedNumber from "animated-number-vue";
import axios from 'axios';

export default {

  name: 'Visits',
  components: {
    Widget, Map, Calendar, AreaChart, AnimatedNumber
  },
  data() {
    return {
      epidemicData: {
        nowconfirm: '',//现有病例
        noInfect: '',//无症状
        localConfirm: '',//本土现有确诊
        importedCase: '',//境外输入
        nowconfirmadd: '',//现有病例+
        noInfectadd: '',//无症状+
        localConfirmadd: '',//本土现有确诊+
        importedCaseadd: ''//境外输入+
      },
      percentageTableData: {
        heal: '',
        curepecentage: '',
        addedcuretoday: '',
        totaldiagnosis: '',
        locallydiagnosed: '',
        asymptomatictotal: '',
        newlyaddedasymptomatic: ''
      },
      compareDataGraph: {//比对数据图
        nationalEpidemicData: {},//全国历史数据
        hrbHistoricalData: {},//哈尔滨历史数据
        hljHistoricalData: {}//黑龙江历史数据
      },
      messageTableDate: [//消息图数据
        {
          srcpath: '',
          msgtitle: '',
          msgcontent: '',
          msgurl: ''
        }
      ],
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
    };
  },
  methods: {
    unixTimeReplaceToDate(unixTime) {
      return new Date(parseInt(unixTime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    getMessageTableData() {
      axios.get('https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E5%9B%BD%E5%86%85%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81').then(
          response => {
            let data = response.data.Result[0].items_v2[0].aladdin_res.DisplayData.result.items;
            data.splice(4);
            this.messageTableDate = [];
            for (let i = 0; i < data.length; i++) {
              this.messageTableDate.push({
                srcpath: 'news',
                msgtitle: this.unixTimeReplaceToDate(data[i].eventTime),
                msgcontent: data[i].eventDescription,
                msgurl: data[i].eventUrl
              })
            }
          },
          error => {
            console.log(error.data);
          }
      )
    },
    getcomparisonChartData() {
      axios.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList').then(//查找国内历史疫情数据
          response => {
            this.compareDataGraph.nationalEpidemicData = response.data;
            axios.get('https://voice.baidu.com/newpneumonia/getv2?from=mola-virus&stage=publish&target=trendCity&area=%E9%BB%91%E9%BE%99%E6%B1%9F-%E5%93%88%E5%B0%94%E6%BB%A8').then(//查找哈尔滨历史疫情数据
                response => {
                  this.compareDataGraph.hrbHistoricalData = response.data;
                  axios.get('https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E9%BB%91%E9%BE%99%E6%B1%9F').then(//查找黑龙江历史疫情数据
                      response => {
                        this.compareDataGraph.hljHistoricalData = response.data;
                        this.analyzeAndInjectComparisonData();
                      },
                      error => {
                        console.log(error.data);
                      }
                  );
                },
                error => {
                  console.log(error.data);
                }
            );
          },
          error => {
            console.log(error.data);
          }
      );
      // axios.get('https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E5%9B%BD%E5%86%85%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81黑龙江哈尔滨新型肺炎最新动态').then(
      //     response => {
      //       console.log(response.data);
      //     },
      //     error => {
      //       console.log(error.data);
      //     }
      // );


    },
    analyzeAndInjectComparisonData() {
      this.dataCollection.labels = [];
      this.dataCollection.datasets[0].data = [];
      this.dataCollection.datasets[1].data = [];
      this.dataCollection.datasets[2].data = [];
      let hrbdataflag = this.compareDataGraph.hrbHistoricalData.data[0].trend.updateDate.length-1;
      let hljdataflag = this.compareDataGraph.hljHistoricalData.data.length-1;
      for (let i = this.compareDataGraph.nationalEpidemicData.data.chinaDayAddList.length-1; i > 0; i--) {
        //省可能比全国数据更快更新，需要进行判断
        if (parseInt(this.compareDataGraph.nationalEpidemicData.data.chinaDayAddList[i].date) === parseInt(this.compareDataGraph.hljHistoricalData.data[hljdataflag].date)) {
          //如果当前全国数据日期跟当前省日期相同
          //把当前日期尾插入labels数组中
          this.dataCollection.labels.unshift(this.compareDataGraph.nationalEpidemicData.data.chinaDayAddList[i].date);
          //把当前日期的数据通通尾插入对应data中
          this.dataCollection.datasets[0].data.unshift(this.compareDataGraph.nationalEpidemicData.data.chinaDayAddList[i].confirm);//将国内今日新增加入国内新增data
          if(parseInt(this.compareDataGraph.hljHistoricalData.data[hljdataflag].newConfirm)>=parseInt(this.compareDataGraph.hrbHistoricalData.data[0].trend.list[1].data[hrbdataflag])){
            this.dataCollection.datasets[1].data.unshift(this.compareDataGraph.hljHistoricalData.data[hljdataflag].newConfirm);//将黑龙江今日新增加入黑龙江新增data
            this.dataCollection.datasets[2].data.unshift(this.compareDataGraph.hrbHistoricalData.data[0].trend.list[1].data[hrbdataflag]);//将哈尔滨今日新增加入哈尔滨新增data
          }else{
            this.dataCollection.datasets[1].data.unshift(this.compareDataGraph.hrbHistoricalData.data[0].trend.list[1].data[hrbdataflag]);//将黑龙江今日新增加入黑龙江新增data
            this.dataCollection.datasets[2].data.unshift(this.compareDataGraph.hljHistoricalData.data[hljdataflag].newConfirm);//将哈尔滨今日新增加入哈尔滨新增data
          }
          //将标志位-1
          hrbdataflag--;
          hljdataflag--;
        } else {
          //省-1
          hljdataflag--;
        }
      }
    },
    getNationalEpidemicMsg() {
      // http://view.inews.qq.com/g2/getOnsInfo?name=disease_h5
      axios.get('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5').then(
          response => {
            let object = JSON.parse(response.data.data);
            this.epidemicData.nowconfirm = object.chinaTotal.nowConfirm;
            this.epidemicData.noInfect = object.chinaTotal.noInfect;
            this.epidemicData.localConfirm = object.chinaTotal.localConfirm;
            this.epidemicData.importedCase = object.chinaTotal.importedCase;
            this.epidemicData.nowconfirmadd = object.chinaAdd.nowConfirm;
            this.epidemicData.noInfectadd = object.chinaAdd.noInfect;
            this.epidemicData.localConfirmadd = object.chinaAdd.localConfirm;
            this.epidemicData.importedCaseadd = object.chinaAdd.importedCase;

            this.percentageTableData.heal = object.chinaTotal.heal;
            this.percentageTableData.curepecentage = object.chinaTotal.heal / object.chinaTotal.confirm;
            this.percentageTableData.addedcuretoday = object.chinaAdd.heal;
            this.percentageTableData.totaldiagnosis = object.chinaTotal.nowConfirm;
            this.percentageTableData.locallydiagnosed = object.chinaTotal.localConfirm;
            this.percentageTableData.asymptomatictotal = object.chinaTotal.noInfect;
            this.percentageTableData.newlyaddedasymptomatic = object.chinaAdd.noInfect;
          },
          error => {
            console.log('错误');
          }
      )
    },

    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, 'checkedArr', arr);
    },
    fillData() {
      this.dataCollection = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
          {
            label: '全国疫情',
            backgroundColor: '#F45722',
            borderColor: 'transparent',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()]
          },
          {
            label: '黑龙江疫情',
            backgroundColor: '#1870DC',
            borderColor: 'transparent',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()]
          },
          {
            label: '哈尔滨疫情',
            backgroundColor: '#e0b817',
            borderColor: 'transparent',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  mounted() {
    this.fillData();
    this.getNationalEpidemicMsg();
    this.getMessageTableData();
    this.getcomparisonChartData();
  },
};
</script>

<style src="./Visits.scss" lang="scss"/>

