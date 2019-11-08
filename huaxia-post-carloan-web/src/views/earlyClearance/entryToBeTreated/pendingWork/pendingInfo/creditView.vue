<template>
  <div class="maxBox">
    <div class="box box-primary" style="padding-bottom:15px">

      <div class="box box-primary">
        <div class="box-body" style="padding: 0;">
          <ul class="normalTitlebold">
            <li class="">客户姓名：
              <span>{{UserList.userName}}</span>
            </li>
            <li>合同编号：
              <span>{{this.msg}}</span>
            </li>
            <li>产品名称：
              <span>{{UserList.productName}}</span>
            </li>
            <li>贷款期数：
              <span>{{UserList.loanTerm}}期</span>
            </li>
            <li>挂账金额：
              <span>{{UserList.suspbalanceSum | fmoney(UserList.suspbalanceSum, 2)}}元</span>
            </li>
          </ul>
          <ul class="normalTitle">
            <li>身份证号：
              <span>{{UserList.idCard}}</span>
            </li>
            <li>大区：
              <span>{{UserList.bigAreaName}}</span>
            </li>
            <li>门店：
              <span>{{UserList.orgName}}</span>
            </li>
            <li>贷款状态：
              <span>{{UserList.loanStatus}}</span>
            </li>

		        <div class="rightBtn" style="margin-bottom: 20px;float: right;margin-right: 20px;">
                <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
		        		<el-button type="primary" @click="openImageUrl">影像平台</el-button>
		        		<el-button type="primary" @click="dialogVisible = true">取消</el-button>
		        		<el-button type="primary" @click="openSave('operation')">保存</el-button>
		        		<el-button type="primary" @click="dialogVisible2 = true">提交</el-button>
		        </div>
          </ul>
        </div>
      </div>

      <!--操作信息加试算-->
      <el-form  :label-position="labelPosition" label-width="120px" class="innertabTopstyle" value="" :rules="Rules" :model="operation" ref="operation">
        <!--<el-form>

        </el-form>-->
        <el-row class="itemTitle">
            <h2>操作信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8">
            <!--<span class="left_item">扣款方式</span>-->
            <el-form-item label="扣款方式"  class="left_form_item">
              <el-select v-model="operation.payReason" @change="changeOther" placeholder="一般提前还款">
                <el-option label="一般提前还款" value="1"></el-option>
                <el-option label="对公提前还款" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证流水号"  class="left_form_item">
            <!--<span class="left_item">凭证流水号</span>-->
              <el-input :disabled="disableBtn" v-model="operation.voucherSerialno" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="减免原因"  class="left_form_item" prop="reduceReasonBtn">
            <!--<span class="left_item">减免原因</span>-->
              <el-select v-model="operation.reduceReason" placeholder="请选择" :disabled="reduceBtn"  @change="changeReason">
                <el-option label="一般提前还款" value="1"></el-option>
                <el-option label="对公提前还款" value="2"></el-option>
                <el-option label="其它" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易方姓名"  class="left_form_item">
            <!--<span class="left_item">交易方姓名</span>-->
               <el-input :disabled="disableBtn" v-model="operation.tranderName" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item 
              label="减免金额"  
              class="left_form_item">
            <!--<span class="left_item">减免金额</span>                @keyup.native="validateMoney"-->
              <el-input 
                v-model="operation.reMoney" 
                placeholder="请输入" 
                @change="minusMoney()" 
                id="reMoneyMinus"
                :disabled="reMoneyDisabled"
                v-bind:style="inputStyle">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="减免原因备注"  class="left_form_item" prop="reduceRemarkBtn">
            <!--<span class="left_item">减免原因备注</span>-->
              <el-input :disabled="remarkBtn"  type="textarea" v-model="operation.reduceRemark" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="扣款总计"  class="left_form_item">
            <!--<span class="left_item">扣款总计</span>-->
              <el-input :disabled="true" id="moneyMinus" v-model="operation.sum" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对公还款金额"  class="left_form_item" prop="compinteBalanceBtn">
            <!--<span class="left_item">对公还款金额</span>-->
              <el-input :disabled="disableBtn" v-model="operation.compinteBalance" placeholder="请输入" v-bind:style="inputStyle" @blur="minusPublicMoney()" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证摘要"  class="left_form_item">
            <!--<span class="left_item">凭证摘要</span>-->
              <el-input :disabled="disableBtn" v-model="operation.voucherAbstract" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="挂账金额"  class="left_form_item">
            <!--<span class="left_item">挂账金额</span>-->
              <el-input :disabled="true" v-model="operation.guaMoney" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证备注"  class="left_form_item">
            <!--<span class="left_item">凭证备注</span>-->
              <el-input :disabled="disableBtn" type="textarea" v-model="operation.voucherRemark" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注"  class="left_form_item">
            <!--<span class="left_item">备注</span>-->
              <el-input :disabled="false" type="textarea" v-model="operation.remark" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="实际还款日"  class="left_form_item" prop="applyDateStrBtn">
            <!--<span class="left_item">实际还款日</span>-->
              <el-date-picker
                :disabled="disableBtn"
                v-model="operation.applyDateStr"
                type="date"
                placeholder="选择日期" v-bind:style="inputStyle" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易方账号"  class="left_form_item">
            <!--<span class="left_item">交易方账号</span>-->
              <el-input :disabled="disableBtn" v-model="operation.tranderAccount" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="tryCou" @click="tryCalculate">试算</el-button>
      </el-form>

      
      <!--提前结清-还款信息-->
      <div class="innertabTopstyle" value="">
        <el-row class="itemTitle">
            <h2>还款信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">还款流水号</span>{{UserList.transserialno}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">还款借据号</span>{{UserList.contractSerialNo}}</el-col>
          <el-col :span="8"><span class="left_item">申请还款日期</span>{{UserList.inputDateStr}}</el-col>
        </el-row>
        <el-row>
          <!--<el-col :span="8"><span class="left_item">录入人</span>{{UserList.inputUser == "" ? "--":UserList.inputUser}}</el-col>-->
          <el-col :span="8"><span class="left_item">录入人</span>{{UserList.inputUser}}</el-col>
          <el-col :span="8"><span class="left_item">合同号</span>{{UserList.contractSerialNo}}</el-col>
          <el-col :span="8"><span class="left_item">期限</span>{{UserList.loanTerm}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">门店</span>{{UserList.orgName}}</el-col>
          <el-col :span="8"><span class="left_item">产品名称</span>{{UserList.productName}}</el-col>
          <el-col :span="8"><span class="left_item">还款状态</span>{{UserList.phaseStatusStr}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">借款人</span>{{UserList.userName}}</el-col>
          <el-col :span="8"><span class="left_item">身份证号</span>{{UserList.idCard}}</el-col>
          <el-col :span="8"><span class="left_item">还款方式</span>{{UserList.repaymentWay}}</el-col>
        </el-row>
      </div>
      
      
						<!--//欠款信息-->
      <div class="innertabTopstyle" value="" v-if="isSave == 1">
        <el-row class="itemTitle">
            <h2>欠款信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">一般余额</span>{{PublicList.payCorpusAmount | fmoney(PublicList.payCorpusAmount, 2)}}元<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">逾期本金</span></el-col>
          <el-col :span="8"><span class="left_item">逾期利息</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">罚息</span></el-col>
          <el-col :span="8"><span class="left_item">欠款合计</span></el-col>
          <el-col :span="8"><span class="left_item">逾期违约金</span></el-col>
        </el-row>
      </div>
      
      <!-- //应还明细-->
      <div class="innertabTopstyle" value="" v-if="isSave == 1">
        <el-row class="itemTitle">
          <h2>应还明细</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还金额合计</span>{{PublicList.payAmount | fmoney(PublicList.payAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还利息</span>{{PublicList.payInteAmount | fmoney(PublicList.payInteAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还逾期违约金</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还本金</span>{{PublicList.payCorpusAmount | fmoney(PublicList.payCorpusAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还罚息</span></el-col>
          <el-col :span="8"><span class="left_item">应还结清违约金</span>{{PublicList.payFeeamt | fmoney(PublicList.payFeeamt, 2)}}元</el-col>
        </el-row>
      </div>
      <!-- //实还明细-->
      <div class="innertabTopstyle" value="" v-if="isSave == 1"  style="padding-bottom: 20px;">
        <el-row class="itemTitle">
          <h2>实还明细</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还金额合计</span>{{UserList.actualAmount | fmoney(UserList.actualAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">实还利息</span>{{UserList.actualInteAmount | fmoney(UserList.actualInteAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">实还逾期违约金</span>--</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还本金</span>{{UserList.actualCorpusAmount | fmoney(UserList.actualCorpusAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">实还罚息</span>--</el-col>
          <el-col :span="8"><span class="left_item">实还结清违约金</span>{{UserList.actualPayFeeamt | fmoney(UserList.actualPayFeeamt, 2)}}元</el-col>
        </el-row>
      </div>
  

      
  
      
    </div>

      <!--取消框-->
      <el-dialog
  title="取消"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认取消</span>
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

  import {goback,eTrial,contractInfo,eEarlyclearanceDetails,eEarlyclearanceOperation,imgePlatformUrl,eAddEarlyclearance} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        labelPosition: 'right',
        Rules:{
          applyDateStrBtn:[],
          compinteBalanceBtn:[],
          reduceReasonBtn:[],
          reduceRemarkBtn:[],
          compinteBalance:[
            { required: true, message: '对公还款金额必填', trigger: 'blur' },
          ],
          applyDateStr:[
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          reduceReason:[
            { required: true, message: '请填写减免原因', trigger: 'blur' },
          ],
          reduceRemark:[
            { required: true, message: '请填写减免原因备注', trigger: 'blur' },
          ],
        },
        sum:0,
        minus:0,
        reMoneyIdendify:0,//最开始进来减免金额标识  加上扣款总计为总额

        operation:{
         // payReason:"",//扣款方式
          voucherSerialno :"",  //凭证流水号
          reduceReason :"",  //减免原因
          tranderName :"",  //姓名
          reMoney :"",  //减免金额
          reduceRemark :"", //减免原因备注 
          sum :"", //扣款总计
          compinteBalance :"", //对公还款金额
          voucherAbstract :"", //凭证摘要
          guaMoney :"", //挂账金额 
          voucherRemark :"", // 凭证备注
          remark :"", // 备注 
          applyDateStr :"",  //实际还款日
          tranderAccount :"", //交易方账号
        },
        disableBtn:true,

        reduceBtn:true, 
        remarkBtn:true,
        inputStyle:{
      		width:200+'px',
      	},

        options: [
          { text: '重复提交', value: '1' },
          { text: '错误的客户', value: '2' },
          { text: '无此交易', value: '3' },
          { text: '其他', value: '4' }          
        ],
        options2: [
          { text: '录入金额错误', value: '1' },
          { text: '录入日期错误', value: '2' },
          { text: '凭证上传错误', value: '3' },
          { text: '重复提交', value: '4' },
          { text: '错误的客户', value: '5' },
          { text: '无此交易', value: '6' },
          { text: '其他', value: '7' }          
        ],
        dialogVisible:false,
        dialogVisible2:false,


      	msg:"",
        serialNo2:"",
        isSave:"",
        dataList:[],

        UserList:{},
        PublicList:{},

        reason:1,
        reMoneyDisabled:false

      }
    },
    created: function () {
      this.dataList = JSON.parse(sessionStorage.eCEntryData);
      this.msg = (this.dataList)[0];//合同编号
      this.serialNo2 = (this.dataList)[1];//流水号
      this.isSave = (this.dataList)[2];//试算结果

      this.getUserList();

      if(this.operation.reMoney != ""){
        this.reduceBtn = false;
      }
    },
    mounted:function () {
    },
    methods: {
      changeReason(){
        if(this.operation.reduceReason == "3"){
          this.remarkBtn = false;
          this.Rules.reduceRemarkBtn = this.Rules.reduceRemark;
        }else{
          this.remarkBtn = true;
          this.Rules.reduceRemarkBtn=[];
          this.operation.reduceRemark = "";
        }
      },
      changeOther(){
        switch(this.operation.payReason){
          case "1":
            this.reason = 1;
            this.Rules.compinteBalanceBtn = [];
            this.Rules.applyDateStrBtn = [];

            this.disableBtn = true;

            this.reduceBtn = true;//减免原因及备注
            this.remarkBtn = true;
            if(this.operation.reMoney != ""){
              this.reduceBtn = false;
            }

            this.Rules.reduceReasonBtn = [];
            this.Rules.reduceRemarkBtn=[];

            //切换后清空项
            this.operation.applyDateStr = "";//实际还款日
            this.operation.compinteBalance = "";//对公还款金额
            this.operation.tranderName = "";//交易方姓名
            this.operation.voucherSerialno = "";//凭证流水号
            this.operation.voucherRemark = "";//凭证备注
            this.operation.tranderAccount = "";//交易方账号
            this.operation.voucherAbstract = "";//凭证摘要
            break;
          case "2":
            this.reason = 2;
            this.Rules.compinteBalanceBtn = this.Rules.compinteBalance;
            this.Rules.applyDateStrBtn = this.Rules.applyDateStr;
            this.disableBtn = false;

            this.reduceBtn = true;
            this.remarkBtn = true;
            if(this.operation.reMoney != ""){
              this.reduceBtn = false;
            }

            this.Rules.reduceReasonBtn = [];
            this.Rules.reduceRemarkBtn=[];

            break;
          default:
            break;
        }
      },
      minusMoney(){
        let reg = /^[0-9]+(.[0-9]{1,2})?$/;

        if(!reg.test(this.operation.reMoney)){
          this.$message({
            message: '减免金额格式错误~',
            type:'warning'
          });
          this.operation.reMoney = "";
          this.$set(this.operation,this.operation.reMoney,"");
        }
        if(Number(this.operation.reMoney)>Number(this.sum)){
          this.$message({
            message: '减免金额不能超过扣款总计~',
            type:'warning'
          });
          this.operation.reMoney = "";
          this.$set(this.operation,this.operation.reMoney,"");
        }
        //console.log(this.reMoneyIdendify)
        if(this.isSave == 1 && Number(this.PublicList.payAmountSubamt)>=Number(this.operation.reMoney)){
          this.sum = Number(this.PublicList.payAmountSubamt)+Number(this.reMoneyIdendify);//总计金额
          this.minus = Number(this.operation.reMoney);//减免金额
          this.sum = (this.sum - this.minus).toFixed(2);
          this.operation.sum = this.sum + "元"; //计算后的扣款总计
          this.$set(this.operation,this.operation.sum,this.sum + "元");
          document.getElementById("moneyMinus").value = this.sum + "元";
  
          //console.log(this.operation.sum)
        }
        if(this.operation.reMoney !== ""){
          this.reduceBtn = false;

          this.Rules.reduceReasonBtn = this.Rules.reduceReason;

        }else{
          this.Rules.reduceReasonBtn = [];

          this.reduceBtn = true;
          this.remarkBtn = true;
        }
        
      },
      minusPublicMoney(){
        let reg = /^[0-9]+(.[0-9]{1,2})?$/;
        if(!reg.test(this.operation.compinteBalance) || Number(this.operation.compinteBalance) < Number(this.sum)){
              this.operation.compinteBalance = "";
              this.$set(this.operation,this.operation.compinteBalance,"");
        }
      },

      // 试算
      tryCalculate(){
         let tryParam={
           contractSerialNo : this.msg,
           transserialno : this.serialNo2,
        };

        eTrial(tryParam).then(response => {
          if (response.data.code === "00000") {

            this.$message({
              message: '试算成功',
              type:'success'
            });

            this.isSave = 1;
            this.PublicList = response.data;
            this.sum = this.PublicList.payAmountSubamt;
            this.operation.sum = this.PublicList.payAmountSubamt + "元";
            this.operation.reMoney = 0;
//             this.$set(this.operation,"reMoney",0);
// console.log(this.operation.reMoney)

             document.getElementById("moneyMinus").value = this.PublicList.payAmountSubamt + "元";
             document.getElementById("reMoneyMinus").value = 0;

            
            this.reMoneyIdendify = 0;
            this.operation.reduceReason = "请选择";
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },

      //提交按钮
    	openConfirm() {
        let confirmParam={
          transserialno:this.serialNo2,
          type:1,
        };
        eEarlyclearanceOperation(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '提交成功',
              type:"success"
            });
            let pushUrl = "/earlyClearance/entryToBeTreated/pendingWork";
            this.$router.push(pushUrl);
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      //取消按钮
      openCancel() {
        let confirmParam={
          transserialno:this.serialNo2,
          type:2,
        };
        eEarlyclearanceOperation(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '取消成功',
              type:"success"
            });
            let pushUrl = "/earlyClearance/entryToBeTreated/pendingWork";
            this.$router.push(pushUrl);
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },

      handleClose(done) {
          done();
      },
      //保存功能
      openSave(formName){
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });

        
        //console.log(this.reason)
        if(this.operation.reduceReason == "请选择"){
          this.operation.reduceReason = "";
        }
        let saveParam={
              tradeType : "2",
              contractSerialNo : this.msg,
              earlyclearanceType : this.reason,
              isSave : this.isSave,
              transserialno : this.serialNo2,
              voucherSerialno:this.operation.voucherSerialno,//凭证流水号
              tranderName:this.operation.tranderName,//交易方姓名
              compinteBalance:this.operation.compinteBalance,//对公还款金额
              voucherAbstract:this.operation.voucherAbstract,//凭证摘要
              voucherRemark:this.operation.voucherRemark,//凭证备注
              applyDate:this.operation.applyDateStr,//实际还款日

              //isSave为1时提交
              payAmount:this.PublicList.payAmount,//	应还金额合计
              payCorpusAmount:this.PublicList.payCorpusAmount,//应还本金
              payInteAmount:this.PublicList.payInteAmount,//	应还利息
              payFeeamt:this.PublicList.payFeeamt,//提前结清手续费????????
              payAmountSubamt:this.sum,//扣款总计  未输入减免金额前取的payAmountSubamt,输入减免金额计算时取的payAmount-reMoney

              applyReduceSum:this.operation.reMoney,//减免金额
              reduceReason:this.operation.reduceReason,//	减免原因
              reduceRemark:this.operation.reduceRemark,//减免原因备注

              tranderAccount:this.operation.tranderAccount,//交易方账号

              remark:this.operation.remark
        };
        //console.log(this.operation.reduceReason)
        if(this.operation.reMoney !="" && this.operation.reduceReason == ""){
          this.$message({
              message: '请输入减免原因',
              type:'warning'
            });
        }else if(this.operation.reMoney !="" && (this.operation.reduceReason == 3 || this.operation.reduceReason == "其它" ) && this.operation.reduceRemark == ""){
          this.$message({
              message: '请输入减免原因备注',
              type:'warning'
            });
        }else{
          switch(this.reason){
            case 1:
              eAddEarlyclearance(saveParam).then(response => {
                if (response.data.code === "00000") {
                  this.$message({
                    message: '保存成功',
                    type:'success'
                  });

                } else {
                  this.$message.error(response.data.msg);
                }
              }) 
              break;
            case 2:
              if(this.operation.applyDateStr == "" ||this.operation.applyDateStr == undefined){
                this.$message({
                  message: '请选择实际还款日',
                  type:'warning'
                });
              }else if(this.operation.compinteBalance == "" || Number(this.operation.compinteBalance) < Number(this.sum)){
                this.$message({
                  message: '请输入对公还款金额，且不能小于扣款总计',
                  type:'warning'
                });
                this.operation.compinteBalance = "";
              }else{
                eAddEarlyclearance(saveParam).then(response => {
                  if (response.data.code === "00000") {
                    this.$message({
                      message: '保存成功',
                      type:'success'
                    });

                  } else {
                    this.$message.error(response.data.msg);
                  }
                })  
              }
              break;
            default:
              break;
              
          }
        }

      },
      //打开影像平台
      openImageUrl(){
        let param = {
          contractSerialNo:this.msg,
          phase:1
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
	

      //查询详情
    	getUserList(){
        let param = {
          transserialno:this.serialNo2
        }
    		eEarlyclearanceDetails(param).then(response => {
          if (response.data.code === "00000") {
            this.UserList= response.data;
            this.isSave=response.data.isSave;
            switch(Number(response.data.repaymentWay)) {
              case 1:
                this.UserList.repaymentWay="等额本息";
                break;
              case 2:
                this.UserList.repaymentWay="先息后本";
                this.reMoneyDisabled=true
                break;
              case 3:
                this.UserList.repaymentWay="等本等息";
                break;
              default:
                this.UserList.repaymentWay="";
                break;
            }
            switch(response.data.loanStatus) {
              case 0:
                this.UserList.loanStatus="正常";
                break;
              case 1:
                this.UserList.loanStatus="逾期";
                break;
              case 10:
                this.UserList.loanStatus="正常结清";
                break;
              case 20:
                this.UserList.loanStatus="提前结清";
                break;
              case 30:
                this.UserList.loanStatus="逾期结清";
                break;
              case 40:
                this.UserList.loanStatus="强制结清";
                break;
              case 50:
                this.UserList.loanStatus="对公提前结清";
                break;
              default:
                this.UserList.loanStatus="";
                break;
            }
           // if(this.isSave == 1){
              this.operation = response.data; 
              this.operation.payReason = response.data.payType == 8 ? "一般提前还款" : "对公提前还款";
              this.PublicList = response.data; 
              this.operation.sum = response.data.payAmountSubamt + "元";//扣款总计
              this.operation.reMoney = response.data.applyReduceSum;//减免金额

              this.reMoneyIdendify = response.data.applyReduceSum;//最开始进来减免金额标识
              

              this.PublicList.payFeeamt = response.data.payFeeamt;//结清违约金
              if(response.data.payType == 8){
                this.reason = 1;
                this.disableBtn = true;
              }else if(response.data.payType == 12){
                this.reason = 2;
                this.disableBtn = false;
              }

              switch(Number(response.data.reduceReason)){
                case 1:
                  this.operation.reduceReason = "一般提前还款";
                  break;
                case 2:
                  this.operation.reduceReason = "对公提前还款";
                  break;
                case 3:
                  this.operation.reduceReason = "其它";
                  break;
              }
           // }
            this.operation.guaMoney = this.UserList.suspbalanceSum + "元";

            let reg = /^(\d{3})\d+(\d{4})$/;
            let str = this.UserList.idCard;
            str = str.replace(reg, "$1***********$2");
            this.UserList.idCard = str;

            this.sum = response.data.payAmountSubamt;

          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},




    
    },
    components: {

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
	.innertabTopstyle{
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
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }
  .left_form_item label{
    font-weight: normal;
    text-align: right;
  }
  .tryCou{
    margin-top: 20px;
  }
</style>
