<!-- 出入口 -->
<template>
    <div>
        <b-breadcrumb>
            <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
            <b-breadcrumb-item active>出入口管理</b-breadcrumb-item>
        </b-breadcrumb>
        <h1 class="page-title">
            黑龙江大学 <span class="fw-semi-bold">出入口管理</span>
        </h1>
        <b-row>
            <b-col xs="12" md="10">
                <Widget title="<h5>出入口管理 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
                    <!-- 内容 -->
                    <el-table
                        :data="tableData.filter(data => !search || data.exname.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%" max-height="600">
                        <el-table-column prop="exno" label="#" width="120">
                        </el-table-column>
                        <el-table-column prop="exname" label="名称" width="150">
                        </el-table-column>
                        <el-table-column prop="exlocation" label="地址" width="400">
                        </el-table-column>
                        <!-- 占框 -->
                        <el-table-column prop="" label="" width="">
                        </el-table-column>
                        <el-table-column label="" width="150">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                            </template>
                            <template slot-scope="scope">
                                <el-button @click="setDrawerFlag(true,scope.row)" type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;">编辑
                                </el-button>
                                <el-button type="danger" size="mini" style="border: #cac4c4;"
                                    @click="deleteEntranceStep(scope.row.exno)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </Widget>
            </b-col>
        </b-row>
        <el-button style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
            @click="setDrawerFlag2(true)">新增</el-button>
        <Drawer></Drawer>
        <newExDrawer></newExDrawer>
    </div>
</template>

<script>
    import Widget from '@/components/Widget/Widget';
    import Drawer from './Drawer.vue';
    import newExDrawer from './newExDrawer.vue';
    import axios from 'axios';

    export default {
        name: 'Extable',
        data() {
            return {
                search: '',
                tableData: [{
                    exno: '1',
                    exname: '南三门',
                    exlocation: 'c区南三门'
                }]
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            setDrawerFlag(Drawerboolean, data) {
                console.log('List.vue____setDrawerFlag:' + Drawerboolean + "Data___:" + data);
                console.log(data);
                // this.$bus.$emit('handleClick',data);
                this.$bus.$emit('setDrawerFlag', Drawerboolean, data);
            },
            /* 添加出入口传值给抽屉调用 */
            setDrawerFlag2(Drawerboolean) {
                console.log('List.vue____setDrawerFlag:' + Drawerboolean);
                // this.$bus.$emit('handleClick',data);
                this.$bus.$emit('setDrawerFlag_newExDrawer', Drawerboolean);
            },
            //获取表所有值
            getTableData() {
                axios.get('http://127.0.0.1:8086/entrance').then(
                    //引入->import axios from 'axios'
                    response => {
                        //回调函数
                        console.log('getTableData成功:', response.data.data.records);
                        this.tableData = response.data.data.records;
                    },
                    error => {
                        //出错函数
                        console.log('getTableData请求失败了', error.message);
                    }
                );
            },
            deleteEntrance(id) {
                axios.delete('http://127.0.0.1:8086/entrance', {
                    params: {
                        idList: id
                    }
                }).then(
                    response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getTableData();
                    },
                    error => {
                        this.$message.error('删除失败');
                    }
                )
            },
            deleteEntranceStep(id) {
                this.$confirm('此操作将永久删除该出入口, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.deleteEntrance(id);
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
            }
        },
        components: {
            Widget,
            Drawer,
            newExDrawer
        },
        mounted() {
            console.log("Extable生命周期mounted()invoke");
            this.getTableData();
            /* 抽屉增值成功，重新调用值 */
            this.$bus.$on('refreshTable', () => {
                console.log('getTableData');
                this.getTableData();
            });
        },
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