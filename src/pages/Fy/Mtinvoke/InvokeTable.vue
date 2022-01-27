<!-- 调用物资 -->
<template>
    <div class="tables-basic">
        <b-breadcrumb>
            <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
            <b-breadcrumb-item active>黑龙江大学 防疫物资流动管理</b-breadcrumb-item>
        </b-breadcrumb>
        <h2 class="page-title">黑龙江大学 - <span class="fw-semi-bold">防疫物资流动管理</span></h2>
        <b-row>
            <b-col>
                <Widget title="<h5>防疫物资流动管理 <span class='fw-semi-bold'>黑龙江大学</span></h5>" customHeader settings close>
                    <div class="table-resposive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="hidden-sm-down">#</th>
                                    <th style="width: 5cm;">物资名</th>
                                    <th>余量</th>
                                    <th class="hidden-sm-down" style="width: 26.19cm;">Status</th>
                                    <th class="hidden-sm-down" style="">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in tableStyles" :key="row.materialsno">
                                    <td>{{row.materialsno}}</td>

                                    <td>
                                        {{row.materialsname}}
                                    </td>
                                    <td>
                                        {{row.materialsnumber}}

                                    </td>

                                    <td class="width-150">
                                        <b-progress :variant="row.colorFlag" :value="row.percent" :max="100"
                                            class="progress-sm mb-xs" />
                                    </td>


                                    <td>
                                        <el-button
                                            style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
                                            size="mini" @click="setDrawerFlag(true,row,'selectWithOne')"><!-- 传送的时候还有第四个参数就是tableStyles -->
                                            选择此项
                                        </el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="clearfix">
                        <div class="float-right">
                            <el-button style="background: #474D84;color: #F4F4F5E6;border: #cac4c4;margin-right: 105px;"
                                size="mini" @click="setDrawerFlag(true,row,'selectWithAll')">
                                批量选择
                            </el-button>
                        </div>
                        <p>截止至{{nowdate}}</p>
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <b-row>
            <b-col xs="12" md="12">
                <Widget title="<h5>调用记录 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
                    <!-- 内容 -->
                    <el-table
                        :data="tableData.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%" max-height="600">
                        <el-table-column prop="no" label="#" width="150">
                        </el-table-column>
                        <el-table-column prop="time" label="时间" width="300">
                        </el-table-column>
                        <el-table-column prop="materialsname" label="物品名" width="120">
                        </el-table-column>
                        <el-table-column prop="number" label="数量" width="120">
                        </el-table-column>
                        <el-table-column prop="stno" label="学工号" width="120">
                        </el-table-column>
                        <el-table-column prop="sname" label="名字" width="120">
                        </el-table-column>
                        <!-- 没什么吊用，只是用来占用一下行，让表格好看一点 -->
                        <el-table-column label="" width="">
                            <template slot="header" slot-scope="scope">
                            </template>
                        </el-table-column>
                        <!--  -->
                        <el-table-column label="" width="200">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                            </template>
                        </el-table-column>



                    </el-table>
                </Widget>
            </b-col>
        </b-row>

        <invokeTableDrawer></invokeTableDrawer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Widget from '@/components/Widget/Widget';
    import Sparklines from '../../../components/Sparklines/Sparklines';
    import invokeTableDrawer from './invokeTableDrawer.vue';
    import axios from 'axios';
    export default {
        name: 'InvokeTable',
        components: {
            Widget,
            Sparklines,
            invokeTableDrawer
        },
        data() {
            return {
                //----el-table数据
                search: '',
                nowdate: '2022年1月4日12:06:54',
                tableStyles: [{
                    colorFlag: "danger",
                    materialsname: "护目镜",
                    materialsno: 2,
                    materialsnumber: 92,
                    percent: 5
                }],
                tableData: [{
                    "no": "1",
                    "time": "2022-01-03 18:52:27",
                    "materialsname": "口罩",
                    "number": "100",
                    "stno": "102",
                    "sname": "张二"
                }],
            };
        },
        methods: {
            //获取调用信息表
            gettableData() {
                axios.get('http://127.0.0.1:8086/mtinvoke/getAll').then(
                    response => {
                        console.log('请求成功了', response.data);
                        this.tableData = response.data;
                    },
                    error => {
                        console.log('请求失败了', error.message);
                    }
                )
            },
            //获取物资详细表
            gettableStylesData() {
                axios.get('http://127.0.0.1:8086/materials/getDetail').then(
                    response => {
                        //回调函数
                        console.log('请求成功了', response.data);
                        this.tableStyles = response.data;
                    },
                    error => {
                        //出错函数
                        console.log('请求失败了', error.message);
                    }
                )
            },
            setDrawerFlag(Drawerboolean, data, drawerFlag) {
                console.log('List.vue____setDrawerFlag:' + Drawerboolean + "Data___:" + data);
                console.log(data);
                // this.$bus.$emit('handleClick',data);
                this.$bus.$emit('setDrawerFlag_invokeTableDrawer', Drawerboolean, data, drawerFlag,this.tableStyles);/* 传送的时候多的第四个参数并不存在于函数头上（见函数名setDrawerFlag参数） */
            },
            currentTime() {
                setInterval(this.getCurrentTime, 500);
            },
            parseDate(date) {
                const dateSet = date.toDateString().split(' ');
                return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
            },
            getCurrentTime() {
                //获取当前时间并打印
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                this.nowdate = yy + '年' + mm + '月' + dd + '日 ' + hh + ':' + mf + ':' + ss;
                // console.log(new Date());
            }
        },
        mounted() {
            this.currentTime();
            this.gettableStylesData();
            this.gettableData();
            this.$bus.$on('refreshinvoketable', () => {
                this.gettableStylesData();
                this.gettableData();
            });
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

<style src="./Tables.scss" lang="scss" scoped />
<style scoped>
    .el-table,
    .el-table__expanded-cell {
        background-color: transparent !important;
    }

    .el-table th,
    .el-table tr,
    .el-table td {
        color: rgb(136, 146, 155);
        background-color: transparent !important;
        border-bottom: 1px solid #000000 !important;
    }

    .el-table::before {
        background-color: transparent !important;
    }

    .el-input input {
        color: rgb(255, 255, 255) !important;
    }

    .el-input__inner {
        background-color: rgba(255, 255, 255, 0.247) !important;
        border: #000000 !important;
    }
</style>