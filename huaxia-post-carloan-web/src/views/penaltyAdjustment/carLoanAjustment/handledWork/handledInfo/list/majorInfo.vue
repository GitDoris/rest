<!--对公还款-对公录入-待处理任务-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam">
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
          tableLables: cloneDeep(tableLabel),
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
      this.getSearch(this.$route.params.dataobj);

    },

    methods: {
      getSearch(param) {
        oprLogs(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
            if (JSON.stringify(response.data.list) !== '{}') {
              if (response.data.list.length > 0) {
                const array = response.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                // this.tableParam.isShoweds.pageIsShow = true;
                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.total;
              } else {
                this.tableParam.isShoweds.tableIsShow = 2;
                // this.tableParam.isShoweds.pageIsShow = false;
              }
            } else {
              this.tableParam.tableData = []
            }
          } else {
            this.$message.error('网络繁忙,请稍后再试!');
          }
        })
      },
    },

    components: {
      HxTable
    }
  }
</script>

