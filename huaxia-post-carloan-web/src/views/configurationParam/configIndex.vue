<!--对公还款-对公录入-待处理任务-->
<template>
    <div class="wrap">
        <el-button slot="button-content" type="primary" size="mini" @click="dialogVisible = true">保存</el-button>
        <div class="main-warp">
            <h2>银行限额列表</h2>
            <div style="overflow:hidden;padding:0 20px;">
            
              <ul class="bank_list" style="margin-right:100px">
                <li v-for="item in tableData1" :key="item.bankCode">
                  <div style="width:114px;text-align:right;">{{item.bankName}}</div>
                  <div style="margin-right:5px;color:#999">单笔限额：</div>
                  <el-input placeholder="请输入金额" v-model="item.singleLimit" @change="limitTest(item)">
                    <template slot="append">元</template>
                  </el-input>
                  <div style="margin-right:5px;margin-left:20px;color:#999">单日限额：</div>
                  <el-input placeholder="请输入金额" v-model="item.dayLimit"  @change="limitTest(item)">
                    <template slot="append">元</template>
                  </el-input>
                </li>
              </ul>
              <ul class="bank_list" style="">
                <li v-for="item in tableData2" :key="item.bankCode">
                  <div style="width:114px;text-align:right;">{{item.bankName}}</div>
                  <div style="margin-right:5px;color:#999">单笔限额：</div>
                  <el-input placeholder="请输入金额" v-model="item.singleLimit"  @change="limitTest(item) ">
                    <template slot="append">元</template>
                  </el-input>
                  <div style="margin-right:5px;margin-left:20px;color:#999">单日限额：</div>
                  <el-input placeholder="请输入金额" v-model="item.dayLimit"  @change="limitTest(item)">
                    <template slot="append">元</template>
                  </el-input>
                </li>
              </ul>
            
          </div>
        </div>


          <el-dialog title="保存" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
              <span>是否确认保存？</span>
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveData">确 定</el-button>
            </span>
          </el-dialog>

</div>
</template>

<script>
import { bankLimit, updateBankLimit } from "@/api/carLoadAfterApi";
import { fmoney } from "@/filters";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      tableData1: [],
      tableData2: []
    };
  },

  created() {
    this.getSearch();
  },
  mounted() {},

  methods: {
    getSearch() {
      this.tableData=[]
      this.tableData1=[]
      this.tableData2=[]
      bankLimit().then(response => {
        //alert("搜索");
        //console.log(response.data)
        if (response.data.code === "00000") {
          if (response.data.list) {
            this.tableData = response.data.list;
             this.tableData1=[]
      this.tableData2=[]
            //for (var i = 0; i < this.tableData.length; i++) {
              //var item = this.tableData[i];
               //if(item.singleLimit>0) item.singleLimit=fmoney(item.singleLimit)
              // if(item.dayLimit>0) item.dayLimit=fmoney(item.dayLimit)
              
            //}
       // console.log(this.tableData)

            for (var i = 0; i < this.tableData.length / 2; i++) {
              var item = this.tableData[i];
              this.tableData1.push(item);
            }
            for (var i = this.tableData1.length;i < this.tableData.length;i++) {
              var item = this.tableData[i];
              this.tableData2.push(item);
            }
            //console.log('this.tableData',this.tableData)
            //console.log('this.tableData1',this.tableData1)
          } else {
            this.tableData = [];
            this.tableData1 = [];
            this.tableData2 = [];
          }
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    handleClose(done) {
      done();
    },
    saveData() {
      let param = {
        bankLimitList: this.tableData1.concat(this.tableData2)
      };
     // console.log("param", param);
      updateBankLimit(param).then(response => {
        if (response.data.code === "00000") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.dialogVisible = false;
          this.getSearch();
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    limitTest(item) {
      //console.log("Limit", item);//^[0-9]+(.[0-9]{1,2})?$
      let reg = /^[1-9]\d{0,9}(\.\d{1,2})?$/;
      if (!reg.test(item.singleLimit)) {
        this.$message({
          message: "输入金额格式错误~",
          type: "warning"
        });
        item.singleLimit = 0;
        //row.singleLimit = 0;
        //this.$set(row, "money", 0)
      }
      if (!reg.test(item.dayLimit)) {
        this.$message({
          message: "输入金额格式错误~",
          type: "warning"
        });
        item.dayLimit = 0;
        //row.singleLimit = 0;
        //this.$set(row, "money", 0)
      }
      //console.log(row.money);
      // if (!reg.test(row.money2)) {
      //   this.$message({
      //     message: "输入金额格式错误~",
      //     type: "warning"
      //   });
      //   row.dayLimit = 0;
      // }
    },
    fmoney(s, n) {
      if (s == "" || s == undefined || s == null) {
        return "--";
      } else {
        //console.log(typeof(s))
        let oStart = s.toString().substr(0, 1);
        if (oStart == "-") {
          s = s.toString().substr(1, s.length);
        }
        //n = n > 0 && n <= 2 ? n : 2;
        n = 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, ""));//.toFixed(n) + ""
        let l = s
            .split(".")[0]
            .split("")
            .reverse(),
          r = s.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        if (oStart == "-") {
          return (
            oStart +
            t
              .split("")
              .reverse()
              .join("") +
            "." +
            r
          );
        } else {
          return (
            t
              .split("")
              .reverse()
              .join("") +
            "." +
            r
          );
        }
      }
    }
  },
  filters: {
    
  },
  components: {}
};
</script>
<style>
.wrap {
  padding: 35px 45px 45px;
}

.el-button {
  margin-left: 10px;
  margin-bottom: 20px;
}

.main-warp {
  width: 100%;
}

.main-warp h2 {
  border-left: 2px solid rgb(39, 161, 99);
  line-height: 36px;
  background-color: rgb(246, 248, 249);
  padding-left: 10px;
  color: rgb(51, 51, 51);
  font-size: 14px;
  margin-bottom: 20px;
}
.bank_list {
  line-height: 40px;
  float: left;
  width: 670px;
}
.bank_list li {
  border-bottom: 1px solid #e4e4e4;
  overflow: hidden;
  display: inline-block;
  padding-bottom: 20px;
}
.bank_list li > div {
  float: left;
  margin-right: 20px;
}
.bank_list li .el-input {
  width: 180px;
  margin-right: 0;
}
.bank_list li .el-input input {
  text-align: right;
  padding: 0 10px;
}
</style>