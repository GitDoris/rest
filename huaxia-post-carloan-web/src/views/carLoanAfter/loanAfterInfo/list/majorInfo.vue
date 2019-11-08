<!--还款计划表-->
<!--<template>
  <div>
    <hx-table ref="hxtableComponent" @btn-click="method" :tableItems="tableParam">
    </hx-table>
  </div>
</template>

<script>

  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {repaymentList} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'

  export default {
    data() {
      return {
        caseCheckData: "",
       // caseCheckData2: "",
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: false, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            showSelectAll: false, // 是否显示选择全部按钮
            showDistribute: false, // 是否显示分配人员按错
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          //tableLables: this.$store.state.tableLables.actionTable,
          tableLables: tableLables.actionTable,
          tableData: [],
          queryTables: {
            queryParas: [
              
            ],
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
      }
    },

    created() {
       this.caseCheckData = JSON.parse(sessionStorage.caseCheckData);
     //  this.caseCheckData2 = JSON.parse(sessionStorage.caseCheckDetail);

      // this.tableParam.queryTables.param.pageNum = this.tableParam.pageHelpers.currentPage;
      // this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize;
      // let param = {}
      this.getSearch(this.tableParam.queryTables.param);
    },

    methods: {
     
      /* 检索 */
      getSearch(param) {
        param.contractSerialNo=this.caseCheckData;
        repaymentList(param).then(response => {
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
      method(key, data) {
        switch (key) {
          case "search": //搜索事件
            this.getSearch(data);
            break;

          case "reSet": //检索重置
            this.tableParam.pageHelpers = {
              ...this.$store.state.glabdatas.searchSetting.pageHelpers
            }
            this.tableParam.queryTables.param = {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            }
            this.getSearch(this.tableParam.queryTables.param);
            // debugger
            break;
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
</script>-->

<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>
  </div>
</template>

<script>

  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import tableLables from './tableLabel'
  import {repaymentList} from '@/api/carLoadAfterApi'


  export default {
    //props: ['transactiondetails'],
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
          tableLables: tableLables.actionTable,
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

      /* 检索 */
      getSearch(param) {
        param.contractSerialNo=this.caseCheckData;
        repaymentList(param).then(response => {
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
