<!-- 出入口抽屉 -->
<template>
    <div>
        <el-drawer title="添加出入口" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
            @close="cleanAllValue()">
            <el-container>
                <!-- 布局容器 -->
                <el-header>
                    <h1 style="color: black;">添加出入口</h1>
                </el-header>

                <el-main>
                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" @change="inputchange" placeholder="请输入出入口名"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="form.location" @change="inputchange" placeholder="请输入出入口地址"></el-input>
                        </el-form-item>
                    </el-form>

               

                    <template>
                        <el-skeleton :rows="9" /><!-- 骨架屏 -->
                    </template>


                    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </el-main>

                <el-footer>
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="出入口名"></el-step>
                        <el-step title="出入口地址"></el-step>
                    </el-steps>
                    <el-button type="primary" style="position:relative;left: 43%;" round @click="AddEntrance">确认
                    </el-button>
                </el-footer>
                <!-- 布局容器 -->
            </el-container>
        </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'newExDrawer', //与文件名一致
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                form: {
                    name: '',
                    location: '',
                },
                active: 0
            };
        },
        methods: {
            closeDrawer() {
                this.drawer = false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？修改将不会保存')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            inputchange() {
                if (this.active == 2) {
                    this.active = 0;
                } else {
                    this.active++;
                }
            },
            cleanAllValue() {
                this.form = {
                    name: '',
                    location: ''
                },
                this.active=0;
            },
            alertwarning() {
                this.$alert('请输入完整信息', '错误', {
                    confirmButtonText: '确定',
                });
            },
            closeDrawerAndCleanValue(){
                this.drawer = false;
                this.cleanAllValue();
            },
            AddEntrance() {
                if (this.form.name.length == 0 || this.form.location.length == 0) {
                    this.alertwarning();
                } else {
                    //发送axios请求
                    axios.post('http://127.0.0.1:8086/entrance', {
                        "exname": this.form.name,
                        "exlocation": this.form.location,
                      }).then(
                        response => {
                            this.$notify({
                                title: '添加',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$bus.$emit('refreshTable');
                            console.log('invoke_refreshTable');
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
                }
            }
        },
        mounted() {
            this.$bus.$on('setDrawerFlag_newExDrawer', (Drawerboolean) => {
                console.log('newExDrawer.vue___报告___Drawerboolean为:' + Drawerboolean);
                this.drawer = Drawerboolean;
            })
        },
    };
</script>

<style scoped>
    .el-input {
        width: 300px
    }
</style>