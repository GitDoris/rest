<template>
  <div class="maxBox">
    <div class="box box-primary">

      <div class="box box-primary">
        <div class="box-body" style="padding: 0;">
          <ul class="normalTitlebold">
            <li class="">客户姓名：
              <span>{{customerName}}</span>
            </li>
            <li>合同编号：
              <span>{{contractSerialNo}}</span>
            </li>
            <li>产品名称：
              <span>{{productName}}</span>
            </li>
            <li>贷款期限：
              <span>{{loanTerm}}</span>
            </li>
            <li>挂账金额：
              <span>{{balance | fmoney(balance, 2)}}元</span>
            </li>
          </ul>
          <ul class="normalTitle"> 
            <li>身份证号：
              <span>{{idCard}}</span>
            </li>
            <li>分部：
              <span>{{bigArea}}</span>
            </li>
            <li>门店：
              <span>{{orgName}}</span>
            </li>
            <li>合同状态：
              <span>{{loanStatusDetail}}</span>
            </li>
            <div class="rightBtn" style="margin-bottom: 20px;float: right;margin-right: 20px;">
                <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
            </div>
          </ul>
        </div>
      </div>

      <div class="tabTopstyle" value="">

          <el-row class="itemTitle">
            <h2>基本信息</h2>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">合同编号：</span>{{mainData.accountContractInfo.contractSerialNo}}</el-col>
            <el-col :span="8"><span class="left_item">合同金额：</span>{{mainData.accountContractInfo.contractAmount | fmoney(mainData.accountContractInfo.contractAmount, 2)}}元</el-col>
            <el-col :span="8"><span class="left_item">放款日期：</span>{{mainData.accountContractInfo.loanDate}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">每月还款日：</span>{{mainData.accountContractInfo.defaultPaydate}}</el-col>
            <el-col :span="8"><span class="left_item">罚息总额：</span>{{mainData.accountContractInfo.fineinteBalance | fmoney(mainData.accountContractInfo.fineinteBalance, 2)}}元</el-col>
            <el-col :span="8"><span class="left_item">剩余未还期数：</span>{{mainData.accountContractInfo.surplusTerm}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">每月还款额：</span>{{mainData.accountContractInfo.pmtAmount | fmoney(mainData.accountContractInfo.pmtAmount, 2)}}元</el-col>
            <el-col :span="8"><span class="left_item">逾期期数：</span>{{mainData.accountContractInfo.overDuePeriod}}</el-col>
            <el-col :span="8"><span class="left_item">剩余未还本金：</span>{{mainData.accountContractInfo.normalBalance | fmoney(mainData.accountContractInfo.normalBalance, 2)}}元</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">逾期总额：</span>{{mainData.accountContractInfo.overdueSum | fmoney(mainData.accountContractInfo.overdueSum, 2)}}元</el-col>
            <el-col :span="8"><span class="left_item">性别：</span>{{mainData.accountContractInfo.sex}}</el-col>
            <el-col :span="8"><span class="left_item">逾期天数：</span>{{mainData.accountContractInfo.overdueDay}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">逾期日期：</span>{{mainData.accountContractInfo.overdueDate == ""?"--":mainData.accountContractInfo.overdueDate}}</el-col>
            <el-col :span="8"><span class="left_item">还款卡号：</span>{{mainData.accountContractInfo.accountNo}}</el-col>
            <el-col :span="8"><span class="left_item">借款金额：</span>{{mainData.accountContractInfo.businessSum | fmoney(mainData.accountContractInfo.businessSum, 2)}}元</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">证件号码：</span>{{idCard}}</el-col>
            <el-col :span="8"><span class="left_item">最长逾期天数：</span>{{mainData.accountContractInfo.maxOverdueDays}}</el-col>
            <el-col :span="8"><span class="left_item">逾期违约金：</span>{{mainData.accountContractInfo.overdueBalance | fmoney(mainData.accountContractInfo.overdueBalance, 2)}}元</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">还款银行：</span>{{mainData.accountContractInfo.accountBank}}</el-col>
            <el-col :span="8"><span class="left_item">逾期状态：</span>{{mainData.accountContractInfo.overduestatus == ""?"--":mainData.accountContractInfo.overduestatus}}</el-col>
            <el-col :span="8"><span class="left_item">剩余未还合同金额：</span>{{mainData.accountContractInfo.surplusContractAmount | fmoney(mainData.accountContractInfo.surplusContractAmount, 2)}}元</el-col>            
          </el-row>
          <el-row>
            <el-col :span="8"><span class="left_item">展期手续费：</span>{{mainData.accountContractInfo.extendServiceAmount | fmoney(mainData.accountContractInfo.extendServiceAmount, 2)}}</el-col>
            <el-col :span="8"><span class="left_item">是否展期：</span>{{mainData.accountContractInfo.extendStatus}}</el-col>
          </el-row>

      </div>

      <el-tabs class="tabTopstyle" @tab-click="caseLogTab" v-model="activeName">
        <el-tab-pane label="还款计划表" name="first">
          <!-- <major-info></major-info> -->
          <!--<major-info v-if="isShowMajor"/>-->
        </el-tab-pane>
        <el-tab-pane label="交易明细"  name="second">
          <!-- <message-flow :transactiondetails="mainData"></message-flow> -->
          <!--<message-flow v-if="isShowMsg"/>-->
        </el-tab-pane>
        <el-tab-pane label="逾期明细"  name="third">
          <!-- <case-info-table  :overduedetails="mainData"></case-info-table> -->
          <!--<case-info-table v-if="overdueDetail"/>-->
        </el-tab-pane>
        <major-info v-if="activeName=='first'"></major-info>
        <message-flow v-if="activeName=='second'" :transactiondetails="mainData"></message-flow>
        <case-info-table v-if="activeName=='third'" :overduedetails="mainData.accountOverdueTotal"></case-info-table>l
      </el-tabs>



    </div>
  </div>

</template>
<script>
import cloneDeep from "lodash/cloneDeep";

import caseInfoTable from "./list/caseInfoTable.vue";
import MajorInfo from "./list/majorInfo.vue";
import MessageFlow from "./list/messageFlow.vue";

import tableLables from "./list/tableLabel";

import { financeDetail } from "@/api/carLoadAfterApi";

export default {
  data() {
    return {
      mainData: {
        accountContractInfo:{},
        accountCustomerInfo:{},
        accountOverdueDetail:{},
        accountOverdueTotal:{},
        accountPaymentSchedule:{},
        accountRepaymentDetail:{},
      },
      loanStatusDetail: "",
      customerName:'',
      contractSerialNo:'',
      productName:'',
      loanTerm:'',
      balance:'',

      dialogTableParam: {},
      isShow: true,

      caseData: {},
      //caseCheckData: {},
      caseCheckData: "",
      importantInfo: {},
      overdueDetail: false, //逾期明细
      isShowMsg: false, //交易明细
      isShowMajor: true, //还款计划表,
      activeName: "first"
    };
  },
  created: function() {
    this.caseCheckData = JSON.parse(sessionStorage.caseCheckData); //合同编号
    this.init();
  },
  methods: {
    /*初始化*/
    init() {
      let queryData = {
        contractSerialNo: this.caseCheckData
      };
      financeDetail(queryData).then(response => {
        // console.log(response.data.list.accountCustomerInfo.customerName)
        if (response.data.code === "00000") {
          this.mainData = response.data.list;
          if(this.mainData.accountContractInfo.extendStatus==1){
            this.mainData.accountContractInfo.extendStatus='是'
          }
            else if(this.mainData.accountContractInfo.extendStatus==0){
              this.mainData.accountContractInfo.extendStatus='否'
            }
            else{
              this.mainData.accountContractInfo.extendStatus='--'
            }
              this.loanStatusDetail = response.data.list.accountCustomerInfo.loanStatus;
              this.customerName = response.data.list.accountCustomerInfo.customerName;
              this.contractSerialNo = response.data.list.accountCustomerInfo.contractSerialNo;
              this.productName = response.data.list.accountCustomerInfo.productName;
              this.loanTerm = response.data.list.accountCustomerInfo.loanTerm;
              this.balance = response.data.list.accountCustomerInfo.balance;
              this.idCard = response.data.list.accountCustomerInfo.idCard
              this.bigArea = response.data.list.accountCustomerInfo.bigArea
              this.orgName = response.data.list.accountCustomerInfo.orgName
              // sessionStorage.caseCheckDetail = JSON.stringify(response.data);
        } else {
          this.$message.error(response.data.msg);
        }
      });

      // this.caseCheckData.caseNo = this.caseCheckList[0].caseNo
      // this.caseCheckData.contractNo = this.caseCheckList[0].contractNo
      // this.caseCheckData.id = this.caseCheckList[0].id
    },

    /*各种流水tab切换*/
  
     caseLogTab(tab,event) {
        this.activeName = tab.name;
       // console.log(tab.index+','+event);
      },
  },
  components: {
    MessageFlow,
    MajorInfo,
    caseInfoTable
  }
};
</script>


<style>
.el-row {
  margin-bottom: 20px;
}

:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-dialog--center .el-dialog__header {
  padding-top: 15px;
}

.passText {
  text-align: center;
}

.passText span {
  color: #f00;
}

.tabTopstyle {
  min-height: auto;
  padding-left: 0;
}
/*.el-tabs__item{
     border-bottom:2px solid rgb(39, 161, 99); 
  }*/

.el-tabs__active-bar {
  background: rgb(39, 161, 99);
}

.el-tabs__item.is-active {
  color: #000;
  font-weight: bolder;
  border-bottom: 2px solid rgb(39, 161, 99);
}

.itemTitle {
  border-left: 2px solid rgb(39, 161, 99);
  line-height: 36px;
}

.itemTitle h2 {
  padding-left: 10px;
  color: rgb(51, 51, 51);
}

.left_item {
  display: inline-block;
  width: 25%;
}
</style>