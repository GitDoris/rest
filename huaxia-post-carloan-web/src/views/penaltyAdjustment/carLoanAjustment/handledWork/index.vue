<!--罚息调整已处理任务-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
    </hx-table>
 <!--点击合同编号弹窗-->
    <details-dialog @dialogFormParam="submitForm" ref="details" :tableData="subDetailVos"
                    :totalDetailVo="totalDetailVo">
    </details-dialog>
  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable4Collection'
  import {applyDoneList ,pDetail ,applyTodoListSubmit,applyTodoListUpdate,pDetailAlready} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'
  import {Loading} from 'element-ui'
import detailsDialog from "./components/detailsDialog";

  export default {
    data() {
      return {
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
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
  subDetailVos: [],
      totalDetailVo: {}
      }
    },

    created() {
      this.getSearch(this.tableParam.queryTables.param);
    },

    methods: {
      //检索
      getSearch(param) {
        let loadingInstance = Loading.service({fullscreen: true})
        applyDoneList(param).then(response => {
          loadingInstance.close()
          if (response.data.code === "00000") {
            const array = response.data.list;
            if (array.length > 0) {
              this.tableParam.isShoweds.tableIsShow = 1;
              this.tableParam.isShoweds.pageIsShow = true;
              this.tableParam.tableData = array;
              this.tableParam.pageHelpers.totalSum = response.data.total;
            } else {
              this.tableParam.tableData = [];
              this.tableParam.isShoweds.tableIsShow = 2;
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
          case "contractSerialNo":
            this.contractNoClick(data);
            break;
          default:

        }
      },
 /*合同编号点击事件*/
    contractNoClick(data) {
      let param = {
        serialNo: data.serialNo,
        contractSerialNo: data.contractSerialNo
      };
      pDetailAlready(param).then(response => {
        if (response.data.code === "00000") {
          let list = response.data.list.fineReduceSubDetailVos;
          /*设置本息都为0时，罚息调整、逾期违约金调整才能输入*/
          // for (let i in list) {
          //   if (list[i].payPrincipal === 0 && list[i].payInterest === 0) {
          //     list[i].isDisabled = false;
          //   } else {
          //     list[i].isDisabled = true;
          //   }
          // }
          this.subDetailVos = list;
          this.totalDetailVo = response.data.list.fineReduceTotalDetailVo;
          this.$refs.details.dialogVisible = true;
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
/*弹出框提交/保存*/
    submitForm(type, params) {
      let apiUrl = "";
      if (type === "update") {
        apiUrl = applyTodoListUpdate;
      } else {
        apiUrl = applyTodoListSubmit;
      }
      apiUrl(params).then(response => {
        if (response.data.code === "00000") {
          this.getSearch(this.tableParam.queryTables.param);
          // this.$refs.details.dialogVisible = false
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    },

    components: {
      HxTable,
    detailsDialog,

    }
  }
</script>

