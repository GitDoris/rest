<template>
  <div class="black">
    <div class="top">
      <query
        v-if="queryParam.isVisible"
        :queryInfo="queryParam.queryInfo"
        :queryTables="queryParam.queryTables"
        @search-click="btnClick"
        @reSet-click="btnClick"
        @selectChange="selectChange"
      ></query>
    </div>
    <div class="bottom">
      <div class="btn-group">
        <el-button
          class="btn submit"
          @click="submitHandler"
          :disabled="selections.length==0||selections.length>1"
        >提交</el-button>
        <el-button class="btn refuse" @click="backHandler" :disabled="selections.length==0">回退</el-button>
        <el-button class="btn urgent" @click="exportHandler" :disabled="selections.length==0">导出</el-button>
        <el-button class="btn return" @click="deleteHandler" :disabled="selections.length==0">删除</el-button>
        <el-button class="btn pass" @click="newHandler">新增</el-button>
        <el-button class="btn primary">批量下载</el-button>
        <el-button class="btn primary" :disabled="true">批量上传</el-button>
      </div>
      <hx-table
        ref="hxtableComponent"
        :tableItems="tableParam"
        @btn-click="method"
        @operate-column-click="columnClick"
        @getSelections="getSelections"
        @getAllSelections="getAllSelections"
      ></hx-table>
    </div>
    <!-- 新增弹框 -->
    <el-dialog :visible.sync="newDialogVisible" title="新增" width="934px" class="newDialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="进件编号" prop="bzApplyNo">
          <el-input size="medium" v-model="ruleForm.bzApplyNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="担保业务编号" prop="assureBzCode">
          <el-input size="medium" v-model="ruleForm.assureBzCode"></el-input>
        </el-form-item>
        <el-form-item label="担保合同号码" prop="contractNumber">
          <el-input size="medium" v-model="ruleForm.contractNumber"></el-input>
        </el-form-item>
        <el-form-item label="被担保人名称" prop="customerName">
          <el-input size="medium" v-model="ruleForm.customerName"></el-input>
        </el-form-item>
        <el-form-item label="被担保人证件号码" prop="certId">
          <el-input size="medium" v-model="ruleForm.certId"></el-input>
        </el-form-item>
        <el-form-item label="担保金额(元)" prop="assureContractMoney">
          <el-input size="medium" v-model="ruleForm.assureContractMoney"></el-input>
        </el-form-item>
        <el-form-item label="担保起始日期" prop="putoutDate">
          <el-date-picker
            size="medium"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.putoutDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="担保到期日期" prop="maturityDate">
          <el-date-picker
            size="medium"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.maturityDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="约定再担保补偿比例(%)" prop="compensationRatio">
          <el-input size="medium" v-model="ruleForm.compensationRatio"></el-input>
        </el-form-item>
        <el-form-item label="年化费率(%)" prop="annualizedRates">
          <el-input size="medium" v-model="ruleForm.annualizedRates"></el-input>
        </el-form-item>
        <el-form-item label="担保责任解除日期" prop="relieveDate">
          <el-date-picker
            size="medium"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.relieveDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="在保余额(元)" prop="inBalance">
          <el-input size="medium" v-model="ruleForm.inBalance"></el-input>
        </el-form-item>
        <el-form-item label="余额变化日期" prop="balanceChangeDate">
          <el-date-picker
            size="medium"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.balanceChangeDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="影像上传" prop="type">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="medium" type=""  icon="el-icon-upload2" style="width:216px;text-align: left;">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="value1" multiple placeholder="请选择" size="medium">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog title="删除" :visible.sync="deleteDialogVisible" class="deleteDialog" width="340px">
      <el-form :model="deleteForm" :rules="deleteRule" label-width="85px">
        <el-form-item label="删除原因:" prop="reason">
          <el-select v-model="deleteForm.reason" placeholder="请选择删除原因">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息:">
          <el-input v-model="deleteForm.mark" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 回退弹框 -->
    <el-dialog title="回退" :visible.sync="backDialogVisible" class="deleteDialog" width="340px">
      <el-form :model="backForm" label-width="85px">
        <el-form-item label="回退原因:" prop="reason">
          <el-select v-model="backForm.reason" placeholder="请选择删除原因">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息:">
          <el-input v-model="backForm.mark" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="backDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

<script>
import {
  first,
  main,
  deletes,
  backs,
  submits,
  download,
  upload
} from '@/api/table.js'
import query from '@/components/query'
import HxTable from '@/components/table'
import searchLabel from './json/searchLabel'
import tableLabel from './json/tableLabel'
import info from './json/info'
import cloneDeep from 'lodash/cloneDeep'
import { Message, MessageBox } from 'element-ui'

