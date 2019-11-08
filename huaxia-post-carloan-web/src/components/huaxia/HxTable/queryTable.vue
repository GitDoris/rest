<template>
  <div class="box box-body">
    <div class="form-label">
      <el-form ref="form" :inline="true">
        <span v-for="(queryPara,index) in queryTable.queryParas" :key="index"
              v-show="index<=3? true : !toHiddle">
          <el-form-item v-if="queryPara.children && queryPara.children.length > 0" :label="queryPara.lable"
                        size="small" :label-width="'8em'">
              <span v-for="(qc,si) in queryPara.children" :key="si">
                <el-input name="qc.column"
                          v-if="qc.type=='equals'"
                          :placeholder="qc.lable"
                          v-model="qc.queryValue"
                          :disabled="qc.disabled"
                          :style="`width: 95px;margin-left:10px`"
                          clearable>
                </el-input>

                <el-select name="qc.column"
                           v-else-if="qc.type=='select'"
                           v-model="qc.queryValue" clearable
                           :disabled="qc.disabled"
                           placeholder="请选择"
                           @change="selectChange(qc.queryValue, qc.column)"
                           :style="`width: 95px`">
                  <el-option
                    v-for="optionList in qc.options"
                    :key="optionList.value"
                    :label="optionList.label"
                    :value="queryPara.key&&queryPara.value ? optionList : optionList.value">
                  </el-option>
                </el-select>
                <el-date-picker name="qc.column"
                          v-else-if="qc.type=='dateTimePicker'"
                          v-model="qc.queryValue" clearable
                          type="datetime"
                          :placeholder="qc.lable"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          align="right" :style="`width: 190px;`">
                </el-date-picker>
                 <el-date-picker
                    v-model="qc.queryValue"
                    v-else-if="qc.type=='daterange'"
                    type="daterange"
                    size="mini"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <!--<div v-if="qc.type === 'slot'" style="padding: 0 8px 0 5px;display: inline-block;color: #dcdfe6;">-->
                      <!--{{qc.html ? qc.html : ""}}-->
                    <!--</div>-->
              </span>
          </el-form-item>
          <el-form-item v-else :label="queryPara.lable" size="small" :label-width="'8em'">
          <el-input name="queryPara.column"
                    v-if="queryPara.type=='equals'"
                    :placeholder="queryPara.lable"
                    v-model="queryPara.queryValue"
                    :style="`width: 200px;`"
                    clearable>
          </el-input>

          <el-select name="queryPara.column"
                     v-else-if="queryPara.type=='select'"
                     v-model="queryPara.queryValue" clearable
                     placeholder="请选择"
                     @change="selectChange(queryPara.queryValue, queryPara.column)"
                     :style="`width: 200px;`">
            <el-option
              v-for="optionList in queryPara.options"
              :key="optionList.value"
              :label="optionList.label"
              :value="optionList.value">
            </el-option>
          </el-select>


            <!-- 日期控件-->
          <el-date-picker name="queryPara.column"
                          v-else-if="queryPara.type=='datePicker'"
                          v-model="queryPara.queryValue"
                          type="date"
                          :placeholder="queryPara.lable"
                          value-format="yyyy-MM-dd"
                          :style="`width: 200px;`">
          </el-date-picker>

            <!-- 日期时间控件-->
          <el-date-picker name="queryPara.column"
                          v-else-if="queryPara.type=='dateTimePicker'"
                          v-model="queryPara.queryValue"
                          type="datetime"
                          :placeholder="queryPara.lable"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          align="right" :style="`width: 200px;`">
          </el-date-picker>

            <!-- 时间控件-->
          <el-time-picker name="queryPara.column"
                          v-else-if="queryPara.type=='timePicker'"
                          v-model="queryPara.queryValue"
                          :placeholder="queryPara.lable"
                          value-format="HH:mm:ss"
                          :style="`width: 200px;`">
          </el-time-picker>
           <!-- 日期范围控件-->
           <el-date-picker
                    v-model="queryPara.queryValue"
                    v-else-if="queryPara.type=='daterange'"
                    type="daterange"
                    size="mini"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>

          <el-input v-else name="queryPara.column"
                    :placeholder="queryPara.lable"
                    v-model="queryPara.queryValue"
                    :style="`width: 200px;`"
                    clearable>
          </el-input>
        </el-form-item>
        </span>
        <div class="float_btn" style="float: right; padding-right: 50px">
          <el-button type="text"
                     v-show="queryTable.queryParas.length > 4"
                     :icon="toHiddle ? `el-icon-arrow-down` : `el-icon-arrow-up`"
                     @click="toShowQueryCol()">
            {{toHiddle ? "更多选项" : "收起"}}
          </el-button>
          <el-button type="primary" size="mini" @click="search()">
            搜索
          </el-button>
         <el-button type="primary" size="mini" @click="matchSave()" v-show="tableParam.isShoweds.isBtnShow">
            匹配保存
          </el-button>
          <el-button type="text" @click="reSet()">
            重置
          </el-button>
        </div>
        <br style="clear: both">
      </el-form>


      <el-dialog
        title="提示"
        :visible.sync="dialogWarning"
        width="30%"
        :center='true'
        :before-close="dialogConfirm"
        :modal-append-to-body="false">
        <span style="text-align:center;display:block;">请输入搜索条件!!!</span>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep'

    export default {

        props: {
            queryTables: {},
            tableItems: {}
        },

        data: function() {
            return {
                tableParam: this.$props.tableItems,
                toHiddle: true,
                dialogWarning: false,
                queryTable: this.$props.queryTables,
                queryTable2: []
            };
        },
        created() {
            this.queryTable2 = cloneDeep(this.queryTable)
        },
        methods: {
            selectChange(value, currLabel) {
                this.$emit('selectChange', value, currLabel)
            },
            toShowQueryCol: function() {
                this.toHiddle = !this.toHiddle
                    //        if (this.toHiddle) {
                    //          this.toHiddle = false;
                    //        } else {
                    //          this.toHiddle = true;
                    //        }
            },
            dialogConfirm: function() {
                this.dialogWarning = false;
            },
            reSet: function() {
                this.queryTable = cloneDeep(this.queryTable2)
                this.$emit("reSet-click", "reSet", "reSet");
            },
            matchSave: function() {
                //alert("匹配保存");
                this.queryTable = cloneDeep(this.queryTable2)
                this.$emit("matchSave-click", "matchSave", "matchSave");
            },
            search: function() {
                for (var i = 0; i < this.queryTable.queryParas.length; i++) {
                    //console.log(this.queryTable.queryParas[i].queryValue)//datepicker时间不回填
                    // if (this.queryTable.queryParas[i].queryValue == null || typeof(this.queryTable.queryParas[i].queryValue) == undefined) {
                    //   this.queryTable.queryParas[i].queryValue = "";
                    // }
                    if (this.queryTable.queryParas[i].children) {
                        for (let j in this.queryTable.queryParas[i].children) {
                            let children = this.queryTable.queryParas[i].children[j]
                            if (children.queryValue == null || typeof(children.queryValue) == undefined || children.queryValue === "") {
                                children.queryValue = "";
                            }
                        }
                    }
                    //this.queryTable.queryParas[i].queryValue = this.queryTable.queryParas[i].queryValue.trim();
                    if (this.queryTable.queryParas[i].queryValue != undefined || this.queryTable.queryParas[i].queryValue=='') {
                        if(this.queryTable.queryParas[i].type=='daterange'){
                            // console.log('daterange',this.queryTable.queryParas[i].queryValue);
                            // this.queryTable.queryParas[i].queryValue
                        }
                        else this.queryTable.queryParas[i].queryValue = this.queryTable.queryParas[i].queryValue.trim();
                    }
                }
                var flag = false;
                for (var i = 0; i < this.queryTable.queryParas.length; i++) {
                    if (this.queryTable.queryParas[i].queryValue == null || typeof(this.queryTable.queryParas[i].queryValue) == undefined || this.queryTable.queryParas[i].queryValue === "") {
                        if (this.queryTable.queryParas[i].children != undefined) {
                            for (let j in this.queryTable.queryParas[i].children) {
                                let children = this.queryTable.queryParas[i].children[j]
                                if (children.queryValue == null || typeof(children.queryValue) == undefined || children.queryValue === "") {
                                    continue;
                                } else {
                                    flag = true;
                                    break;
                                }
                            }
                        } else {
                            continue
                        }
                    } else {
                        flag = true;
                        break;
                    }
                }

                if (flag) {
                    for (var i = 0; i < this.queryTable.queryParas.length; i++) {
                        if (this.queryTable.queryParas[i].children != undefined) {
                            for (let j in this.queryTable.queryParas[i].children) {
                                let children = this.queryTable.queryParas[i].children[j]
                                this.queryTable.param[children.column] = children.queryValue
                            }
                        }
                        this.$set(this.queryTable.param, this.queryTable.queryParas[i].column, this.queryTable.queryParas[i].queryValue)
                    }
                    // console.log(this.queryTable.param)
                    let obj = this.queryTable.param;
                    for (let qq in obj) {
                        //console.log(obj[qq])
                        if (obj[qq] == "") {
                            delete obj[qq];
                        }
                    }
                    // console.log(obj)
                    this.$emit("search-click", "search", obj);
                    // this.$emit("search-click", "search", this.queryTable.param);
                } else {
                    this.dialogWarning = true;
                }
            }
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
</style>