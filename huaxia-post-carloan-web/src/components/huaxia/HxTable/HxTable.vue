<template>
  <div>
    <div v-if="tableParam.isShoweds.tableIsShow==1">
      <el-table
          :data="tableParam.tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @select-all="handleSelectAll"
          size="mini"
          stripe border> 
        <el-table-column
          v-if="tableParam.isShoweds.tableIsAllChange"
          fixed="left"
          type="selection"
          width="54" align="center">
        </el-table-column>
        <el-table-column v-for="(item) in tableParam.tableLables" :label="item.lable" align="center" :fixed="item.fixed"
                         :width="item.width" :show-overflow-tooltip="item.isHiddle">
          <template slot-scope="scope">
            <el-col v-if="item.linked&&!item.isTag">
              <el-button type="text" size="small" v-for="(opitem,key) of scope.row[item.code]"
                         @click="btnClick(key,scope.row)">
                {{opitem}}&nbsp;&nbsp;&nbsp;&nbsp;
              </el-button>
            </el-col>
            <el-col v-else-if="item.linked&&item.isTag" size="medium" align="center">
              <el-button type="text" size="small" v-for="(opitem,key) of scope.row[item.code]"
                         @click="btnClick(key,scope.row)">
                {{opitem}}
              </el-button>
              <el-tag v-show="scope.row.isTag"
                      v-for="(tagName,key) in scope.row.tag"
                      size="mini"
                      :class="chooseClass(key)"
                      close-transition>
                {{tagName}}
              </el-tag>
            </el-col>
            <el-col v-else-if="!item.linked&&item.isTag" size="medium" align="center">
              {{ scope.row[item.code] }}
              <el-tag v-show="scope.row.isTag"
                      v-for="(tagName,key) in scope.row.tag"
                      size="mini"
                      :class="chooseClass(key)"
                      close-transition>
                {{tagName}}
              </el-tag>
            </el-col>
            <el-col v-else-if="item.isSelect&&!item.disabled" size="medium" align="center">
              <el-select v-model="scope.row[item.code]" placeholder="请选择">
                <el-option
                  v-for="optionList in globDictData[item.code]"
                  :key="optionList.value"
                  :label="optionList.label"
                  :value="optionList.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col v-else-if="item.isSelect&&item.disabled" size="medium" align="center">
              <template v-for="optionList in globDictData[item.code]">
                <div v-if="optionList.value === scope.row[item.code]">
                  {{optionList.label}}
                </div>
              </template>
            </el-col>
            <el-col v-else size="medium" align="center">
              {{ scope.row[item.code] }}
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else-if="tableParam.isShoweds.tableIsShow==0" style="text-align:center;;display:block;">
      <span class="iconfont">&#xe636;</span>
      <br>
      <span>未搜索到相应订单...</span>
    </div>

    <div v-else style="text-align:center;;display:block;">
      <span class="iconfont">&#xe636;</span>
      <br>
      <span>你的队列中暂时没有可处理的单子...</span>
    </div>
    <br>
    <el-row>

      <!--   分页组件  -->
      <span class="textCenter" v-if="tableParam.isShoweds.pageIsShow">
        <el-pagination
          @size-change="btnClick('size_change',$event)"
          @current-change="btnClick('current_change',$event)"
          :current-page="tableParam.pageHelpers.currentPage"
          :page-sizes="tableParam.pageHelpers.pageSizes"
          :page-size="tableParam.pageHelpers.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableParam.pageHelpers.totalSum"
          :background="true">
        </el-pagination>
        </span>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: {
      tableItems: {}

    },

    data: function () {
      return {
        globDictData: this.$store.state.glabdatas.globDictData,
        handleSelections: [],   //多选项
        tableParam: this.$props.tableItems
      };
    },
    created(){
      // console.log(this.tableItems)
    },
    methods: {
      btnClick(key, data) {
        switch (key) {
          case "search":            //搜索事件        根据输入数据  筛选列表数据

            break;
          case "reSet":             //检索重置

            break;
          case "getApplyStatus":          //获单状态开关      点击关  列表分页隐藏   点击开   获单+列表分页显示

            break;
          case "getApply":              //获单事件        点击执行获单

            break;
          case "current_change":    //当前页数修改     点击跳转到目标页

            break;
          case "distribution":              //分配按钮    点击分配
            for (var i = 0; i < this.handleSelections.length; i++) {
              data.push(this.handleSelections[i].key)
            }
            break;
          case "size_change":       //每页数据条数修改    点击修改当前页数据条数

            break;
          default:

        }
        console.log("----------------------" + key + "------" + data)
        this.$emit("btn-click", key, data);   //监听事件
      },
      handleSelectionChange(selection) {
      	alert( 1111 )
        this.handleSelections = selection;
        this.$emit('selectionNum',this.handleSelections); 
        alert( this.handleSelections.length )
        //console.log( this.handleSelections )
      },
      handleSelect(selection, row) {
        row.checked = !row.checked;
        if (row.checked) {
          this.pushSerialNo2AllList(row.serialNo);
        } else {
          this.removeSerialNo4AllList(row.serialNo);
        }
      },
			handleSelectAll(selection) {
        var tableData = this.tableParam.tableData;
        for (var i = 0; i < tableData.length; i++) {
          tableData[i].checked = !tableData[i].checked;
          if (tableData[i].checked) {
            this.pushSerialNo2AllList(tableData[i].serialNo);
          } else {
            this.removeSerialNo4AllList(tableData[i].serialNo);
          }
        }
      },
      chooseClass(tag) {     //根据属性值显示不同样式


        switch (tag) {
          case "fill":                                /* 补 */
            return "lay-tag";
            break;
          case "urgent":                              /* 急 */
            return "lay-tag lay-tag-warm";
            break;
          case "show":                                /* 展 */
            return "lay-tag lay-tag-danger";
            break;
          case "green":                               /* 绿 */
            return "lay-tag lay-tag-normal";
            break;
          case "chase":                               /* 追 */
            return "lay-tag lay-tag-primary";
            break;
          case "again":                               /* 再 */
            return "lay-tag lay-tag-again";
            break;
          case "old":                                 /* 旧 */
            return "lay-tag lay-tag-no";
            break;
          case "cheat":                               /* 欺 */
            return "lay-tag lay-tag-cheat";
            break;
          case "site":                                /* 实 */
            return "lay-tag lay-tag-site";
            break;
          case "update":                              /* 改 */
            return "lay-tag lay-tag-update";
            break;
          default:                                    /* 默认 */
            return "lay-tag";
        }
      }

    },
    components: {}

  }
