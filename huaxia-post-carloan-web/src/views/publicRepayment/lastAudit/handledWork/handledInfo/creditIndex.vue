<!--信贷-委外催收 角色类型1：信贷，21：车贷-->
<template>
  <credit-view :tableLabel="tableLabel" :loansType="loansType"></credit-view>
</template>

<script>
  import creditView from './creditView'
  export default {
    data() {
      return {
        loansType: "5",
        tableLabel: this.$store.state.tableLables.collectionforensicTable,
      }
    },
    components: {
      creditView
    }
  }
</script>
