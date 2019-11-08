<template>
  <div class="">
   
   
  
    <!-- 操作按钮 -->
    <div class="box-body" style="background-color: white;">
     
      
      <!-- table表格组件 -->
      <div v-if="tableParam.isShoweds.tableIsShow===1" style="margin-top: 15px">
        <!--
          避免报错 删除了 3个方法
          @selection-change="handleSelectionChange"
          @select="handleSelect" 
          @select-all="handleSelectAll"
        -->

        <el-table
          :data="tableParam.tableData"
          ref="multipleTable"
          @current-change="handleCurrentChange"
          @select="handleSelect" 
          @select-all="handleSelectAll"
          @selection-change="handleSelectionChange"
          size="mini"
          stripe border>
          <template >
            <el-table-column
              v-if="tableParam.isShoweds.tableIsAllChange"
              fixed="left"
              type="selection"
              width="54" align="center">
            </el-table-column>
          </template>
          <el-table-column v-for="(item,index) in tableParam.tableLables" :key="index" :label="item.label"
                           align="center" :fixed="item.fixed" :min-width="item.width" v-if="!item.hidden"
                           :show-overflow-tooltip="item.isHiddle">
            <template slot-scope="scope">
              <template v-if="item.linked">
                <el-button type="text" size="small"
                           @click="btnClick(item.code,scope.row)">
                  {{scope.row[item.code]}}
                </el-button>
              </template>

              <!--新增操作栏-->
              <el-col v-else-if="item.code === 'operateColumn'" size="medium" align="center">
                <template>
                    <el-button style="margin-right: 5px" :type="btn.type" v-for="(btn,index) in item.btns" :key="index"
                              @click="operateColumnClick(btn.operateType,scope.row)">{{btn.name}}
                    </el-button>
                </template>
              </el-col>
              <el-col v-else-if="item.code === 'requestStatus'" size="medium" align="center">
                {{ scope.row[item.code] == 0 ? '成功' : '失败' }}
              </el-col>
              <el-col v-else-if="item.code === 'validityEndFlag'" size="medium" align="center">
                {{ scope.row[item.code] =='1' ? '是' : '否' }}
              </el-col>
              <el-col v-else-if="item.code === 'phaseNo'" size="medium" align="center">
               <span v-html='  scope.row[item.code] =="1" ? "成功" : "失败"'></span>
               <span v-if="scope.row[item.code] !='1'">
                 <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                   >
                    <div>
                      <span>{{scope.row['customerName']}}</span>
                      <span>申请金额 : {{scope.row['busiSum'] | formatNumber}} 元</span>
                      <p>原因文字描述：{{scope.row['reason']}}</p>
                    </div>
                    <i slot="reference" class="el-icon-question"></i>
                  </el-popover>
                  </span>
              </el-col>
              <el-col v-else-if="item.code === 'state'" size="medium" align="center">
                {{ scope.row[item.code] =='0' ? '有效' : '无效' }}
              </el-col>
              <el-col v-else-if="item.code === 'switchs'" size="medium" align="center">
                {{ scope.row[item.code] =='1' ? '开' : '关' }}
              </el-col>
              <el-col v-else size="medium" align="center">
                {{ scope.row[item.code] || scope.row[item.code] === 0 ? scope.row[item.code] : '--' }}
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else-if="tableParam.isShoweds.tableIsShow===0" style="text-align:center;;display:block;">
        <span class="iconfont">&#xe636;</span>
        <br>
        <span>未搜索到相应订单...</span>
      </div>
      <div v-else style="text-align:center;;display:block;">
        <span class="iconfont">&#xe636;</span>
        <br>
        <span>你的队列中暂时没有可处理的单子...</span>
      </div>
      <div style="overflow:hidden">
        <div style="float:left;margin-top:20px;" v-if="tableParam.isShoweds.tableIsAllChange">
          <span>已选择<i style="color:#409eff;font-style:normal"> {{selections.length}} </i>条</span>  
          <el-button size="mini" @click="toggleSelection()" style="border:none;color:#409eff">取消选择</el-button>
        </div>
        <div style="float:right">
        <!-- 分页组件 -->
        <span class="textCenter" v-if="tableParam.isShoweds.pageIsShow">
        <el-pagination
          @size-change="btnClick('size_change',$event)"
          @current-change="btnClick('current_change',$event)"
          :current-page="tableParam.pageHelpers.currentPage"
          :page-size="tableParam.pageHelpers.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableParam.pageHelpers.totalSum"
          :page-count="Number(tableParam.pageHelpers.totalSum /10)"
          :background="true">
        </el-pagination>
        </span>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import QueryTable from './query.vue'

