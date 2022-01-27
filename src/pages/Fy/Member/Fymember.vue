<!-- 出入口 -->
<template>
    <div>
        <b-breadcrumb>
            <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
            <b-breadcrumb-item active>防疫人员管理</b-breadcrumb-item>
        </b-breadcrumb>
        <h1 class="page-title">
            黑龙江大学 <span class="fw-semi-bold">防疫人员管理</span>
        </h1>
        <b-row>
            <b-col xs="12" md="10">
                <Widget title="<h5>校园防疫人员 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
                    <!-- 内容 -->
                    <el-table
                        :data="tableData.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%" max-height="600">
                        <el-table-column prop="no" label="#" width="150">
                        </el-table-column>
                        <el-table-column prop="stno" label="学工号" width="120">
                        </el-table-column>
                        <el-table-column prop="sname" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" width="120">
                        </el-table-column>
                        <el-table-column prop="telephone" label="联系方式" width="300">
                        </el-table-column>
                        <el-table-column prop="" label="" width="300">
                        </el-table-column>
                        <!-- <el-table-column label="" width="85">
                            <template slot-scope="scope">
                                <el-button @click="" type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;">编辑</el-button>
                            </template>
                        </el-table-column> -->

                        <el-table-column label="" width="">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                            </template>
                            <template slot-scope="scope">
                                <el-button type="danger" size="mini" style="border: #cac4c4;"
                                    @click="deleteStep(scope.row.no)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </Widget>
            </b-col>
        </b-row>

        <b-row>
            <b-col xs="12" md="10">
                <Widget title="<h5>添加防疫人员 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
                    <!-- 内容 -->
                    <el-table
                        :data="exceptEpmemberTable.filter(data => !search2 || data.sname.toLowerCase().includes(search2.toLowerCase()))"
                        style="width: 100%" max-height="600">
                        <el-table-column prop="stno" label="学工号" width="120">
                        </el-table-column>
                        <el-table-column prop="sname" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" width="120">
                        </el-table-column>
                        <el-table-column prop="telephone" label="联系方式" width="300">
                        </el-table-column>
                        <el-table-column prop="" label="" width="450">
                        </el-table-column>
                        <!-- <el-table-column label="" width="85">
                            <template slot-scope="scope">
                                <el-button @click="" type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;">编辑</el-button>
                            </template>
                        </el-table-column> -->

                        <el-table-column label="" width="">
                            <template slot="header" slot-scope="scope">
                                <el-input v-model="search2" size="mini" placeholder="输入关键字搜索" />
                            </template>
                            <template slot-scope="scope">
                                <el-button type="" size="mini"
                                    style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
                                    @click="addStep(scope.row)">添加
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </Widget>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Widget from '@/components/Widget/Widget';
    import axios from 'axios'
    export default {
        name: 'Fymember',
        data() {
            return {
                search: '',
                search2: '',
                //工作人员
                tableData: [{
                    no: '1',
                    stno: '113',
                    sname: '张三',
                    sex: '男',
                    telephone: ''
                }],
                //非工作人员
                exceptEpmemberTable: [{
                    no: '1',
                    stno: '113',
                    sname: '张三',
                    sex: '男',
                    telephone: ''
                }]
            }
        },
        methods: {
            refreshTable() {
                this.getAllEpmember();
                this.getAllNotEpmember();
            },
            deleteStep(no) {
                this.$confirm('此操作将移除该防疫人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Delete(no);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                });
            },
            Delete(no) {
                console.log(no);
                axios.delete('http://127.0.0.1:8086/epmember', {
                    params: {
                        idList: no
                    }
                }).then(
                    response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.refreshTable();
                    },
                    error => {
                        this.$message.error('删除失败');
                    }
                )
            },
            addStep(data) {
                this.$confirm('此操作将添加<font size="5" color="#2477FF"><b>'+data.sname+'</b></font>为防疫人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.Add(data);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消添加'
                    });
                });
            },
            Add(data) {
                axios.post('http://127.0.0.1:8086/epmember/AddInEpmember', {
                    "stno": data.stno,
                    "name": data.sname,
                }).then(
                    response => {
                        console.log(response.data);
                        if (response.data) {
                            this.refreshTable();
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('添加失败');
                        }
                    },
                    error => {
                        this.$message.error('添加失败');
                    }
                )
            },
            getAllEpmember() {
                axios.get('http://127.0.0.1:8086/epmember/getAll').then(
                    //引入->import axios from 'axios'
                    response => {
                        //回调函数
                        console.log('Epmember请求成功了', response.data);
                        this.tableData = response.data;
                    },
                    error => {
                        //出错函数
                        console.log('Epmember请求成功了', error.message)
                    }
                )
            },
            getAllNotEpmember() {
                axios.get('http://127.0.0.1:8086/epmember/getAllNot').then(
                    //引入->import axios from 'axios'
                    response => {
                        //回调函数
                        console.log('Epmember请求成功了', response.data);
                        this.exceptEpmemberTable = response.data;
                    },
                    error => {
                        //出错函数
                        console.log('Epmember请求成功了', error.message)
                    }
                )
            }
        },
        components: {
            Widget,

        },
        mounted() {
            this.getAllEpmember();
            this.getAllNotEpmember();
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