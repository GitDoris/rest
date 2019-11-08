<template>
  <div class="maxBox">
    <div class="box box-primary">

      <div class="box box-primary">
        <div class="box-body" style="padding: 0;">
          <ul class="normalTitlebold">
            <li class="">客户姓名：
              <span>{{UserList.customerName}}</span>
            </li>
            <li>合同编号：
              <span>{{this.msg}}</span>
            </li>
            <li>产品名称：
              <span>{{UserList.productName}}</span>
            </li>
            <li>贷款期数：
              <span>{{UserList.loanPeriods}}期</span>
            </li>
            <li>挂账金额：
              <span>{{UserList.balance | fmoney(UserList.balance, 2)}}元</span>
            </li>
          </ul>
          <ul class="normalTitle">
            <li>身份证号：
              <span>{{UserList.certID}}</span>
            </li>
            <li>大区：
              <span>{{UserList.orgName}}</span>
            </li>
            <li>门店：
              <span>{{UserList.genusStore}}</span>
            </li>
            <li>贷款状态：
              <span>{{UserList.loanStatusName}}</span>
            </li>

		        <div class="rightBtn" style="margin-bottom: 20px;float: right;margin-right: 20px;">
		        		<el-button type="primary" @click="goBackBtn">回退</el-button>
		        		<el-button type="primary" @click="dialogVisible = true">提交</el-button>
		        </div>
          </ul>
        </div>
      </div>

      <!-- -----------------------按钮 end------------------------------------------------>

      <!--//账务信息-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>账务信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">贷款金额</span>{{factPayList.loanAmount | fmoney(UserList.loanAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">放款日期</span>{{factPayList.loanDate}}</el-col>
          <el-col :span="8"><span class="left_item">溢缴金额</span>{{factPayList.exceedMoney | fmoney(UserList.exceedMoney, 2)}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">月还金额</span>{{factPayList.pmtAmount | fmoney(UserList.pmtAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">下次还款日</span>{{factPayList.nextPaydate}}</el-col>
        </el-row>
      </div>
       <!--//本次挂账撤销操作-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>本次挂账撤销操作</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账金额</span>{{UserList.balance | fmoney(UserList.balance, 2)}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账撤销金额</span><el-input v-model="applyAmount" placeholder="请输入" v-bind:style="inputStyle" :disabled="true"></el-input>   元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">申请备注</span><el-input v-model="remark" placeholder="请输入" v-bind:style="inputStyle" type="textarea" :disabled="true"></el-input></el-col>
        </el-row>
      </div>

         
      
      <!--//还款操作记录-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>历史挂账撤销操作</h2>
        </el-row>
        <major-info :contractNo="revocationCheckData.contractNo"></major-info>
      </div>
      
    </div>


      <!--提交框-->
      <el-dialog
        title="提交"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确认对当前记录进行提交？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="openConfirm">确 定</el-button>
        </span>
      </el-dialog>
 
  </div>

</template>
<script>

  import cloneDeep from 'lodash/cloneDeep'

  import MajorInfo from './list/majorInfo.vue'

  import tableLables from './list/tableLabel'
 // import searchLabels from './list/searchLabel'


  import {reAcctinfo,reSubmit4FH,contractInfo,reGoback,dgSuspendinfo} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        inputStyle:{
      		width:200+'px',
          verticalAlign:top,
      	},
        applyAmount: '',
        remark: '',

        dialogVisible:false, 
        value: '',
        serialNo2:"",
      	msg:"",

        UserList:{},
        factPayList:{},
      	
      	
        revocationCheckData: {},
        dialogTableParam: {},
        isShow: true,

      }
    },
    created: function () {

      this.msg = JSON.parse(sessionStorage.revocationCheckData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.revocationCheckData)[1];//id
    },
    mounted:function(){
      this.getUserList();
      this.getFinanceList();
      this.getSuspendinfo();
    },
    methods: {
       handleClose(done) {
          done();
      },
     // dgSuspendinfo
      getSuspendinfo(){
        let dgSuspendinfoParam={
          idList:this.serialNo2,
        };
        dgSuspendinfo(dgSuspendinfoParam).then(response => {
          if (response.data.code === "00000") {
            this.applyAmount= response.data.data.repealMoney;
            this.remark= response.data.data.remark;
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      //回退操作
      goBackBtn(){
        let backparam={
          idList:this.serialNo2,
        };
        reGoback(backparam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '回退成功',
              type:'success'
            });
            let pushUrl = "/revocation/revocationCheck/pendingWork";
            this.$router.push(pushUrl)
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
     // 提交按钮
    	openConfirm() {
        let confirmParam={
          idList:this.serialNo2,
          applyAmount:this.applyAmount,
          remark:this.remark
        };
        reSubmit4FH(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '提交成功',
              type:'success'
            });
            let pushUrl = "/revocation/revocationCheck/pendingWork";
            this.$router.push(pushUrl)
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },

      //查询用户信息
    	getUserList(){
        let param = {
          contractSerialNo:this.msg
        };
    		contractInfo(param).then(response => {
         // console.log(response)
          if (response.data.code === "00000") {
            this.UserList= response.data.data;

            let reg = /^(\d{3})\d+(\d{4})$/;
            let str = this.UserList.certID;
            str = str.replace(reg, "$1***********$2");
            this.UserList.certID = str;
           //this.serialNo2= response.data.serialNo2;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
    	//查询实际还款信息
    	getFinanceList(){
        let param = {
          contractSerialNo:this.msg,
          idList:this.serialNo2,
        }
        reAcctinfo(param).then(response => {
          if (response.data.code === "00000") {
            console.log(response.data.data)
            this.factPayList= response.data.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},

      /*关闭弹出框，置空数据*/
      resetDialog() {
        this.dialogTableParam = {}
      },



    },
    components: {
      MajorInfo,

    }
  }
</script>


<style>
	.cancelWrap>div>div{
		margin-bottom: 20px;
	}
	.cancelWrap span{
		margin-right: 20px;
	}
	.cancelWrap select{
		width: 60%;
		height: 30px;
	}
	.cancelWrap textarea{
		width: 60%;
		height: 90px;
		vertical-align: top;
		resize: none;
	}
	.tabTopstyle{
		min-height: auto;
    padding-left: 0;
	}
  .tabTopstyle textarea{
    vertical-align: top;
  }
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

  .itemTitle{
    border-left: 2px solid rgb(39, 161, 99);
    line-height: 36px;
  }
  .itemTitle h2{
    padding-left: 10px;
    color: rgb(51, 51, 51);
  }
   .left_item{
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }
</style>
