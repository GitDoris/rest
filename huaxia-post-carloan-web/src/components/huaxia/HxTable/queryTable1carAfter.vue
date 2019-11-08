<template>
  <div class="padding">
    <!--<audio ref="audio" :src="audio" controls="controls" hidden></audio>-->
    <div v-if="tableParam.isShoweds.isSearch">
      <queryTable :queryTables="tableParam.queryTables" :tableItems="tableParam"  @search-click="btnClick" @reSet-click="btnClick" @matchSave-click="btnClick"
                  @selectChange="selectChange"></queryTable>
    </div>
    <!--<br>-->
    <!-- 操作按钮 -->
    <div class="box-body" style="background-color: white;">
      <el-row :style="'margin-bottom: 20px;margin-top:5px'">
        <el-col>
          <el-button v-show="tableParam.isShoweds.showSelectAll"
                     type="primary" size="mini"
                     @click="btnClick('selectAll',[])">{{isAllCheck ? `取消选择(${allCheckSelections.length})` : '选择全部'}}
          </el-button>
          <slot name="button-content2"></slot>
          <el-button v-if="tableParam.isShoweds.showDistribute" type="primary" size="mini"
                     :disabled="isAllCheck ? allCheckSelections.length <= 0 : selections.length <= 0"
                     @click="btnClick('distribute',[])">分配{{tableParam.isTrailCar?"拖车":"催收"}}员
          </el-button>
          <slot name="button-content"></slot>
        </el-col>
      </el-row>
      <el-row v-show="tableParam.isShoweds.showToolTitle" style="background-color: #F6F8F9; padding-right: 10px"
              type="flex" align="middle">
        <el-col :span="10" style="border-left: 2px solid #27A163; line-height: 36px">
          <h2 style="padding-left: 10px; color: #333">{{tableParam.title ? tableParam.title : getPageTitle()}}</h2>
        </el-col>
        <el-col :span="14" align="right">
          <slot name="toolBtns"></slot>
          <slot name="toolRightInfo"></slot>
        </el-col>
      </el-row>
      <!-- table表格组件 -->
      <div v-if="tableParam.isShoweds.tableIsShow==1" style="margin-top: 15px">
        <el-table
          :data="tableParam.tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @select-all="handleSelectAll"
          :highlight-current-row="tableParam.isShoweds.isRadio"
          @current-change="handleCurrentChange"
          size="mini"
          stripe border>
          <template v-if="!tableParam.isShoweds.isRadio">
            <el-table-column
              v-if="tableParam.isShoweds.tableIsAllChange"
              fixed="left"
              type="selection"
              :selectable="checkSelectable"
              width="54" align="center">
            </el-table-column>
          </template>
          <el-table-column v-for="(item,index) in tableParam.tableLables" :key="index" :label="item.lable" align="center" :fixed="item.fixed" :width="item.width" v-if="!item.hidden" :show-overflow-tooltip="item.isHiddle">
            <template slot-scope="scope">
              <el-col v-if="item.linked">
                <el-button type="text" size="small"
                           @click="btnClick(item.code,scope.row)">
                  {{scope.row[item.code]}}
                </el-button>
              </el-col>
              <el-col v-else-if="item.amountFormate">
                  {{ scope.row[item.code] | fmoney(scope.row[item.code], 2)}}
              </el-col>
              <!--新增操作栏-->
              <!--<el-col v-else-if="item.code === 'operateColumn'" size="medium" align="center">
                <template v-for="btn in item.btns">
                
                  <template v-if="btn.operateType === 'viewLog'">
                    <el-popover
                      placement="left"
                      popper-class="showLog"
                      width="260"
                      trigger="hover">
                      <div class="log">
                        <div><span>登记人：</span>{{scope.row.creator}}</div>
                        <div><span>登记时间：</span>{{scope.row.createdTime}}</div>
                        <div><span>更新人：</span>{{scope.row.updator}}</div>
                        <div><span>更新时间：</span>{{scope.row.updatedTime}}</div>
                      </div>
                      <el-button style="margin-right: 5px" slot="reference"
                                 :type="btn.type">{{btn.name}}
                      </el-button>
                    </el-popover>
                  </template>

    <template v-else>
                    <el-button style="margin-right: 5px" :type="btn.type"
                               @click="operateColumnClick(btn.operateType,scope.row)">{{btn.name}}
                    </el-button>
                  </template>
    </template>
    </el-col>-->
            <el-col v-else size="medium" align="center">
                {{ scope.row[item.code] ? scope.row[item.code] : '--' }}
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
<el-row>
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
</el-row>
</div>
<el-dialog title="失效" :visible.sync="showTimePicker" center width="400px">
    <el-form ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="失效时间">
            <el-date-picker v-model="endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" align="right" :style="`width: 100%`">
            </el-date-picker>
        </el-form-item>
        <el-form-item v-show="false">
            <el-input v-model="currRow"></el-input>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveEndTime()">保存</el-button>
    </span>
