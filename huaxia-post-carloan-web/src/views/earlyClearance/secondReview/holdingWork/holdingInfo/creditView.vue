<template>
  <div class="maxBox">
    <div class="box box-primary">

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
                <el-button type="primary" @click="goList" >返回</el-button>
		        		<el-button type="primary" @click="openImageUrl">影像平台</el-button>
		        		<!-- <el-button type="primary" @click="dialogVisible = true">取消</el-button>
		        		<el-button type="primary" @click="goBack">回退</el-button>
		        		<el-button type="primary" @click="openSave">保存</el-button>
		        		<el-button type="primary" @click="dialogVisible2 = true">提交</el-button> -->
		        </div>
          </ul>
        </div>
      </div>

      <!--操作信息-->
      <div class="innertabTopstyle" value="">
        <el-row class="itemTitle">
            <h2>操作信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">扣款方式</span>{{UserList.payType}}<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">凭证流水号</span>{{UserList.voucherSerialno}}</el-col>
          <el-col :span="8"><span class="left_item">减免原因</span>{{UserList.reduceReason}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">交易方姓名</span>{{UserList.tranderName}}</el-col>
          <el-col :span="8"><span class="left_item">减免金额</span>{{UserList.applyReduceSum | fmoney(UserList.applyReduceSum, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">减免原因备注</span>{{UserList.reduceRemark}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">扣款总计</span>{{UserList.payAmountSubamt | fmoney(UserList.payAmountSubamt, 2)}}元</el-col>
          <!--<el-col :span="8" v-show="isShowBtn==12"><span class="left_item">对公还款金额</span>{{UserList.payAmountSubamt}}元</el-col>-->
          <el-col :span="8"><span class="left_item">对公还款金额</span>{{UserList.compinteBalance | fmoney(UserList.compinteBalance, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">备注</span>{{UserList.remark}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账金额</span>{{UserList.suspbalanceSum | fmoney(UserList.suspbalanceSum, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">凭证摘要</span>{{UserList.voucherAbstract}}</el-col>
          <el-col :span="8"><span class="left_item">凭证备注</span>{{UserList.voucherRemark}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">实际还款日</span>{{UserList.applyDateStr}}</el-col>
          <el-col :span="8"><span class="left_item">交易方账号</span>{{UserList.tranderAccount}}</el-col>
        </el-row>
      </div>

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
      <div class="innertabTopstyle" value="" v-if="isShow">
        <el-row class="itemTitle">
            <h2>欠款信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">一般余额</span>{{UserList.payCorpusAmount | fmoney(UserList.payCorpusAmount, 2)}}元<span
            class="item_font_color"></span></el-col>
          <el-col :span="8"><span class="left_item">逾期本金</span>--</el-col>
          <el-col :span="8"><span class="left_item">逾期利息</span>--</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">罚息</span>--</el-col>
          <el-col :span="8"><span class="left_item">欠款合计</span>--</el-col>
          <el-col :span="8"><span class="left_item">逾期违约金</span>--</el-col>
        </el-row>
      </div>
      
      <!-- //应还明细-->
      <div class="innertabTopstyle" value="" v-if="isShow">
        <el-row class="itemTitle">
          <h2>应还明细</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还金额合计</span>{{UserList.payAmount | fmoney(UserList.payAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还利息</span>{{UserList.payInteAmount | fmoney(UserList.payInteAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还逾期违约金</span>--</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">应还本金</span>{{UserList.payCorpusAmount | fmoney(UserList.payCorpusAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">应还罚息</span>--</el-col>
          <el-col :span="8"><span class="left_item">应还结清违约金</span>{{UserList.payFeeamt | fmoney(UserList.payFeeamt, 2)}}元</el-col>
        </el-row>
      </div>
      <!-- //实还明细-->
      <div class="innertabTopstyle" value="" v-if="isShow"  style="padding-bottom: 20px;">
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

    <!--回退框-->
      <!--<el-dialog
        title="回退"
        :visible.sync="dialogVisible3"
        width="30%"
        :before-close="handleClose">

        <div class="cancelWrap">
          <div>
            <div>
              <span>回退原因</span>
              <select v-model="selected">
                <option v-for="option in options2" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>

            </div>
            <div>
              <span>回退备注</span>
              <textarea maxlength="50" v-model="textareaed"></textarea>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="openBack">确 定</el-button>
        </span>
      </el-dialog>-->
    <!--取消框-->
      <!--<el-dialog
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
      </el-dialog>-->

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
        //isShowBtn:'',
        inputDate:'',
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
          { text: '凭证上传错误', value: '3' },
          { text: '重复提交', value: '4' },
          { text: '错误的客户', value: '5' },
          { text: '无此交易', value: '6' },
          { text: '其他', value: '7' }          
        ],
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        value: '',
      	msg:"",
        serialNo2:"",
        isSave:"",
        dataList:[],

        UserList:{},
        PublicList:{},

        isShow: true,

      }
    },
    created: function () {
      this.dataList = JSON.parse(sessionStorage.eCSecondData);
      this.msg = (this.dataList)[0];//合同编号
      this.serialNo2 = (this.dataList)[1];//流水号
      this.isSave = (this.dataList)[2];//试算结果

      this.getUserList();
    },
    mounted:function () {
    },
    methods: {

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
            let pushUrl = "/earlyClearance/secondReview/pendingWork";
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
            let pushUrl = "/earlyClearance/secondReview/pendingWork";
            this.$router.push(pushUrl);
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      //取消按钮
      goBack() {
        let confirmParam={
          transserialno:this.serialNo2,
          type:3,
        };
        eEarlyclearanceOperation(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '回退成功',
              type:"success"
            });
            let pushUrl = "/earlyClearance/secondReview/pendingWork";
            this.$router.push(pushUrl);
          } else {
            this.$message.error(response.data.msg);
          }
        })
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
	

      //查询详情
    	getUserList(){
        let param = {
          transserialno:this.serialNo2
        }
    		eEarlyclearanceDetails(param).then(response => {
          if (response.data.code === "00000") {
            this.UserList= response.data;
            //this.isShowBtn = Number(response.data.payType);

            switch(Number(response.data.repaymentWay)) {
              case 1:
                this.UserList.repaymentWay="等额本息";
                break;
              case 2:
                this.UserList.repaymentWay="先息后本";
                break;
              case 3:
                this.UserList.repaymentWay="等本等息";
                break;
              default:
                this.UserList.repaymentWay="";
                break;
            }
            switch(Number(response.data.payType)) {
              case 8:
                this.UserList.payType="一般提前结清";
                break;
              case 12:
                this.UserList.payType="对公提前结清";
                break;
              default:
                this.UserList.payType="";
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
            switch(Number(response.data.reduceReason)){
              case 1:
                this.UserList.reduceReason = "一般提前还款";
                break;
              case 2:
                this.UserList.reduceReason = "对公提前还款";
                break;
              case 3:
                this.UserList.reduceReason = "其它";
                break;
            }
            let reg = /^(\d{3})\d+(\d{4})$/;
            let str = this.UserList.idCard;
            str = str.replace(reg, "$1***********$2");
            this.UserList.idCard = str;

          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},




    goList(){
        this.$router.push({name:'secondReview',query:{activeName:'second'}})
      }
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
  .tryCou{
    margin-top: 20px;
  }
</style>
