<!--对公还款-对公初审-待处理任务-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" @getSelections="getSelections" @getAllSelections="getAllSelections">
      <el-button slot="button-content" type="primary" size="mini" @click="addDataList" :disabled="checkedCaseNoList.length === 0">提交
	    </el-button>
    </hx-table>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {initialAuditPending,initialAuditSubmit} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'
  export default {
    data() {
      return {
      	isShow:false,
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: true, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮
            showToolTitle: true
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel),
          tableData: [],
          queryTables: {
            queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
          //tableKey: "trailerNoes", //table的key值

        },
        selections: [],
        allSelections: [],
        checkedCaseNoList:[],//选中列表项

      }
    },

    created() {
      this.getSearch(this.tableParam.queryTables.param);

    },

    methods: {
    	getSelections: function (data) {
        this.selections = data
        this.checkedCaseNoList = this.getSelectionString()
      },
      getAllSelections: function (data) {
        this.allSelections = data
        this.checkedCaseNoList = this.getSelectionString()
      },

      /* 检索 */
      getSearch(param) {
        initialAuditPending(param).then(response => {
        	//alert("搜索");
        	 console.log(response.data)
          if (response.data.code === "00000") {
            if (response.data.list) {
                const array = response.data.list;            
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                this.tableParam.tableData = array;
                let reg = /^(\d{4})\d+(\d{4})$/;
               //身份证加星星
                for(let i=0;i<array.length;i++){
                  if(array[i].certID){
                      let str = array[i].certID;
                      str = str.replace(reg, "$1***********$2");
                      array[i].certID = str;
                  }
                }
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
      
      /*合同编号点击事件*/
      contractNoClick(data) {
        let list = cloneDeep(this.tableParam.tableData),
          contractSerialNo = data.contractSerialNo,
          index,
          tempArray = [],
          pushUrl = ""
        for (let i in list) {
          if (list[i].contractSerialNo === contractSerialNo) {
            index = i
          }
          if (i >= index) {
            tempArray.push(list[i])
          }
        }
        let caseData = [data.contractSerialNo,data.serialNo];
        sessionStorage.publicInitialData = JSON.stringify(caseData);//合同号+流水号

				//跳转详情页面 
        pushUrl = "/publicRepayment/initialAudit/pendingWork/pendingInfo";
        this.$router.push(pushUrl)
        // this.$router.push({
        // 	path: pushUrl,
        // 	name:"pendingInfo",
        // 	params: { 
        //         name: 'contractNo', 
        //         dataObj: contractSerialNo
        //     }
        	
        // })
      },


      getSelectionString() {
        let serialNoList = []
        if (this.$refs.hxtableComponent.isAllCheck) {
          serialNoList = this.allSelections
        } else {
          for (let i in this.selections) {
            serialNoList.push(this.selections[i].serialNo);
          }
        }
        return serialNoList.join("#")
      },
      
       //提交功能
      addDataList(){
        let oSubmitData = {
          serialNo:this.checkedCaseNoList,
          phase:1,
        }
       // oSubmitData = JSON.stringify(oSubmitData);
      	initialAuditSubmit(oSubmitData).then(response => {
          console.log(response.data)
          if (response.data.code === "00000") {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.getSearch(this.tableParam.queryTables.param);
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      

    },

    components: {
      HxTable
    }
  }
</script>

