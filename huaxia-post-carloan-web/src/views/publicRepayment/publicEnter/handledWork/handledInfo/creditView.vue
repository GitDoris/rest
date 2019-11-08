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
                <el-button type="primary" @click="goList" >返回</el-button>
		        		<el-button type="primary" @click="openImageUrl">影像平台</el-button>
		        		<!-- <el-button type="primary" @click="dialogVisible = true">取消</el-button>
		        		<el-button type="primary" @click="dialogVisible3 = true">回退</el-button>
		        	  <el-button type="primary" @click="openSave">保存</el-button>
		        		<el-button type="primary" @click="dialogVisible2 = true">提交</el-button> -->
		        </div>
          </ul>
        </div>
      </div>

      <!-- -----------------------按钮 end------------------------------------------------>
      <!--</my-affix>-->
      <!--</sticky>-->
      <!-- -----------------------Tabs start-- 车贷贷后人员信息------------------------------------>
      
      <!--//对公还款信息-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>对公还款信息</h2>
        </el-row>
          <el-row>
          <el-col :span="8"><span class="left_item">实际还款日：</span>{{PublicList.inputDate}}<span class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">交易方姓名：</span>{{PublicList.tranderName}}</el-col>
          <el-col :span="8"><span class="left_item">凭证摘要：</span>{{PublicList.voucherAbstract}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">申请还款金额：</span>{{PublicList.payamountSubAmt | fmoney(PublicList.payamountSubAmt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">交易方账号：</span>{{PublicList.tranderAccount}}</el-col>
          <el-col :span="8"><span class="left_item">凭证备注：</span>{{PublicList.voucherRemark}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">备注：</span>{{PublicList.remark}}</el-col>
          <el-col :span="8"><span class="left_item">凭证流水号：</span>{{PublicList.voucherSerialNo}}</el-col>
          <!--<el-col :span="8"><span class="left_item">还款类型</span>{{PublicList.payTypeName}}</el-col>-->
        </el-row>
      </div>
      
      <!--//流水匹配记录-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>流水匹配记录</h2>
        </el-row>
				<modify-match></modify-match>
      </div>
      
			<!--//测算结果-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>测算结果</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还本金：</span>{{calculateList.payCorpusAmount | fmoney(calculateList.payCorpusAmount, 2)}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">逾期本金：</span>{{calculateList.overdueBalance | fmoney(calculateList.overdueBalance, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">应还总额：</span>{{calculateList.payAmount | fmoney(calculateList.payAmount, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还利息：</span>{{calculateList.payInteAmount | fmoney(calculateList.payInteAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">逾期利息：</span>{{calculateList.overPayInteAmount | fmoney(calculateList.overPayInteAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">原应还总额：</span>{{calculateList.payAmt | fmoney(calculateList.payAmt, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还罚息：</span>{{calculateList.payFineAmount | fmoney(calculateList.payFineAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">逾期总额：</span>{{calculateList.overdueSum | fmoney(calculateList.overdueSum, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">划扣金额：</span>{{calculateList.matchedAmount | fmoney(calculateList.matchedAmount, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还逾期违约金：</span>{{calculateList.payOverPayFeeamt | fmoney(calculateList.payOverPayFeeamt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">系统原逾期违约金：</span>{{calculateList.overPayFeeamt | fmoney(calculateList.overPayFeeamt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">应挂账金额：</span>{{calculateList.suspendBalance | fmoney(calculateList.suspendBalance, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">系统原罚息：</span>{{calculateList.fineAmount | fmoney(calculateList.fineAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">应减免逾期违约金：</span>{{calculateList.reduceOverPayFeeamt | fmoney(calculateList.reduceOverPayFeeamt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">应还展期手续费：</span>{{calculateList.payExtendervice | fmoney(calculateList.payExtendervice, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应减免罚息：</span>{{calculateList.reduceFineAmt | fmoney(calculateList.reduceFineAmt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">月还金额：</span>{{calculateList.pmtamount | fmoney(calculateList.pmtamount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">应溢缴金额：</span>{{calculateList.balance | fmoney(calculateList.balance, 2)}}</el-col>
        </el-row>
      </div>
      
      <!-- //提前结清信息-->
      <div class="tabTopstyleInner" value="" v-show="PublicList.payType==12">
        <el-row class="itemTitle">
          <h2>提前结清信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还总计：</span>{{ClearanceInfoList.payAmount | fmoney(ClearanceInfoList.payAmount, 2)}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">减免金额：</span>{{ClearanceInfoList.applyReduceSum | fmoney(ClearanceInfoList.applyReduceSum, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">扣款总计：</span>{{ClearanceInfoList.deductAmount | fmoney(ClearanceInfoList.deductAmount, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账金额：</span>{{ClearanceInfoList.suspBalance | fmoney(ClearanceInfoList.suspBalance, 2)}}</el-col>
           <el-col :span="8"><span class="left_item">应还提前结清违约金：</span>{{ClearanceInfoList.payFeeamt | fmoney(ClearanceInfoList.payFeeamt, 2)}}</el-col>
        </el-row>
      </div>
      
     <!-- //还款信息-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>还款信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">还款流水号：</span>{{corPayList.serialno}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">还款状态：</span>{{corPayList.applystatus}}</el-col>
          <el-col :span="8"><span class="left_item">还款渠道：</span>{{corPayList.payChannel}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">还款借据号：</span>{{corPayList.duebillserialno}}</el-col>
          <el-col :span="8"><span class="left_item">借款人：</span>{{corPayList.customername}}</el-col>
          <el-col :span="8"><span class="left_item">还款方式：</span>{{corPayList.payType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">申请还款日期：</span>{{corPayList.applydate}}</el-col>
          <el-col :span="8"><span class="left_item">身份证号：</span>{{corPayList.certid}}</el-col>
        </el-row>
      </div>
      
      
      <!--//实还信息-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>实还信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还本金：</span>{{factPayList.actualCorpusAmount | fmoney(factPayList.actualCorpusAmount, 2)}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">实还罚息：</span>{{factPayList.actualFineAmount | fmoney(factPayList.actualFineAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">实还提前结清违约金：</span>{{factPayList.actualPayFeeamt | fmoney(factPayList.actualPayFeeamt, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还利息：</span>{{factPayList.actualInteAmount | fmoney(factPayList.actualInteAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">实还逾期违约金：</span>{{factPayList.actualOverDueAmount | fmoney(factPayList.actualOverDueAmount, 2)}}</el-col>
           <el-col :span="8"><span class="left_item">实还金额总计：</span>{{factPayList.actualAmount | fmoney(factPayList.actualAmount, 2)}}</el-col>
        </el-row>
      </div>
      
      <!--//还款操作记录-->
      <div class="tabTopstyleInner" value="">
        <el-row class="itemTitle">
          <h2>操作记录</h2>
        </el-row>
        <major-info></major-info>
      </div>
      
    </div>



    <!--回退框-->
      <el-dialog
        title="回退"
        :visible.sync="dialogVisible3"
        width="30%"
        :before-close="handleClose">

        <div class="cancelWrap">
          <div>
            <div>
              <span>回退原因</span>
              <select v-model="selected">
                <option v-for="option in options2" v-bind:value="option.value" :key="option.value">
                  {{ option.text }}
                </option>
              </select>

            </div>
            <div v-show="selected==9">
              <span>回退备注</span>
              <textarea maxlength="50" v-model="textareaed"></textarea>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="openBack">确 定</el-button>
        </span>
      </el-dialog>
    <!--取消框-->
      <el-dialog
        title="取消"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <div class="cancelWrap">
          <div>
            <div>
              <span>取消原因</span>
              <select v-model="selected">
                <option v-for="option in options" v-bind:value="option.value" :key="option.value">
                  {{ option.text }}
                </option>
              </select>

            </div>
            <div>
              <span>取消备注</span>
              <textarea maxlength="50" v-model="textareaed"></textarea>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="openCancel">确 定</el-button>
        </span>
      </el-dialog>

      <!--提交框-->
      <el-dialog
  title="提交"
  :visible.sync="dialogVisible2"
  width="30%"
  :before-close="handleClose">
  <span>确认提交当前记录</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="openConfirm">确 定</el-button>
  </span>
</el-dialog>



  </div>

</template>
<script>
  import cloneDeep from 'lodash/cloneDeep'

  import MajorInfo from './list/majorInfo.vue'
  import ModifyMatch from './list/modifyMatch.vue'

  import tableLables from './list/tableLabel'
  import searchLabels from './list/searchLabel'

  import {editMatch,goback,mRecords,calculate,payInfo,actualPayInfo,contractInfo,imgePlatformUrl,cancel,submit,save,corPayInfo,dgEarlyClearanceInfo} from '@/api/carLoadAfterApi'

  export default {

    data() {
      return {
        remarkShow:false,
        value: '',
      	inputDate:'',
        payamountSubAmt:'',
        voucherSerialNo:'',
        tranderAccount:'',
        tranderName:'',
        voucherAbstract:'',
        voucheRemark:'',
        remark:'',
        textareaed:"",
        selected: 1,
        options: [
          { text: '重复提交', value: '1' },
          { text: '错误的客户', value: '2' },
          { text: '无此交易', value: '3' },
          { text: '其他', value: '4' }          
        ],
        options2: [
          { text: '录入金额错误', value: '1' },
          { text: '录入日期错误', value: '2' },
          { text: '匹配金额错误', value: '3' },
          { text: '匹配日期错误', value: '4' },
          { text: '凭证上传错误', value: '5' },
          { text: '重复提交', value: '6' },
          { text: '错误的客户', value: '7' },
          { text: '无此交易', value: '8' },
          { text: '其他', value: '9' }          
        ],
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        value: '',
      	inputStyle:{
      		width:200+'px',
      	},
        serialNo2:"",
      	msg:"",
        PublicList:{},
        UserList:{},
      	calculateList:{},
      	corPayList:{},
      	factPayList:{},
        ClearanceInfoList:{},
      	
      	
        dialogTableParam: {},
        isShow: true,

 

       
      }
    },
    created: function () {
// this.caseCheckList = JSON.parse(sessionStorage.caseCheckList);
      this.msg = JSON.parse(sessionStorage.publicEnterData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicEnterData)[1];//流水号
      // console.log(this.msg)
      // console.log(this.serialNo2)
      //开始进页面
      this.getPublicList();
      this.getUserList();
      this.getCalculateList();
      this.getCorPayList();
      this.getFactPayList();
      this.getEarlyClearanceInfo();
    },
    methods: {
    	 //查询提前结清信息
    	getEarlyClearanceInfo(){
        let param = {
          amraId:this.serialNo2
        };
    		dgEarlyClearanceInfo(param).then(response => {
          if (response.data.code === "00000") {
            this.ClearanceInfoList= response.data.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
    	//提交按钮
    	openConfirm() {
        let confirmParam={
          serialNo:this.serialNo2,
          phase:2,
        };
        //console.log(confirmParam)
        submit(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.dialogVisible2=false;
            let pushUrl = "/publicRepayment/lastAudit/pendingWork";
            this.$router.push(pushUrl)
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      //取消按钮
      openCancel(){
        let cancelParam={
          serialNo:this.serialNo2,
          phase:2,
          reason:this.selected,
          othermsg:this.textareaed,
        };
        //console.log(cancelParam)
        //cancelParam = JSON.stringify(cancelParam);
        if(cancelParam.reason == 4 && this.textareaed ==''){
            this.$message({
              message: '请输入具体原因',
              type: 'warning'
            });
        }else{
          cancel(cancelParam).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                message: '取消成功',
                type: 'success'
              });
              this.dialogVisible=false;
              let pushUrl = "/publicRepayment/lastAudit/pendingWork";
              this.$router.push(pushUrl)
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }
      },
      //回退按钮
      openBack(){
        goback
         let gobackParam={
          serialNo:this.serialNo2,
          phase:2,
          reason:this.selected,
          othermsg:this.textareaed,
        };

        if(gobackParam.reason == 9 && this.textareaed ==''){
            this.$message({
              message: '请输入具体原因',
              type: 'warning'
            });
        }else{
          goback(gobackParam).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                message: '回退成功',
                type: 'success'
              });
              this.dialogVisible3=false;
              let pushUrl = "/publicRepayment/lastAudit/pendingWork";
              this.$router.push(pushUrl);
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }
      },
      handleClose(done) {
          done();
      },
      //打开影像平台
      openImageUrl(){
        let param = {
          contractSerialNo:this.msg,
          phase:3
        };
        imgePlatformUrl(param).then(response => {
          if (response.data.code === "00000") {
            //window.open("huaxiaecm://"+response.data.url);
            window.location.href="huaxiaecm://"+response.data.url; 
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },

      //查询对公还款信息
    	getPublicList(){
        let param = {
          amraId:this.serialNo2
        };
    		corPayInfo(param).then(response => {
          if (response.data.code === "00000") {
            this.PublicList= response.data.data;
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
            //身份证号
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
      //查询测算结果
    	getCalculateList(){
        let param = {
          amraId:this.serialNo2
        };
    		calculate(param).then(response => {
          //console.log(response.data)
          if (response.data.code === "00000") {
            this.calculateList= response.data.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
    	//查询还款信息
    	getCorPayList(){
        let param = {
          amraId:this.serialNo2
        };
        payInfo(param).then(response => {
          if (response.data.code === "00000") {
            this.corPayList= response.data.data;
            //身份证号
            let reg = /^(\d{3})\d+(\d{4})$/;
            let str = this.corPayList.certid;
            str = str.replace(reg, "$1***********$2");
            this.corPayList.certid = str;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
    	//查询实际还款信息
    	getFactPayList(){
        let param = {
          amraId:this.serialNo2
        };
        actualPayInfo(param).then(response => {
          if (response.data.code === "00000") {
            this.factPayList= response.data.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},


      resetDialog() {
        this.dialogTableParam = {}
      },
      goList(){
        this.$router.push({name:'publicEnter',query:{activeName:'second'}})
      }

    },
    components: {
      MajorInfo,
      ModifyMatch
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
	.tabTopstyleInner{
		min-height: auto;
    padding-left: 0;
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
    width: 150px;
    text-align: right;
  }
</style>
