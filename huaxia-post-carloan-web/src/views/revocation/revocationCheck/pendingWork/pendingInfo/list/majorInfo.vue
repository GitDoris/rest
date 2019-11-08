<!--对公还款-对公录入-待处理任务-->
<template>
  <div>
    <el-table :data="tableDataTop" style="width: 100%">
      <el-table-column prop="contractSerialno" label="合同编号"></el-table-column>
      <el-table-column prop="cardNo" label="银行卡号"></el-table-column>
      <el-table-column prop="exceedMoney" label="溢缴款"></el-table-column>
      <el-table-column prop="balance" label="剩余挂账金额"></el-table-column>
      <el-table-column prop="repealMoney" label="挂账撤销金额"></el-table-column>
      <!--<el-table-column prop="realPayAmount" label="上次还款金额"></el-table-column>
      <el-table-column prop="payAmount" label="上次应还金额"></el-table-column>
      <el-table-column prop="payDate" label="上次还款日期"></el-table-column>-->
      <el-table-column prop="store" label="门店"></el-table-column>
      <el-table-column prop="inputuser" label="申请人"></el-table-column>
      <el-table-column prop="reviewuser" label="复核人"></el-table-column>
      <el-table-column prop="createdTime" label="操作时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>


  </div>
</template>

<script>

  import {reApplyLogs} from '@/api/carLoadAfterApi'
  


  export default {
    data() {
      return {
        tableDataTop:[],
        detailList:"",
        msg:"",
        serialNo2:"",
      }
    },

    created() {
      this.msg = JSON.parse(sessionStorage.revocationCheckData)[0];//合同编号
      this.serialNo2 = JSON.parse(sessionStorage.revocationCheckData)[1];//id
      this.getDetail();
    },

    methods: {

      getDetail() {
        let param = {
          contractSerialNo:this.msg,
          idList:this.serialNo2,
        };

        reApplyLogs(param).then(response => {
          //console.log(response.data)
        	if (response.data.code === "00000") {
            this.tableDataTop= response.data.list;
            let reg = /^(\d{4})\d+(\d{4})$/;

           // 银行卡号加星星
            for(let i=0;i<this.tableDataTop.length;i++){
              if(this.tableDataTop[i].cardNo){
                  let str = this.tableDataTop[i].cardNo;
                  str = str.replace(reg, "$1******$2");
                  this.tableDataTop[i].cardNo = str;
              }
            }

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

