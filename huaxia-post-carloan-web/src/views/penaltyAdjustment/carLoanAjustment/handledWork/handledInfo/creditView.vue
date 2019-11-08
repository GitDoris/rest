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
              <span>{{UserList.balance}}</span>
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
              <span>{{UserList.status}}</span>
            </li>

              
		        <div class="rightBtn" style="margin-bottom: 20px;float: right;margin-right: 20px;">
                <el-button type="primary" @click="goList" >返回</el-button>
		        		<el-button type="primary" @click="dialogVisible = true">提交</el-button>
		        </div>
          </ul>
        </div>
      </div>

      <!-- -----------------------按钮 end------------------------------------------------>

       <!--//本次挂账撤销操作-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>本次挂账撤销操作</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账金额</span>123</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">挂账撤销金额</span><el-input v-model="name" placeholder="请输入" v-bind:style="inputStyle"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">申请备注</span><el-input v-model="name" placeholder="请输入" v-bind:style="inputStyle" type="textarea"></el-input></el-col>
        </el-row>
      </div>

         
      <!--//实还信息-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>实还信息</h2>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">贷款金额</span>{{factPayList.actualCorpusAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">放款日期</span>{{factPayList.actualFineAmount}}元</el-col>
          <el-col :span="8"><span class="left_item">溢缴金额</span>{{factPayList.actualCorpusAmount+factPayList.actualFineAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="left_item">月还金额</span>{{factPayList.actualInteAmount}}</el-col>
          <el-col :span="8"><span class="left_item">下次还款日</span>{{factPayList.actualOverDueAmount}}</el-col>
        </el-row>
      </div>
      
      <!--//还款操作记录-->
      <div class="tabTopstyle" value="">
        <el-row class="itemTitle">
          <h2>历史挂账撤销操作</h2>
        </el-row>
        <major-info :contractNo="caseCheckData.contractNo"></major-info>
      </div>
      
    </div>


      <!--提交框-->
      <el-dialog
        title="提交"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确认提交当前记录</span>
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


  import {calculate,payInfo,actualPayInfo,contractInfo,imgePlatformUrl,cancel,submit,save} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        inputStyle:{
      		width:200+'px',
          verticalAlign:top,
      	},
        name: '请输入',

        dialogVisible:false, 
        value: '',
        serialNo2:"",
      	msg:"",

      	factPayList:{},
        UserList:{},
      	
      	
        caseCheckData: {},//从案件审核页面带过来的数据
        dialogTableParam: {},
        isShow: true,

      }
    },
    created: function () {
//    this.caseCheckList = JSON.parse(sessionStorage.caseCheckList)
//    this.init();
      this.getFactPayList();
    },
    methods: {
       handleClose(done) {
          done();
      },
      //提交按钮
    	openConfirm() {
        let confirmParam={
          serialNo:this.serialNo2,
          phase:0,
        };
        confirmParam = JSON.stringify(confirmParam);
        submit(confirmParam).then(response => {
          if (response.data.code === "00000") {
            this.$message({
              message: '保存成功',
            });
            location.reload();
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },


	
    	getParams(){
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.dataobj
        // 将数据放在当前组件的数据内
        this.msg = routerParams;
      },
    	//查询实际还款信息
    	getFactPayList(){
        actualPayInfo(this.msg).then(response => {
          if (response.data.code === "00000") {
            this.factPayList= response.data;
          } else {
            this.$message.error(response.data.msg);
          }
        })
    	},

      /*关闭弹出框，置空数据*/
      resetDialog() {
        this.dialogTableParam = {}
      },

goList(){
        this.$router.push({name:'carLoanAjustment',query:{activeName:'second'}})
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
    width: 22%;
  }
</style>