export default {
  props: {
    tableItems: {}
  },

  data() {
    return {
      showTimePicker: false,
      endTime: '',
      currRow: '',
      selections: [], // 多选项
      tableParam: this.$props.tableItems,
      isAllCheck: false, // 当前是否处于跨页全选状态
      uncheck: [], // 未被选中的key, 当前是否处于跨页全选状态下有效
      uncheckObj: [], // 未被选中的对象, 当前是否处于跨页全选状态下有效
      operateAllList: [], // 被操作过的列表
      operateSelect: [], // 被操作过的列表选中的值
      allCheckSelections: [], // 被全选的值
      tableKey: this.$props.tableItems.tableKey ? this.$props.tableItems.tableKey : 'caseNo', // table的key值
      audioStop: false,
      remarkList: []// 备注的日志列表
    }
  },
  created() {
    this.getPageTitle()
  },
  methods: {
    /* 表格单选点击事件 */
    handleCurrentChange(val) {
      if (this.tableParam.isShoweds.isRadio) {
        this.$emit('getSelections', val, 'current-change')
      }
    },

    handleSelectionChange(selection) {
      this.selections = selection
      this.$emit('getSelections', selection, 'selection-change')
    },
    handleSelect(selection, row) {
      if (this.isAllCheck) {
        let flag = 0
        for (let i in selection) {
          if (row[this.tableKey] === selection[i][this.tableKey]) {
            flag = 1
            break
          }
        }
        if (flag === 1) {
          this.operateSelect.push(row)
        } else {
          for (let i in this.operateSelect) {
            if (this.operateSelect[i][this.tableKey] === row[this.tableKey]) { this.operateSelect.splice(i, 1) }
          }
        }

        this.getUncheckSelection()
      }
    },
    handleSelectAll(selection) {
      if (this.isAllCheck) {
        if (selection.length === 0) {
          for (let i in this.tableParam.tableData) {
            for (let j in this.operateSelect) {
              if (this.operateSelect[j][this.tableKey] === this.tableParam.tableData[i][this.tableKey]) {
                this.operateSelect.splice(j, 1)
                break
              }
            }
          }
        }
        if (this.operateSelect.length === 0) {
          for (let i in selection) {
            this.operateSelect.push(selection[i])
          }
        } else {
          for (let i in selection) {
            let flag = false
            for (let j in this.operateSelect) {
              if (this.operateSelect[j][this.tableKey] === selection[i][this.tableKey]) {
                flag = true
                break
              }
            }
            if (!flag) { this.operateSelect.push(selection[i]) }
          }
        }

        this.getUncheckSelection()
      }
    },
    // 获取未被选中的集合
    getUncheckSelection() {
      this.uncheck = deleteSame2(this.operateAllList, this.operateSelectNos)
      this.uncheckObj = []
      for (let i in this.tableParam.tableData) {
        if (this.uncheck.indexOf(this.tableParam.tableData[i][this.tableKey]) > -1) {
          this.uncheckObj.push(this.tableParam.tableData[i])
        }
      }
      this.allCheckSelections = deleteSame2(this.tableParam.allCaseNoList, this.uncheck)
      this.$emit('getAllSelections', this.allCheckSelections)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    getPageTitle() {
      return this.$route.meta.title
    },
    /* 操作栏点击 */
    operateColumnClick(operateType, data) {
      this.$emit('operate-column-click', operateType, data)
    },
    btnClick(key, data) {
      this.$emit('btn-click', key, data) // 监听事件
    }

  },

  computed: {
  },

  components: {
    QueryTable
  }

}
</script>

<style>
  .textCenter {
    display: flex;
    justify-content: flex-end; /* 水平右对齐 */
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
  }

  .padding {
    padding: 15px;
  }

  .form-label .el-dialog__body .el-form, .el-dialog__body .el-form-item__label {
    color: #000;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 525570 */
    src: url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.eot');
    src: url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.woff') format('woff'),
    url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont";
    font-size: 160px;
    font-style: normal;
  }

  .el-dialog--center .el-dialog__header {
    padding-top: 15px;
  }

  .icon-tel:before {
    content: "\e601";
  }

  .lay-tag {
    background-color: #3C8DBC; /* 补 表示补件订单 */
    height: 20px;
    width: 20px;
    padding: 0;
    line-height: 19px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    border: none;
    margin: 2px 4px;
  }

  .border-red {
    padding: 0 3px;
    border: 1px solid #f00;
    font-size: 12px;
    color: #f00;
    margin-left: 3px;
  }
  .allBtns{
    margin:20px;
    margin-left:0px;
  }
</style>
