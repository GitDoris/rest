<!--车贷罚息违约金调整—>待处理申请列表页-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" @getSelections="getSelections"
              @getAllSelections="getAllSelections">
      <el-button slot="button-content" type="primary" size="mini" @click="addNewData">
        新增
      </el-button>
      <el-button slot="button-content" type="primary" size="mini"
                 :disabled="checkedCaseNoList.length === 0"
                 @click="addDataList">提交
      </el-button>
      <el-button slot="button-content" type="primary" size="mini"
                 :disabled="checkedCaseNoList.length === 0"
                 @click="cancelRequest">取消申请
      </el-button>

    </hx-table>
    <add-dialog ref="addDialog" @getActionCodeList="applyTodoAdd" :tableItems2="tableNewParam"></add-dialog>
    <!--点击合同编号弹窗-->
    <details-dialog @dialogFormParam="submitForm" ref="details" :tableData="subDetailVos"
                    :totalDetailVo="totalDetailVo">
    </details-dialog>
    <!-- <el-dialog
        title="提示"
        :visible.sync="dialogWarning"
        width="30%"
        :center='true'
        :before-close="dialogConfirm"
        :modal-append-to-body="false">
        <span style="text-align:center;display:block;">该笔订单月还未结清，无法操作减免</span>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
      </el-dialog> -->
  </div>
</template>

<script>
import HxTable from "@/components/huaxia/HxTable/queryTable4Collection";
import {
  pApplyTodoList,
  batchSubmit,
  pCancel,
  pDetail,
  pBatchInsert,
  applyTodoListUpdate,
  applyTodoListSubmit,
  applyTodoAddSearch
} from "@/api/carLoadAfterApi";
import searchLabel from "./searchLabel";
import tableLabel from "./tableLabel";
import searchLabel2 from "./components/searchLabel.js";
import tableLabel2 from "./components/tableLabel.js";
import cloneDeep from "lodash/cloneDeep";
import detailsDialog from "./components/detailsDialog";
import addDialog from "./components/addDialog";
import { Loading } from "element-ui";

export default {
  components: {
    HxTable,
    detailsDialog,
    addDialog
  },
  data() {
    return {
      //dialogWarning: false,
      returnBtn: true,
      tableParam: {
        isShoweds: {
          // 是否显示集合
          pageIsShow: true, // 分页是否显示
          tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
          isSearch: true, // 搜索框是否显示
          tableIsAllChange: true, // 左侧固定全选列是否显示
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
          }
        }
      },
      tableNewParam: {
        isShoweds: { // 是否显示集合
            pageIsShow: true, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: true, // 左侧固定全选列是否显示
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel2),
          tableData: [],
          queryTables: {
            queryParas: cloneDeep(searchLabel2),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            }
          },
      },
      selections: [],
      allSelections: [],
      checkedCaseNoList: [], //选中列表项
      subDetailVos: [],
      totalDetailVo: {}
    };
  },

  created() {
    this.getSearch(this.tableParam.queryTables.param);
  },
  methods: {
    getSelections: function(data) {
      this.selections = data;
      this.checkedCaseNoList = this.getSelectionString();
    },
    getAllSelections: function(data) {
      this.allSelections = data;
      this.checkedCaseNoList = this.getSelectionString();
    },

    /* 检索 */
    getSearch(param) {
      let loadingInstance = Loading.service({ fullscreen: true });
      pApplyTodoList(param).then(response => {
        loadingInstance.close();
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
      });
    },
    method(key, data) {
      switch (key) {
        case "search": //搜索事件
          this.getSearch(data);
          break;
        case "reSet": //检索重置
          this.tableParam.pageHelpers = {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          };
          this.tableParam.queryTables.param = {
            ...this.$store.state.glabdatas.searchSetting.defaultParam
          };
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
      pDetail(param).then(response => {
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
          this.$message.success(response.data.msg);
          this.getSearch(this.tableParam.queryTables.param);
          // this.$refs.details.dialogVisible = false
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    getSelectionString() {
      let list = [];
      let allData = [];
      let signalData = {};
      if (this.$refs.hxtableComponent.isAllCheck) {
        list = this.allSelections;
      } else {
        list = this.selections;
      }
      for (let i in list) {
        signalData = {};
        signalData.serialNo = list[i].serialNo;
        signalData.contractSerialNo = list[i].contractSerialNo;
        signalData.newValue = list[i].newValue;
        signalData.newLiquidated = list[i].newLiquidated;
        allData.push(signalData);
      }
      return allData;
    },

    //新增按钮弹出框
    addNewData() {
      this.$refs.addDialog.dialogVisible = true;
      applyTodoAddSearch(this.$store.state.glabdatas.searchSetting.defaultParam).then(response => {
        if (response.data.code === "00000") {
          if (response.data.list.length > 0) {
            const array = response.data.list
            this.tableNewParam.isShoweds.tableIsShow = 1;
              this.tableNewParam.isShoweds.pageIsShow = true;
              this.tableNewParam.tableData = array;
              // this.tableNewParam.pageHelpers.totalSum = array.length;
              this.tableNewParam.pageHelpers.totalSum = response.data.total;
          } else {
            this.tableNewParam.isShoweds.tableIsShow = 2;
            this.tableNewParam.isShoweds.pageIsShow = false;
          }
        } else {
          this.$message.error(response.data.msg);
        }
      })
    },
    /*新增*/
    applyTodoAdd(params) {
      pBatchInsert(params).then(response => {
        if (response.data.code === "99991") {
          // this.dialogWarning = true;
          this.$message.error(response.data.msg);
        } else if (response.data.code === "00000") {
          this.$message({
            message: response.data.msg + response.data.total + "条",
            type: "success"
          });
          this.getSearch(this.tableParam.queryTables.param);
          // this.$refs.addDialog.dialogVisible = false
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    dialogConfirm: function() {
      this.dialogWarning = false;
    },
    //取消申请
    cancelRequest() {
      let caseNoList = this.checkedCaseNoList;
      if (caseNoList.length > 0) {
        for (let i = 0; i < caseNoList.length; i++) {
          delete caseNoList[i].newValue;
          delete caseNoList[i].newLiquidated;
        }
        let cancelData = {
          list: caseNoList
        };
        pCancel(cancelData).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: response.data.msg + response.data.total + "条",
              type: "success"
            });
            this.checkedCaseNoList = [];
            this.getSearch(this.tableParam.queryTables.param);
          } else {
            this.$message.error(response.data.msg);
          }
        });
      } else {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      }
    },
    //提交功能
    addDataList() {
      let list = this.checkedCaseNoList;
      if (list.length > 0) {
        let oSubmitData = {
          list: list
        };
        batchSubmit(oSubmitData).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: response.data.msg + response.data.total + "条",
              type: "success"
            });
            this.checkedCaseNoList = [];
            this.getSearch(this.tableParam.queryTables.param);
          } else {
            this.$message.error(response.data.msg);
          }
        });
      }
    }
  }
};
</script>
<style>
.el-form-item {
  margin-bottom: 20px;
}
</style>

