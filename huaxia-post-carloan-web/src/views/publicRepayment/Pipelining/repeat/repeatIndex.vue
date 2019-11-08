<template>
  <div>
    <hx-table ref="hxtableComponent" :tableItems="tableParam" @btn-click="method">
 	
    </hx-table>

  </div>
</template>

<script>
    import HxTable from '@/components/huaxia/HxTable/queryTable1carAfter'
    import {
        repeatFlowList,
        importExcel
    } from '@/api/carLoadAfterApi'
    import searchLabel from './searchLabel'
    import tableLabel from './tableLabel'
    import request from '@/utils/request'
    import cloneDeep from 'lodash/cloneDeep'

    export default {
        data() {
            return {
                tableParam: {
                    isShoweds: { // 是否显示集合
                        pageIsShow: true, // 分页是否显示
                        tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
                        isSearch: true, // 搜索框是否显示
                        tableIsAllChange: false, // 左侧固定全选列是否显示
                        //showSelectAll: true, // 是否显示选择全部按钮
                        showToolTitle: true
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
                },

            }
        },

        created() {
            this.getSearch(this.tableParam.queryTables.param);

        },

        methods: {
            formatDate(now) {
                var timetime = new Date(now);
                var year = timetime.getFullYear();
                var month = timetime.getMonth() + 1;
                var date = timetime.getDate();
                var hour = timetime.getHours();
                var minute = timetime.getMinutes();
                var second = timetime.getSeconds();
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                //return year+"-"+month+"-"+date; 
            },
            /* 检索 */
            getSearch(param) {
                repeatFlowList(param).then(response => {
                    if (response.data.code === "00000") {
                        if (response.data.list) {
                            const array = response.data.list;

                            this.tableParam.isShoweds.tableIsShow = 1;
                            this.tableParam.isShoweds.pageIsShow = true;

                            let reg = /^(\d{5})\d+(\d{4})$/;
                            for (let i = 0; i < array.length; i++) {
                                if (array[i].transDate) {
                                    array[i].transDate = this.formatDate(array[i].transDate);
                                }
                                if (array[i].importDate) {
                                    array[i].importDate = this.formatDate(array[i].importDate);
                                }
                                if (array[i].tranderAccount) {
                                    let str = array[i].tranderAccount;
                                    str = str.replace(reg, "$1*****$2");
                                    array[i].tranderAccount = str;
                                }
                                array[i].bankName = "线下辉恒";
                            }
                            this.tableParam.tableData = array;
                            this.tableParam.pageHelpers.totalSum = response.data.total;
                        } else {
                            this.tableParam.tableData = [];
                            // this.tableParam.isShoweds.tableIsShow = 2;
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
                        if(data.importDate&& data.importDate.length>0){
                            data.importDateStart = data.importDate[0]
                            data.importDateEnd = data.importDate[1]
                        }
                        delete data.importDate
                        if(data.transDate&& data.transDate.length>0){
                            data.transDateStart = data.transDate[0]
                            data.transDateEnd = data.transDate[1]
                        }
                        delete data.transDate
                        // console.log(data);
                        this.getSearch(data);
                        break;
                    case "reSet": //检索重置
                        this.tableParam.pageHelpers = {
                            ...this.$store.state.glabdatas.searchSetting.pageHelpers
                        }
                        this.tableParam.queryTables.param = {
                            ...this.$store.state.glabdatas.searchSetting.defaultParam
                        }
                        this.getSearch(this.tableParam.queryTables.param);
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
                    default:

                }
            },



        },

        components: {
            HxTable
        }
    }
</script>
<style>
    .importClass {
        position: relative;
        cursor: pointer;
    }
    
    #file {
        width: 86px;
        height: 28px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
</style>