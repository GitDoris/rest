<!--对公终审-待处理任务列表-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view></case-view>
</template>

<script>
  import caseView from './handingList'
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