</el-dialog>
</div>
</template>
<script>
    import QueryTable from './queryTable.vue'
    import {
        deleteSame,
        deleteSame2
    } from '@/utils'
    import cloneDeep from 'lodash/cloneDeep'

    export default {
        props: {
            tableItems: {}
        },

        data: function() {
            return {
                showTimePicker: false,
                endTime: '',
                currRow: '',
                currLogs: [],
                currLogStatus: {},
                selections: [], //多选项
                tableParam: this.$props.tableItems,
                audio: "",
                isAllCheck: false, //当前是否处于跨页全选状态
                uncheck: [], //未被选中的key, 当前是否处于跨页全选状态下有效
                uncheckObj: [], //未被选中的对象, 当前是否处于跨页全选状态下有效
                operateAllList: [], //被操作过的列表
                operateSelect: [], //被操作过的列表选中的值
                allCheckSelections: [], //被全选的值
                tableKey: this.$props.tableItems.tableKey ? this.$props.tableItems.tableKey : 'caseNo', //table的key值
                audioStop: false,
            };
        },
        updated() {},
        created() {
            this.getPageTitle()
        },
        methods: {
            //设置多选时候的禁用选项 根据每行返回的具体参数设置
            checkSelectable(row, index) {
                if (row.isMatched) {
                    return row.isMatched == "未匹配";
                } else {
                    return true;
                }
            },
            /*表格单选点击事件*/
            handleCurrentChange(val) {
                if (this.tableParam.isShoweds.isRadio) {
                    this.$emit('getSelections', val)
                }
            },
            /*录音停止*/
            repeat() {
                let audio = this.$refs.audio
                audio.currentTime = 0; //重新播放
            },
            /*录音播放*/
            control(type) {
                let audio = this.$refs.audio
                if (!this.audioStop) {
                    if (type === "stop") {
                        audio.pause()
                        this.audioStop = true
                        audio.currentTime = 0;
                    } else {
                        if (audio !== null) {
                            if (audio.paused) {
                                audio.play(); // 播放
                                audio.onended = () => {
                                    this.audioStop = true
                                };
                            } else {
                                audio.pause(); // 暂停
                            }
                        }
                    }
                } else {
                    audio.currentTime = 0;
                    this.audioStop = !this.audioStop
                }
            },
            selectChange(value, currLabel) {
                this.$emit('selectChange', value, currLabel)
            },
            tableRowClassName: function(row, rowIndex) {
                if (rowIndex === 1) {
                    return "warning-row";
                } else if (rowIndex === 3) {
                    return "success-row";
                }
                return "";
            },
            getPageTitle() {
                return this.$route.meta.title
            },
            operateColumnClick(operateType, data) {
                if (operateType === 'invalid') {
                    this.endTime = (new Date()).toFormat("YYYY-MM-DD HH24:MI:SS")
                    this.currRow = JSON.stringify(data)
                    this.showTimePicker = true
                } else {
                    this.$emit("operate-column-click", operateType, data); //监听事件
                }
            },
            saveEndTime() {
                let data = JSON.parse(this.currRow)
                data.endTime = this.endTime
                this.$emit("operate-column-click", 'invalid', data); //监听事件
                this.showTimePicker = false
            },
            btnClick(key, data) {
                switch (key) {
                    case "selectAll": // 选择全部
                        this.isAllCheck = !this.isAllCheck;
                        if (this.isAllCheck) {
                            this.$refs.multipleTable.clearSelection();
                            this.toggleSelection(this.tableParam.tableData);
                            this.setAllList(this.tableParam.tableData)
                        } else {
                            this.uncheck = []
                            this.uncheckObj = []
                            this.operateAllList = []
                            this.operateSelect = []
                            this.$emit('getAllSelections', [])
                            this.toggleSelection();
                        }
                        break;

                    case "distribute": // 分配按钮
                        break;

                    default:
                }
                this.$emit("btn-click", key, data); //监听事件
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            handleSelect(selection, row) {
                if (this.isAllCheck) {
                    let flag = 0;
                    for (let i in selection) {
                        if (row[this.tableKey] === selection[i][this.tableKey]) {
                            flag = 1
                            break;
                        }
                    }
                    if (flag === 1) {
                        this.operateSelect.push(row);
                    } else {
                        for (let i in this.operateSelect) {
                            if (this.operateSelect[i][this.tableKey] === row[this.tableKey])
                                this.operateSelect.splice(i, 1);
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
                                    this.operateSelect.splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.operateSelect.length === 0) {
                        for (let i in selection) {
                            this.operateSelect.push(selection[i]);
                        }
                    } else {
                        for (let i in selection) {
                            let flag = false;
                            for (let j in this.operateSelect) {
                                if (this.operateSelect[j][this.tableKey] === selection[i][this.tableKey]) {
                                    flag = true;
                                    break;
                                }
                            }
                            if (!flag)
                                this.operateSelect.push(selection[i]);
                        }
                    }

                    this.getUncheckSelection()
                }
            },
            handleSelectionChange(selection) {
                this.selections = selection;
                this.$emit('getSelections', selection)
            },


            //已经取消选择的不在勾选
            uncheckSelection(data) {
                setTimeout(() => {
                    this.toggleSelection(deleteSame(data, this.uncheckObj, this.tableKey));
                }, 10)
            },

            setAllList(list) {
                this.getUncheckSelection()
                this.handleSelectAll(deleteSame(list, this.uncheckObj, this.tableKey))
                for (let i in list) {
                    if (this.operateAllList.indexOf(list[i][this.tableKey]) <= -1) {
                        this.operateAllList.push(list[i][this.tableKey])
                    }
                }
            },

            //获取未被选中的集合
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
            }

        },

        computed: {
            getCheckCount() {
                return 0
            },
            operateSelectNos() {
                let arr = []
                for (let i in this.operateSelect) {
                    arr.push(this.operateSelect[i][this.tableKey])
                }
                return arr
            }
        },

        components: {
            QueryTable
        }

    }
</script>

<style>
    .textCenter {
        display: flex;
        justify-content: flex-end;
        /* 水平右对齐 */
        align-items: center;
        /* 垂直居中 */
        margin-top: 20px;
    }
    
    .padding {
        padding: 15px;
    }
    
    .form-label .el-dialog__body .el-form,
    .el-dialog__body .el-form-item__label {
        color: #000;
    }
    
    @font-face {
        font-family: 'iconfont';
        /* project id 525570 */
        src: url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.eot');
        src: url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.woff') format('woff'), url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.ttf') format('truetype'), url('//at.alicdn.com/t/font_525570_0j1bppjmhuayvi.svg#iconfont') format('svg');
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
        background-color: #3C8DBC;
        /* 补 表示补件订单 */
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
    
    .lay-tag-warm {
        background-color: #F39C12;
        /* 急 表示加急订单 */
    }
    
    .lay-tag-danger {
        background-color: #d81b60;
        /* 展 表示车贷展期订单 */
    }
    
    .lay-tag-normal {
        background-color: #00A65A;
        /* 绿 表示消金绿通订单 */
    }
    
    .lay-tag-primary {
        background-color: #00C0EF;
        /* 追 表示追加贷款订单 */
    }
    
    .lay-tag-again {
        background-color: #605ca8;
        /* 再 表示结清再贷订单 */
    }
    
    .lay-tag-no {
        background-color: #001f3f;
        /* 旧 表示借新还旧订单 */
    }
    
    .lay-tag-cheat {
        /* border:1px solid #dd4b39; */
        background-color: #dd4b39;
        /* 欺 */
        /* color: #dd4b39; */
    }
    
    .lay-tag-site {
        /* border:1px solid #64890a; */
        background-color: #64890a;
        /* 实 */
        /* color: #64890a; */
    }
    
    .lay-tag-update {
        /* border:1px solid #ff6586; */
        /* background-color: transparent; */
        /* color: #ff6586; */
        background-color: #ff6586;
        /* 改 */
    }
    
    .text-overflow {
        display: block;
        /*内联对象需加*/
        word-break: keep-all;
        /* 不换行 */
        white-space: nowrap;
        /* 不换行 */
        overflow: hidden;
        /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
        /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
    
    .log+.log {
        border-top: 1px dashed #ccc;
    }
</style>