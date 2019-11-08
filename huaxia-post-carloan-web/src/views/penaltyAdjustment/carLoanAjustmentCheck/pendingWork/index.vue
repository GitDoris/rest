<!--车贷罚息违约金调整复核—>待处理任务列表页-->
<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method" @getSelections="getSelections"
              @getAllSelections="getAllSelections">
      <el-button slot="button-content" type="primary" size="mini"
                 :disabled="checkedCaseNoList.length === 0"
                 @click="addDataList">提交
      </el-button>
      <el-button slot="button-content" type="primary" size="mini"
                 :disabled="checkedCaseNoList.length != 1"
                 @click="dialogVisibleBack = true">回退
      </el-button>
      <el-button slot="button-content" type="primary" size="mini"
                 :disabled="checkedCaseNoList.length != 1"
                 @click="dialogVisibleRefuse = true">拒绝
      </el-button>
    </hx-table>
    <details-dialog ref="details" :tableData="subDetailVos"
                    :totalDetailVo="totalDetailVo">
    </details-dialog>
      <!--回退框-->
      <el-dialog
        title="回退"
        :visible.sync="dialogVisibleBack"
        width="30%"
        center
        :before-close="handleClose">
         <el-form label-width="100px">
          <el-form-item label="回退原因">
            <el-select v-model="selectedBack" placeholder="请选择减免原因" >
              <el-option v-for="item in optionsBack"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
         <el-form-item>
            <el-button plain @click="dialogVisibleBack = false">取 消</el-button>
            <el-button type="primary" @click="backDataList">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>


      <!--拒绝框-->
      <el-dialog
        title="拒绝"
        :visible.sync="dialogVisibleRefuse"
        width="30%"
        :before-close="handleClose">
         <el-form label-width="100px">
          <el-form-item label="拒绝原因">
            <el-select v-model="selectedRefuse" placeholder="请选择减免原因" >
              <el-option v-for="item in optionsRefuse"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拒绝备注" v-show="selectedRefuse=='其他'">
            <el-input width="300px" type="textarea" v-model="textareaed" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="dialogVisibleRefuse = false">取 消</el-button>
            <el-button type="primary" @click="refuseDataList">确 定</el-button>
          </el-form-item>
        </el-form>
      
      </el-dialog>
     
  </div>
</template>

<script>
import HxTable from "@/components/huaxia/HxTable/queryTable4Collection";
import {
  reviewTodoList,
  reviewTodoListBatchSubmit,
  pDetail,
  batchReturn,
  batchReject
} from "@/api/carLoadAfterApi";
import searchLabel from "./searchLabel";
import tableLabel from "./tableLabel";
import cloneDeep from "lodash/cloneDeep";
import detailsDialog from "./components/detailsDialog";

import { Loading } from "element-ui";
export default {
  components: {
    HxTable,
    detailsDialog
  },
  data() {
    return {
      returnBtn: true,
      textareaed: "",
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
      selections: [],
      allSelections: [],
      checkedCaseNoList: [], //选中列表项
      subDetailVos: [],
      totalDetailVo: {},
      dialogVisibleBack: false,
      selectedBack: "不能减免违约金",
      optionsBack: [
        { value: "1", label: "不能减免违约金" },
        { value: "2", label: "不能减免罚息" },
        { value: "3", label: "只能减免部分违约金" },
        { value: "4", label: "只能减免部分罚息" },
        { value: "5", label: "只能减免部分违约金和罚息" }
      ],
      selectedRefuse: "拒绝",
      dialogVisibleRefuse: false,
      optionsRefuse: [
        { value: "1", label: "拒绝" },
        { value: "2", label: "其他" }
      ]
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
      reviewTodoList(param).then(response => {
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
          this.subDetailVos = response.data.list.fineReduceSubDetailVos;
          this.totalDetailVo = response.data.list.fineReduceTotalDetailVo;
          this.$refs.details.dialogVisible = true;
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
    //提交功能
    addDataList() {
      let list = this.checkedCaseNoList;
      if (list.length > 0) {
        let oSubmitData = {
          list: list
        };
        reviewTodoListBatchSubmit(oSubmitData).then(response => {
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
    },
    //回退
    backDataList() {
      console.log("this.selections", this.selections);
      
      let oSubmitData = {};
      this.checkedCaseNoList.forEach(item => {
        oSubmitData = {
          serialno: item.serialNo,
          contractSerialno: item.contractSerialNo,
          handleRemark: this.selectedBack
        };
      });
      batchReturn(oSubmitData).then(response => {

        if (response.data.code === "00000") {
          this.$message({
            message: response.data.msg,
            type: "success"
          });
          this.dialogVisibleBack = false;
          this.selections = [];
          this.getSearch(this.tableParam.queryTables.param);
        } else {
          this.$message.error(response.data.msg);
          //this.dialogVisibleBack = false;
        }
      });
    },
    //拒绝
    refuseDataList() {
      let handleRemark = "";
      
      if (this.selectedRefuse == "其他") {
        if (this.textareaed == "") {
          this.$message({
            message: "请输入拒绝原因",
            type: "warning"
          });
          return;
        } else {
          handleRemark = this.textareaed;
        }
      }
      if (this.selectedRefuse == "拒绝") {
        handleRemark = this.selectedRefuse;
      }

      if (handleRemark != null && handleRemark != "") {
        let oSubmitData = {};
        this.selections.forEach(item => {
          oSubmitData = {
            serialno: item.serialNo,
            contractSerialno: item.contractSerialNo,
            handleRemark: handleRemark
          };
        });
        batchReject(oSubmitData).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
            this.dialogVisibleRefuse = false;
            this.selections = [];
            this.getSearch(this.tableParam.queryTables.param);
          } else {
            //this.dialogVisibleRefuse = false;
            this.$message.error(response.data.msg);
          }
        });
      }
    },
    handleClose(done) {
      done();
    }
  }
};
</script>
<style>
.el-form-item {
  margin-bottom: 20px;
}
.el-dialog__body {
  margin-top: 15px;
}
.el-dialog__footer {
  padding-top: 0;
}

</style>

