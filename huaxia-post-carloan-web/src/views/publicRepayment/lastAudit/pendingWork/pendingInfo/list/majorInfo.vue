<!--对公还款-对公录入-待处理任务-操作记录-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>

  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {oprLogs} from '@/api/carLoadAfterApi'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    props: {
      loansType: ""
    },
    data() {
      return {
        msg:"",
        serialNo2:"",
      	isShow:false,
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: false, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
           // isSearch: true, // 搜索框是否显示
            tableIsAllChange: false, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮
            showDistribute: false, // 是否显示分配人员按钮
            showToolTitle: false
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel.operationList),
          tableData: [],
          queryTables: {
           // queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
          //tableKey: "trailerNoes", //table的key值

        },
      }
    },

    created() {
      //this.getSearch(this.tableParam.queryTables.param);
      this.msg = JSON.parse(sessionStorage.publicLastData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicLastData)[1];//流水号
      this.getSearch();

    },

    methods: {


      /* 检索 */
      getSearch() {
        let param={
          amraId:this.serialNo2
        };
        oprLogs(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
            if (JSON.stringify(response.data.list) !== '{}') {
              if (response.data.list.length > 0) {
                const array = response.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.tableData = array;

              } else {
                this.tableParam.isShoweds.tableIsShow = 2;

              }
            } else {
              this.tableParam.tableData = []
            }
          } else {
            this.$message.error('网络繁忙,请稍后再试!');
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
 
      

    },

    components: {
      HxTable
    }
  }
</script>

