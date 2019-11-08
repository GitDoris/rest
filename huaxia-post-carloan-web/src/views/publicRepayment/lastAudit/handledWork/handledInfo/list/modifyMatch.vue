<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>

  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {mRecords} from '@/api/carLoadAfterApi'
  import tableLabel from './tableLabel'
  import searchLabel from './searchLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    data() {
      return {
      	isShow:false,
        //globDictData: this.$store.state.glabdatas.globDictData,
        serialNo2:"",
        msg:"",
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: false, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: false, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel.modifyMatchList),
          tableData: [],
          queryTables: {
            queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
          //tableKey: "trailerNoes", //table的key值

        },
        transSerialNoList:[],//银行交易流水号
        selections: [],
        allSelections: [],
        checkedCaseNoList:[],//选中列表项
      }
    },

    created() {

      this.msg = JSON.parse(sessionStorage.publicLastData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicLastData)[1];//流水号
      this.getSearch();

    },

    methods: {

      /* 检索 */
      getSearch() {
        let param={
          amraId:this.serialNo2,
        }
        mRecords(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
             if(response.data.list){
            if (JSON.stringify(response.data.list) !== '{}') {
              if (response.data.list.length > 0) {
                this.transSerialNoList =  response.data.list;
                const array = response.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.tableData = array;

              } else {
                this.tableParam.tableData=[];
                //this.tableParam.isShoweds.tableIsShow = 2;
                this.tableParam.isShoweds.pageIsShow = false;

              }
            } else {
              this.tableParam.tableData = []
            }
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
      HxTable
    }
  }
</script>

