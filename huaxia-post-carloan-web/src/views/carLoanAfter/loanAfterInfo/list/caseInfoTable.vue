<!--逾期明细-->
<template>
  <div style="padding:15px;">
    <el-table :data="tableDataTop" style="width: 100%" size="mini"
          border>
      <el-table-column prop="contractSerialno" label="合同编号"></el-table-column>
      <el-table-column prop="payCorpusAmt" label="本金"></el-table-column>
      <el-table-column prop="payInteAmt" label="利息"></el-table-column>
      <el-table-column prop="payMonServiceAmt" label="逾期违约金"></el-table-column>
      <el-table-column prop="payFineAmt" label="罚息"></el-table-column>
      <el-table-column prop="sum" label="总额"></el-table-column>
      <el-table-column prop="lateStage" label="逾期阶段"></el-table-column>
      <el-table-column prop="currentDate" label="当前日期"></el-table-column>
    </el-table>
    <hr>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>
    <!--<el-table :data="tableDataTop2" style="width: 100%">
      <el-table-column prop="payDate" label="还款日"></el-table-column>
      <el-table-column prop="seqid" label="期次"></el-table-column>
      <el-table-column prop="payPrincipal" label="本金"></el-table-column>
      <el-table-column prop="payInterest" label="利息"></el-table-column>
      <el-table-column prop="payFee" label="费用"></el-table-column>
      <el-table-column prop="payFineAmt" label="罚息"></el-table-column>
      <el-table-column prop="overdueDays" label="逾期天数"></el-table-column>
      <el-table-column prop="sumAmt" label="总额"></el-table-column>
    </el-table>-->
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import tableLables from './tableLabel'
  import {overDueList} from '@/api/carLoadAfterApi'

  export default {
    props: {
      overduedetails :{
        type: Object
      }
    },
    data() {
      return {
        tableDataTop:[],
        //tableDataTop2:[],
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: false, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            showSelectAll: false, // 是否显示选择全部按钮
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: tableLables.overDueDetail,
          tableData: [],
          queryTables: {
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
        
      }
    },

    created() {
      
      let obj ={}
      obj.contractSerialno = this.overduedetails.contractSerialno?this.fmoney(this.overduedetails.contractSerialno, 2):'--';
      obj.payCorpusAmt = this.overduedetails.payCorpusAmt?this.fmoney(this.overduedetails.payCorpusAmt, 2):'--';
      obj.payInteAmt = this.overduedetails.payInteAmt?this.fmoney(this.overduedetails.payInteAmt, 2):'--';
      obj.payMonServiceAmt = this.overduedetails.payMonServiceAmt?this.fmoney(this.overduedetails.payMonServiceAmt, 2):'--'
      obj.payFineAmt = this.overduedetails.payFineAmt?this.fmoney(this.overduedetails.payFineAmt, 2):'--'
      obj.sum = this.overduedetails.sum?this.fmoney(this.overduedetails.sum, 2):'--'
      obj.contractSerialno = this.overduedetails.contractSerialno?this.overduedetails.contractSerialno:'--'
      obj.lateStage = this.overduedetails.lateStage?this.overduedetails.lateStage:'--'
      obj.currentDate = this.overduedetails.currentDate?this.overduedetails.currentDate:'--'
       this.tableDataTop.push(obj);


      this.caseCheckData = JSON.parse(sessionStorage.caseCheckData);
      this.getSearch(this.tableParam.queryTables.param);

      
    },

    methods: {
      //格式化金额三位一加逗号
     fmoney(s, n) { 
        if(s == "" || s == undefined ||s == null){
          return "--";
        }else{
          //console.log(typeof(s))
          let oStart = s.toString().substr(0,1);
          if(oStart == "-"){
            s = s.toString().substr(1,s.length);
          }
          //n = n > 0 && n <= 2 ? n : 2; 
          n = 2;
          s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
          let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
          let t = ""; 
          for (let i = 0; i < l.length; i++) { 
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
          } 
          if(oStart == "-"){
            return oStart + t.split("").reverse().join("") + "." + r; 
          }else{
            return t.split("").reverse().join("") + "." + r; 
          }
        }
      }, 
       /* 检索 */
      getSearch(param) {
        param.contractSerialNo=this.caseCheckData;
        overDueList(param).then(response => {

          if (response.data.code === "00000") {

              this.tableParam.tableData = [];
              if (response.data.list) {
                const array = response.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.total;
              } else {
                this.tableParam.tableData = []
               // this.tableParam.isShoweds.tableIsShow = 2;
                this.tableParam.isShoweds.pageIsShow = false;
              }

          } else {
            this.$message.error(response.data.msg);
          }
         // console.log(response.data)

        })
      },
      method(key, data) {
        switch (key) {
          case "current_change": //当前页数修改
            this.tableParam.pageHelpers.currentPage = data;
            this.tableParam.queryTables.param.pageNum = this.tableParam.pageHelpers.currentPage;
            this.getSearch(this.tableParam.queryTables.param);
            break;

          case "size_change": //每页数据条数修改
            this.tableParam.pageHelpers.pageSize = data;
            this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize;
            this.getSearch(this.tableParam.queryTables.param);
            break;
          default:

        }
      },
    

    },

    components: {
      HxTable
    }
  }
</script>
<style>

 .el-table td.is-center, .el-table th.is-center{
   text-align: left;
 }
 .el-col-24{
   text-align: left;
 }
 .box-body{
   padding: 0;
 }
</style>
