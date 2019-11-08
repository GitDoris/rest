<!--新增-->
<template>
  <el-dialog
    title="新增任务"
    :visible.sync="dialogVisible"
    @close="close"
    width="1040px"
    center>
    <hx-table ref="hxtableComponent" @getSelections="getSelections" :tableItems="tableParam" @btn-click="method">
    </hx-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">清 空</el-button>
      <el-button :disabled="selections.length === 0" type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import HxTable from '@/components/huaxia/HxTable/queryTable4Collection'
  import {applyTodoAddSearch} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    props:{
      tableItems2: {}
    },
    data() {
      return {
        dialogVisible: false,
        tableParam: this.$props.tableItems2,
        // tableParam: {
        //   isShoweds: { // 是否显示集合
        //     pageIsShow: true, // 分页是否显示
        //     tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
        //     isSearch: true, // 搜索框是否显示
        //     tableIsAllChange: true, // 左侧固定全选列是否显示
        //   },
        //   pageHelpers: {
        //     ...this.$store.state.glabdatas.searchSetting.pageHelpers
        //   },
        //   tableLables: cloneDeep(tableLabel),
        //   tableData: [],
        //   queryTables: {
        //     queryParas: cloneDeep(searchLabel),
        //     param: {
        //       ...this.$store.state.glabdatas.searchSetting.defaultParam
        //     }
        //   },
        // },
        selections: ""
      }
    },

    created() {
      this.tableParam.queryTables.param.pageNum = this.tableParam.pageHelpers.currentPage;
      this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize;
      //this.getSearch(this.$store.state.glabdatas.searchSetting.defaultParam);
    },

    methods: {
      close() {
        let list = this.$refs.hxtableComponent.tableParam.queryTables.queryParas
        for (let i in list){
          list[i].queryValue = ""
        }
        this.getSearch(this.$store.state.glabdatas.searchSetting.defaultParam)
      },
      /*获取选择的数据*/
      getSelections: function (data) {
        this.selections = data
      },
      /* 检索 */
      getSearch(param) {
        applyTodoAddSearch(param).then(response => {
          if (response.data.code === "00000") {
            if (response.data.list.length > 0) {
              const array = response.data.list
              this.tableParam.isShoweds.tableIsShow = 1;
              this.tableParam.isShoweds.pageIsShow = true;
              this.tableParam.tableData = array;
              // this.tableParam.pageHelpers.totalSum = array.length;
              this.tableParam.pageHelpers.totalSum = response.data.total;
            } else {
              this.tableParam.isShoweds.tableIsShow = 2;
              this.tableParam.isShoweds.pageIsShow = false;
            }
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      /*清空*/
      reset() {
        this.tableParam.tableData = []
      },
      /*提交*/
      submitForm() {
        let list = []
        if (this.selections.length !== 0) {
          for (let i in this.selections) {
            let data = {
              contractSerialNo: this.selections[i].contractSerialNo
            }
            list.push(data)
          }
          this.dialogVisible = false
          this.$emit('getActionCodeList', {list: list})
        } else {
          this.$message.error('请选择规则!');
        }
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
            this.$refs.hxtableComponent.allCheckedImport = []
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
          default:

        }
      },
    },

    components: {
      HxTable
    }
  }
</script>
<style scoped>
  .el-dialog__wrapper {
    z-index: 99999;
  }
</style>
