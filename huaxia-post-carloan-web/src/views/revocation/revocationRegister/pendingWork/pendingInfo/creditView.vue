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
              <span>{{UserList.contractId}}</span>
            </li>
            <li>产品名称：
              <span>{{UserList.productName}}</span>
            </li>
            <li>贷款期数：
              <span>{{UserList.loanTerm}}期</span>
            </li>
            <li>挂账金额：
              <span>{{UserList.suspendBalance | fmoney(UserList.suspendBalance, 2)}}元</span>
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
		        		<el-button type="primary" @click="submitRequest" :disabled="submitDisabled">提交</el-button>
                <el-button  slot="button-content" type="primary" @click="cancelRequest" :disabled="cancelDisabled">取消申请
                </el-button>

		        </div>
          </ul>
        </div>
      </div>

      <!--//账务信息-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>账务信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">贷款金额</span>{{UserList.contractAmount | fmoney(UserList.contractAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">放款日期</span>{{UserList.loanDate}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">月还金额</span>{{UserList.payMonthAmount | fmoney(UserList.payMonthAmount, 2)}}元</el-col>
          <el-col :span="8"><span class="left_item">下次还款日</span>{{UserList.nextPayDate}}</el-col>
        </el-row>
      </div>

       <!--//本次挂账撤销操作-->
      <el-form  :label-position="labelPosition" label-width="120px" class="tabTopstyle" :rules="revocationForm" :model="formData" ref="formData">
        <el-row class="itemTitle">
          <h2>本次挂账撤销操作</h2>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="挂账金额" class="left_form_item">
                {{UserList.suspendBalance | fmoney(UserList.suspendBalance, 2)}}元
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="挂账撤销金额" class="left_form_item" prop="applyAmount">
               <el-input v-model="formData.applyAmount" placeholder="请输入" v-bind:style="inputStyle" @change="revocationMoney()" :disabled="submitDisabled"></el-input>元
            </el-form-item>
            <!--<span class="left_item">挂账撤销金额</span>
            <el-input v-model="applyAmount" placeholder="请输入" v-bind:style="inputStyle" @change="revocationMoney()"></el-input>元-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请备注" class="left_form_item" prop="remark">
               <el-input v-model="formData.remark" placeholder="请输入" v-bind:style="inputStyle" type="textarea" :disabled="submitDisabled"></el-input>
            </el-form-item>
            <!--<span class="left_item">申请备注</span>
            <el-input v-model="remark" placeholder="请输入" v-bind:style="inputStyle" type="textarea">
              </el-input>-->
          </el-col>
        </el-row>
      </el-form>

         
      
      <!--//还款操作记录-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>历史挂账撤销操作</h2>
        </el-row>
        <major-info></major-info>
      </div>
      
    </div>
 
  </div>

