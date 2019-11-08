
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method"></hx-table>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {financeList} from '@/api/carLoadAfterApi'

  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    data() {
      return {
        globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            showSelectAll: false, // 是否显示选择全部按钮
            showDistribute: false, // 是否显示分配人员按钮
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
        },
      }
    },

    created() {
      this.getSearch(this.tableParam.queryTables.param);

    },

    methods: {

      /* 检索 */
      getSearch(param) {
        financeList(param).then(response => {
        	//console.log(response.data)
          if (response.data.code === "00000") {
            if (JSON.stringify(response.data.list) !== '{}') {
              this.tableParam.tableData = [];
              if (response.data.list.length > 0) {
                const array = response.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;

                for(let i in array){
                  switch(array[i].loanStatus) {
                    case "0":
                      array[i].loanStatus="正常";
                      break;
                    case "1":
                      array[i].loanStatus="逾期";
                      break;
                    case "10":
                      array[i].loanStatus="正常结清";
                      break;
                    case "20":
                      array[i].loanStatus="提前结清";
                      break;
                    case "30":
                      array[i].loanStatus="逾期结清";
                      break;
                    case "40":
                      array[i].loanStatus="强制结清";
                      break;
                    case "50":
                      array[i].loanStatus="对公提前结清";
                      break;
                    case "80":
                      array[i].loanStatus="取消";
                      break;
                    case "90":
                      array[i].loanStatus="风险金代偿中";
                      break;
                    case "91":
                      array[i].loanStatus="风险金代偿结清";
                      break;
                    case "92":
                      array[i].loanStatus="追偿结清";
                      break;
                    case "95":
                      array[i].loanStatus="退货";
                      break;
                    case "96":
                      array[i].loanStatus="终止";
                      break;
                    default:
                      break;
                  }

                }

                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.total;



              } else {
                 this.tableParam.tableData=[];
                //this.tableParam.isShoweds.tableIsShow = 2;
                this.tableParam.isShoweds.pageIsShow = false;
              }
            } else {
              this.tableParam.tableData = []
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
          case "contractSerialNo":
            this.contractNoClick(data)
            break;
          default:

        }
      },
      /*合同编号点击事件*/
      contractNoClick(data) {
        //console.log(data.contractSerialNo)
        // let list = cloneDeep(this.tableParam.tableData),
        //   contractSerialNo = data.contractSerialNo,
        //   index,
        //   tempArray = [],
        //   pushUrl = ""
        // for (let i in list) {
        //   if (list[i].contractSerialNo === contractSerialNo) {
        //     index = i
        //   }
        //   if (i >= index) {
        //     tempArray.push(list[i])
        //   }
        // }
       // sessionStorage.caseCheckList = JSON.stringify(tempArray);
        sessionStorage.caseCheckData = JSON.stringify(data.contractSerialNo);

        let pushUrl = "/carLoanAfter/loanAfterInfo";
        this.$router.push({path: pushUrl});
      },
    },

    components: {
      HxTable
    }
  }
</script>