</script>

<style scoped>
  .textCenter {
    display: flex;
    justify-content: flex-end; /* 水平右对齐 */
    align-items: center; /* 垂直居中 */
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

  .lay-tag-warm {
    background-color: #F39C12; /* 急 表示加急订单 */
  }

  .lay-tag-danger {
    background-color: #d81b60; /* 展 表示车贷展期订单 */
  }

  .lay-tag-normal {
    background-color: #00A65A; /* 绿 表示消金绿通订单 */
  }

  .lay-tag-primary {
    background-color: #00C0EF; /* 追 表示追加贷款订单 */
  }

  .lay-tag-again {
    background-color: #605ca8; /* 再 表示结清再贷订单 */
  }

  .lay-tag-no {
    background-color: #001f3f; /* 旧 表示借新还旧订单 */
  }

  .lay-tag-cheat {
    /* border:1px solid #dd4b39; */
    background-color: #dd4b39; /* 欺 */
    /* color: #dd4b39; */
  }

  .lay-tag-site {
    /* border:1px solid #64890a; */
    background-color: #64890a; /* 实 */
    /* color: #64890a; */
  }

  .lay-tag-update {
    /* border:1px solid #ff6586; */
    /* background-color: transparent; */
    /* color: #ff6586; */
    background-color: #ff6586; /* 改 */
  }

  .text-overflow {
    display: block; /*内联对象需加*/
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
