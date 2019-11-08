<template>
  <credit-view :tableLabel="tableLabel"></credit-view>
</template>

<script>
  import creditView from './creditView'
  export default {
    data() {
      return {
        tableLabel: this.$store.state.tableLables.collectionforensicTable,
      }
    },
    components: {
      creditView
    }
  }
</script>
