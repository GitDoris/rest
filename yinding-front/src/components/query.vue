<template>
  <div class="box box-body">
    <div class="queryInfo" v-if="queryInfo.isVisible">
      <ul>
        <li v-for="(item,index) in queryInfo.infoLabel" :key="index">
          <span>{{item.label}}</span>
          <span>{{queryInfo.infoData[index][item.code]}}</span>
        </li>
      </ul>
    </div>
    <div class="form-label">
      <transition name="el-zoom-in-top">
        <el-form ref="form" :inline="true" v-show="isShow">
        <span v-for="(queryPara,index) in queryTable.queryParas" :key="index"
              v-show="index<=3? true : !toHiddle">
          <el-form-item v-if="queryPara.children && queryPara.children.length > 0" :label="queryPara.label"
                        size="small">
              <span v-for="(qc,si) in queryPara.children" :key="si"> 
                <el-input name="qc.column"
                          v-if="qc.type==='equals'"
                          :placeholder="qc.label"
                          v-model="qc.queryValue"
                          :disabled="qc.disabled"
                          @keyup.enter.native="isEnter($event)"
                          :style="`width: 95px;margin-left:10px`"
                          clearable>
                </el-input>

                <el-select name="qc.column"
                           v-else-if="qc.type==='select'"
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
                                v-else-if="qc.type==='dateTimePicker'"
                                v-model="qc.queryValue" clearable
                                type="datetime"
                                :placeholder="qc.label"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right" :style="`width: 190px;`">
                </el-date-picker>
                <el-date-picker name="qc.column"
                                v-else-if="qc.type==='month'"
                                v-model="qc.queryValue" clearable
                                type="month"
                                :placeholder="qc.label"
                                value-format="yyyy-MM"
                                align="right" :style="`width: 190px;`">
                </el-date-picker>
              </span>
          </el-form-item>
          <el-form-item v-else :label="queryPara.label" size="small" >
          <el-input name="queryPara.column"
                    v-if="queryPara.type==='equals'"
                    :placeholder="queryPara.label"
                    v-model="queryPara.queryValue"
                    @keyup.enter.native="isEnter($event)"
                    :style="`width: 200px;`"
                    clearable>
          </el-input>
          <el-select name="queryPara.column"
                     v-else-if="queryPara.type==='select'"
                     v-model="queryPara.queryValue" clearable
                     :placeholder="queryPara.placeholder?queryPara.placeholder:'请选择'"
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
                          v-else-if="queryPara.type==='datePicker'"
                          v-model="queryPara.queryValue"
                          type="date"
                          :placeholder="queryPara.label"
                          value-format="yyyy-MM-dd"
                          :style="`width: 200px;`">
          </el-date-picker>

            <!-- 日期时间控件-->
          <el-date-picker name="queryPara.column"
                          v-else-if="queryPara.type==='dateTimePicker'"
                          v-model="queryPara.queryValue"
                          type="datetime"
                          :placeholder="queryPara.label"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          align="right" :style="`width: 200px;`">
          </el-date-picker>
            <!-- 日期时间控件-->
          <el-date-picker name="queryPara.column"
                          v-else-if="queryPara.type==='month'"
                          v-model="queryPara.queryValue"
                          type="month"
                          :placeholder="queryPara.label"
                          value-format="yyyy-MM"
                          align="right" :style="`width: 200px;`">
          </el-date-picker>

            <!-- 时间控件-->
          <el-time-picker name="queryPara.column"
                          v-else-if="queryPara.type==='timePicker'"
                          v-model="queryPara.queryValue"
                          :placeholder="queryPara.label"
                          value-format="HH:mm:ss"
                          :style="`width: 200px;`">
          </el-time-picker>

          <el-input v-else name="queryPara.column"
                    :placeholder="queryPara.label"
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
            <el-button size="mini"  @click="reSet()" >
              重置
            </el-button>
            
          </div>
          <br style="clear: both">
        </el-form>

      </transition>

      <el-dialog
        title="提示"
        :visible.sync="dialogWarning"
        width="30%"
        :center='true'
        :before-close="dialogConfirm">
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
    queryInfo: {},
    queryTables: {}
  },

  data: function() {
    return {
      toHiddle: true,
      isShow: true,
      dialogWarning: false,
      queryTable: this.$props.queryTables
    }
  },
  created() {
  },
  methods: {
    selectChange(value, currLabel) {
      this.$emit('selectChange', value, currLabel)
      if (currLabel === 'businessCategory') {
        this.queryTable.param.businessType = ''
        let queryParas = this.queryTable.queryParas
        for (let i in queryParas) {
          if (queryParas[i].column === 'businessType') {
            queryParas[i].queryValue = ''
          }
        }
      }
      if (currLabel === 'businessType') {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
        }, 1)
      }
    },
    /* 收起搜索条件列表*/
    toShowQueryCol: function() {
      this.toHiddle = !this.toHiddle
    },
    dialogConfirm: function() {
      this.dialogWarning = false
    },
    /* 重置按钮点击，将所有表单数据清空 */
    reSet: function() {
      let list = this.queryTable.queryParas
      for (let i in list) {
        list[i].queryValue = ''
        let childrenList = list[i].children
        for (let j in childrenList) {
          childrenList[j].queryValue = ''
        }
      }
      this.$emit('reSet-click', 'reSet', 'reSet')
    },
    // 判断是否是“enter”健
    isEnter: function(ev) {
      if (ev.keyCode == 13 || ev.keyCode == 108) {
        this.search()
      }
    },
    search: function() {
      // 防止出现：把查询结果切换到非第一页后再次查询，查询结果不会切换到第一页，导致如果查询结果不够一页的话就会显示查询结果为空
      this.queryTable.param = {
        currentPage: 1,
        pageSize: 10
      }
      // this.queryTable.param = cloneDeep(this.queryTables.param)
      var flag = false
      for (var i = 0; i < this.queryTable.queryParas.length; i++) {
        if (!this.queryTable.queryParas[i].queryValue) {
          if (this.queryTable.queryParas[i].children) {
            for (let j in this.queryTable.queryParas[i].children) {
              let children = this.queryTable.queryParas[i].children[j]
              if (!children.queryValue) {
                continue
              } else {
                flag = true
                break
              }
            }
          } else {
            continue
          }
        } else {
          flag = true
          break
        }
      }

      if (flag) {
        for (var i = 0; i < this.queryTable.queryParas.length; i++) {
          if (this.queryTable.queryParas[i].children) {
            for (let j in this.queryTable.queryParas[i].children) {
              let children = this.queryTable.queryParas[i].children[j]
              this.queryTable.param[children.column] = children.queryValue
            }
          }
          this.$set(this.queryTable.param, this.queryTable.queryParas[i].column, this.queryTable.queryParas[i].queryValue)
        }
        // 删去为空的参数
        let delectObj = this.queryTable.param
        for (let dd in delectObj) {
          if (delectObj[dd] == '') {
            delete delectObj[dd]
          }
        }
        this.$emit('search-click', 'search', delectObj)
        // this.$emit("search-click", "search", this.queryTable.param);
      } else {
        this.dialogWarning = true
      }
    },
    operateColumnClick(operateType, data) {
      this.$emit('operate-column-click', operateType, data)
    },
    btnClick(key, data) {
      this.$emit('btn-click', key, data) // 监听事件
    }
  }

}

</script>
<style lang="less">

  .form-label {
    /* margin-bottom: 15px; */
  }

  .form-label label {
    padding: 0 1em;
    text-align: left;
    width:auto;
    
  }
  .queryInfo{
    overflow: hidden;
    border-bottom:1px solid #f2f2f2;
    margin-bottom: 15px;
    padding:10px 0;
    ul{
      margin:0;
      padding:0
    }
    li{
     float: left;
     width:120px;
     list-style: none;
     span{
       display: block;
       
     }
     span:last-child{
         font-weight: bold;
       }
    }
  }

</style>
