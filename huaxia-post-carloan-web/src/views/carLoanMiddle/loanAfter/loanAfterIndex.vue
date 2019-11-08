<!--车贷贷后财务信息查询-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view></case-view>
</template>

<script>
  import caseView from './carLoanafterList'
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
