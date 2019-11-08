<!--对公还款-对公录入-待处理任务详情-修改匹配-->
<template>
  <div>
    <el-button type="primary" size="mini" @click="modifyMatchList">修改匹配</el-button>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" 
     @getSelections="getSelections"  @getAllSelections="getAllSelections">
    </hx-table>

  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {mRecords,editMatch} from '@/api/carLoadAfterApi'
  import tableLabel from './tableLabel'
  import searchLabel from './searchLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    data() {
      return {
      	isShow:false,
        serialNo2:"",
        msg:"",
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: false, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: false, // 搜索框是否显示
            //tableIsAllChange: true, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮

            isRadio:true
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
        checkedCaseNoList:"",//选中列表项
      }
    },

    created() {
      this.$parent.$on('modifyValue', value => {
        if(value==1){
          this.getSearch();
        }
      })

      this.msg = JSON.parse(sessionStorage.publicInitialData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicInitialData)[1];//流水号
      this.getSearch();

    },

    methods: {
      getSelections: function (data) {
        //console.log(data)
        this.selections = data
        this.checkedCaseNoList = data.transSerialNo;
        //this.checkedCaseNoList = this.getSelectionString()
      },
      getAllSelections: function (data) {    
        this.allSelections = data
        this.checkedCaseNoList = this.getSelectionString()
      },
      getSelectionString() {
        let serialNoList = []
        if (this.$refs.hxtableComponent.isAllCheck) {
          serialNoList = this.allSelections
        } else {
          for (let i in this.selections) {
            serialNoList.push(this.selections[i].transSerialNo);
          }
        }
        return serialNoList.join("#")
      },
      modifyMatchList(){
        //console.log(this.checkedCaseNoList)
        if(this.checkedCaseNoList !== ""){
          let editMatchParam = {
            amraId:this.serialNo2,
            transSerialNo:this.checkedCaseNoList,
          };
         //console.log(editMatchParam);
          editMatch(editMatchParam).then(response => {
            if (response.data.code === "00000") {
              this.$parent.$emit('matchValue', 1);
              this.$message({
                message: '修改匹配成功',
                type: 'success'
              });
              this.checkedCaseNoList = "";
              this.getSearch();
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }else{
          this.$message({
            message: '请选择要要修改的匹配流水',
            type: 'warning'
          });

        }
    		
    	},
      /* 检索 */
      getSearch() {
        let param={
          amraId:this.serialNo2,
        }
        mRecords(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
            if (response.data.list) {
                const array = response.data.list;       
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.total;
              } else {
                this.tableParam.tableData=[];
                //this.tableParam.isShoweds.tableIsShow = 2;
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
          case "matchSave": //匹配事件
            //alert("匹配");
            break;
          case "reSet": //检索重置
            this.tableParam.pageHelpers = {
              ...this.$store.state.glabdatas.searchSetting.pageHelpers
            }
            this.tableParam.queryTables.param = {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            }
            this.getSearch(this.tableParam.queryTables.param);
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
          case "selectAll": //选择全部
            break;
          case "distribute": //分配按钮
            this.onDistributeStaffDialog();
            break;
          case "contractSerialNo":
            this.contractNoClick(data)
            break;
          default:

        }
      },
 
      

    },
    beforeDestroy() {
      this.$parent.$off('modifyValue');
    },

    components: {
      HxTable
    }
  }
</script>