export default {
  components: {
    HxTable,
    query
  },
  data() {
    return {
      queryParam: {
        isVisible: true,
        queryInfo: {
          isVisible: true,
          infoLabel: cloneDeep(info),
          infoData: [{ customerName: '111610T01002' }, { certId: 123 }]
        },
        queryTables: {
          queryParas: cloneDeep(searchLabel),
          param: {
            currentPage: 1,
            pageSize: 10
          }
        }
      },
      tableParam: {
        isShoweds: {
          pageIsShow: true, // 分页是否显示
          tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
          tableIsAllChange: true // 多选
        },
        pageHelpers: {
          pageSizes: [10, 20, 30, 40, 50, 100], // 每页条数下拉选项
          pageSize: 10, // 每页条数
          totalSum: 10, // 表格数据总数
          currentPage: 1 // 默认当前页
        },
        tableLables: cloneDeep(tableLabel),
        tableData: [
          {
            compensationRatio: 0,
            balanceChangeDate: 1554361891000,
            phaseNo: '01',
            creator: '',
            putoutDate: 1554102580000,
            inBalance: 0,
            bzApplyNo: 'A016201807134521M',
            contractNumber: '787933211',
            certId: '110101198001010096',
            customerName: '卡迪夫',
            assureBzCode: 'YDHXA016201807134521M',
            batchTime: 1554189016000,
            putoutSum: 0,
            maturityDate: 1553497836000,
            annualizedRates: 0,
            createdTime: 1554707556000,
            id: 1,
            relieveDate: 1554016271000,
            phaseName: '一级新增'
          }
        ]
      },
      selections: [],
      newDialogVisible: false,
      ruleForm: {},
      rules: {},
      fileList: [],
      deleteDialogVisible: false,
      deleteForm: {},
      deleteRule: {
        reason: [
          { required: true, message: '请选择删除原因', trigger: 'change' }
        ]
      },
      backDialogVisible: false,
      backForm: {}

    }
  },
  created() {
    this.getSearch(this.queryParam.queryTables.param)
  },
  methods: {
    getSearch(param) {
      first(param).then(data => {
        if (data.code == '000000') {
          if (data.data.list.length > 0) {
            this.tableParam.tableData = data.data.list
            this.tableParam.pageHelpers.totalSum = data.data.total
          } else {
            this.tableParam.isShoweds.tableIsShow = 2
          }
        } else {
          this.tableParam.isShoweds.tableIsShow = 2
        }
      })
    },

    // btnGroup
    submitHandler() {
      console.log(this.selections)
      this.$confirm(
        '总共' + this.selections.length + '笔，确认提交？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        submits({
          bzApplyNo: this.selections[0].bzApplyNo,
          applyId: this.selections[0].id
        }).then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }
        })
      })
    },
    backHandler() {
      this.backDialogVisible = true
    },
    exportHandler() {},
    deleteHandler() {
      this.deleteDialogVisible = true
    },
    // 新增
    newHandler() {
      this.newDialogVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    columnClick(operateType, row) {
      this.detailVisible = true
      if (operateType == 'detail') {
        this.check = true
        this.detail = row
      }
      if (operateType == 'edit') {
        this.check = false
        this.detail = row
      }
    },
    editSure() {},

    method(key, data) {
      switch (key) {
        case 'search': // 搜索事件
          this.getSearch(data)
          break
        case 'reSet': // 检索重置
          this.tableParam.pageHelpers = {
            pageSizes: [10, 20, 30, 40, 50, 100], // 每页条数下拉选项
            pageSize: 10, // 每页条数
            totalSum: 10, // 表格数据总数
            currentPage: 1 // 默认当前页
          }
          this.tableParam.queryTables.param = {
            currentPage: 1,
            pageSize: 10
          }
          this.getSearch(this.tableParam.queryTables.param)
          break
        case 'current_change': // 当前页数修改
          this.tableParam.pageHelpers.currentPage = data
          this.tableParam.queryTables.param.currentPage = this.tableParam.pageHelpers.currentPage
          this.getSearch(this.tableParam.queryTables.param)
          break

        case 'size_change': // 每页数据条数修改
          this.tableParam.pageHelpers.pageSize = data
          this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize
          this.getSearch(this.tableParam.queryTables.param)
          break
      }
    },
    // query
    selectChange() {},
    btnClick() {},
    // table
    getSelections(data, flag) {
      this.selections = data
      console.log(flag)
      console.log(this.selections)
    },
    getAllSelections(data) {
      this.selections = data
      // console.log('all', this.selections)
    }
  }
}
</script>

<style lang="less">
.black {
  .el-dialog__title {
    // font-weight: bold;
    font-size: 16px;
  }
  .el-dialog__body {
    padding: 20px 10px 20px 20px;
    border-top: 1px solid #e9e9e9;
    > div {
      padding: 10px 0 30px;
      border-bottom: 1px solid #e9e9e9;
      p {
        font-size: 16px;
        // font-weight: bold;
        color: #333;
      }
      label {
        text-align: right;
        width: 90px;
        float: left;
      }
    }

    .el-input__inner {
      width: 216px;
    }
  }
  .newDialog {
    .el-form {
      overflow: hidden;
    }
    .el-col {
      margin-bottom: 10px;
    }
    .el-form-item {
      float: left;
      margin-right: 10px;
      label {
        display: block;
        float: none;
        text-align: left;
      }
    }
  }
  .deleteDialog {
    .el-textarea {
      width: 216px;
    }
  }
}
.bottom {
  padding: 15px;
  margin: 10px;
  background: #fff;
}
</style>
