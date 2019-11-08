
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method"></hx-table>
    <table>
      <caption>日中列表</caption>
      <tr><td>任务名称</td><td>状态</td><td>运行开关状态</td><td>操作</td></tr>
    </table>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {publicFlowList} from '@/api/carLoadAfterApi'
  import {getToken} from '@/utils/auth'
 // import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    props: {
      loansType: ""
    },
    data() {
      return {
        globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: false, // 搜索框是否显示
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
            //queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
        },
      }
    },


    methods: {

      
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
      
    },

    components: {
      HxTable
    }
  }
</script>

