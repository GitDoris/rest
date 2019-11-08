<!--对公还款-对公录入-待处理任务-匹配保存-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" 
     @getSelections="getSelections"  @getAllSelections="getAllSelections">
    </hx-table>
    

  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {tRecords,recordMatch} from '@/api/carLoadAfterApi'
  import tableLabel from './tableLabel'
  import searchLabel from './searchLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    data() {
      return {
        idendifyBtn:false,
        first:0,
      	isShow:false,
        serialNo2:"",
      	msg:"",
      	transSerialNo:"",
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: false, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮
            showToolTitle: false,
            isBtnShow:true,//显示匹配保存按钮
            isRadio:true  //单选时候打开
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel.matchWatcherList),
          tableData: [],
          queryTables: {
            queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
        transSerialNoList:[],//银行交易流水号
        selections: [],
        allSelections: [],
        checkedCaseNoList:[],//选中列表项
      }
    },

    created() {
       this.$parent.$on('matchValue', value => {
        if(value==1){
          this.getSearch(this.tableParam.queryTables.param);
        }
      })
      this.msg = JSON.parse(sessionStorage.publicInitialData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicInitialData)[1];//流水号
      this.getSearch(this.tableParam.queryTables.param);

    },

    methods: {
      getSelections: function (data) {
       // console.log(data.transserialNo)
        this.selections = data
        this.checkedCaseNoList = data.transserialNo;
       // this.checkedCaseNoList = this.getSelectionString()
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
            serialNoList.push(this.selections[i].transserialNo);
          }
        }
        return serialNoList.join("#")
      },
      // 匹配保存
      getMatchSave(){
        //console.log(this.checkedCaseNoList)
        let editMatchParam = {
          amraId:this.serialNo2,
          transSerialNo:this.checkedCaseNoList,
        };
        if(this.checkedCaseNoList.length === 0){
          this.$message({
              message: '请选中一条记录再做保存',
              type: 'warning'
            });
        }else{
        // console.log(editMatchParam);
          recordMatch(editMatchParam).then(response => {
            if (response.data.code === "00000") {
              this.$parent.$emit('modifyValue', 1);
              this.$message({
                message: '匹配保存成功',
                type: 'success'
              });
              this.checkedCaseNoList = [];

              this.getSearch(this.tableParam.queryTables.param);
            } else {
              this.$message.error(response.data.msg);
            }
          })

        }
    		
    	},

      formatDate(now) { 
        var timetime = new Date(now);
        var year=timetime.getFullYear(); 
        var month=timetime.getMonth()+1; 
        var date=timetime.getDate(); 
        var hour=timetime.getHours(); 
        var minute=timetime.getMinutes(); 
        var second=timetime.getSeconds(); 
       // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        return year+"-"+month+"-"+date; 
      },

      /* 检索 流水匹配 */
      getSearch(param) {
        param.pageSize=999;
        param.amraId = this.serialNo2;
        if(this.idendifyBtn){
          param.first = 1;
        }else{
          param.first = 0;
        }
        tRecords(param).then(response => {
          if (response.data.code === "00000") {
            if (response.data.list) {
                const array = response.data.list;       
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;

                for(let i=0;i<array.length;i++){
                  if(array[i].transDate){
                    array[i].transDate = this.formatDate(array[i].transDate);
                  }
                  array[i].accoutType = "线下辉恒";
                };
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
            this.idendifyBtn = true;
            this.getSearch(data);
            break;
          case "matchSave": //匹配事件 匹配保存
            this.getMatchSave();
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
      this.$parent.$off('matchValue');
    },

    components: {
      HxTable
    }
  }
</script>
<style>
  .box-body .el-row .textCenter{
    display: none;
  }
  .box{
    border-top: none;
  }
</style>

