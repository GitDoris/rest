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
		        		<el-button type="primary" @click="dialogVisible = true">取消</el-button>
		        		<el-button type="primary" @click="openSave">保存</el-button>
		        		<el-button type="primary" @click="dialogVisible2 = true">提交</el-button>
		        </div>
          </ul>
        </div>
      </div>


      <!-- -----------------------Tabs start-- 车贷贷后人员信息------------------------------------>
      <!--//对公还款信息-->
      <el-form  :label-position="labelPosition" label-width="150px" class="tabTopstyle"  :rules="publicEnterForm" :model="operation" ref="operation">
        <el-row class="itemTitle">
          <h2>对公还款信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="实际还款日："  class="left_form_item" prop="inputDateBtn">
              <!--<span class="left_item">实际还款日：</span>-->
              <el-date-picker
                v-model="operation.inputDate"
                type="date"
                placeholder="选择日期" v-bind:style="inputStyle" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易方姓名："  class="left_form_item">
              <el-input v-model="operation.tranderName" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证摘要："  class="left_form_item">
              <el-input v-model="operation.voucherAbstract" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请还款金额："  class="left_form_item" prop="payamountSubAmtBtn">
              <el-input v-model="operation.payamountSubAmt" placeholder="请输入" v-bind:style="inputStyle"  @change="validateMoney()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易方账号："  class="left_form_item">
              <el-input v-model="operation.tranderAccount" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证备注："  class="left_form_item">
              <el-input v-model="operation.voucherRemark" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注："  class="left_form_item">
               <el-input v-model="operation.remark" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证流水号："  class="left_form_item">
              <el-input v-model="operation.voucherSerialNo" placeholder="请输入" v-bind:style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
			<!--//测算结果-->
      <!--<div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>测算结果</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还本金：</span>{{calculateList.payCorpusAmount}}元<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">逾期本金：</span>{{calculateList.overdueBalance}}元</el-col>
          <el-col :span="8"><span class="left_item">应还总额：</span>{{calculateList.payAmount}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还利息：</span>{{calculateList.payInteAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">逾期利息：</span>{{calculateList.overPayInteAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">原应还总额：</span>{{calculateList.payAmt}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还罚息：</span>{{calculateList.payFineAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">逾期总额：</span>{{calculateList.overdueSum}}元</el-col>
          <el-col :span="8"><span class="left_item">划扣金额：</span>{{calculateList.matchedAmount}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">系统原罚息：</span>{{calculateList.fineAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">逾期违约金：</span>{{calculateList.overPayFeeamt}}元</el-col>
          <el-col :span="8"><span class="left_item">应挂账金额：</span>{{calculateList.suspendBalance}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应减免罚息：</span>{{calculateList.reduceFineAmt}}元</el-col>
          <el-col :span="8"><span class="left_item">月还金额：</span>{{calculateList.pmtamount}}元</el-col>
        </el-row>
      </div>-->
      <!--//测算结果-->
      <div class="tabTopstyle" value="">
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
          <el-col :span="8"><span class="left_item">原应还总额：</span>{{calculateList.payAmt | fmoney(calculateList.payAmt, 2)}}元</el-col>
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
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应减免罚息：</span>{{calculateList.reduceFineAmt | fmoney(calculateList.reduceFineAmt, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">月还金额：</span>{{calculateList.pmtamount | fmoney(calculateList.pmtamount, 2)}}</el-col>
        </el-row>
      </div>
      
     <!-- //还款信息-->
      <div class="tabTopstyle" value="">
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
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>实还信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还本金：</span>{{factPayList.actualCorpusAmount | fmoney(factPayList.actualCorpusAmount, 2)}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">实还罚息：</span>{{factPayList.actualFineAmount | fmoney(factPayList.actualFineAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">实还金额总计：</span>{{factPayList.actualAmount | fmoney(factPayList.actualAmount, 2)}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实还利息：</span>{{factPayList.actualInteAmount | fmoney(factPayList.actualInteAmount, 2)}}</el-col>
          <el-col :span="8"><span class="left_item">实还逾期违约金：</span>{{factPayList.actualOverDueAmount | fmoney(factPayList.actualOverDueAmoun, 2)}}</el-col>
        </el-row>
      </div>
      
      <!--//还款操作记录-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>操作记录</h2>
        </el-row>
        <major-info :contractNo="publicEnterData.contractNo"/>
        <!--<el-tab-pane label="操作记录">
        </el-tab-pane>-->
      </div>


      
    </div>
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
                <option v-for="option in options" v-bind:value="option.value">
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

  import tableLables from './list/tableLabel'
  import searchLabels from './list/searchLabel'


  import {calculate,payInfo,actualPayInfo,contractInfo,imgePlatformUrl,cancel,submit,save,corPayInfo} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        labelPosition: 'right',
        // onSaveBtn:false,//提交时是否保存了按钮
        // onConfirmBtn:true,//提交时未保存 自动保存并且不显示保存成功提示
        isSaveBtn:false,
        publicEnterForm:{
          inputDateBtn:[],
          payamountSubAmtBtn:[],
        },
        operation:{
          inputDate:'',
          payamountSubAmt:'',
          voucherSerialNo:'',
          tranderAccount:'',
          tranderName:'',
          voucherAbstract:'',
          voucherRemark:'',
          remark:'',
        },
        textareaed:"",

        selected: 1,
        publicEnterData: "",
        options: [
          { text: '重复提交', value: 1 },
          { text: '错误的客户', value: 2 },
          { text: '无此交易', value: 3 },
          { text: '其他', value: 4 }          
        ],
        dialogVisible:false,
        dialogVisible2:false,
        value: '',
      	inputStyle:{
      		width:200+'px',
      	},
        serialNo2:"",
      	msg:"",
        UserList:{},
      	calculateList:{},
      	corPayList:{},
      	factPayList:{},

      }
    },
    created: function () {
      this.msg = JSON.parse(sessionStorage.publicEnterData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.publicEnterData)[1];//流水号      
    },
    mounted:function(){
      this.getValidate();
      //开始进页面
      this.getUserList();
      this.getPublicList();
      this.getCalculateList();
      this.getCorPayList();
      this.getFactPayList();
    },
    methods: {
       handleClose(done) {
          done();
      },
      validateMoney(){
        let reg = /^[0-9]+(.[0-9]{1,2})?$/;
        if(!reg.test(this.operation.payamountSubAmt)){
          this.$message({
            message: '输入金额格式错误~',
            type:'warning'
          });
          this.operation.payamountSubAmt = "";
        }
      },
      getValidate(){
        this.publicEnterForm.inputDateBtn.push( { required: true, message: '请输入实际还款日', trigger: 'blur' }); 
        this.publicEnterForm.payamountSubAmtBtn.push( { required: true, message: '请输入还款金额', trigger: 'blur' }); 
      },
      //查询对公还款信息
    	getPublicList(){
        let param = {
          amraId:this.serialNo2
        };
    		corPayInfo(param).then(response => {
          if (response.data.code === "00000") {
            this.operation= response.data.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
      submitConfirm(){
          //提交参数
          let confirmParam={
            serialNo:this.serialNo2,
            phase:0,
          };

          submit(confirmParam).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.dialogVisible2=false;
              let pushUrl = "/publicRepayment/publicEnter/pendingWork";
              this.$router.push(pushUrl)
            } else {
              this.$message.error(response.data.msg);
            }
          })
      },
      //提交按钮
    	openConfirm() {

        if(this.isSaveBtn){
          this.submitConfirm();
        }else{
          //保存参数
          let saveParam = this.operation;
          this.operation.serialNo = this.serialNo2;
          this.operation.phase = 0;
          if(this.operation.inputDate == '' || this.operation.payamountSubAmt==''){
              this.$message({
                message: '时间，申请还款金额一定要填写哦~~',
                type: 'warning'
              });
          }else{
            save(saveParam).then(response => {
              if (response.data.code === "00000") {  
                this.submitConfirm();
              } else {
                this.$message.error(response.data.msg);
              }
            })
          }
        }

      },

      //取消按钮
      openCancel(){
        let cancelParam={
          serialNo:this.serialNo2,
          phase:0,
          reason:this.selected,
          othermsg:this.textareaed,
        };
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
              let pushUrl = "/publicRepayment/publicEnter/pendingWork";
              this.$router.push(pushUrl)
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }
      },
      //保存功能
      openSave(){
        let saveParam = this.operation;
        this.operation.serialNo = this.serialNo2;
        this.operation.phase = 0;

        if(this.operation.inputDate == '' || this.operation.payamountSubAmt==''){
            this.$message({
              message: '时间，申请还款金额一定要填写哦~~',
              type: 'warning'
            });
        }else{
          save(saveParam).then(response => {
            if (response.data.code === "00000") {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.isSaveBtn=true;
            } else {
              this.$message.error(response.data.msg);
            }
          })
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
      goList(){
        this.$router.push({name:'publicEnter',query:{activeName:'first'}})
      }
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
  .left_form_item label{
    font-weight: normal;
    text-align: right;
  }

</style>
