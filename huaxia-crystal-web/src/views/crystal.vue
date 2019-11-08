<template>
  <div class="crystal" style="width: 80%;padding:20px;margin:0 auto">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="数据源：">
        <el-select v-model="formInline.rigion" placeholder="请选择数据源" @change="select">
          <el-option label="Hive" value="Hive"></el-option>
          <el-option label="Elasticsearch" value="Elasticsearch"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="desc">
        <el-input type="textarea" rows="7" v-model="formInline.content" :autosize="{ minRows: 1.4, maxRows: 6}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
     <el-table
        :data="tableData"
        stripe border>
        <el-table-column v-for="(item,index) in tableLables" :key="index" :label="item.code"
                          align="center" >
          <template slot-scope="scope">
              {{ scope.row[item.code] || scope.row[item.code] === 0 ? scope.row[item.code] : '--' }}
          </template>
        </el-table-column>
      </el-table>
    <span class="textCenter" v-show="this.formInline.rigion == 'Elasticsearch'">
     <el-pagination
          @size-change="size_change"
          @current-change="current_change"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSum"
          :page-count="Number(totalSum /10)"
          :background="true">
      </el-pagination>
      </span>
  </div>
</template>

<script>
import { getES , getHive } from '@/api/api.js';
export default {
  data() {
    return {
      formInline:{
        rigion : 'Hive',
        content:'',
      },
      currentPage:1,
      param: {
          pageNum: 1,
          pageSize: 10
      },
      totalSum:0,
      pageSize:10,
      tableLables:[],
      tableData:[],

    }
  },
  created(){
     // this.getHive()
  },
  methods:{
    getES(param){
      getES(param).then(response => {
          if (response.code === '0000') {
            this.totalSum = response.total
            let _this = this
            this.tableLables=[]
             if(response.data.length>0){
            Object.keys(response.data[0]).forEach(function(key){
              let obj = {}
              //console.log('111',key,response.data[0][key]);
              obj.code=key
              obj.label=key
              _this.tableLables.push(obj)
            })
              this.tableData = response.data
               }
            else this.tableData=[]
          } 
          else {
            this.tableLables=[]
            this.$message.error(response.success);
          }
      })
    },
    getHive(param){
    
      getHive(param).then(response => {
          if (response.code === '0000') {
            let _this = this
            this.tableLables=[]
            if(response.data.length>0){
            Object.keys(response.data[0]).forEach(function(key){
              let obj = {}
              //console.log('111',key,response.data[0][key]);
              obj.code=key
              obj.label=key
              _this.tableLables.push(obj)
            })
              this.tableData = response.data
            }
            else this.tableData=[]
          } 
          else {
            this.tableLables=[]

            this.$message.error(response.success);
          }
      })
    },
    select(){
      if(this.formInline.rigion == 'Hive'){

          this.getHive({content: this.formInline.content})
        }
        if(this.formInline.rigion == 'Elasticsearch'){
          this.getES(this.param)
        }
    },
    onSubmit(){
      
      if(this.formInline.content==''){
        this.$confirm("请输入搜索内容", "操作提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          showCancelButton : false
        })
        .then(() => {
        })
      }
      else{
        this.param = {
           pageNum: 1,
           pageSize: 10,
           content: this.formInline.content
        }
        console.log(this.formInline.rigion);
        if(this.formInline.rigion == 'Hive'){
          this.getHive({content: this.formInline.content})
        }
        if(this.formInline.rigion == 'Elasticsearch'){
          this.getES(this.param)
        }
      }
    },
     size_change(val) {
        this.pageSize = val;
          this.param.pageSize = this.pageSize;
          if(this.formInline.rigion == 'Hive'){
          this.getHive({content: this.formInline.content})
        }
        if(this.formInline.rigion == 'Elasticsearch'){
          this.getES(this.param)
        }
      },
      current_change(val) {
          this.currentPage = val;
          this.param.pageNum = this.currentPage;
          if(this.formInline.rigion == 'Hive'){
          this.getHive({content: this.formInline.content})
        }
        if(this.formInline.rigion == 'Elasticsearch'){
          this.getES(this.param)
        }
      }
    
  }
  
    
}
</script>
<style lang="less">
 .crystal{
   .el-textarea__inner{
     min-width: 500px;
     height: 40px
   }
 }
  .textCenter {
    display: flex;
    justify-content: flex-end; /* 水平右对齐 */
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
  }

</style>

