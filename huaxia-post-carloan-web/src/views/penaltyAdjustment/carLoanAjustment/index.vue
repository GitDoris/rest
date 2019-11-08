<template>
    <div>
       <el-tabs class="tabTopstyle" @tab-click="caseLogTab"  v-model="activeName">
            <el-tab-pane label="待处理" name="first">
            </el-tab-pane>
            <el-tab-pane label="已处理" name="second">
            </el-tab-pane>
        </el-tabs>
        <pending-work v-if="activeName=='first'"></pending-work>
        <handled-work v-if="activeName=='second'"></handled-work>
    </div>
</template>
<script>
  import PendingWork from './pendingWork/index.vue'
  import HandledWork from './handledWork/index.vue'

  export default {
    data() {
      return {
        activeName: "first"
      }
    },
    mounted() {
      if(this.$route.query.activeName!=null&&this.$route.query.activeName!='')
      {
        this.activeName = this.$route.query.activeName;
        //console.log("mounted", this.activeName);

      }
    },
    methods: {
      /*tab切换*/
      caseLogTab(tab,event) {
        this.activeName = tab.name;
       // console.log(tab.index+','+event);
      },

    },
    components: {
      PendingWork,
      HandledWork
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