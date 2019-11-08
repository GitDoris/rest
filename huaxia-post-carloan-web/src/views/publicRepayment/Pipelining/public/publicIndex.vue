<template>
  <div>
    <hx-table
      ref="hxtableComponent"
      :tableItems="tableParam"
      @btn-click="method"
      v-loading="loading"
      element-loading-text="正在上传..."
      @getSelections="getSelections"
      @getAllSelections="getAllSelections"
    >
      <template slot="button-content2">
        <!--<upload-excel style="padding: 7px 15px;display: inline-block;"></upload-excel>-->
        <el-button type="primary" size="mini" class="importClass">
          任务导入
          <input type="file" value id="file" ref="referenceUpload" @change="uploadConfig">
        </el-button>
      </template>
      <template slot="button-content" style="margin-left: 10px">
        <el-button type="primary" size="mini">
          <a :href="openUrl" target="_blank">模板下载</a>
        </el-button>
      </template>
      <template slot="button-content" style="margin-left: 10px">
        <el-button
          type="primary"
          size="mini"
          @click="dialogVisible2 = true"
          :disabled="checkedCaseNoList.length === 0"
        >删除</el-button>
      </template>
      <template slot="button-content" style="margin-left: 10px">
        <el-button type="primary" size="mini" @click="exportPipeline">导出</el-button>
      </template>
    </hx-table>

    <!--导入框-->
    <el-dialog title="任务导入" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>是否确认导入？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="openConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!--导入框-->
    <el-dialog title="删除" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HxTable from "@/components/huaxia/HxTable/queryTable1carAfter";
import {
  publicFlowList,
  importExcel,
  publicBatchDelete,
  refundDownload
} from "@/api/carLoadAfterApi";
import searchLabel from "./searchLabel";
import tableLabel from "./tableLabel";
import request from "@/utils/request";
import cloneDeep from "lodash/cloneDeep";

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      dialogVisible2: false,
      formData: null,
      openUrl: request.commonUrl + "/template/download",
      //globDictData: this.$store.state.glabdatas.globDictData,
      tableParam: {
        isShoweds: {
          // 是否显示集合
          pageIsShow: true, // 分页是否显示
          tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
          isSearch: true, // 搜索框是否显示
          tableIsAllChange: true // 左侧固定全选列是否显示
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
      refundDownloadParam: {}
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
    getSelectionString() {
      let serialNoList = [];
      if (this.$refs.hxtableComponent.isAllCheck) {
        serialNoList = this.allSelections;
      } else {
        for (let i in this.selections) {
          serialNoList.push(this.selections[i].id);
        }
      }
      //return serialNoList.join("#")
      return serialNoList;
    },
    confirmDelete() {
      //console.log("删除")
      let deleteData = {
        ids: this.checkedCaseNoList
      };
      publicBatchDelete(deleteData).then(response => {
        if (response.data.code == "00000") {
          this.dialogVisible2 = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getSearch(this.tableParam.queryTables.param);
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    handleClose2(done) {
      done();
    },
    handleClose(done) {
      done();
      this.$refs.referenceUpload.value = null;
    },
    uploadConfig(e) {
      this.dialogVisible = true;
      this.formData = new FormData();
      this.formData.append("file", e.target.files[0]);
    },
    //input file 二次弹窗取消操作
    cancel() {
      this.dialogVisible = false;
      this.$refs.referenceUpload.value = null;
    },
    openConfirm() {
      this.dialogVisible = false;
      this.loading = true;
      importExcel(this.formData).then(response => {
        this.$refs.referenceUpload.value = null;
        this.loading = false;
        if (response.data.code == "00000") {
          this.$message({
            message: response.data.msg,
            type: "success"
          });
          this.getSearch(this.tableParam.queryTables.param);
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },

    formatDate(now) {
      var timetime = new Date(now);
      var year = timetime.getFullYear();
      var month = timetime.getMonth() + 1;
      var date = timetime.getDate();
      var hour = timetime.getHours();
      var minute = timetime.getMinutes();
      var second = timetime.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },

    /* 检索 */
    getSearch(param) {
      publicFlowList(param).then(response => {
        //	console.log(response.data)
        if (response.data.code === "00000") {
          if (response.data.list) {
            const array = response.data.list;

            for (let i = 0; i < array.length; i++) {
              if (array[i].isMatched == 1) {
                array[i].isMatched = "已匹配";
              } else {
                array[i].isMatched = "未匹配";
              }
            }

            this.tableParam.isShoweds.tableIsShow = 1;
            this.tableParam.isShoweds.pageIsShow = true;

            let reg = /^(\d{5})\d+(\d{4})$/;
            for (let i = 0; i < array.length; i++) {
              if (array[i].transDate) {
                array[i].transDate = this.formatDate(array[i].transDate);
              }
              if (array[i].importDate) {
                array[i].importDate = this.formatDate(array[i].importDate);
              }
              if (array[i].tranderAccount) {
                let str = array[i].tranderAccount;
                str = str.replace(reg, "$1*****$2");
                array[i].tranderAccount = str;
              }
              array[i].bankName = "线下辉恒";
            }

            this.tableParam.tableData = array;
            this.tableParam.pageHelpers.totalSum = response.data.total;
          } else {
            this.tableParam.tableData = [];
            // this.tableParam.isShoweds.tableIsShow = 2;
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
        if(data.importDate&& data.importDate.length>0){
              data.importDateStart = data.importDate[0]
              data.importDateEnd = data.importDate[1]
          }
          delete data.importDate
          if(data.transDate&& data.transDate.length>0){
              data.transDateStart = data.transDate[0]
              data.transDateEnd = data.transDate[1]
          }
          delete data.transDate
          this.refundDownloadParam = cloneDeep(data);
          // console.log(data);
          
          // console.log(data);
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
        default:
      }
    },
    exportPipeline() {
      this.$confirm("是否确认导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (Object.keys(this.refundDownloadParam).length > 0) {
          //    for (let qq in this.refundDownloadParam) {
          //         //console.log(obj[qq])
          //         if (this.refundDownloadParam[qq] == "" || this.refundDownloadParam[qq] == undefined || this.refundDownloadParam[qq] == null) {
          //             delete this.refundDownloadParam[qq];
          //         }
          //     }
          delete this.refundDownloadParam["pageNum"];
          delete this.refundDownloadParam["pageSize"];
        }
        //console.log(this.refundDownloadParam);

        refundDownload(this.refundDownloadParam).then(response => {
          const content = response;
          const blob = new Blob([content.data]);
          //console.log(blob);
          
          const fileName = "对公流水导出信息.xlsx";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "block";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        });
      });
    }
  },

  components: {
    HxTable
  }
};
</script>
<style>
.importClass {
  position: relative;
  cursor: pointer;
}

#file {
  width: 86px;
  height: 28px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.el-loading-mask {
  position: fixed;
}
</style>