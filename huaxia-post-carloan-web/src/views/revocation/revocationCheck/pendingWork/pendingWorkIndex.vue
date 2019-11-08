<!--挂账撤销登记-待处理任务-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view></case-view>
</template>

<script>
  import caseView from './pendingList'
  export default {
    data() {
      return {

      }
    },
    components: {
      caseView
    }
  }
</script>
