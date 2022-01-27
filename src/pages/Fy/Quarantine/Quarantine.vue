<!-- 出入口 -->
<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>隔离管理</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">
      黑龙江大学 <span class="fw-semi-bold">隔离管理</span>
    </h1>
    <b-row>
      <b-col xs="12" md="10">
        <Widget title="<h5>隔离人员 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
          <!-- 内容 -->
          <el-table
              :data="quarantinedTable.filter(data => !search1 || data.sname.toLowerCase().includes(search1.toLowerCase()))"
              style="width: 100%" max-height="600">
            <el-table-column prop="stno" label="学工号" width="150">
            </el-table-column>
            <el-table-column prop="sname" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="dormno" label="宿舍号" width="120">
            </el-table-column>
            <el-table-column prop="dormname" label="宿舍名" width="300">
            </el-table-column>
            <el-table-column prop="dormlocation" label="宿舍地址" width="120">
            </el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120">
            </el-table-column>
            <el-table-column label="" width="">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search1" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button type="" size="mini"
                           style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
                           @click="handle(scope.row,'update')">编辑
                </el-button>
                <el-button type="danger" size="mini"
                           @click="del(scope.row)">删除
                </el-button>
              </template>
              >
            </el-table-column>
          </el-table>
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col xs="12" md="10">
        <Widget title="<h5>待隔离人员 <small class='text-muted'>黑龙江大学</small></h5>" customHeader close collapse>
          <!-- 内容 -->
          <el-table
              :data="tobeQuarantineTable.filter(data => !search2 || data.sname.toLowerCase().includes(search2.toLowerCase()))"
              style="width: 100%" max-height="600">
            <el-table-column prop="stno" label="学工号" width="150">
            </el-table-column>
            <el-table-column prop="sname" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120">
            </el-table-column>
            <el-table-column prop="" label="" width="">
            </el-table-column>
            <el-table-column label="" width="230">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search2" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button type="" size="mini"
                           style="background: #30314E;color: rgba(244, 244, 245, 0.7);border: #cac4c4;"
                           @click="handle(scope.row,'insert')">处理
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </Widget>
      </b-col>
    </b-row>

    <!-- Dialog -->
    <el-dialog title="隔离宿舍" :visible.sync="dialogFormVisible" @close="cleanAllValue()">
      <el-form :model="submitForm">
        <el-form-item label="姓名" :label-width="'120px'">
          <el-input :disabled="true" v-model="dialogmaterials.sname" autocomplete="off" style="width: 600px"></el-input>
        </el-form-item>
        <el-form-item label="隔离宿舍" :label-width="'120px'">
          <el-select v-model="submitForm.dormno" filterable placeholder="请输入或者选择宿舍号" style="width: 300px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelbutton()">取 消</el-button>
        <el-button type="primary" @click="surebutton()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios';

export default {
  name: 'Quarantine',
  data() {
    return {
      options: [
        {
          label: '',
          value: ''
        }
      ],
      dialogmaterials: {
        sname: ''
      },
      submittype: '',
      submitForm: {
        stno: '',
        dormno: ''
      },
      dialogFormVisible: false,
      search1: '',
      search2: '',
      tobeQuarantineTable: [//待隔离
        {
          stno: 0,
          sname: '张三',
          sex: '女',
          telephone: '15616316516'
        }
      ],
      quarantinedTable: [//已经隔离
        {
          stno: 0,
          sname: '',
          sex: '女',
          dormno: 0,
          dormname: '',
          dormlocation: '',
          telephone: ''
        }
      ]
    }
  },
  methods: {
    surebutton() {
      let url = 'http://127.0.0.1:8086/quarantine'; //insert
      let method = 'post';//insert
      if (this.submittype === 'update') { //更新
        url += '/updateQuarantineDormitory';
        method = 'put'
      }
      axios({
        method,
        data: this.submitForm,
        url
      }).then(
          response => {
            this.$notify({
              title: '隔离',
              message: '成功',
              type: 'success'
            });
            this.getTobeQuarantineTable();
            this.getQuarantinedTable();
            this.cancelbutton();
          },
          error => {
            this.$notify.error({
              title: '隔离',
              message: '失败'
            });
            this.cancelbutton();
          }
      )
    },
    cancelbutton() {
      this.cleanAllValue();
      this.dialogFormVisible = false;
    },
    cleanAllValue() { //关闭Dialog
      this.submitForm = {
        stno: '',
        dormno: ''
      }
    },
    handle(data, submittype) { //打开Dialog
      this.submittype = submittype;//标记提交类型
      this.dialogFormVisible = true;
      this.submitForm.dormno = data.dormno;
      this.dialogmaterials.sname = data.sname;
      this.submitForm.stno = data.stno;
    },
    testShift() {
      this.tableData.shift();
    },
    getOptions() {
      axios.get('http://127.0.0.1:8086/quarantine/getOptions').then(
          response => {
            console.log('getOptions', response.data);
            this.options = response.data;
          },
          error => {
            console.log('getOptions请求失败了', error.message);
          }
      )
    },
    getTobeQuarantineTable() {
      axios.get('http://127.0.0.1:8086/quarantine/toBeQuarantined').then(
          response => {
            //回调函数
            console.log('getTobeQuarantineTable请求成功了', response.data);
            this.tobeQuarantineTable = response.data;
          },
          error => {
            //出错函数
            console.log('getTobeQuarantineTable请求失败了', error.message);
          }
      )
    },
    getQuarantinedTable() {
      axios.get('http://127.0.0.1:8086/quarantine/quarantined').then(
          response => {
            //回调函数
            console.log('getTobeQuarantineTable请求成功了', response.data);
            this.quarantinedTable = response.data;
          },
          error => {
            //出错函数
            console.log('getTobeQuarantineTable请求失败了', error.message);
          }
      )
    },
    del(data) {
      this.$confirm('是否将<font size="5" color="#2477FF"><b>' + data.sname + '</b></font>移除隔离', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {

        axios.delete('http://127.0.0.1:8086/quarantine/deletebystno', {
          params: {
            stno: data.stno
          }
        }).then(
            res => {
              this.$message({
                type: 'success',
                message: '移除成功!'
              });
              this.getTobeQuarantineTable();
              this.getQuarantinedTable();
            },
            err => {
              this.$message({
                type: 'error',
                message: '移除失败'
              });
            }

        )

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        });
      });
    }
  },
  components: {
    Widget,

  },
  mounted() {
    this.getQuarantinedTable();
    this.getTobeQuarantineTable();
    this.getOptions();
  }
};
</script>

<style>

</style>