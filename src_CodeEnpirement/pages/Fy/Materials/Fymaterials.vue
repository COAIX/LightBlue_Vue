<!-- 出入口 -->
<template>
    <div>
        <b-breadcrumb>
            <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
            <b-breadcrumb-item active>防疫物资管理</b-breadcrumb-item>
        </b-breadcrumb>
        <h1 class="page-title">
            黑龙江大学 <span class="fw-semi-bold">防疫物资管理</span>
        </h1>
        <b-row>
            <b-col xs="12" md="12">
                <Widget title="<h5>防疫物资管理 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
                    <!-- 内容 -->
                    <el-table
                        :data="tableData.filter(data => !search || data.materialsname.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%" max-height="600">
                        <el-table-column prop="materialsno" label="#" width="150">
                        </el-table-column>
                        <el-table-column prop="materialsname" label="物品名" width="120">
                        </el-table-column>
                        <el-table-column prop="materialsnumber" label="数量" width="120">
                        </el-table-column>
                        <el-table-column prop="" label="" width="1000">
                        </el-table-column>
                        <!-- <el-table-column label="" width="85">
                            <template slot-scope="scope">
                                <el-button @click="setDrawerFlag(true,scope.row)" type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;">编辑
                                </el-button>
                            </template>
                        </el-table-column> -->

                        <el-table-column label="" width="">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                            </template>

                            <template slot-scope="scope">
                                <el-button @click="setDrawerFlag(true,scope.row,'update')" type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;">编辑
                                </el-button>
                                <el-button type="danger" size="mini" style="border: #cac4c4;"
                                    @click="deleteStep(scope.row.materialsno)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </Widget>
            </b-col>
            <b-col>
                <el-button style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
                    @click="setDrawerFlag(true,null,'insert')">添加</el-button>
            </b-col>

        </b-row>
        <FymaterialsDrawer></FymaterialsDrawer>
    </div>
</template>

<script>
    import Widget from '@/components/Widget/Widget';
    import FymaterialsDrawer from './FymaterialsDrawer.vue';
    import axios from 'axios';
    export default {
        name: 'Fymaterials',
        data() {
            return {
                search: '',
                tableData: [{
                    materialsno: '1',
                    materialsname: '口罩',
                    materialsnumber: '600',
                }]
            }
        },
        mounted() {
            this.gettableData();
            this.$bus.$on('refreshMaterialsTable', () => {
                this.gettableData();
            })
        },
        methods: {
            deleteStep(id) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.materialsDelete(id);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            materialsDelete(id){
                console.log(id);
                axios.delete('http://127.0.0.1:8086/materials', {
                    params: {
                        idList: id
                    }
                }).then(
                    response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.gettableData();
                    },
                    error => {
                        this.$message.error('删除失败');
                    }
                )
            },
            gettableData() {
                axios.get('http://127.0.0.1:8086/materials').then(
                    response => {
                        //回调函数
                        console.log('请求成功了', response.data.data.records);
                        this.tableData = response.data.data.records;
                    },
                    error => {
                        //出错函数
                        console.log('请求失败了', error.message);
                    }
                )
            },
            handleClick(row) {
                console.log(row);
            },
            setDrawerFlag(Drawerboolean, data, drawerFlag) {
                console.log('List.vue____setDrawerFlag:' + Drawerboolean + "Data___:" + data + "drawerFlag__" +
                    drawerFlag);
                console.log(data);
                // this.$bus.$emit('handleClick',data);
                this.$bus.$emit('setDrawerFlag_Fymaterials', Drawerboolean, data, drawerFlag);
            },
        },
        components: {
            Widget,
            FymaterialsDrawer
        }
    };
</script>

<style>
    .el-table,
    .el-table__expanded-cell {
        /* color: aliceblue; */
        background-color: transparent !important;
    }

    .el-table th,
    .el-table tr,
    .el-table td {
        /* color: rgb(120, 130, 138); */
        color: rgb(136, 146, 155);
        background-color: transparent !important;
        border-bottom: 1px solid #000000 !important;
    }

    .el-table::before {
        background-color: transparent !important;
    }

    .el-input input {
        color: #fff !important;
    }

    .el-input__inner {
        background-color: rgba(255, 255, 255, 0.247) !important;
        border: #dcdfe6 !important;
    }
</style>