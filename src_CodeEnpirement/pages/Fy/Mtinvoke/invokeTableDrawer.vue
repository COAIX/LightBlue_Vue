<!-- 物资调用 -->
<template>
    <div>
        <el-drawer title="物资调用" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
            @close="cleanAllValue()">
            <!-- 单项选择 -->
            <el-container>
                <!-- 布局容器 -->
                <el-header>
                    <h1 style="color: black;">调用物资</h1>
                </el-header>

                <el-main>
                    <el-form ref="formdata" :model="formdata" label-width="80px" label-position="left">
                        <el-form-item label="学工号">
                            <!-- <el-input v-model="formdata.stno" @change="inputchange2" placeholder="请输入学工号"></el-input> -->
                            <el-select v-model="formdata.stno" filterable placeholder="请选择或者输入学工号"
                                @change="handleChange">
                                <el-option v-for="epmemberitem in epmemberoptions" :key="epmemberitem.value"
                                    :label="epmemberitem.label" :value="epmemberitem.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="防疫物品">
                            <el-select v-model="selectvalue" multiple filterable allow-create default-first-option
                                disabled placeholder="请选择物品" v-if="this.drawerFlag=='selectWithOne'">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="selectvalue" multiple filterable allow-create default-first-option
                                placeholder="请选择物品" v-if="this.drawerFlag=='selectWithAll'" @change="handleChange">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数量">
                            <!-- 此处绑定max -->
                            <el-input-number v-model="formdata.materialsnumber" @change="handleChange" :min="0"
                                :max="materialmsg.materialsnumber" label="描述文字">
                            </el-input-number>
                        </el-form-item>
                    </el-form>

                    <template>
                        <el-skeleton /><!-- 骨架屏 -->
                    </template>

                    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </el-main>

                <el-footer>
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="输入学工号"></el-step>
                        <el-step title="选择物品"></el-step>
                        <el-step title="确定数量"></el-step>
                    </el-steps>
                    <el-button type="primary" style="position:relative;left: 43%;" round @click="submitwithdata">确认
                    </el-button>
                </el-footer>
                <!-- 布局容器 -->
            </el-container>


        </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'invokeTableDrawer', //与文件名一致
        data() {
            return {
                epmemberoptions: [{ //此数据需要经过后台读取，或者前端页面传值
                    label: '学工号:183 姓名:生三',
                    value: 183
                }, {
                    label: '学工号:159 姓名:说萨',
                    value: 159
                }, {
                    label: '学工号:186 姓名:是四',
                    value: 186
                }],
                options: [{ //此数据需要经过后台读取，或者前端页面传值
                    label: '口罩',
                    value: '口罩'
                }, {
                    label: '护目镜',
                    value: '护目镜'
                }, {
                    label: '酒精',
                    value: '酒精'
                }],
                selectvalue: [], //options选中的值
                materialmsg: { //传过来的物品数据
                    materialsno: 0,
                    materialsname: '',
                    materialsnumber: 0
                },
                formdata: { //表单数据
                    stno: '', //学工号
                    materialsnumber: 0, //批量选择的数量
                },
                active: 0, //步骤条
                drawer: false,
                direction: 'rtl',
                drawerFlag: ''
            };
        },
        methods: {
            handleChange() {
                if (this.formdata.stno != '') {
                    this.active = 1;
                    if (this.formdata.stno != '' && this.selectvalue.length != 0) {
                        this.active = 2;
                        if (this.formdata.stno != '' && this.selectvalue.length != 0 && this.formdata.materialsnumber !=
                            0) {
                            this.active = 3;
                        }
                    }
                }
                if (this.formdata.stno != '' && this.selectvalue.length != 0) {
                    this.active = 2;
                    if (this.formdata.stno != '' && this.selectvalue.length != 0 && this.formdata.materialsnumber !=
                        0) {
                        this.active = 3;
                    }
                }
                if (this.formdata.stno != '' && this.selectvalue.length != 0 && this.formdata.materialsnumber != 0) {
                    this.active = 3;
                }
            },
            getOptions() {
                axios.get('http://127.0.0.1:8086/epmember/getOptions').then(
                    response => {
                        //回调函数
                        console.log('getOptions请求成功了', response.data);
                        this.epmemberoptions = response.data;
                    },
                    error => {
                        //出错函数
                        console.log('getOptions请求失败了', error.message);
                    }
                )
            },
            submitwithdata() {
                axios.post('http://127.0.0.1:8086/mtinvoke/invokematerials', {
                    "stno": this.formdata.stno, //学工号
                    "materialsnumber": this.formdata.materialsnumber, //调用数量
                    "time": this.getCurrentTime(),
                    "materialsno": JSON.stringify(this.selectvalue) //物品no
                }).then(
                    response => {
                        this.$notify({
                            title: '添加',
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$bus.$emit('refreshinvoketable'); //传递给invokeTable.vue请求更新表
                        this.closeDrawerAndCleanValue();
                    },
                    error => {
                        this.$notify.error({
                            title: '添加',
                            message: '添加失败'
                        });
                        this.closeDrawerAndCleanValue();
                    }
                )
            },
            getCurrentTime() {
                //获取当前时间并打印
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            },
            closeDrawerAndCleanValue() {
                this.cleanAllValue();
                this.closeDrawer();
            },
            cleanAllValue() {
                console.log("cleanAllValue");
                /* 重置所有value值 */
                this.formdata = {
                    stno: '',
                    materialsnumber: 0,
                };
                this.selectvalue = [];
                this.active = 0;
            },
            // next() {
            //     if (this.active++ > 2) this.active = 0;
            //     for(let i=0;i < this.selectvalue.length;i++){
            //         console.log(this.selectvalue[i]);
            //     }
            // },
            closeDrawer() {
                this.drawer = false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？修改将不会保存')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
        mounted() {
            this.getOptions();
            this.$bus.$on('setDrawerFlag_invokeTableDrawer', (Drawerboolean, data, drawerFlag, tableStyles) => {
                console.log('invokeTableDrawer.vue___报告___Drawerboolean为:' + Drawerboolean + "_____Data为:" +
                    data);
                this.drawer = Drawerboolean;
                this.drawerFlag = drawerFlag;
                this.options = [];
                for (let i = 0; i < tableStyles.length; i++) { //给options选项赋值
                    let optionsitem = {};
                    optionsitem.label = tableStyles[i].materialsname;
                    optionsitem.value = tableStyles[i].materialsno;
                    this.options.push(optionsitem);
                }
                if (drawerFlag == 'selectWithOne') {
                    this.materialmsg = data;
                    this.selectvalue.push(this.materialmsg.materialsno);
                }
            })
        },
        // watch: {
        //     //正常写法
        //     /* isHot:{
        //     	// immediate:true, //初始化时让handler调用一下
        //     	// deep:true,//深度监视
        //     	handler(newValue,oldValue){
        //     		console.log('isHot被修改了',newValue,oldValue)
        //     	}
        //     }, */
        //     //简写
        //     /* isHot(newValue,oldValue){
        //     	console.log('isHot被修改了',newValue,oldValue,this)
        //     } */
        //     // selectvalue: {
        //     //     immediate: true, //初始化时让handler调用一下
        //     //     // deep:true,//深度监视
        //     //     handler(newValue) {
        //     //         console.log('selectvalue被修改了', newValue, '____length', newValue.length)
        //     //         if (newValue.length != 0 && this.active == 1) {
        //     //             this.active++;
        //     //         }
        //     //         if (this.active >= 3) {
        //     //             this.active = 0;
        //     //         }
        //     //         console.log("active____" + this.active);
        //     //     }
        //     // }
        // }
    };
</script>

<style>
    .el-input {
        width: 300px
    }

    .el-input input {
        color: rgb(0, 0, 0) !important;
    }

    .el-input__inner {
        background-color: rgb(175 175 175 / 20%) !important;
        border: #000000 !important;
    }
</style>