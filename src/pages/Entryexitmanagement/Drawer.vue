<!-- 出入口抽屉 -->
<template>
    <div>
        <el-drawer title="编辑出入口" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
        <el-container>
            <!-- 布局容器 -->
            <el-header>
                <h1 style="color: black;">编辑出入口</h1>
            </el-header>

            <el-main>
                <el-form ref="form" :model="form" label-width="80px" label-position="left">
                    <el-form-item label="名称">
                        <el-input v-model="form.exname" placeholder="请输入出入口名"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.exlocation" placeholder="请输入出入口地址"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" style="position:relative;left: 40%;" round @click="UpdateEntrance">确认修改
                </el-button>
                <hr>

                <template>
                    <el-skeleton :rows="9" /><!-- 骨架屏 -->
                </template>


                <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
            </el-main>
            <!-- 布局容器 -->
        </el-container>
    </el-drawer>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Drawer', //与文件名一致
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                form:{
                    exno:'',
                    exname:'',
                    exlocation:''
                }
            };
        },
        methods: {
            closeDrawer() {
                this.$bus.$emit('refreshTable');
                this.drawer = false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？修改将不会保存')
                    .then(_ => {
                        this.$bus.$emit('refreshTable');
                        done();
                    })
                    .catch(_ => {});
            },
            UpdateEntrance(){
                axios.put('http://127.0.0.1:8086/entrance', {
                    "exno":this.form.exno,
                    "exname": this.form.exname,
                    "exlocation": this.form.exlocation,
                }).then(
                    response => {
                        if (response.data.data) {
                            /* 如果修改成功 */
                            this.$notify({
                                title: '修改',
                                message: '修改信息成功',
                                type: 'success'
                            });
                            this.$bus.$emit('complete', true);
                        } else {
                            /* 如果修改失败 */
                            this.$notify.error({
                                title: '修改',
                                message: '修改信息失败'
                            });
                        }
                        this.closeDrawer();
                    },
                    error => {
                        this.$notify.error({
                            title: '修改',
                            message: '修改信息失败'
                        });
                        this.closeDrawer();
                    }                    
                )
            }
        },
        mounted() {
            this.$bus.$on('setDrawerFlag', (Drawerboolean, data) => {
                console.log('Drawer.vue___报告___Drawerboolean为:' + Drawerboolean + "_____Data为:" + data);
                this.form = data;
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