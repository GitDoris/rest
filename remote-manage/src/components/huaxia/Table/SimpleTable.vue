<template>
    <el-table :data="tableData" border>
        <el-table-column v-for="(item,index) in tableSchema" :key='index' align="left" :label="item.label">
            <template slot-scope="scope">
                <el-col v-if="item.linked"  align="left">
                    <el-button type="text" size="small"  @click="btnClick(scope.row,'orderNo',scope.row)" >
                        {{scope.row[item.prop]}}
                    </el-button>
                </el-col>
                <el-col v-else-if="item.isSelect&&item.disabled" size="medium" align="left">
                  <template v-for="optionList in itemProps[item.prop]">
                    <div v-if="optionList.value == scope.row[item.prop]" :key='optionList.val'>
                      {{optionList.label}}
                    </div>
                  </template>
                </el-col>
                <el-col v-else size="medium"  align="left">
                    {{scope.row[item.prop]}}
                </el-col>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props : {
        inSchema :  {
          Array,
          default: []
        },
        inData :  {
          Array,
          default: function(){
            return [];
          }
        },
    },
    watch:{
        // 监控数据刷新
        inData(){
            this.tableData = this.inData;
        }
    },
    data : function(){
        return {
            tableData : this.$props.inData,
            tableSchema : this.$props.inSchema,
            itemProps: this.$store.state.glabdatas.globDictData,
        }
    },
    methods:{
        btnClick(key, data) {
            this.$emit('onButtonClick','simpletable', key, data)
        },
    }
}
</script>

