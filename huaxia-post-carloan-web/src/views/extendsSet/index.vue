<template>
  <div class="wrap">
    <div class="main-wrap">
      <h2>展期设置</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="合同号" prop="contractId">
          <el-input v-model="ruleForm.contractId"></el-input>
        </el-form-item>
        <el-form-item label="展期金额" prop="extendAmount">
          <el-input v-model.number="ruleForm.extendAmount"></el-input>
        </el-form-item>
        <el-form-item label="应补差额" prop="payDiffAmount">
          <el-input v-model.number="ruleForm.payDiffAmount"></el-input>
        </el-form-item>
        <el-form-item label="展期手续费率（小数）" prop="extendRate">
          <el-input v-model="ruleForm.extendRate"></el-input>
        </el-form-item>
        <el-form-item label="展期手续费" prop="extendServiceAmount">
          <el-input v-model.number="ruleForm.extendServiceAmount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { exSubmit } from "@/api/carLoadAfterApi";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("不能为空"));
      // }
      setTimeout(() => {
        let reg = /^[0-9]*\.[0-9]*$/;
        if (!reg.test(value)) {
          callback(new Error("只能输入小数"));
        } else if (value >= 1) {
          callback(new Error("不得大于1"));
        } else {
          callback();
        }
      }, 100);
    };
    var checkNumber = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("不能为空！"));
      // }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字!"));
        } else {
          callback();
        }
      }, 100);
    };
    var checkPayDiffAmount = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字!"));
        } else if (value<0) {
          return callback(new Error("应补差额不能小于0！"));
      }else {
          callback();
        }
      }, 100);
    };
    var checkextendAmount = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字!"));
        } else if (value<100) {
          return callback(new Error("展期金额不能小于100！"));
      }else {
          callback();
        }
      }, 100);
    };
    return {
      ruleForm: {
        contractId: "",
        extendAmount: "",
        payDiffAmount: "",
        extendRate: "",
        extendServiceAmount: ""
      },
      rules: {
        contractId: [
          { required: true, message: "请输入合同号", trigger: "blur" }
        ],
        extendAmount: [
          { required: true, message: "请输入展期金额", trigger: "blur" },
          { validator: checkextendAmount, trigger: "blur" }
        ],
        payDiffAmount: [
          { required: true, message: "请输入应补差额", trigger: "blur" },
          { validator: checkPayDiffAmount, trigger: "blur" }
        ],
        extendRate: [
          { required: true, message: "请输入展期手续费率", trigger: "blur" },
          { validator: checkAge, trigger: "blur" }
        ],
        extendServiceAmount: [
          { required: true, message: "请输入展期手续费", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          exSubmit(this.ruleForm).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                message: "提交成功",
                type: "success"
              });
            } else {
              this.$message.error(response.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.wrap {
  padding: 35px 45px 45px;
}
.main-wrap {
  width: 100%;
}

.main-wrap h2 {
  border-left: 2px solid rgb(39, 161, 99);
  line-height: 36px;
  background-color: rgb(246, 248, 249);
  padding-left: 10px;
  color: rgb(51, 51, 51);
  font-size: 14px;
  margin-bottom: 20px;
}
.main-wrap .el-form {
  width: 550px;
  padding-left: 50px;
}
.main-wrap .el-form .el-form-item {
  margin-bottom: 30px;
}

.main-wrap .el-form .el-form-item input[type="number"] {
  -moz-appearance: textfield;
}
.main-wrap
  .el-form
  .el-form-item
  input[type="number"]::-webkit-inner-spin-button,
.main-wrap
  .el-form
  .el-form-item
  input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