</template>
<script>

  import cloneDeep from 'lodash/cloneDeep'

  import MajorInfo from './list/majorInfo.vue'

  import tableLables from './list/tableLabel'
 // import searchLabels from './list/searchLabel'


  import {reAcctinfo,repealSubmit,detailRepeal,reCancel} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        labelPosition: 'right',
         revocationForm: {
            applyAmount: [
            { required: true, message: '请填写挂账撤销金额', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ],
          },
        inputStyle:{
      		width:200+'px',
          verticalAlign:top,
      	},
        formData:{
          applyAmount: '',
          remark: '',
        },

        //dialogVisible:false, 
        value: '',
        serialNo2:"",
      	msg:"",
        applyFlowId:'',
        contractId:'',
        UserList:{},
        //factPayList:{},
      	
      	
        revocationData: {},//从案件审核页面带过来的数据
        dialogTableParam: {},
        isShow: true,
        repealStatus:'',
        submitDisabled:false,
        cancelDisabled:false

      }
    },
    created: function () {

      this.applyFlowId = JSON.parse(sessionStorage.revocationData)[0];//合同编号
      this.contractId = JSON.parse(sessionStorage.revocationData)[1];//id
      this.repealStatus = JSON.parse(sessionStorage.revocationData)[2];//状态
      this.submitDisabled = this.repealStatus==1?false:true
      this.cancelDisabled = (this.repealStatus!=1&&this.repealStatus!=2)?true:false
      //console.log(JSON.parse(sessionStorage.revocationData))
    },
    mounted:function(){
      this.getUserList();
      //this.getFinanceList();
      //this.addValidate();
    },
    methods: {
      // addValidate(){
      //   this.revocationForm.recocationMoney.push( { required: true, message: '请填写挂账撤销金额', trigger: 'blur' });
      //   this.revocationForm.recocationRemark.push( { required: true, message: '请填写备注', trigger: 'blur' });
      // },
      revocationMoney(){
        let reg = /^[0-9]+(.[0-9]{1,2})?$/;
        if(!reg.test(this.formData.applyAmount)){
          this.$message({
            message: '输入金额格式错误~',
            type:'warning'
          });
          this.formData.applyAmount = "";
        }
      },
       handleClose(done) {
          done();
      },
     
      //查询用户信息
    	getUserList(){
        let param = {
          applyFlowId:this.applyFlowId
        };
    		detailRepeal(param).then(response => {
         // console.log(response)
          if (response.data.code === "00000") {

            this.UserList= response.data.data;

           //身份证号
            let reg = /^(\d{3})\d+(\d{4})$/;
            let str = this.UserList.idCard;
            str = str.replace(reg, "$1***********$2");
            this.UserList.idCard = str;
            this.formData.applyAmount=this.UserList.repealAmounts
            this.formData.remark=this.UserList.remark
            switch(Number(this.UserList.loanStatus)){
                    case 0:
                      this.UserList.loanStatus = "正常";
                      break;
                    case 1:
                      this.UserList.loanStatus = "逾期";
                      break;
                    case 10:
                      this.UserList.loanStatus = "正常结清";
                      break;
                    case 20:
                      this.UserList.loanStatus = "提前结清";
                      break;
                    case 30:
                      this.UserList.loanStatus = "逾期结清";
                      break;
                    case 40:
                      this.UserList.loanStatus = "强制结清";
                      break;
                    case 50:
                      this.UserList.loanStatus = "对公提前结清";
                      break;
                    default:
                      break;
                  }
           //this.serialNo2= response.data.serialNo2;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},
    	
      /*关闭弹出框，置空数据*/
      resetDialog() {
        this.dialogTableParam = {}
      },
      //提交
      submitRequest(){
        // if(this.formData.applyAmount == ""){
        //   this.$message({
        //     message: '请填写挂账撤销金额',
        //     type:'warning'
        //   });
        //   return
        // }
        // if(this.formData.remark == ""){
        //   this.$message({
        //     message: '请填写备注',
        //     type:'warning'
        //   });
        //   return
        // }
         this.$refs['formData'].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$confirm('确认对当前记录进行提交？', '提交', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let confirmParam={
                applyFlowId:this.applyFlowId,
                repealAmounts:this.formData.applyAmount,
                remark:this.formData.remark
              };
              repealSubmit(confirmParam).then(response => {
                if (response.data.code === "00000") {
                  this.$message({
                    message: '提交成功',
                    type:'success'
                  });
                  let pushUrl = "/revocation/revocationRegister/pendingWork";
                  this.$router.push(pushUrl)
                } else {
                  this.$message.error(response.data.msg);
                }
              })
            }).catch(() => {
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
        
      },
      //取消申请 
      cancelRequest(){
          this.$confirm('确认取消当前记录?', '取消申请', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let oSubmitData = {
           applyFlowId:this.applyFlowId,
         };
         reCancel(oSubmitData).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                 message: '取消申请成功',
                 type:'success'
              });
              let pushUrl = "/revocation/revocationRegister/pendingWork";
              this.$router.push(pushUrl)
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }).catch(() => {
        });
      
         
      },
 goList(){
        this.$router.push({name:'revocationRegister',query:{activeName:'first'}})
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
	.box .tabTopstyle{
		min-height: auto;
    padding-left: 0;
	}
  .box .tabTopstyle textarea{
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
  .left_form_item label{
    font-weight: normal;
    text-align: right;
  }
</style>
