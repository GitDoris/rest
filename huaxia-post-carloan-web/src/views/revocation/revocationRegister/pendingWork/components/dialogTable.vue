<template>
  <el-form class="form-label" :model="formParam" ref="form" :rules="formRules"
           :label-width="dialogTableParam.labelWidth">
    <el-row :gutter="0">
      <el-col
        v-for="(queryPara,index) in dialogTableParam.formCells" :key="index"
        style="margin-bottom: 10px"
      >
        <el-row>
          <el-form-item :label="queryPara.lable" size="small"
                        :prop="queryPara.column">
            <el-input name="queryPara.column"
                      v-if="queryPara.type=='equals'"
                      :placeholder="queryPara.lable"
                      v-model="formParam[queryPara.column]"
                      :style="`width: 100%`"
                      :disabled="queryPara.disabled"
                      :clearable="!queryPara.disabled">
            </el-input>

            <el-select name="queryPara.column"
                       @change="selectChange(formParam[queryPara.column], queryPara.column)"
                       v-else-if="queryPara.type=='select'"
                       v-model="formParam[queryPara.column]"
                       :clearable="!queryPara.disabled"
                       :disabled="queryPara.disabled"
                       :placeholder="'请选择'"
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
              :autosize="{ minRows: 2, maxRows: 4}"
              :placeholder="queryPara.lable"
              :style="`width: 100%`"
              v-model="formParam[queryPara.column]"
              :clearable="!queryPara.disabled">
            </el-input>
            <area-selector @change="changeRegion" v-else-if="queryPara.column=='trailerRegion'"
                           :isShowMore="false">
            </area-selector>
          </el-form-item>
        </el-row>
      </el-col>
    </el-row>
    <slot name="Upload">
    </slot>
    <el-button type="primary" @click="submitForm" style="margin: 0 auto;display: block">确 定</el-button>
  </el-form>
</template>

<script>
  import areaSelector from '@/components/huaxia/HxTable/area-selector'

  export default {
    props: {
      dialogTableParams: {},
      type:Number
    },
    components: {
      areaSelector
    },
    data() {
      return {
        formParam: {},
        dialogTableParam: this.$props.dialogTableParams,
      };
    },

    watch: {
      dialogTableParams: {
        handler: function (val) {
          this.dialogTableParam = val
          // 赋值原始值
          this.formParam = this.filterData('params')
        },
        deep: true
      },
    },
    methods: {
      changeRegion(address) {
        if(address){
          this.formParam.trailerRegion = address.areaText
        }
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
      //提交表单
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('dialogFormParam', this.type, this.formParam)
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
  };
</script>

<style>
  .el-dialog__body .el-form-item__label {
    color: #000;
  }
</style>
