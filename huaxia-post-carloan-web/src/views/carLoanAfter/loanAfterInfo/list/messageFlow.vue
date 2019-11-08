<!--交易明细-->
<template>
  <div style="padding:15px;">
    <el-table
     size="mini"
          stripe border
    ref="filterTable"
    :data="tableParam.tableData"
    style="width: 100%;">
    <el-table-column
      prop="dueBillSerialno"
      label="合同编号"
    >
    </el-table-column>
    <el-table-column
      prop="applyDate"
      label="交易日期"
    >
    </el-table-column>
    <el-table-column
      prop="exchangeHour"
      label="记账日期"
    >
    </el-table-column>
    <el-table-column
      prop="deductType"
      label="交易类型"
    >
    </el-table-column>
    <el-table-column
      prop="actualAmount"
      label="交易金额"
    >
      <template slot-scope="scope">
        {{ scope.row.actualAmount| fmoney(scope.row.actualAmount, 2)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="inputUser"
      label="操作人"
    >
    </el-table-column>
    <el-table-column
      prop="inputDate"
      label="操作日期"
    >
    </el-table-column>
    <el-table-column
      prop="tradeResult"
      label="交易结果"
      width="100"
      :filters="[{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }, { text: '处理中', value: '处理中' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
       
    </el-table-column>
  </el-table>
    <!-- <hx-table ref="hxtableComponent" :tableItems="tableParam"  @btn-click="method">
    </hx-table> -->
    <div class="textCenter">
    <el-pagination
          @size-change="btnClick('size_change',$event)"
          @current-change="btnClick('current_change',$event)"
          :current-page="tableParam.pageHelpers.currentPage"
          :page-size="tableParam.pageHelpers.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableParam.pageHelpers.totalSum"
          :page-count="Number(tableParam.pageHelpers.totalSum /10)"
          :background="true">
        </el-pagination>
    </div>
  </div>
   
</template>

<script>

  //import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import tableLables from './tableLabel'
  import {transcationList} from '@/api/carLoadAfterApi'


  export default {
    props: ['transactiondetails'],
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
          tableLables: tableLables.messageFlowTable,
          tableData: [],
          queryTables: {
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
        myAllSelectChecked: false
      }
    },

    created() {

      this.caseCheckData = JSON.parse(sessionStorage.caseCheckData);
      this.getSearch(this.tableParam.queryTables.param);
     // console.log(this.transactiondetails)
    },

    methods: {
  filterTag(value, row) {
    //console.log('ss')
        return row.tradeResult === value;
      },
      /* 检索 */
      getSearch(param) {
        param.contractSerialNo=this.caseCheckData;
        transcationList(param).then(response => {
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

        })
      },
      btnClick(key, data) {
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
      //HxTable,
    }
  }
</script>
<style>
.textCenter {
  display: flex;
  justify-content: flex-end;
  /* 水平右对齐 */
  align-items: center;
  /* 垂直居中 */
  margin-top: 20px;
}
</style>

