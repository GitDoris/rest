<!--对公还款-对公录入-待处理任务-->
<template>
  <div>
    <!-- <el-table :data="tableDataTop" style="width: 100%">
      <el-table-column prop="contractSerialno" label="合同编号"></el-table-column>
      <el-table-column prop="cardNo" label="银行卡号"></el-table-column>
       <el-table-column prop="exceedMoney" label="溢缴款"></el-table-column> 
      <el-table-column prop="balance" label="挂账金额"></el-table-column>
      <el-table-column prop="repealMoney" label="挂账撤销金额"></el-table-column>
      <el-table-column prop="realPayAmount" label="上次还款金额"></el-table-column>
      <el-table-column prop="payAmount" label="上次应还金额"></el-table-column>
      <el-table-column prop="payDate" label="上次还款日期"></el-table-column>
      <el-table-column prop="store" label="门店"></el-table-column>
      <el-table-column prop="inputuser" label="申请人"></el-table-column>
      <el-table-column prop="reviewuser" label="复核人"></el-table-column> 
      <el-table-column prop="createdTime" label="操作时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table> -->
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>

  </div>
</template>

<script>

  import {repealHistoryList} from '@/api/carLoadAfterApi'
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import tableLables from './tableLabel'

  export default {
    data() {
      return {
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
          tableLables: tableLables,
          tableData: [],
          queryTables: {
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
        myAllSelectChecked: false,
      }
    },

    created() {
      //this.applyFlowId = JSON.parse(sessionStorage.revocationData)[0];//合同编号
      this.contractId = JSON.parse(sessionStorage.revocationData)[1];//id
      this.getDetail(this.tableParam.queryTables.param);
    },

    methods: {

      getDetail(param) {
       
          param.contractId=this.contractId;
          //idList:this.serialNo2,
       

        repealHistoryList(param).then(response => {
          //console.log(response.data)
        	if (response.data.code === "00000") {
          //   this.tableDataTop= response.data.list;

          //   let reg = /^(\d{4})\d+(\d{4})$/;
          //  // 银行卡号加星星
          //   for(let i=0;i<this.tableDataTop.length;i++){
          //     if(this.tableDataTop[i].cardNo){
          //         let str = this.tableDataTop[i].cardNo;
          //         str = str.replace(reg, "$1******$2");
          //         this.tableDataTop[i].cardNo = str;
          //     }
          //   }
              this.tableParam.tableData = [];
              if (response.data.data.list) {
                const array = response.data.data.list;
                for(let i=0;i<array.length;i++){
                  switch(Number(array[i].repealStatus)){
                    case 1:
                      array[i].repealStatus = "新增";
                      break;
                    case 2:
                      array[i].repealStatus = "申请中";
                      break;
                    case 3:
                      array[i].repealStatus = "成功";
                      break;
                    case 4:
                      array[i].repealStatus = "失败";
                      break;
                    case 5:
                      array[i].repealStatus = "取消";
                      break;
                    case 6:
                      array[i].repealStatus = "财务拒绝";
                      break;
                    default:
                      break;
                  }
                }
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.data.total;
                 
              } else {
                this.tableParam.tableData = []
               // this.tableParam.isShoweds.tableIsShow = 2;
                this.tableParam.isShoweds.pageIsShow = false;
              }
          } else {
            this.$message.error(response.data.msg);
          }
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
      HxTable,
    }
  }
</script>

