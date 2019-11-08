<!--待处理任务弹窗-->
<template>
  <!--<case-view :loansType="loansType"></case-view>-->
  <case-view :loansType="loansType"></case-view>
</template>

<script>
  import caseView from './ddialog'
  export default {
    data() {
      return {
        loansType: "21"

      }
    },
    components: {
      caseView
    }
  }
</script>
