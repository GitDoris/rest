<!--提前结清-处理中任务-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view></case-view>
</template>

<script>
  import caseView from './holdingList'
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
