<!--挂账撤销登记已处理任务-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view></case-view>
</template>

<script>
  import caseView from './handledList'
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
