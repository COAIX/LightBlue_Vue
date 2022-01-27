<template>
  <div class="visits-page">
    <h1 class="page-title">黑龙江大学 &nbsp;
      <small>
        <small>新冠疫情防疫系统</small>
      </small>
    </h1>
    <b-row>
      <!--            <b-col lg="">-->
      <!--                &lt;!&ndash; <Widget class="bg-transparent">-->
      <!--          <Map />-->
      <!--        </Widget> &ndash;&gt;-->
      <!--                &lt;!&ndash; 引入黑龙江大学图片 &ndash;&gt;-->
      <!--            </b-col>-->
      <b-col lg="12" offset-lg="">
        <Widget class="" title="<h5>核酸检测<span class='fw-semi-bold'>&nbsp;总况</span></h5>" settings
                refresh close customHeader style="background-color: rgba(255,255,255,0.02)">
          <p>Status: <strong>Live</strong></p>
          <p>
            <span class="circle bg-primary text-white"><i class="la la-map-marker"/></span> &nbsp;
            {{ percentData.teacherCount }} 老师, {{ percentData.studentCount }} 学生
          </p>
          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">核酸检测</h6>
              <p class="description deemphasize mb-xs">核酸检测完成比例</p>
              <b-progress variant="primary" :value="percentData.completePercent" :max="100" class="progress-xs"/>
            </div>
            <div class="col-3 text-center">
                            <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3em;">
                                <span>
                                    <AnimatedNumber :value="percentData.completePercent"
                                                    v-bind="animateNumberOptions"></AnimatedNumber>%
                                </span>
                            </span>
            </div>
          </div>
          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">阳性</h6>
              <p class="description deemphasize mb-xs">检测结果阳性</p>
              <b-progress variant="danger" :value="percentData.postivePercent" :max="100" class="progress-xs"/>
            </div>
            <div class="col-3 text-center">
                            <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3em;">
                                <span>
                                    <AnimatedNumber :value="percentData.postivePercent"
                                                    v-bind="animateNumberOptions"></AnimatedNumber>%
                                </span>
                            </span>
            </div>
          </div>
          <div class="row progress-stats">
            <div class="col-9">
              <h6 class="name">阴性</h6>
              <p class="description deemphasize mb-xs">核酸检测结果阴性</p>
              <b-progress variant="success" :value="100-percentData.postivePercent" :max="100" class="progress-xs"/>
            </div>
            <div class="col-3 text-center">
                            <span class="status rounded rounded-lg bg-widget mt-lg-0 mt-4" style="width: 3em;">
                                <span>
                                    <AnimatedNumber :value="100-percentData.postivePercent"
                                                    v-bind="animateNumberOptions"></AnimatedNumber>%
                                </span>
                            </span>
            </div>
          </div>
          <!-- <h6 class="fw-semi-bold mt">Map Distributions</h6> -->
          <!-- <p>Tracking: <strong>Active</strong></p> -->
          <!-- <p> -->
          <!-- <span class="circle bg-primary text-white"><i class="la la-cog" /></span> -->
          <!-- &nbsp; 391 elements installed, 84 sets -->
          <!-- </p> -->
          <!-- <b-input-group class="mt"> -->
          <!-- <b-form-input placeholder="Search..." /> -->
          <!-- <b-input-group-append> -->
          <!-- <b-btn variant="default"> -->
          <!-- <i class="la la-search" /> -->
          <!-- </b-btn> -->
          <!-- </b-input-group-append> -->
          <!-- </b-input-group> -->
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="4" xs="12">
        <Widget title="<h6>Messages</h6>" refresh close customHeader>
          <div class="widget-body p-0">
            <div class="list-group list-group-lg">

              <a class="list-group-item" @click="routertoQuarn" v-for="item in messageTableDate" :key="item.msgcontent"
                 target="_blank" v-if="item.srcpath==='个人'">
                <span class="thumb-sm float-left mr">
                  <img class="rounded-circle" :src="require('../../assets/materis/'+item.srcpath+'.png')"/>
                  <i class="status status-bottom bg-danger"/>
                </span>
                <div>
                  <h6 class="m-0">{{ item.msgtitle }}</h6>
                  <p class="help-block text-ellipsis m-0">
                    {{ item.msgcontent }}
                  </p>
                </div>
              </a>

              <a class="list-group-item" :href="item.msgurl" v-for="item in messageTableDate" :key="item.msgcontent"
                 target="_blank" v-if="item.srcpath==='news'">
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

            </div>
          </div>
        </Widget>
      </b-col>

      <b-col lg="8" xs="12">
        <Widget title="<h6>事件日历</h6" bodyClass="p-0" settings close customHeader>
          <Calendar/>
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
  name: 'Visits2',
  components: {
    Widget,
    Map,
    Calendar,
    AreaChart,
    AnimatedNumber
  },
  data() {
    return {
      percentData: {
        studentCount: '',
        teacherCount: '',
        completePercent: '',
        postivePercent: ''
      },
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      messageTableDate: [//消息图数据
        {
          srcpath: '',
          msgtitle: '',
          msgcontent: '',
          msgurl: ''
        }
      ],
      checkedArr: [false, false, false],
      dataCollection: null,
      tobeQuarantineTable: [//待隔离
        {
          stno: 0,
          sname: '张三',
          sex: '女',
          telephone: '15616316516'
        }
      ],
    }
  },
  methods: {
    routertoQuarn() {
      this.$router.push("/app/fy/quarantine");
    },
    getTobeQuarantineTable() {
      axios.get('http://127.0.0.1:8086/quarantine/toBeQuarantined').then(
          response => {
            //回调函数
            console.log('getTobeQuarantineTable请求成功了', response.data);
            this.tobeQuarantineTable = response.data;
            this.tobeQuarantineTable.splice(4);
            for (let i = 0; i < this.tobeQuarantineTable.length; i++) {
              this.messageTableDate.unshift({
                srcpath: '个人',
                msgtitle: '隔离！',
                msgcontent: this.tobeQuarantineTable[i].sname + ' 待隔离',
                msgurl: '#'
              })
            }
          },
          error => {
            //出错函数
            console.log('getTobeQuarantineTable请求失败了', error.message);
          }
      )
    },
    unixTimeReplaceToDate(unixTime) {
      return new Date(parseInt(unixTime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    getMessageTableData() {
      axios.get('https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E9%BB%91%E9%BE%99%E6%B1%9F%E5%93%88%E5%B0%94%E6%BB%A8%E6%96%B0%E5%9E%8B%E8%82%BA%E7%82%8E%E6%9C%80%E6%96%B0%E5%8A%A8%E6%80%81').then(
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
            this.getTobeQuarantineTable();
          },
          error => {
            console.log(error.data);
          }
      )
    },
    getPercent() {
      axios.get('http://127.0.0.1:8086/quarantine/percent').then(
          res => {
            this.percentData = res.data;
            this.percentData.completePercent = Math.floor(this.percentData.completePercent);
            this.$bus.$emit('sendpositivepercent',res.data.postivePercent);
          },
          err => {
            console.log(err.data);
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
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),
          this.getRandomInt(), this.getRandomInt(), this.getRandomInt()
        ],
        datasets: [{
          label: 'Data One',
          backgroundColor: '#1870DC',
          borderColor: 'transparent',
          data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this
              .getRandomInt(), this.getRandomInt(), this.getRandomInt(), this
              .getRandomInt()
          ]
        }, {
          label: 'Data Two',
          backgroundColor: '#F45722',
          borderColor: 'transparent',
          data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this
              .getRandomInt(), this.getRandomInt(), this.getRandomInt(), this
              .getRandomInt()
          ]
        }]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    // scheduleTask() {
    //   console.log("scheduleTask");
    //   setInterval(this.getMessageTableData, 1000);
    // }
  },
  mounted() {
    this.fillData();
    this.getPercent();
    this.getMessageTableData();
    // this.scheduleTask();
  },
  watch: {
    messageTableDate: function (newQuestion, oldQuestion) {
      if (newQuestion.length > 4) {
        this.messageTableDate.pop();
      }
    }
  },
  // beforeDestroy() {
  //   if (this.getMessageTableData) {
  //     console.log("销毁this.getMessageTableData计时器");
  //     clearInterval(this.getMessageTableData); // 在Vue实例销毁前，清除时间定时器
  //   }
  // }
};
</script>

<style src="./Visits.scss" lang="scss"/>
<style>

</style>