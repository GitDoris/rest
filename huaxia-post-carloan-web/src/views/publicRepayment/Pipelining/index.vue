<template>
    <div>
        <el-tabs class="tabTopstyle" @tab-click="caseLogTab">
            <el-tab-pane label="对公还款流水"></el-tab-pane>
            <el-tab-pane label="重复导入流水"></el-tab-pane>
        </el-tabs>
        <public-work v-if="freshTab==0"></public-work>
        <repeat-work v-if="freshTab==1"></repeat-work>
    </div>
</template>
<script>
  import PublicWork from './public/publicIndex.vue'
  import RepeatWork from './repeat/repeatIndex.vue'

  export default {
    data() {
      return {
        freshTab:0,
      }
    },

    methods: {
      /*tab切换*/
      caseLogTab(tab,event) {
        this.freshTab = tab.index;
       // console.log(this);
      },

    },
    components: {
      PublicWork,
      RepeatWork
    }
  }
</script>
<style>

  /*.tabTopstyle{
		min-height: auto;
    padding-left: 0;
	}*/
 .el-tabs--top .el-tabs__item:nth-child(2)
  {
    padding: 0 20px;
  }
  .el-tabs--top .el-tabs__item:last-child 
  {
    padding: 0 20px;
  }
  .el-tabs__item is-active{
     border-bottom:2px solid rgb(39, 161, 99); 
  }
  .el-tabs__active-bar{
    background: rgb(39, 161, 99);
  }

  .el-tabs__item.is-active {
    color: #000;
    font-weight: bolder;
     border-bottom:2px solid rgb(39, 161, 99);
  }

</style>