<template>
  <div>
    <el-dialog
      title="罚息调整"
      :visible.sync="dialogVisible"
      width="1020px"
      style="padding-bottom: 100px"
      center>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column align="center" fixed prop="seqid" label="期数" width="50"></el-table-column>
        <el-table-column align="center" prop="payPrincipal" label="本金" width="90"></el-table-column>
        <el-table-column align="center" prop="payInterest" label="利息" width="80"></el-table-column>
        <el-table-column align="center" prop="payInterestPenalty" label="调整前罚息"></el-table-column>
        <el-table-column align="center" prop="payOverduePenalty" label="调整前逾期违约金"></el-table-column>
        <el-table-column align="center" prop="adjustInterestPenalty" label="罚息调整" width="90"></el-table-column>
        <el-table-column align="center" prop="adjustOverduePenalty" label="逾期违约金调整"></el-table-column>
        <el-table-column align="center" prop="newPayInterestPenalty" label="调整后罚息"></el-table-column>
        <el-table-column align="center" prop="newPayOverduePenalty" label="调整后逾期违约金"></el-table-column>
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
        <el-form label-width="100px" >
          <el-form-item label="减免原因" prop="adjustReason">
            <el-select v-model="totalDetailVo.adjustReason" disabled placeholder="请选择减免原因">
              <el-option v-for="item in regionList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情描述" prop="adjustRemark">
            <el-input  type="textarea" style="min-height:80px" disabled v-model="totalDetailVo.adjustRemark"></el-input>
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
      }
    },

    created() {
    },
    methods: {

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
    height: 120px;
    margin-top: 15px;
  }
 
    .el-textarea{
    width:100%;
  }
</style>
