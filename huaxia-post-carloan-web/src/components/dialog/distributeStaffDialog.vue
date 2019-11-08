<!--
 分配催收员弹出框
 @author wsx
 @date 2018-03-29
-->

<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="430px"
      center>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8">
          <div>当前待分配数量：<em style='color: blue'>{{ selections.length }}</em>&nbsp;件</div>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="分配到组" name="first" :disabled="true">
          <el-form :model="distribute2GroupForm" ref="distribute2GroupForm" label-width="5em" class="demo-dynamic">
            <el-form-item
              prop="groupCode"
              style="margin-bottom:20px"
              label="组别" class="formitem label">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in selectData.groups"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="分配到人" name="second">
          <el-form :model="distribute2StaffForm" ref="distribute2StaffForm" label-width="5em" class="demo-dynamic">
            <el-form-item
              v-for="(staff, index) in distribute2StaffForm.staffs"
              label="催收员" class="formitem label"
              :key="staff.value.value"
              :prop="'staffs.' + index + '.value.value'"
              style="margin-bottom:20px"
              :rules="{required: true, message: '请选择催收员', trigger: 'change'}"
            >
              <el-select v-model="staff.value" placeholder="请选择">
                <el-option
                  v-for="item in selectData.staffs"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-button v-show="distribute2StaffForm.staffs.length>1" @click.prevent="removeStaff(staff)">删除
              </el-button>
            </el-form-item>

          </el-form>
          <el-button @click="addStaff">添加</el-button>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doConfirmEvent('distribute2StaffForm')">提交</el-button>
        <el-button @click="resetForm('distribute2StaffForm')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      userList: {
        type: Array
      },
      selections: {
        type: Array
      },
      lable:""
    },
    data: function () {
      return {
        value: "",
        distribute2GroupForm: {
          groupCode: '',
          groupName: ''
        },
        distribute2StaffForm: {
          staffs: [{
            value: {},
          }]
        },
        dialogVisible: false,
        dialogTitle: "分配" + this.$props.lable,
        activeName: 'second',
        selectData: {"groups": [{value: "", label: ""}], "staffs": this.$props.userList,},
      };
    },
    created() {
    },
    methods: {
      doConfirmEvent() {
        this.$refs['distribute2StaffForm'].validate((valid) => {
          if (valid) {
            var result = this.distribute2StaffForm.staffs;
            let staffNoes = [],
              staffNames = [],
              collectorData = {}
            for (let i in result) {
              staffNoes.push(result[i].value.value)
              staffNames.push(result[i].value.label)
            }
            collectorData.staffNoes = staffNoes.join(",")
            collectorData.staffNames = staffNames.join(",")
            this.allotCollector(collectorData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.distribute2StaffForm.staffs = [{
          value: {},
        }]
      },
      removeStaff(item) {
        var index = this.distribute2StaffForm.staffs.indexOf(item)
        if (index !== -1) {
          this.distribute2StaffForm.staffs.splice(index, 1)
        }
      },
      addStaff() {
        this.distribute2StaffForm.staffs.push({
          value: {},
        });
      },
      handleTabClick(tab, event) {
        console.log(tab, event);
      },

      /*分配催收员*/
      allotCollector(param) {
        this.$emit("doConfirmEvent", param);
        this.distribute2StaffForm.staffs = [{
          value: {},
        }]
        this.dialogVisible = false;
      },
    }
  }
</script>

<style>
  .formitem label {
    color: black !important;
  }

  .el-form-item {
    margin-bottom: 20px;
  }
</style>
