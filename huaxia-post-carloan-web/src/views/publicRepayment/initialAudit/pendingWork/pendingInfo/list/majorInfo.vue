<!--对公还款-对公录入-待处理任务-->
<template>
  <div>
    <el-table :data="tableDataTop" style="width: 100%">
      <el-table-column prop="operateTime" label="操作日期"></el-table-column>
      <el-table-column prop="applyPayAmount" label="申请还款金额"></el-table-column>
      <el-table-column prop="applyPayDate" label="实际还款日"></el-table-column>
      <el-table-column prop="operator" label="操作人"></el-table-column>
      <el-table-column prop="operation" label="操作动作"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>

  </div>
</template>

<script>

  import {oprLogs} from '@/api/carLoadAfterApi'

  export default {
    data() {
      return {
        tableDataTop:[],
        detailList:"",
        serialNo2:"",
      }
    },

    created() {
      this.serialNo2 = JSON.parse(sessionStorage.publicInitialData)[1];//合同编号
      this.getDetail();
    },

    methods: {

      getDetail() {
        let param = {
          amraId:this.serialNo2
        };

        oprLogs(param).then(response => {
          //console.log(response.data)
        	if (response.data.code === "00000") {
            this.tableDataTop= response.data.list;
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

