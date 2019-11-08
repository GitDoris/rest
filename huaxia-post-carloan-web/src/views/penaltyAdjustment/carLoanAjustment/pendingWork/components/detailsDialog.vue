<template>
  <div>
    <el-dialog
      title="罚息调整"
      :visible.sync="dialogVisible"
      @close="dialogClose"
      width="1020px"
      style="padding-bottom: 100px"
      center>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column align="center" fixed prop="seqid" label="期数" width="50"></el-table-column>
        <el-table-column align="center" prop="payPrincipal" label="本金" width="90"></el-table-column>
        <el-table-column align="center" prop="payInterest" label="利息" width="80"></el-table-column>
        <el-table-column align="center" prop="payInterestPenalty" label="调整前罚息"></el-table-column>
        <el-table-column align="center" prop="payOverduePenalty" label="调整前逾期违约金"></el-table-column>
        <el-table-column align="center" prop="adjustInterestPenalty" label="罚息调整">
          <el-input slot-scope="scope" placeholder="请输入" @change="defautInterestInput(scope.row)"           
                    v-model="scope.row.adjustInterestPenalty"
          ></el-input>
          <!-- :disabled="scope.row.isDisabled" -->
        </el-table-column>
        <el-table-column align="center" prop="adjustOverduePenalty" label="逾期违约金调整">
          <el-input slot-scope="scope" placeholder="请输入" @change="latePenaltyInput(scope.row)"
                    v-model="scope.row.adjustOverduePenalty"
          ></el-input>
           <!-- :disabled="scope.row.isDisabled" -->
        </el-table-column>
        <el-table-column align="center" prop="newPayInterestPenalty" label="调整后罚息" width="80"></el-table-column>
        <el-table-column align="center" prop="newPayOverduePenalty" label="调整后逾期违约金" width="80"></el-table-column>
      </el-table>

      <div class="middleData">
        <div class="float-right">
          <el-row>
            <el-col :span="12">罚息调整总额:
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">{{totalDetailVo.reduceFineAmount}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">逾期违约金总额:
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">{{totalDetailVo.reduceOverDueAmount}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">本次调整总额:
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light" style="color: #f00;">{{totalDetailVo.reduceSumAmount}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="form-box">
        <el-form :model="totalDetailVo" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="减免原因" prop="adjustReason">
            <el-select v-model="totalDetailVo.adjustReason" placeholder="请选择减免原因" style="width:300px">
              <el-option v-for="item in regionList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情描述" prop="adjustRemark">
            <el-input  type="textarea" v-model="totalDetailVo.adjustRemark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="submitForm('update')">保 存</el-button>
            <el-button type="primary" @click="submitForm('submit')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array
      },
      totalDetailVo: {}
    },
    data() {
      return {
        dialogVisible: false,
        regionList: [
          {"value": "1", "label": "资料录入错误"},
          {"value": "2", "label": "客户划扣不及时"},
          {"value": "3", "label": "获取信息错误"},
          {"value": "4", "label": "经济困难，他人代偿"},
          {"value": "5", "label": "提前结清"},
          {"value": "6", "label": "客户死亡"},
          {"value": "7", "label": "限制人生自由"},
          {"value": "8", "label": "破产"},
          {"value": "9", "label": "重大投诉"},
        ],
        rules: {
          adjustReason: [
            {required: true, message: '减免原因', trigger: 'change'},
          ],
          adjustRemark: [
            {required: true, message: '请输入具体原因', trigger: 'blur'}
          ]
        },
      }
    },

    created() {
    },
    methods: {
      dialogClose() {
        this.$refs.form.resetFields()
      },
      submitForm(type) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let formParam = {
              fineReduceSubDetailVos: this.tableData,
              fineReduceTotalDetailVo: this.totalDetailVo
            }
            if (type === "update") {
             this.dialogVisible = true
            } else {
              this.dialogVisible = false
            }
            
            this.$emit('dialogFormParam', type, formParam)
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      /* 罚息调整输入 */
      defautInterestInput(row) {
        this.tableInput('adjustInterestPenalty', row)
        let list = this.tableData
        this.totalDetailVo.reduceFineAmount = 0
        row.newPayInterestPenalty = Number((row.payInterestPenalty + row.adjustInterestPenalty).toFixed(2))
        if (row.newPayInterestPenalty < 0) {
          row.newPayInterestPenalty = row.payInterestPenalty
          row.adjustInterestPenalty = null
          this.totalDetailVo.reduceSumAmount = 0
        } else {
          /*计算罚息调整总额*/
          for (let i in list) {
            this.totalDetailVo.reduceFineAmount += list[i].adjustInterestPenalty
          }
          this.totalDetailVo.reduceFineAmount = Number(this.totalDetailVo.reduceFineAmount.toFixed(2))
        }
        this.totalDetailVo.reduceSumAmount = Number((this.totalDetailVo.reduceFineAmount + this.totalDetailVo.reduceOverDueAmount).toFixed(2))

      },
      /* 逾期违约金调整输入 */
      latePenaltyInput(row) {
        this.tableInput('adjustOverduePenalty', row)
        let list = this.tableData
        this.totalDetailVo.reduceOverDueAmount = 0
        row.newPayOverduePenalty = Number((row.payOverduePenalty + row.adjustOverduePenalty).toFixed(2))
        if (row.newPayOverduePenalty < 0) {
          row.newPayOverduePenalty = row.payOverduePenalty
          row.adjustOverduePenalty = null
          this.totalDetailVo.reduceSumAmount = 0
        } else {
          /*计算逾期违约金总额*/
          for (let i in list) {
            this.totalDetailVo.reduceOverDueAmount += list[i].adjustOverduePenalty
          }
          this.totalDetailVo.reduceOverDueAmount = Number(this.totalDetailVo.reduceOverDueAmount.toFixed(2))
        }
        this.totalDetailVo.reduceSumAmount = Number((this.totalDetailVo.reduceFineAmount + this.totalDetailVo.reduceOverDueAmount).toFixed(2))

      },
      /* table中input输入 */
      tableInput(type, row) {
        let value = Number(row[type])
        if (value) {
          if (value > 0) {
            let StringNum = String(value).indexOf(".") + 1; //获取小数点的位置
            if(StringNum > 0){
              value = Number((value).toFixed(2))
            }
            row[type] = Number("-" + value)
          } else {
            let StringNum = String(value).indexOf(".") + 1; //获取小数点的位置
            if(StringNum > 0){
              value = Number((value).toFixed(2))
            }
            row[type] = value
          }
        } else {
          row[type] = 0
        }
      }
    }
  }
</script>

<style scoped>

  .el-table td.is-center, .el-table th.is-center {
    text-align: left;
  }

  .middleData {
    border-bottom: 1px solid #000;
    margin-top: 10px;
    height: 80px;
  }

  .float-right {
    float: right;
    width: 260px;
  }

  .bg-purple-light {
    text-align: right;
  }

  .form-box {
    height: 200px;
    margin-top: 15px;
  }

  .el-form-item textarea {
    width: 200px !important;
  }
  .el-form-item__content{
    width:300px
  }
  .el-textarea{
    width:100%;
  }
.el-textarea__inner{
    min-height: 80px!important;
  }
</style>
