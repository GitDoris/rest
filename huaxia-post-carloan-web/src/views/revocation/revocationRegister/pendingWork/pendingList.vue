<!--挂账撤销登记-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" @getSelections="getSelections" @getAllSelections="getAllSelections">
      <el-button slot="button-content" type="primary" size="mini" @click="addNewData">
        新增
	    </el-button>
	    <!--<el-button  slot="button-content" type="primary" size="mini"
                  :disabled="checkedCaseNoList.length === 0"
                   @click="addDataList">提交
      </el-button>-->
      <!-- <el-button  slot="button-content" type="primary" size="mini"
                  :disabled="checkedCaseNoList.length === 0"
                   @click="cancelRequest">取消申请
      </el-button> -->

    </hx-table>

    <di-dialog v-show="isShow" @hidden="hiddenShow" @tryChild="childFrom"></di-dialog>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {repealList,reCancel,reSubmit4LR} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'
  //import DiDialog from '@/components/dialog/ddialog'
  import DiDialog from './components/dialogIndex'
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
            tableIsAllChange: false, // 左侧固定全选列是否显示
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

        },
        selections: [],
        allSelections: [],
        checkedCaseNoList:[],//选中列表项

      }
    },

    created() {
      this.getSearch(this.tableParam.queryTables.param);

    },
    mounted(){

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
       childFrom(){
       // alert(0)
        this.getSearch(this.tableParam.queryTables.param);
      },

      /* 检索 */
      getSearch(param) {
        param.queryType='1'
        repealList(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
              if (response.data.data.list) {
                const array = response.data.data.list;            
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                
                let reg = /^(\d{4})\d+(\d{4})$/;

               //身份证加星星
                for(let i=0;i<array.length;i++){
                  if(array[i].idCard){
                      let str = array[i].idCard;
                      str = str.replace(reg, "$1***********$2");
                      array[i].idCard = str;
                  }
                  switch(Number(array[i].repealStatus)){
                    case 1:
                      array[i].repealStatusShow = "新增";
                      break;
                    case 2:
                      array[i].repealStatusShow = "申请中";
                      break;
                    case 3:
                      array[i].repealStatusShow = "成功";
                      break;
                    case 4:
                      array[i].repealStatusShow = "失败";
                      break;
                    case 5:
                      array[i].repealStatusShow = "取消";
                      break;
                    case 6:
                      array[i].repealStatusShow = "财务拒绝";
                      break;
                    default:
                      break;
                  }
                }
                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.data.total;
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
          case "contractId":
            this.contractNoClick(data)
            break;
          default:

        }
      },

      /*合同编号点击事件*/
      contractNoClick(data) {
      // console.log(data)
        let list = cloneDeep(this.tableParam.tableData),
          contractId = data.contractId,
          index,
          tempArray = [],
          pushUrl = ""
        for (let i in list) {
          if (list[i].contractId === contractId) {
            index = i
          }
          if (i >= index) {
            tempArray.push(list[i])
          }
        }
        // let caseData = [data.contractNo,data.id];
        let caseData = [data.applyFlowId,data.contractId,data.repealStatus];
       // sessionStorage.caseCheckList = JSON.stringify(tempArray);
        sessionStorage.revocationData = JSON.stringify(caseData);//合同号+流水号

        pushUrl = "/revocation/revocationRegister/pendingWork/pendingInfo";
        this.$router.push(pushUrl)
      },

      getSelectionString() {
        let serialNoList = []
        if (this.$refs.hxtableComponent.isAllCheck) {
          serialNoList = this.allSelections
        } else {
          for (let i in this.selections) {
            serialNoList.push(this.selections[i].id);
          }
        }
        return serialNoList.join("#")
      },
      
      //新增按钮弹出框
      addNewData(){
         document.getElementById("dialog").style.display="block";
      	 this.isShow=true;
      },
      hiddenShow(){
        this.isShow = false;
      },
      //取消申请 
      cancelRequest(){
         let oSubmitData = {
           idList:this.checkedCaseNoList,
           phase:0
         };
         reCancel(oSubmitData).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                 message: '取消成功',
                 type:'success'
              });
              this.getSearch(this.tableParam.queryTables.param);
            } else {
              this.$message.error(response.data.msg);
            }
          })
      },
        //提交功能
      // addDataList(){
      //   let oSubmitData = {
      //     idList:this.checkedCaseNoList,
      //   }
      //  // console.log(oSubmitData)
      // 	reSubmit4LR(oSubmitData).then(response => {
      //     if (response.data.code === "00000") {
      //       this.$message({
      //         message: '提交成功',
      //         type: 'success'
      //       });
      //       this.getSearch(this.tableParam.queryTables.param);
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      // },
      

    },

    components: {
      HxTable,DiDialog
    }
  }
</script>

