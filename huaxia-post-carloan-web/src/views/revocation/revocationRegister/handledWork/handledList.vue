<!--挂账撤销登记已处理任务-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">     	
    </hx-table>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {repealList} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'
  export default {
    props: {
      loansType: ""
    },
    data() {
      return {
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮
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

          allCaseNoList: [],
        },

      }
    },

    created() {
      this.getSearch(this.tableParam.queryTables.param);

    },

    methods: {
			//检索
      /* 检索 */
      getSearch(param) {
        param.queryType='2'
        repealList(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
              if (response.data.data.list.length>0) {
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
        let caseData = [data.applyFlowId,data.contractId];

       // sessionStorage.caseCheckList = JSON.stringify(tempArray);
        sessionStorage.revocationData = JSON.stringify(caseData);//合同号+流水号

        pushUrl = "/revocation/revocationRegister/handledWork/handledInfo";
        this.$router.push(pushUrl)
      },




      

    },

    components: {
      HxTable
    }
  }
</script>

