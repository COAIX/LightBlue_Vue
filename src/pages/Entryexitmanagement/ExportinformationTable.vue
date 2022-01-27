<template>
    <Widget title="<h5>出校信息 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
        <!-- 内容 -->
        <el-table :data="tableData.filter(data => 
            (this.dataFilter(data)))">
            <el-table-column prop="no" label="#" width="120">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="300">
            </el-table-column>
            <el-table-column prop="exname" label="入口" width="300">
            </el-table-column>



            <el-table-column label="" width="150">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="searchstno1" size="mini" placeholder="学工号" />
                </template>
                <template slot-scope="scope">
                    {{scope.row.stno}}
                </template>
            </el-table-column>

            <el-table-column label="" width="150">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="searchname1" size="mini" placeholder="名字" />
                </template>
                <template slot-scope="scope">
                    {{scope.row.sname}}
                </template>
            </el-table-column>

            <el-table-column prop="" label="" width="">
            </el-table-column>


            <!-- 占框
            <el-table-column prop="" label="" width="">
            </el-table-column> -->

        </el-table>
    </Widget>
</template>

<script>
    import axios from 'axios';
    import Widget from '@/components/Widget/Widget';
    export default { //暴露以便外界可以接收到
        name: 'ExportinformationTable', //与文件名一致
        components: {
            Widget
            //Key:value if keyname!=valuename
            //Key:Key if keyname==valuename
        },
        //声明接收传递过来的数据，其中todos是自己用的，checkTodo和deleteTodo是给子组件MyItem用的
        // props:['todos','checkTodo','deleteTodo']
        data() {
            return {
                searchstno1: '',
                searchname1: '',
                tableData: [{
                    no: '1',
                    stno: '1',
                    exname: '南三门',
                    sname: '张三',
                    time: '2021-12-25 21:53:36',
                }]
            }
        },
        methods: {
            // 如果数据更新了再进行更新
            getTableDataWithCheck() {
                axios.get('http://127.0.0.1:8086/exportinformation/getAll').then(
                    response => {
                        //回调函数
                        console.log('getTableData请求成功了', response.data);
                        if (response.data.length != this.tableData.length) {
                            this.tableData = response.data;
                        }
                    },
                    error => {
                        //出错函数
                        console.log('getTableData请求失败了', error.message)
                    }
                )
            },
            getTableData() {
                axios.get('http://127.0.0.1:8086/exportinformation/getAll').then(
                    response => {
                        //回调函数
                        console.log('getTableData请求成功了', response.data);
                        this.tableData = response.data;
                    },
                    error => {
                        //出错函数
                        console.log('getTableData请求失败了', error.message)
                    }
                )
            },
            dataFilter(data) {
                if (!this.searchstno1 && this.searchname1) {
                    // 如果学工号为空，名字不为空
                    return data.sname.toLowerCase().includes(this.searchname1.toLowerCase());
                }
                if (this.searchstno1 && !this.searchname1) {
                    // 如果学工号不为空，名字为空
                    return data.stno.toString().toLowerCase().includes(this.searchstno1.toLowerCase());
                }
                if (this.searchstno1 && this.searchname1) {
                    // 如果两者都不为空
                    return data.sname.toLowerCase().includes(this.searchname1.toLowerCase()) && data.stno.toString().toLowerCase()
                        .includes(this.searchstno1.toLowerCase());
                }
                if (!this.searchstno1 && !this.searchname1) {
                    // 如果两者都为空
                    return true;
                }
            }
        },
        mounted() {
            this.getTableData();
        },
    }
</script>

<style scoped>
    /*scoped限定只有此组件能用该声明内样式，可删除*/
</style>