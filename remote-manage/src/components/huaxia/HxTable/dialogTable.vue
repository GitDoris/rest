<template>
  <div class="form-label" v-show="dialogTableParam.formCells && dialogTableParam.formCells.length > 0">

    <el-dialog :width="dialogTableParam.dialogWidth?dialogTableParam.dialogWidth:'50%'"
               :title="dialogTableParam.title" :visible.sync="dialogFormVisible" center @close="dialogClose">

      <el-form :model="formParam" ref="form" :rules="formRules"
               :label-width="dialogTableParam.labelWidth ? dialogTableParam.labelWidth : '8em'">
        <el-row :gutter="0">
          <el-col
            v-for="(queryPara,index) in dialogTableParam.formCells" :key="index"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="queryPara.size === 'large' || dialogTableParam.size==='small' ? 24 : 12"
            :xl="queryPara.size === 'large' || dialogTableParam.size==='small'  ? 24 : 12"
            style="margin-bottom: 10px"
            v-if="!queryPara.hidden"
          >
            <el-row :gutter="0" v-if="queryPara.children && queryPara.children.length > 0">
              <el-form-item :label="queryPara.lable ? queryPara.lable : queryPara.children[0].lable" size="small"
                            :required="queryPara.required">
                <el-col v-for="(qc,si) in queryPara.children" :key="si" :span="qc.span">
                  <div v-if="qc.type === 'slot'" style="text-align: center">
                    {{qc.html ? qc.html : "&nbsp;"}}
                  </div>
                  <el-form-item
                    v-else
                    :prop="qc.column" size="small" style="margin-bottom: 0">
                    <el-input name="qc.column"
                              v-if="qc.type==='equals'"
                              :placeholder="qc.lable"
                              v-model="formParam[qc.column]"
                              :disabled="qc.disabled"
                              :style="`width: 100%`"
                              @blur="inputBlur(formParam[qc.column], qc.column)"
                              :clearable="!qc.disabled">
                    </el-input>
                    <el-select name="qc.column"
                               v-else-if="qc.type==='select'"
                               v-model="formParam[qc.column]"
                               :clearable="!qc.disabled"
                               :disabled="qc.disabled"
                               :placeholder="'请选择'"
                               @change="selectChange(formParam[qc.column], qc.column)"
                               :style="`width: 100%`">
                      <el-option
                        v-for="optionList in qc.options"
                        :key="optionList.value"
                        :label="optionList.label"
                        :value="queryPara.key&&queryPara.value ? optionList : optionList.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row v-else>
              <el-form-item :label="queryPara.lable" size="small"
                            :prop="queryPara.column">
                <el-input name="queryPara.column"
                          v-if="queryPara.type==='equals'"
                          :placeholder="queryPara.lable"
                          v-model="formParam[queryPara.column]"
                          :disabled="queryPara.disabled"
                          :style="`width: 100%`"
                          @blur="inputBlur(formParam[queryPara.column], queryPara.column)"
                          :clearable="!queryPara.disabled">
                </el-input>

                <el-select name="queryPara.column"
                           v-else-if="queryPara.type==='select'"
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


                <!-- 日期控件-->
                <el-date-picker name="queryPara.column"
                                v-else-if="queryPara.type==='datePicker'"
                                v-model="formParam[queryPara.column]"
                                :disabled="queryPara.disabled"
                                type="date"
                                :picker-options="pickerOptions"
                                :placeholder="'请选择'"
                                value-format="yyyy-MM-dd"
                                :clearable="!queryPara.disabled"
                                :style="`width: 100%`">
                </el-date-picker>

                <!-- 日期时间控件-->
                <el-date-picker name="queryPara.column"
                                v-else-if="queryPara.type==='dateTimePicker'"
                                v-model="formParam[queryPara.column]"
                                type="datetime"
                                :disabled="queryPara.disabled"
                                :placeholder="'请选择'"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions"
                                :clearable="!queryPara.disabled"
                                align="right" :style="`width: 100%`">
                </el-date-picker>

                <!-- 时间控件-->
                <el-time-picker name="queryPara.column"
                                v-else-if="queryPara.type==='timePicker'"
                                v-model="formParam[queryPara.column]"
                                :placeholder="'请选择'"
                                :disabled="queryPara.disabled"
                                :picker-options="pickerOptions"
                                value-format="HH:mm:ss"
                                :clearable="!queryPara.disabled"
                                :style="`width: 100%`">
                </el-time-picker>

                <el-input
                  type="textarea"
                  v-else-if="queryPara.type==='textarea'"
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')" v-if="!dialogTableParam.isNotice">确 定</el-button>
        <slot name="viewNoticeButton" v-if="dialogTableParam.isNotice"></slot>
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
          if (val.type === "new") {
            this.formParam.validStartTime = (new Date()).toFormat("YYYY-MM-DD ") + "00:00:01"
          }
          // 赋值原始值
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
        dateTimePicker: "",
        pickerOptions:{
          disabledDate(time) {
            let timeSpace = time.getTime() < Date.now()
            return timeSpace;

          }
        }
      };
    },
    created() {

    },
    methods: {
      //清除表单
      clearFiled(formCell) {
        //针对产品线 产品类型做特殊处理,选择全部的时候不清空
        if (formCell === "businessType" && this.formParam[formCell] === '99999') {
          return
        }
        this.formParam[formCell] = ""
      },
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
        if (this.dialogTableParam.type === 'view') {
          this.dialogFormVisible = false
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*当选择全部时，99999转空*/
            for (let i in this.formParam) {
              if (this.formParam[i] === "99999") {
                this.formParam[i] = ""
              }
            }
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
