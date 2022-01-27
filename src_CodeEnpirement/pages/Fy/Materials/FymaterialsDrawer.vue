<!-- 出入口抽屉 -->
<template>
    <div>
        <el-drawer title="防疫物资" :visible.sync="drawer" :direction="direction" :before-close="handleClose" @close="cleanAllValue()">
            
            
            <!-- update布局 -->
            <el-container v-if="this.drawerFlag=='update'">
                <!-- 布局容器 -->
                <el-header>
                    <h1 style="color: black;">编辑 防疫物品</h1>
                </el-header>

                <el-main>
                    <el-form ref="updateform" :model="updateform" label-width="80px" label-position="left">
                        <el-form-item label="物品名">
                            <el-input v-model="updateform.materialsname"  placeholder="请输入物品名"></el-input>
                        </el-form-item>
                        <el-form-item label="数量">
                            <!-- 此处绑定max -->
                            <el-input-number v-model="updateform.materialsnumber"  :min="0" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-form>

                    <template>
                        <el-skeleton /><!-- 骨架屏 -->
                    </template>

                    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </el-main>

                <el-footer>
                    <el-button type="primary" style="position:relative;left: 43%;" round @click="UpdateMaterials">确认
                    </el-button>
                </el-footer>
                <!-- 布局容器 -->
            </el-container>


            <!-- insert布局 -->
            <el-container v-if="this.drawerFlag=='insert'">
                <!-- 布局容器 -->
                <el-header>
                    <h1 style="color: black;">添加 防疫物品</h1>
                </el-header>

                <el-main>
                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                        <el-form-item label="物品名">
                            <el-input v-model="form.name" @change="inputchange" placeholder="请输入物品名"></el-input>
                        </el-form-item>
                        <el-form-item label="数量">
                            <!-- 此处绑定max -->
                            <el-input-number v-model="form.number" @change="handleChange" :min="0" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-form>

                    <template>
                        <el-skeleton /><!-- 骨架屏 -->
                    </template>

                    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
                </el-main>

                <el-footer>
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="输入物品名"></el-step>
                        <el-step title="确定数量"></el-step>
                    </el-steps>
                    <el-button type="primary" style="position:relative;left: 43%;" round @click="AddMaterials">确认
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
        name: 'FymaterialsDrawer', //与文件名一致
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                drawerFlag:'',
                active: 0,
                form: {
                    name: '',
                    number:0,
                },
                updateform:{
                    materialsno:0,
                    materialsname:'',
                    materialsnumber:100
                }
            };
        },
        methods: {
            alertwarning() {
                this.$alert('请输入完整信息', '错误', {
                    confirmButtonText: '确定',
                });
            },
            closeDrawerAndCleanValue(){
                this.drawer = false;
                this.cleanAllValue();
            },
            UpdateMaterials(){
                if (this.updateform.materialsname == '' || this.updateform.materialsnumber == 0) {
                    this.alertwarning();
                } else {
                    //发送axios请求
                    axios.put('http://127.0.0.1:8086/materials', {
                        "materialsno": this.updateform.materialsno,
                        "materialsname": this.updateform.materialsname,
                        "materialsnumber": parseInt(this.updateform.materialsnumber),
                      }).then(
                        response => {
                            this.$notify({
                                title: '修改',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$bus.$emit('refreshMaterialsTable');
                            console.log('invoke_refreshMaterialsTable');
                            this.closeDrawerAndCleanValue();
                        },
                        error => {
                            this.$notify.error({
                                title: '修改',
                                message: '修改失败'
                            });
                            this.closeDrawerAndCleanValue();
                        }
                    )
                }
            },
            AddMaterials(){
                if (this.form.name.length == 0 || this.form.number == 0) {
                    this.alertwarning();
                } else {
                    //发送axios请求
                    axios.post('http://127.0.0.1:8086/materials', {
                        "materialsname": this.form.name,
                        "materialsnumber": parseInt(this.form.number),
                      }).then(
                        response => {
                            this.$notify({
                                title: '添加',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$bus.$emit('refreshMaterialsTable');
                            console.log('invoke_refreshMaterialsTable');
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
            },
            inputchange(){
                console.log("inputchangeinvoke");
                if(this.active==0){
                    this.active++;
                }
            },
            handleChange(){
                if(this.form.number!=0&&this.active==1){
                    this.active++;
                }
            },
            cleanAllValue(){
                console.log("cleanAllValue");
                /* 重置所有value值 */
                this.form={
                    name: '',
                    number:0,
                };
                this.active=0;
            },
            closeDrawer() {
                this.drawer = false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？修改将不会保存')
                    .then(_ => {
                        done();
                        this.$bus.$emit('refreshMaterialsTable');
                    })
                    .catch(_ => {});
            }
        },
        mounted() {
            this.$bus.$on('setDrawerFlag_Fymaterials', (Drawerboolean, data,drawerFlag) => {
                console.log('FymaterialsDrawer.vue___报告___Drawerboolean为:' + Drawerboolean + "_____Data为:" + data + "抽屉标记:" + drawerFlag);
                this.drawerFlag=drawerFlag;
                this.drawer = Drawerboolean;
                if(drawerFlag=='update'){
                    this.updateform=data;
                }
                console.log(drawerFlag=='update');
            })
        },
    };
</script>

<style scoped>
    .el-input {
        width: 300px
    }
</style>