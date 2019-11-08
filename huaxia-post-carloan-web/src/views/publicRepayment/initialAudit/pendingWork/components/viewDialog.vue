<template>
  <div class="form-label" v-show="dialogTableParam.formCells && dialogTableParam.formCells.length > 0">

    <el-dialog width="500px"
               :title="dialogTableParam.title" :visible.sync="dialogFormVisible" center @close="dialogClose">

      <el-form :model="formParam" ref="form" :rules="formRules"
               :label-width="dialogTableParam.labelWidth ? dialogTableParam.labelWidth : '8em'">
        <el-row :gutter="0">
          <el-col
            v-for="(queryPara,index) in dialogTableParam.formCells" :key="index"
            style="margin-bottom: 10px"
            v-if="!queryPara.hidden"
          >
            <el-row>
              <el-form-item :label="queryPara.lable" size="small"
                            :prop="queryPara.column">
                <el-input name="queryPara.column"
                          v-if="queryPara.type=='equals'"
                          :placeholder="queryPara.lable"
                          v-model="formParam[queryPara.column]"
                          :disabled="queryPara.disabled"
                          :style="`width: 100%`"
                          :clearable="!queryPara.disabled">
                </el-input>

                <el-select name="queryPara.column"
                           v-else-if="queryPara.type=='select'"
                           v-model="formParam[queryPara.column]"
                           :clearable="!queryPara.disabled"
                           :disabled="queryPara.disabled"
                           :placeholder="'请选择'"
                           @change="selectChange(formParam[queryPara.column], queryPara.column)"
                           :style="`width: 100%`">
                  <el-option
                    v-for="optionList in queryPara.options"
                    :key="optionList.value"
                    :label="optionList.label"
                    :value="queryPara.key&&queryPara.value ? optionList : optionList.value">
                  </el-option>
                </el-select>

                <el-input
                  type="textarea"
                  v-else-if="queryPara.type=='textarea'"
                  :disabled="queryPara.disabled"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :placeholder="queryPara.lable"
                  :style="`width: 100%`"
                  @blur="inputBlur(formParam[queryPara.column], queryPara.column)"
                  v-model="formParam[queryPara.column]"
                  :clearable="!queryPara.disabled">
                </el-input>

                <el-input v-else name="queryPara.column"
                          :disabled="queryPara.disabled"
                          :placeholder="queryPara.lable"
                          v-model="formParam[queryPara.column]"
                          @blur="inputBlur(formParam[queryPara.column], qc.column)"
                          :style="`width: 100%`"
                          :clearable="!queryPara.disabled">
                </el-input>

              </el-form-item>
            </el-row>
          </el-col>
        </el-row>

      </el-form>
      <slot v-if="dialogTableParam.type !== '3'" name="Upload">
      </slot>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')" v-if="!dialogTableParam.isNotice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialogTableParams: {}
    },

    watch: {
      dialogTableParams: {
        handler: function (val) {
          this.dialogTableParam = val
          this.formParam = this.filterData('params')
        },
        deep: true
      },
    },

    data() {
      return {
        dialogFormVisible: false,
        dialogTableParam: this.$props.dialogTableParams,
        formParam: {},
      };
    },
    created() {

    },
    methods: {
      //弹框中的select变化
      selectChange(value, currLabel) {
        let formCells = this.dialogTableParam.formCells || []
        for (let i in formCells) {
          if (formCells[i].column === currLabel && formCells[i].key && formCells[i].value) {
            this.formParam[formCells[i].key] = value.value
            this.formParam[formCells[i].value] = value.label
          }
        }
        this.$emit('selectChange', value, currLabel)
      },
      //输入框中的select变化
      inputBlur(value, currLabel) {
        this.$emit('selectChange', value, currLabel)
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('dialogFormParam', this.dialogTableParam.type, this.formParam)
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //弹窗关闭
      dialogClose() {
        this.resetForm('form')
        this.formParam = {}
        this.dialogTableParam = {}
        this.$emit('resetDialog')
      },

      //格式化数据，type=rule 格式化校验规则，type=params 格式化数据
      filterData(type) {
        let formCells = this.dialogTableParam.formCells || []
        let rules = {}, params = {}
        for (let i = 0; i < formCells.length; i++) {
          if (type === 'rule') {
            rules[formCells[i].column] = formCells[i].rules || []
            if (formCells[i].children && formCells[i].children.length > 0) {
              let fc = formCells[i].children
              for (let si = 0; si < fc.length; si++) {
                if (fc[si].column) {
                  rules[fc[si].column] = fc[si].rules || []
                }
              }
            }
          } else if (type === 'params') {
            if (this.formParam[formCells[i].column] === "" || this.formParam[formCells[i].column] === undefined) {
              params[formCells[i].column] = formCells[i].defaultValue || ""
            } else {
              params[formCells[i].column] = this.formParam[formCells[i].column]
            }
            if (formCells[i].children && formCells[i].children.length > 0) {
              let fc = formCells[i].children
              for (let si = 0; si < fc.length; si++) {
                if (this.formParam[fc[si].column] === "" || this.formParam[fc[si].column] === undefined) {
                  params[fc[si].column] = fc[si].defaultValue || ""
                } else {
                  params[fc[si].column] = this.formParam[fc[si].column]
                }
              }
            }


          }

        }
        return type === 'rule' ? rules : params
      }
    },
    computed: {
      formRules() {
        return this.filterData('rule')
      },
    }

  }


</script>
<style>
  .form-label {
    margin-bottom: 15px;
  }

  .form-label label {
    padding: 0 1em;
  }

  .form-label .el-dialog__body .el-form, .el-dialog__body .el-form-item__label {
    color: #000;
  }

</style>
