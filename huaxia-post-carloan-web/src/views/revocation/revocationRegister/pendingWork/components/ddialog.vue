<!--挂账撤销-->
<template>
  <div id="dialog">
  	<div id="dialogWrap">
	  	<div :class="{headerWrap:true}">新增任务<span @click="Hidden">X</span></div>
	    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method"	@getSelections="getSelections" @getAllSelections="getAllSelections">  
	    </hx-table>
	    <div>
	    	<el-button style="margin-left: 40%;" @click="cancelAll">清空</el-button>
	    	<el-button type="primary" @click="confirmAdd" :disabled="checkedCaseNoList.length === 0">确认</el-button>
	    </div>
  		
  	</div>

  </div>
</template>

<script>
  import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
  import {reSearchTasks,reNewTask} from '@/api/carLoadAfterApi'
  import searchLabel from './searchLabel'
  import tableLabel from './tableLabel'
  import cloneDeep from 'lodash/cloneDeep'
  export default {
    data() {
      return {
      	isShow:false,
      	queryData:"",
      	//classJson:{headerWrap:true},
        //globDictData: this.$store.state.glabdatas.globDictData,
        tableParam: {
          isShoweds: { // 是否显示集合
            pageIsShow: false, // 分页是否显示
            tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
            isSearch: true, // 搜索框是否显示
            tableIsAllChange: true, // 左侧固定全选列是否显示
            //showSelectAll: true, // 是否显示选择全部按钮
  
            showToolTitle: false
          },
          pageHelpers: {
            ...this.$store.state.glabdatas.searchSetting.pageHelpers
          },
          tableLables: cloneDeep(tableLabel),
          tableData: [],
          queryTables: {
            queryParas: cloneDeep(searchLabel),
            param: {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            },
          },
          
          selections: [],
       		allSelections: [],

          //allCaseNoList: [],
        },
        	checkedCaseNoList:[],//选中的案件号列表

      }
    },

    created() {
      //this.getSearch(this.tableParam.queryTables.param);

    },

    methods: {
    	getSelections: function (data) {
        this.selections = data
        this.checkedCaseNoList = this.getSelectionString()
        console.log('checkedCaseNoList',this.checkedCaseNoList)
      },
      getAllSelections: function (data) {
        this.allSelections = data
        this.checkedCaseNoList = this.getSelectionString()
      },
			//检索
      getSearch(param) {
        reSearchTasks(param).then(response => {
        	//alert("搜索");
        	//console.log(response.data)
          if (response.data.code === "00000") {
              if (response.data.data.list) {
                const array = response.data.data.list;
                
                this.tableParam.isShoweds.tableIsShow = 1;
                this.tableParam.isShoweds.pageIsShow = true;
                let reg = /^(\d{4})\d+(\d{4})$/;

               //身份证加星星
                for(let i=0;i<array.length;i++){
                  if(array[i].idCard){
                      let str = array[i].idCard;
                      str = str.replace(reg, "$1***********$2");
                      array[i].idCard = str;
                  }
                }

                this.tableParam.tableData = array;
                this.tableParam.pageHelpers.totalSum = response.data.data.total;
              } else {
                this.tableParam.isShoweds.tableIsShow = 2;
                this.tableParam.isShoweds.pageIsShow = false;
              }
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      method(key, data) {
        switch (key) {
          case "search": //搜索事件
            this.getSearch(data);
            break;
          case "reSet": //检索重置
            this.tableParam.pageHelpers = {
              ...this.$store.state.glabdatas.searchSetting.pageHelpers
            }
            this.tableParam.queryTables.param = {
              ...this.$store.state.glabdatas.searchSetting.defaultParam
            }
            this.tableParam.tableData=[];
          //  this.getSearch(this.tableParam.queryTables.param);
            break;
          case "current_change": //当前页数修改
            this.tableParam.pageHelpers.currentPage = data;
            this.tableParam.queryTables.param.pageNum = this.tableParam.pageHelpers.currentPage;
            this.getSearch(this.tableParam.queryTables.param);
            break;

          case "size_change": //每页数据条数修改
            this.tableParam.pageHelpers.pageSize = data;
            this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize;
            this.getSearch(this.tableParam.queryTables.param);
            break;
          case "selectAll": //选择全部
            break;
          case "distribute": //分配按钮
            this.onDistributeStaffDialog();
            break;
          case "contractNo":
            this.contractNoClick(data)
            break;
          default:

        }
      },
      
      getSelectionString() {
        let contractNoList = []
        if (this.$refs.hxtableComponent.isAllCheck) {
          contractNoList = this.allSelections
        } else {
          for (let i in this.selections) {
            contractNoList.push(this.selections[i].contractId);
          }
        }
        return contractNoList.join("#")
      },
      
			Hidden(){
        let searchDate = this.tableParam.queryTables.queryParas;
        for(let i in searchDate){
          if(searchDate[i].queryValue){
            searchDate[i].queryValue = "";
          }
        }
        this.tableParam.tableData = [];
        this.tableParam.isShoweds.pageIsShow = false;
        document.getElementById("dialog").style.display="none";
        this.$emit('hidden'); 
    	},
      //新增任务确认
			confirmAdd(){
        //console.log(this.$parent.$parent.childFrom())
				this.queryData = this.checkedCaseNoList;
        if(this.checkedCaseNoList !== undefined){
          let param={
            contractId:this.queryData,
          }
          reNewTask(param).then(response => {
            if (response.data.code === "00000") {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.Hidden();
              this.$parent.$parent.childFrom();
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }else{
           this.$message({
            message: '内容不能为空',
            type: 'warning'
          });
        }
			},
			//新增任务清空
			cancelAll(){
				this.tableParam.tableData = []
			},
//			closeWrap(){
//				this.isShow=false;
//			}

      

    },

    components: {
      HxTable
    }
  }
</script>
<style>
  #dialog{
 	width: 100%;
 	height: 100%;
 	background: rgba(0,0,0,.3);
 	position: fixed;
 	left: 0;
 	top: 0;
  z-index: 2000;
  overflow: auto;
 }
 #dialogWrap{
	width: 70%;
	/*max-height: 90%;*/
	position: absolute;
	left:15%;
	top: 8%;
	background: white;
  padding-bottom: 30px;
 }
	.headerWrap{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #eee;
		font-weight: bolder;
	}
	.headerWrap span{
		display: block;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		float: right;
		cursor: pointer;

	}
</style>

